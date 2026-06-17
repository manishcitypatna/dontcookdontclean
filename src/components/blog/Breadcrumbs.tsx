import Link from "next/link";

interface BreadcrumbsProps {
  slug: string;
}

export default function Breadcrumbs({ slug }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="pt-32 pb-8">
      <div className="container">
        <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-text-secondary">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="text-text-primary font-medium">
            {slug}
          </li>
        </ol>
      </div>
    </nav>
  );
}
