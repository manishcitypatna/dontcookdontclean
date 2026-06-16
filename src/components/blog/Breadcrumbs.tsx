import Link from "next/link";

interface BreadcrumbsProps {
  title: string;
}

export default function Breadcrumbs({ title }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="section pb-0">
      <div className="container">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
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
            {title}
          </li>
        </ol>
      </div>
    </nav>
  );
}
