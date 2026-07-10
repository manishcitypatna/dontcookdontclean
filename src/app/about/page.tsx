import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/shared/SectionLabel";
import { LOCALITY_OPTIONS } from "@/data/localities";

export const metadata: Metadata = {
  title: "About Us | Maid & Cook Service in Patna | Don't Cook Don't Clean",
  description:
    "Don't Cook Don't Clean is Patna's trusted domestic helper platform. Learn how we started, our mission, and how we connect Patna families with verified maids, cooks, babysitters, and elder care helpers.",
  alternates: {
    canonical: "https://dontcookdontclean.in/about",
  },
  openGraph: {
    title: "About Don't Cook Don't Clean | Patna's Trusted Domestic Help Platform",
    description:
      "Learn how Don't Cook Don't Clean connects Patna households with verified, background-checked domestic helpers.",
    url: "https://dontcookdontclean.in/about",
    type: "website",
  },
};

const stats = [
  { value: "500+", label: "Families Helped in Patna" },
  { value: "10+", label: "Household Service Categories" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "4.8", label: "Google Rating" },
];

const familyProblems = [
  "Calling around to relatives, agencies, and local contacts just to find one candidate",
  "Relying on word-of-mouth references with no real way to verify them",
  "Trial after trial, hoping this time the helper actually stays and works out",
  "No one to call for support once a placement fails — you start over from zero",
];

const verificationSteps = [
  {
    icon: "/images/shared/icon/documents.avif",
    title: "ID Verification",
    description:
      "We verify the worker's own government ID along with a family member's ID, so there's a documented identity behind every placement.",
  },
  {
    icon: "/images/shared/icon/address.avif",
    title: "Address Verification",
    description:
      "We record and verify both current and permanent addresses, so we — and the families we place them with — always know where a helper actually lives.",
  },
  {
    icon: "/images/shared/icon/interview.avif",
    title: "Reference Checks",
    description:
      "We speak directly with the references a worker provides before they're ever considered for a placement.",
  },
  {
    icon: "/images/shared/icon/guide.avif",
    title: "Police Verification (Where It Matters)",
    description:
      "For live-in help, childcare, and elder care roles, we also arrange police verification as an added layer of safety for the family.",
  },
];

const values = [
  {
    icon: "/images/shared/icon/documents.avif",
    title: "Verification First",
    description:
      "Every maid, cook, and caregiver on our platform goes through ID verification and background checks before we recommend them to a Patna household.",
  },
  {
    icon: "/images/shared/icon/address.avif",
    title: "Local to Patna",
    description:
      "We aren't a national app running a generic playbook. We're built around how Patna families actually live — joint families, working couples, and neighbourhoods from Boring Road to Kankarbagh.",
  },
  {
    icon: "/images/shared/icon/help.avif",
    title: "Support That Doesn't Disappear",
    description:
      "Once a helper joins your household, we stay reachable. If something isn't working out, our team helps arrange a replacement instead of leaving you to start over alone.",
  },
  {
    icon: "/images/shared/icon/family.avif",
    title: "Built Around Trust",
    description:
      "Letting someone into your home is personal. We treat every match the way we'd want it done for our own families — carefully, and without shortcuts.",
  },
];

const serviceAreas = [
  ...LOCALITY_OPTIONS.filter((locality) => locality !== "Other"),
  "and Others",
];

export default function AboutPage() {
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
              { "@type": "ListItem", position: 2, name: "About", item: "https://dontcookdontclean.in/about" },
            ],
          }),
        }}
      />
      <main>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about/about-hero.avif')" }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 text-secondary mb-4">
              About Don&apos;t Cook Don&apos;t Clean
            </h1>
            <p className="body text-white/80 max-w-2xl mx-auto">
              We help Patna households find maids, cooks, babysitters, and elder
              care helpers they can actually trust — verified, background-checked,
              and matched to how your home runs.
            </p>
          </div>
        </div>
      </section>

      {/* How We Started */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-[24px] overflow-hidden h-[320px] md:h-[420px] order-2 lg:order-1">
              <Image
                src="/images/about/bhabhi-cooking.avif"
                alt="Domestic helper working in a Patna household"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <SectionLabel>HOW WE STARTED</SectionLabel>
              <h2 className="h2 text-text-primary">
                A Problem With Two Sides, Broken the Same Way
              </h2>
              <p className="body text-text-secondary">
                Ask any family in Patna how they found their current maid or cook,
                and the answer is almost always the same: calling around to
                relatives and agencies, taking a chance on a reference, and going
                through trial after trial before finding someone they could trust.
              </p>
              <p className="body text-text-secondary">
                Don&apos;t Cook Don&apos;t Clean started as an attempt to fix that
                problem — not just find families a helper, but build a fairer,
                more organized, and more reliable way for households in Patna to
                get the help they need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="section bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>THE PROBLEM WE SOLVE</SectionLabel>
            <h2 className="h2 text-text-primary">
              Why Finding Reliable Help in Patna Is So Hard
            </h2>
            <p className="body text-text-secondary mt-4">
              We built Don&apos;t Cook Don&apos;t Clean to fix this for every
              household in Patna.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-[24px] p-8 border border-border">
              <h3 className="h4 text-text-primary mb-5">For Families</h3>
              <ul className="space-y-4">
                {familyProblems.map((problem) => (
                  <li key={problem} className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="body text-text-secondary">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>WHAT WE DO</SectionLabel>
            <h2 className="h2 text-text-primary">
              Domestic Help for Every Kind of Patna Home
            </h2>
            <p className="body text-text-secondary mt-4">
              Whether you need daily cooking help, deep house cleaning, a
              babysitter, or full-time elder care, we match Patna households with
              helpers suited to their routine — part-time, full-time, or live-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="h4 text-text-primary mb-1">You Tell Us What You Need</h3>
                  <p className="body text-text-secondary">
                    Cooking, cleaning, childcare, elder care, or a combination —
                    along with your locality and preferred schedule.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="h4 text-text-primary mb-1">We Match You with Verified Helpers</h3>
                  <p className="body text-text-secondary">
                    Every helper we recommend has been through our verification
                    process before they&apos;re introduced to your household.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="h4 text-text-primary mb-1">We Stay Involved After Placement</h3>
                  <p className="body text-text-secondary">
                    If a helper isn&apos;t the right fit, we help arrange a
                    replacement — you&apos;re not left to start the search over on
                    your own.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-[24px] overflow-hidden h-[320px] md:h-[400px]">
              <Image
                src="/images/about/maid-making-tea.avif"
                alt="Verified helper caring for a Patna household"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Verification Process */}
      <section className="section bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>HOW WE VERIFY</SectionLabel>
            <h2 className="h2 text-text-primary">
              Every Helper Goes Through a Real Verification Process
            </h2>
            <p className="body text-text-secondary mt-4">
              Before anyone is introduced to a Patna household, we complete a
              verification process that goes well beyond a quick reference check.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {verificationSteps.map((step) => (
              <div
                key={step.title}
                className="bg-white rounded-[24px] p-8 border border-border flex gap-5 items-start"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={step.icon}
                    alt=""
                    width={26}
                    height={26}
                    className="w-[26px] h-[26px] object-contain"
                  />
                </div>
                <div>
                  <h3 className="h4 text-text-primary mb-2">{step.title}</h3>
                  <p className="body text-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Goal */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SectionLabel>OUR MISSION</SectionLabel>
              <h2 className="h2 text-text-primary">
                Giving Patna Families Their Time Back
              </h2>
              <p className="body text-text-secondary">
                Our mission is simple: make it possible for every household in
                Patna to find dependable domestic help without relying on luck or
                word-of-mouth. Cooking, cleaning, childcare, and elder care are
                daily responsibilities — when they&apos;re handled by someone
                trustworthy, families get their evenings, weekends, and peace of
                mind back.
              </p>
              <p className="body text-text-secondary">
                Our goal over the next few years is to become the platform Patna
                households turn to first when they need household help — and,
                eventually, to bring the same verified, accountable model to
                nearby cities like Ranchi, Jamshedpur, and Kolkata.
              </p>
            </div>

            <div className="relative rounded-[24px] overflow-hidden h-[320px] md:h-[420px]">
              <Image
                src="/images/about/family-time.avif"
                alt="Helper assisting with household support in Patna"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>WHY PATNA FAMILIES TRUST US</SectionLabel>
            <h2 className="h2 text-text-primary">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-background rounded-[24px] p-8 border border-border flex gap-5 items-start"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={value.icon}
                    alt=""
                    width={26}
                    height={26}
                    className="w-[26px] h-[26px] object-contain"
                  />
                </div>
                <div>
                  <h3 className="h4 text-text-primary mb-2">{value.title}</h3>
                  <p className="body text-text-secondary">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact / Stats */}
      <section className="section bg-background">
        <div className="container">
          <div className="bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 md:p-12">
            <div className="text-center max-w-xl mx-auto mb-10">
              <SectionLabel>OUR IMPACT SO FAR</SectionLabel>
              <h2 className="h2 text-text-primary">Trusted Across Patna</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="h1 text-primary">{stat.value}</span>
                  <span className="small-text text-text-secondary mt-2">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionLabel>WHERE WE OPERATE</SectionLabel>
            <h2 className="h2 text-text-primary">Serving Households Across Patna</h2>
            <p className="body text-text-secondary mt-4">
              We currently serve families across Patna, including these
              localities, with plans to expand to more neighbourhoods as our
              network of verified helpers grows.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="bg-background border border-border rounded-full px-5 py-2 small-text text-text-secondary"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/images/about/about-cta.avif')" }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 container py-20 md:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="h2 text-secondary mb-4">Ready to Find Your Helper in Patna?</h2>
            <p className="body text-white/80 mb-8">
              Tell us what your household needs, and we&apos;ll match you with a
              verified helper near you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#lead-form" className="btn-primary">
                Get Instant Quote
              </Link>
              <a href="tel:+918877194682" className="btn-secondary">
                Call +91-88771-94682
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
