import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  blog: any;
  compact?: boolean;
  medium?: boolean;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BlogCard({ blog, compact = false, medium = false }: BlogCardProps) {
  if (compact) {
    return (
      <Link href={`/blog/${blog.slug}`} className="shrink-0">
        <article
          className="
            bg-white
            rounded-[16px]
            overflow-hidden
            shadow-[0_4px_15px_rgba(0,0,0,0.08)]
            hover:shadow-[0_4px_15px_rgba(0,0,0,0.12)]
            hover:-translate-y-1
            transition-all
            duration-300
            w-[220px]
          "
        >
          {/* Image Section (70%) */}
          <div className="relative w-full h-[140px]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="220px"
            />
          </div>
          {/* Text Section (30%) */}
          <div className="p-3 space-y-2">
            <span className="inline-block text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {blog.category}
            </span>
            <h3 className="text-[12px] font-semibold text-text-primary line-clamp-2">
              {blog.title}
            </h3>
            <div className="flex items-center justify-between text-[10px] text-text-secondary">
              <span>{formatDate(blog.publishedAt)}</span>
              <span>{blog.readingTime}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (medium) {
    return (
      <Link href={`/blog/${blog.slug}`}>
        <article
          className="
            bg-white
            rounded-[20px]
            overflow-hidden
            shadow-[0_6px_20px_rgba(0,0,0,0.08)]
            hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          {/* Image Section */}
          <div className="relative w-full h-[200px]">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
          {/* Text Section */}
          <div className="p-4 space-y-3">
            <span className="inline-block text-[11px] font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <h3 className="text-[15px] font-semibold text-text-primary line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-[12px] text-text-secondary line-clamp-2">
              {blog.description}
            </p>
            <div className="flex items-center justify-between text-[11px] text-text-secondary">
              <span>{formatDate(blog.publishedAt)}</span>
              <span>{blog.readingTime}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-5 p-5 items-center">
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
              width={500}
              height={375}
              className="w-full h-auto object-cover rounded-[20px]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
