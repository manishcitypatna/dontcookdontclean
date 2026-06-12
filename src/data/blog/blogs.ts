export interface BlogPost {
  id: number;
  category: string;
  title: string;
  slug: string;
  image: string;
  publishedAt: string;
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    category: "Cleaning Tips",
    title: "7 Simple Habits That Keep Your Home Cleaner Every Day",
    slug: "/blog/daily-clean-home-habits",
    image: "/blog-image/7-Simple-Habits-That-Keep-Your-Home-Cleaner-Every-Day.png",
    publishedAt: "2026-06-12",
  },

  {
    id: 2,
    category: "Domestic Help",
    title: "How to Choose the Right Maid for Your Family's Needs",
    slug: "/blog/how-to-hire-the-right-maid",
    image: "/blog-image/How-to-Choose-the-Right-Maid-for-Your-Family's-Needs.png",
    publishedAt: "2026-06-10",
  },

  {
    id: 3,
    category: "Home Care",
    title: "A Weekly House Cleaning Checklist for Busy Families",
    slug: "/blog/weekly-house-cleaning-checklist",
    image: "/images/GettyImages-1456829711.jpg",
    publishedAt: "2026-06-08",
  },

  {
    id: 4,
    category: "Household Tips",
    title: "5 Ways Professional Domestic Help Can Save You Time",
    slug: "/blog/domestic-help-benefits",
    image: "/images/GettyImages-2166928738-1024x631.jpg",
    publishedAt: "2026-06-05",
  },

  {
    id: 5,
    category: "Family Lifestyle",
    title: "Balancing Work and Home Life with Reliable Household Support",
    slug: "/blog/work-life-household-support",
    image: "/images/gettyimages-931846502-2048x2048-2-1024x814.jpg",
    publishedAt: "2026-06-02",
  },
];