export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoSettings {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  slug: string;
  image: string;
  category: string;
  publishedAt: string;
  author: string;
  featured?: boolean;
  faqs?: FaqItem[];
  seo?: SeoSettings;
  tags?: string[];
  relatedPosts?: string[];
  status?: "published" | "draft";
}

export interface BlogPost extends BlogFrontmatter {
  content: string;
  readingTime: string;
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}
