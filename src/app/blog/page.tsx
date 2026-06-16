import Link from "next/link";
import Image from "next/image";
import { getAllBlogs, getFeaturedBlogs } from "@/data/blog/blogUtils";
import type { Metadata } from "next";
import LeadForm from "@/components/forms/LeadForm";
import SectionLabel from "@/components/shared/SectionLabel";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog | Don't Cook Don't Clean",
  description: "Cleaning tips, domestic help guides, and home care advice for families in Patna.",
  keywords: [
    "cleaning tips Patna",
    "maid service tips",
    "home care advice",
    "household hacks"
  ],
  alternates: {
    canonical: "https://dontcookdontclean.in/blog",
  },
  openGraph: {
    title: "Blog | Don't Cook Don't Clean",
    description: "Cleaning tips, domestic help guides, and home care advice for families in Patna.",
    url: "https://dontcookdontclean.in/blog",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Don't Cook Don't Clean",
    description: "Cleaning tips, domestic help guides, and home care advice for families in Patna.",
  }
};

export default function BlogIndex() {
  const allBlogs = getAllBlogs();
  const featuredBlogs = getFeaturedBlogs().slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full" style={{ borderRadius: "0 0 32px 32px" }}>
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[80vh] overflow-hidden" style={{ borderRadius: "0 0 32px 32px" }}>
          <Image
            src="/blog-image/blog-hero.avif"
            alt="Domestic Help Resources"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 -mt-[30%] md:-mt-[30vh]">
          <div className="bg-white/80 backdrop-blur-sm rounded-[24px] p-4 md:p-[30px_30px_25px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <div className="w-full flex justify-center mb-3">
              <Image
                src="/images/logo.avif"
                alt="Don't Cook Don't Clean"
                width={160}
                height={64}
                priority
                className="h-auto w-auto"
              />
            </div>
            
            <div className="text-center mb-4">
              <h1 className="h1 text-text-primary mb-3">
                Domestic Help Resources & Expert Guides
              </h1>
              <p className="body text-text-secondary">
                Learn how to hire trusted maids, cooks, babysitters, elder care helpers and manage your home more efficiently with expert guidance from the Don't Cook Don't Clean team.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link href="/" className="btn-primary">
                Hire a Maid
              </Link>
              <Link href="#articles" className="btn-outline">
                Browse Articles
              </Link>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredBlogs.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <SectionLabel>Featured Articles</SectionLabel>
              <h2 className="h2 text-text-primary">Our Top Guides</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="section" id="articles">
        <div className="container">
          <div className="text-center mb-16">
            <SectionLabel>Latest Articles</SectionLabel>
            <h2 className="h2 text-text-primary">All Resources</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
