import Link from "next/link";
import Image from "next/image";

interface RelatedArticle {
  slug: string;
  title: string;
  image: string;
  publishedAt: string;
  readingTime: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;
  
  return (
    <section className="section bg-white">
      <div className="container">
        <h2 className="h2 text-text-primary mb-10 text-center">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((relatedBlog) => (
            <article key={relatedBlog.slug} className="card overflow-hidden p-0">
              <div className="relative w-full h-[200px]">
                <Image
                  src={relatedBlog.image}
                  alt={relatedBlog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="h3 text-text-primary mb-3">
                  {relatedBlog.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="small-text text-text-secondary">
                    {relatedBlog.publishedAt}
                  </p>
                  <p className="small-text text-text-secondary">
                    {relatedBlog.readingTime}
                  </p>
                </div>
                <Link
                  href={`/blog/${relatedBlog.slug}`}
                  className="btn-primary w-full mt-5"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
