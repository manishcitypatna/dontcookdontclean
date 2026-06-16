export interface FaqItem {
  question: string;
  answer: string;
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
}

export interface BlogPost extends BlogFrontmatter {
  content: string;
  readingTime: string;
}
