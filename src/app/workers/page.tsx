import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getPublicWorkersList, filterAndSortWorkers } from "@/lib/workers";
import WorkerCard from "@/components/workers/WorkerCard";
import WorkersFilterBar from "@/components/workers/WorkersFilterBar";
import WorkersPagination from "@/components/workers/WorkersPagination";

export const metadata: Metadata = {
  title: "Meet Our Helpers | Don't Cook Don't Clean",
  description: "Verified domestic helpers available in Patna. Meet our team of experienced maids, cooks, babysitters, and elder care assistants.",
  alternates: {
    canonical: "/workers",
  },
};

const PAGE_SIZE = 6;

type Props = {
  searchParams: Promise<{
    locality?: string;
    service?: string;
    workType?: string;
    sort?: string;
    page?: string;
  }>;
};

export default async function WorkersPage({ searchParams }: Props) {
  const { locality, service, workType, sort, page } = await searchParams;
  const allWorkers = await getPublicWorkersList(locality);
  const filteredWorkers = filterAndSortWorkers(allWorkers, {
    service,
    workType,
    sort,
  });

  const totalPages = Math.max(1, Math.ceil(filteredWorkers.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, parseInt(page ?? "1", 10) || 1), totalPages);
  const pageWorkers = filteredWorkers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://dontcookdontclean.in/" },
              { "@type": "ListItem", position: 2, name: "Meet Our Helpers", item: "https://dontcookdontclean.in/workers" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Domestic Helper Placement",
            provider: {
              "@type": "LocalBusiness",
              name: "Don't Cook Don't Clean",
              url: "https://dontcookdontclean.in",
            },
            areaServed: {
              "@type": "City",
              name: "Patna",
            },
          }),
        }}
      />
      <main>
      <section className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/workers/workers-hero.avif')" }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 container py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="h1 text-secondary mb-4">Meet Our Helpers</h1>
            <p className="body text-white/80 max-w-2xl mx-auto">
              {locality
                ? `Verified domestic helpers available in ${locality}, Patna`
                : "Verified domestic helpers available in Patna"}
            </p>
          </div>
        </div>
      </section>

      <section id="workers-list" className="pt-8 scroll-mt-24">
        <div className="container">
          <Suspense fallback={null}>
            <WorkersFilterBar />
          </Suspense>
        </div>
      </section>

      <section className="pt-4 pb-[100px]">
        <div className="container">
          {filteredWorkers.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center">
              <div className="card bg-yellow-50 border-yellow-200 mb-8">
                <p className="h4 text-yellow-800 flex items-center justify-center gap-2 text-center">
                  <span>🔍</span>
                  {locality
                    ? `No helpers listed for ${locality} yet — submit your requirement and we'll match you personally`
                    : "No helpers match these filters yet — submit your requirement and we'll match you personally"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#lead-form" className="btn-primary">
                  Submit Your Requirement
                </Link>
                <a href="tel:+918877194682" className="btn-secondary">
                  Call Us Now
                </a>
              </div>
            </div>
          ) : (
            <>
              <p className="small-text text-text-secondary text-center mb-6">
                Showing {pageWorkers.length} of {filteredWorkers.length} verified helper
                {filteredWorkers.length === 1 ? "" : "s"}
                {locality ? ` in ${locality}` : ""}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {pageWorkers.map((worker) => (
                  <WorkerCard key={worker.workerId} worker={worker} />
                ))}
              </div>

              <WorkersPagination
                currentPage={currentPage}
                totalPages={totalPages}
                searchParams={{ locality, service, workType, sort }}
              />
            </>
          )}
        </div>
      </section>

      {filteredWorkers.length > 0 && (
        <section className="relative w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/images/workers/workers-hero.avif')" }}
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 container py-20 md:py-28 text-center">
            <h2 className="h2 text-secondary mb-4">Don&apos;t See a Match for Your Exact Needs?</h2>
            <p className="body text-white/80 max-w-xl mx-auto mb-8">
              Tell us what your household needs, and we&apos;ll personally match you
              with a verified helper near you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#lead-form" className="btn-primary">
                Submit Your Requirement
              </Link>
              <a href="tel:+918877194682" className="btn-secondary">
                Call Us Now
              </a>
            </div>
          </div>
        </section>
      )}
      </main>
    </>
  );
}
