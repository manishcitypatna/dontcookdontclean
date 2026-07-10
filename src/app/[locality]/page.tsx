import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicWorkersList } from "@/lib/workers";
import WorkerCard from "@/components/workers/WorkerCard";
import FaqSection from "@/components/shared/FaqSection";
import { faqs } from "@/data/faqs";
import { localityToSlug, slugToLocality } from "@/data/localitySlugs";
import { LOCALITY_CONTENT, COVERED_LOCALITIES } from "@/data/localityContent";

// Next.js dynamic route folders must be *entirely* the bracketed param
// (`[locality]`) — a folder named `maid-service-in-[locality]` is not valid
// routing syntax and silently never matches, which is why that version 404'd
// on every locality regardless of data or config. This root-level [locality]
// segment instead receives the *full* last path segment (e.g.
// "maid-service-in-boring-road"), and the code below strips the prefix.
const SLUG_PREFIX = "maid-service-in-";

function parseLocalitySlug(rawSlug: string): string | null {
  if (!rawSlug.startsWith(SLUG_PREFIX)) return null;
  return rawSlug.slice(SLUG_PREFIX.length);
}

// dynamicParams intentionally left at the default (true): every real locality
// in LOCALITY_OPTIONS now has a LOCALITY_CONTENT entry (see the Tier 2
// expansion), so there's no "uncovered" locality left to gate out, and any
// slug that doesn't parse to a known locality still 404s via notFound() below.
export async function generateStaticParams() {
  return COVERED_LOCALITIES.map((locality) => ({
    locality: `${SLUG_PREFIX}${localityToSlug(locality)}`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locality: string }>;
}): Promise<Metadata> {
  const { locality: rawSlug } = await params;
  const slug = parseLocalitySlug(rawSlug);
  const locality = slug ? slugToLocality(slug) : null;
  if (!locality || !LOCALITY_CONTENT[locality]) return {};

  const title = `Maid Service in ${locality}, Patna | Don't Cook Don't Clean`;
  const description = `Hire verified maids, cooks, babysitters, and elder-care helpers in ${locality}, Patna. Background-checked domestic help, matched to your household in 24-48 hours.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${rawSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://dontcookdontclean.in/${rawSlug}`,
      type: "website",
    },
  };
}

export default async function LocalityPage({
  params,
}: {
  params: Promise<{ locality: string }>;
}) {
  const { locality: rawSlug } = await params;
  const slug = parseLocalitySlug(rawSlug);
  const locality = slug ? slugToLocality(slug) : null;
  const content = locality ? LOCALITY_CONTENT[locality] : undefined;
  if (!locality || !content) notFound();

  const workers = await getPublicWorkersList(locality);
  const featuredWorkers = workers.slice(0, 6);

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
              { "@type": "ListItem", position: 2, name: "Areas We Serve", item: "https://dontcookdontclean.in/areas" },
              {
                "@type": "ListItem",
                position: 3,
                name: locality,
                item: `https://dontcookdontclean.in/${rawSlug}`,
              },
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
              "@type": "Place",
              name: `${locality}, Patna`,
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
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="h1 text-secondary mb-4">Maid Service in {locality}, Patna</h1>
              <p className="body text-white/80 max-w-2xl mx-auto">
                Verified maids, cooks, babysitters, and elder-care helpers, matched to
                households in {locality}.
              </p>
            </div>
          </div>
        </section>

        <section className="section pb-0">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="body text-text-secondary">{content.intro}</p>
              <p className="small-text text-text-secondary mt-4">
                {workers.length > 0
                  ? `${workers.length} verified helper${workers.length === 1 ? "" : "s"} currently available in ${locality}.`
                  : `We're actively matching helpers in ${locality} — submit your requirement and we'll reach out personally.`}
              </p>
            </div>
          </div>
        </section>

        <section className="pt-8 pb-[100px]">
          <div className="container">
            {featuredWorkers.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {featuredWorkers.map((worker) => (
                    <WorkerCard key={worker.workerId} worker={worker} />
                  ))}
                </div>
                {workers.length > featuredWorkers.length && (
                  <div className="text-center mb-8">
                    <Link href={`/workers?locality=${encodeURIComponent(locality)}`} className="btn-secondary">
                      View All Helpers in {locality}
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="max-w-2xl mx-auto text-center mb-8">
                <div className="card bg-yellow-50 border-yellow-200">
                  <p className="h4 text-yellow-800">
                    No helpers listed for {locality} yet — submit your requirement and
                    we&apos;ll match you personally.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#lead-form" className="btn-primary">
                Submit Your Requirement
              </Link>
              <a href="tel:+918877194682" className="btn-secondary">
                Call Us Now
              </a>
            </div>
          </div>
        </section>

        {content.nearby.length > 0 && (
          <section className="section pt-0">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <p className="small-text text-text-secondary uppercase tracking-[0.14em] mb-3">
                  Also Serving Nearby
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {content.nearby.map((nearbyLocality) => (
                    <Link
                      key={nearbyLocality}
                      href={`/maid-service-in-${localityToSlug(nearbyLocality)}`}
                      className="small-text bg-secondary/20 text-text-primary px-4 py-2 rounded-full hover:bg-secondary/30 transition-colors"
                    >
                      {nearbyLocality}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <FaqSection faqs={faqs} />
      </main>
    </>
  );
}
