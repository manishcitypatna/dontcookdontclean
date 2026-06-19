import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogFrontmatter, BlogPost } from "./types";

const articlesDirectory = path.join(process.cwd(), "src/data/blog/articles");

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllBlogs(): BlogPost[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const blogs = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const frontmatter = data as BlogFrontmatter;

      return {
        ...frontmatter,
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return blogs;
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const blogs = getAllBlogs();
  return blogs.find((blog) => blog.slug === slug) || null;
}

export function getFeaturedBlogs(): BlogPost[] {
  const blogs = getAllBlogs();
  return blogs.filter((blog) => blog.featured);
}

export function getRelatedBlogs(slug: string, limit = 3): BlogPost[] {
  const blogs = getAllBlogs();
  const currentBlog = blogs.find((blog) => blog.slug === slug);
  if (!currentBlog) return getLatestBlogs(limit);

  const sameCategory = blogs.filter(
    (blog) => blog.slug !== slug && blog.category === currentBlog.category
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const others = blogs.filter(
    (blog) =>
      blog.slug !== slug && blog.category !== currentBlog.category
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getLatestBlogs(limit: number): BlogPost[] {
  const blogs = getAllBlogs();
  return blogs.slice(0, limit);
}
