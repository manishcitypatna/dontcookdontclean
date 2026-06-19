import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogFrontmatter, BlogPost, Category } from "./types";

const articlesDirectory = path.join(process.cwd(), "src/data/blog/articles");
const categoriesDirectory = path.join(process.cwd(), "src/data/blog/categories");

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllCategories(): Category[] {
  if (!fs.existsSync(categoriesDirectory)) return [];
  
  const fileNames = fs.readdirSync(categoriesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const fullPath = path.join(categoriesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      return JSON.parse(fileContents) as Category;
    });
}

export function getAllBlogs(includeDrafts = false): BlogPost[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const blogs = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const frontmatter = data as BlogFrontmatter;

      // Handle backward compatibility - default status to published
      const status = frontmatter.status || "published";
      
      // Handle tags - Decap CMS stores tags as array of { tag: string }
      let tags: string[] = [];
      if (frontmatter.tags) {
        tags = frontmatter.tags.map((t: any) => 
          typeof t === "string" ? t : t.tag
        );
      }
      
      // Handle related posts - Decap CMS stores as array of { post: string }
      let relatedPosts: string[] = [];
      if (frontmatter.relatedPosts) {
        relatedPosts = frontmatter.relatedPosts.map((p: any) => 
          typeof p === "string" ? p : p.post
        );
      }

      const rawPublishedAt = frontmatter.publishedAt as any;
      return {
        ...frontmatter,
        status,
        tags,
        relatedPosts,
        publishedAt: rawPublishedAt instanceof Date 
          ? rawPublishedAt.toISOString().split('T')[0] 
          : String(rawPublishedAt),
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .filter((blog) => includeDrafts || blog.status !== "draft")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return blogs;
}

export function getBlogBySlug(slug: string, includeDrafts = false): BlogPost | null {
  const blogs = getAllBlogs(includeDrafts);
  return blogs.find((blog) => blog.slug === slug) || null;
}

export function getFeaturedBlogs(includeDrafts = false): BlogPost[] {
  const blogs = getAllBlogs(includeDrafts);
  return blogs.filter((blog) => blog.featured);
}

export function getRelatedBlogs(slug: string, limit = 3): BlogPost[] {
  const blogs = getAllBlogs();
  const currentBlog = blogs.find((blog) => blog.slug === slug);
  if (!currentBlog) return getLatestBlogs(limit);

  // First use manually set related posts if available
  if (currentBlog.relatedPosts && currentBlog.relatedPosts.length > 0) {
    const manuallyRelated = blogs.filter(
      (blog) => currentBlog.relatedPosts!.includes(blog.slug)
    );
    if (manuallyRelated.length >= limit) {
      return manuallyRelated.slice(0, limit);
    }
  }

  // Fall back to same category
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

export function getBlogsByCategory(categoryName: string): BlogPost[] {
  const blogs = getAllBlogs();
  return blogs.filter((blog) => blog.category === categoryName);
}
