import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogs } from "@/data/blog/blogUtils";
import StatCard, { StatCardGrid } from "@/components/admin/StatCard";

export const metadata: Metadata = {
  title: "Blog Management | Don't Cook Don't Clean Admin",
  description: "Track blog publishing activity",
};

function monthKey(dateStr: string) {
  return dateStr.slice(0, 7); // YYYY-MM
}

export default function BlogManagementPage() {
  const allPosts = getAllBlogs(true);
  const published = allPosts.filter((p) => p.status !== "draft");
  const drafts = allPosts.filter((p) => p.status === "draft");

  const now = new Date();
  const currentMonthKey = monthKey(now.toISOString());
  const postsThisMonth = published.filter((p) => monthKey(p.publishedAt) === currentMonthKey).length;

  let avgPerMonth = published.length;
  if (published.length > 0) {
    const dates = published.map((p) => new Date(p.publishedAt));
    const earliest = new Date(Math.min(...dates.map((d) => d.getTime())));
    const monthsSpan =
      (now.getFullYear() - earliest.getFullYear()) * 12 +
      (now.getMonth() - earliest.getMonth()) +
      1;
    avgPerMonth = Math.round((published.length / Math.max(monthsSpan, 1)) * 10) / 10;
  }

  const recentPosts = published.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        <section className="py-12">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <Link href="/admin" className="btn-outline">
                  ← Back to Dashboard
                </Link>
                <h1 className="h1 text-text-primary">Blog Management</h1>
              </div>

              <StatCardGrid>
                <StatCard label="Published Posts" value={published.length} accent="primary" />
                <StatCard label="Posts This Month" value={postsThisMonth} accent="secondary" />
                <StatCard label="Avg. Posts / Month" value={avgPerMonth} />
                <StatCard label="Drafts" value={drafts.length} accent={drafts.length > 0 ? "warning" : "default"} />
              </StatCardGrid>

              <div className="card mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="h4 text-text-primary mb-1">Content Editor</h3>
                  <p className="body text-text-secondary">
                    Create and edit articles in the CMS. New posts appear here automatically.
                  </p>
                </div>
                <a href="/admin/index.html" className="btn-primary whitespace-nowrap">
                  Open Content Editor →
                </a>
              </div>

              <div className="card overflow-x-auto">
                <h3 className="h4 text-text-primary mb-4">Recent Posts</h3>
                {recentPosts.length === 0 ? (
                  <p className="body text-text-secondary py-8 text-center">No published posts yet.</p>
                ) : (
                  <table className="w-full text-left">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="py-4 px-4 text-text-primary font-semibold">Title</th>
                        <th className="py-4 px-4 text-text-primary font-semibold">Category</th>
                        <th className="py-4 px-4 text-text-primary font-semibold">Published</th>
                        <th className="py-4 px-4 text-text-primary font-semibold">Reading Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPosts.map((post) => (
                        <tr key={post.slug} className="border-b border-border last:border-0">
                          <td className="py-4 px-4 text-text-primary font-medium">
                            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                              {post.title}
                            </Link>
                          </td>
                          <td className="py-4 px-4 text-text-secondary">{post.category}</td>
                          <td className="py-4 px-4 text-text-secondary">{post.publishedAt}</td>
                          <td className="py-4 px-4 text-text-secondary">{post.readingTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
