import type { Metadata } from "next";
import Link from "next/link";
import { LOCALITY_OPTIONS } from "@/data/localities";
import { COVERED_LOCALITIES } from "@/data/localityContent";
import { localityToSlug } from "@/data/localitySlugs";

export const metadata: Metadata = {
  title: "Areas We Serve in Patna | Don't Cook Don't Clean",
  description:
    "Don't Cook Don't Clean places verified maids, cooks, and elder-care helpers across Patna. Browse localities we serve, or tell us your area and we'll match you personally.",
  alternates: {
    canonical: "/areas",
  },
};

const comingSoonLocalities = LOCALITY_OPTIONS.filter(
  (locality) => locality !== "Other" && !COVERED_LOCALITIES.includes(locality)
);

export default function AreasPage() {
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
            ],
          }),
        }}
      />

      <main>
        <section className="relative w-full overflow-hidden bg-primary">
          <div className="relative z-10 container py-16 md:py-24">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="h1 text-secondary mb-4">Areas We Serve in Patna</h1>
              <p className="body text-white/85 max-w-xl mx-auto">
                Verified domestic helpers, matched to your locality. Don&apos;t see your
                area listed yet? Submit your requirement and we&apos;ll personally match
                you with a helper nearby.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="h2 text-text-primary text-center mb-10">Now Serving</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {COVERED_LOCALITIES.map((locality) => (
                <Link
                  key={locality}
                  href={`/maid-service-in-${localityToSlug(locality)}`}
                  className="card text-center hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-shadow"
                >
                  <p className="body text-text-primary font-semibold">{locality}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {comingSoonLocalities.length > 0 && (
          <section className="section pt-0">
            <div className="container">
              <h2 className="h2 text-text-primary text-center mb-4">Coming Soon</h2>
              <p className="body text-text-secondary text-center max-w-2xl mx-auto mb-10">
                We&apos;re expanding to more Patna localities. Submit your requirement
                for any of these areas and we&apos;ll personally reach out once a
                verified helper is available near you.
              </p>
              <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
                {comingSoonLocalities.map((locality) => (
                  <Link
                    key={locality}
                    href={`/#lead-form`}
                    className="small-text bg-secondary/20 text-text-primary px-4 py-2 rounded-full hover:bg-secondary/30 transition-colors"
                  >
                    {locality}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section pt-0">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#lead-form" className="btn-primary">
                  Submit Your Requirement
                </Link>
                <a href="tel:+918877194682" className="btn-secondary">
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
