import { getAllBlogs } from "@/data/blog/blogUtils";

export default function sitemap() {
  const blogs = getAllBlogs();

  const blogUrls = blogs.map((blog) => ({
    url: `https://dontcookdontclean.in/blog/${blog.slug}`,
    lastModified: new Date(blog.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://dontcookdontclean.in",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://dontcookdontclean.in/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
