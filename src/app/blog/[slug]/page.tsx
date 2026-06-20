import Image from "next/image";
import { notFound } from "next/navigation";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { getBlogBySlug, getAllBlogs, getRelatedBlogs } from "@/data/blog/blogUtils";
import { useMDXComponents } from "@/data/blog/mdx-components";
import ArticleCTA from "@/components/blog/ArticleCTA";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import RelatedArticles from "@/components/blog/RelatedArticles";
import FaqSection from "@/components/landing/FaqSection";
import SupportSection from "@/components/landing/SupportSection";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";

const articlesDirectory = path.join(process.cwd(), "src/data/blog/articles");

async function getCompiledMDX(slug: string) {
  const fileNames = fs.readdirSync(articlesDirectory);
  let fileContents = "";
  
  for (const fileName of fileNames) {
    if (fileName.endsWith(".mdx") || fileName.endsWith(".md")) {
      const fullPath = path.join(articlesDirectory, fileName);
      const contents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(contents);
      if (data.slug === slug) {
        fileContents = contents;
        break;
      }
    }
  }
  
  if (!fileContents) {
    throw new Error(`Blog post not found for slug: ${slug}`);
  }
  
  const { content } = matter(fileContents);
  const { default: MDXContent } = await evaluate(content, {
    ...runtime,
    useMDXComponents,
    remarkPlugins: [remarkGfm],
  });
  return MDXContent;
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.description,
    keywords: [blog.category, "home care", "cleaning tips"],
    alternates: {
      canonical: `https://dontcookdontclean.in/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://dontcookdontclean.in/blog/${blog.slug}`,
      type: "article",
      images: [
        {
          url: `https://dontcookdontclean.in${blog.image}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      publishedTime: blog.publishedAt,
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const MDXContent = await getCompiledMDX(slug);
  const components = useMDXComponents({});
  const relatedBlogs = getRelatedBlogs(slug);
  const articleUrl = `https://dontcookdontclean.in/blog/${blog.slug}`;

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://dontcookdontclean.in/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://dontcookdontclean.in/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: blog.slug,
                item: articleUrl,
              },
            ],
          }),
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blog.title,
            description: blog.description,
            image: [`https://dontcookdontclean.in${blog.image}`],
            author: {
              "@type": "Organization",
              name: blog.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Don't Cook Don't Clean",
              logo: {
                "@type": "ImageObject",
                url: "https://dontcookdontclean.in/images/logo.avif",
                width: 1200,
                height: 630,
              },
            },
            datePublished: blog.publishedAt,
            dateModified: blog.publishedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": articleUrl,
            },
          }),
        }}
      />

      {/* FAQ Schema (if faqs exist) */}
      {blog.faqs && blog.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: blog.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* Breadcrumb Navigation */}
      <Breadcrumbs slug={blog.slug} />

      {/* Hero Section */}
      <section className="section pt-8">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="small-text uppercase tracking-[0.14em] text-primary mb-4">
              {blog.category}
            </p>
            <h1 className="h1 text-text-primary mb-6">{blog.title}</h1>
            <p className="body text-text-secondary mb-6">{blog.description}</p>
            <div className="flex items-center justify-center gap-6">
              <p className="small-text text-text-secondary">{blog.publishedAt}</p>
              <p className="small-text text-text-secondary">{blog.readingTime}</p>
              <p className="small-text text-text-secondary">By {blog.author}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section pt-0">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Main Article Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-border p-8 md:p-12">
                <MDXContent components={components} />
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Author Card */}
                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border mb-4 bg-white">
                    <Image
                      src="/images/nav-logo.avif"
                      alt="Don't Cook Don't Clean"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <h4 className="h4 text-text-primary mb-2">Don&apos;t Cook Don&apos;t Clean</h4>
                  <p className="body text-text-secondary text-sm mb-4">
                    Experts in domestic staffing, maids, cooks, childcare, elder care and household management.
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href="https://www.facebook.com/profile.php?id=61590679025518" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Image 
                        src="/images/icon/facebook.avif" 
                        alt="Facebook" 
                        width={20} 
                        height={20} 
                      />
                    </a>
                    <a 
                      href="https://www.instagram.com/dontcook_dontclean" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Image 
                        src="/images/icon/instagram.avif" 
                        alt="Instagram" 
                        width={20} 
                        height={20} 
                      />
                    </a>
                    <a 
                      href="https://wa.me/918877194682" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Image 
                        src="/images/icon/message.avif" 
                        alt="WhatsApp" 
                        width={20} 
                        height={20} 
                      />
                    </a>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 p-6">
                  <h4 className="h4 text-text-primary mb-4">Highlights</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-text-secondary">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Verified Helpers
                    </li>
                    <li className="flex items-center gap-3 text-sm text-text-secondary">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      24/7 Support
                    </li>
                    <li className="flex items-center gap-3 text-sm text-text-secondary">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      No Hidden Fees
                    </li>
                  </ul>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <SupportSection />

      {/* FAQ Section (if faqs exist) */}
      {blog.faqs && blog.faqs.length > 0 && (
        <FaqSection faqs={blog.faqs} showSectionLabel={false} />
      )}

      {/* Article CTA */}
      <ArticleCTA />

      {/* Related Articles */}
      <RelatedArticles articles={relatedBlogs} />
    </>
  );
}
