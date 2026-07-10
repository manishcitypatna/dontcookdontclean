import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PlacementsOverviewCard from "@/components/admin/PlacementsOverviewCard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Don't Cook Don't Clean",
  description: "Admin dashboard for Don't Cook Don't Clean",
};

const adminLinks = [
  {
    title: "Worker Management",
    href: "/admin/worker-management",
    description: "View all workers, track onboarding progress, and edit section by section",
    icon: "/images/shared/icon/family.avif",
  },
  {
    title: "Blog Management",
    href: "/admin/blog-management",
    description: "Track publishing activity and manage articles",
    icon: "/images/shared/icon/documents.avif",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-14 md:py-20 bg-gradient-to-br from-primary/5 to-secondary/10 overflow-hidden">
        <div className="container relative z-10 text-center">
          <p className="small-text uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            DCDC Internal Tools
          </p>
          <h1 className="h1 text-text-primary">Admin Dashboard</h1>
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
      </section>

      <main className="pb-20">
        <div className="container">
          <div className="max-w-5xl mx-auto -mt-10 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlacementsOverviewCard />

            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="card hover:shadow-lg hover:-translate-y-1 transition-all flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={link.icon}
                    alt=""
                    width={26}
                    height={26}
                    className="w-[26px] h-[26px] object-contain"
                  />
                </div>
                <div>
                  <h3 className="h3 text-text-primary mb-2">{link.title}</h3>
                  <p className="body text-text-secondary">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
