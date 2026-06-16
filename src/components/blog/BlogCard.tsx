import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  blog: any;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <article
        className="
          bg-white
          rounded-[24px]
          overflow-hidden
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
          hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
          hover:-translate-y-1
          transition-all
          duration-300
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-5 p-5 items-center">
          <div className="space-y-3">
            <span className="inline-block small-text font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <h3 className="h3 text-text-primary">
              {blog.title}
            </h3>
            <p className="body text-text-secondary line-clamp-2">
              {blog.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="small-text text-text-secondary">
                  {formatDate(blog.publishedAt)}
                </p>
                <span className="text-text-secondary">•</span>
                <p className="small-text text-text-secondary">
                  {blog.readingTime}
                </p>
              </div>
              <div className="flex items-center text-primary font-semibold">
                Read Article
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              width={400}
              height={300}
              className="w-full h-auto object-cover rounded-[20px]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
