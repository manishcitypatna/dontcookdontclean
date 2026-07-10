import { getAllBlogs } from "@/data/blog/blogUtils";
import { COVERED_LOCALITIES } from "@/data/localityContent";
import { localityToSlug } from "@/data/localitySlugs";

export default function sitemap() {
  const blogs = getAllBlogs();

  const blogUrls = blogs.map((blog) => ({
    url: `https://dontcookdontclean.in/blog/${blog.slug}`,
    lastModified: new Date(blog.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const localityUrls = COVERED_LOCALITIES.map((locality) => ({
    url: `https://dontcookdontclean.in/maid-service-in-${localityToSlug(locality)}`,
    lastModified: new Date(),
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
    {
      url: "https://dontcookdontclean.in/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://dontcookdontclean.in/workers",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://dontcookdontclean.in/areas",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://dontcookdontclean.in/work-with-us",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://dontcookdontclean.in/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://dontcookdontclean.in/work-with-us/apply",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://dontcookdontclean.in/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...blogUrls,
    ...localityUrls,
  ];
}
