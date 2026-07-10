import Link from "next/link";

export default function WorkersPagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const hrefForPage = (page: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value && key !== "page") params.set(key, value);
    }
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    return `${query ? `/workers?${query}` : "/workers"}#workers-list`;
  };

  const buttonClass =
    "small-text px-4 py-2 rounded-full border border-border bg-white text-text-primary hover:border-primary transition-colors";
  const disabledClass = "small-text px-4 py-2 rounded-full border border-border bg-gray-100 text-text-secondary cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      {currentPage > 1 ? (
        <Link href={hrefForPage(currentPage - 1)} className={buttonClass}>
          ← Previous
        </Link>
      ) : (
        <span className={disabledClass}>← Previous</span>
      )}

      <span className="small-text text-text-secondary">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={hrefForPage(currentPage + 1)} className={buttonClass}>
          Next →
        </Link>
      ) : (
        <span className={disabledClass}>Next →</span>
      )}
    </div>
  );
}
