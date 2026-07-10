import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/shared/SectionLabel";

export const metadata: Metadata = {
  title: "Work With Us | Join as a Verified Helper | Don't Cook Don't Clean",
  description:
    "Looking for work as a maid, cook, babysitter, or elder-care helper in Patna? See how Don't Cook Don't Clean's onboarding works, what documents you'll need, and apply in minutes.",
  alternates: {
    canonical: "https://dontcookdontclean.in/work-with-us",
  },
  openGraph: {
    title: "Work With Us | Don't Cook Don't Clean",
    description:
      "See how our onboarding process works and apply to join Patna's most organized domestic helper platform.",
    url: "https://dontcookdontclean.in/work-with-us",
    type: "website",
  },
};

const benefits = [
  {
    icon: "/images/shared/icon/payment-term.avif",
    title: "On-Time, Organized Payments",
    description:
      "No more waiting on families to pay whenever it suits them. We keep salary payments organized and on schedule.",
  },
  {
    icon: "/images/shared/icon/salary-discuss.avif",
    title: "Job Offer Letter & Salary Slip",
    description:
      "Every placement comes with proper documentation — real proof of employment for a loan, a rental agreement, or anywhere else it's needed.",
  },
  {
    icon: "/images/shared/icon/guide.avif",
    title: "Real Job Opportunities",
    description:
      "Get access to families actively looking to hire, instead of depending only on local agents and relatives for your next job.",
  },
  {
    icon: "/images/shared/icon/help.avif",
    title: "Support That Doesn't Disappear",
    description:
      "Once you're placed, we stay reachable. If something isn't working out, our team helps sort it out or find you a better fit.",
  },
  {
    icon: "/images/shared/icon/family.avif",
    title: "Treated With Respect",
    description:
      "You're not just a listing to us. We treat every worker on our platform the way we'd want our own family member treated at work.",
  },
];

const processSteps = [
  {
    icon: "/images/shared/icon/guide.avif",
    title: "Submit Your Details",
    description:
      "Fill a quick form with your name, contact number, locality, and the type of work you're looking for. Takes less than 2 minutes.",
  },
  {
    icon: "/images/shared/icon/calling.avif",
    title: "Get a Call From Our Team",
    description:
      "We call or WhatsApp you within 24-48 hours to understand your experience, availability, and salary expectations.",
  },
  {
    icon: "/images/shared/icon/interview.avif",
    title: "Verification",
    description:
      "We verify your ID, address, and references, and collect the documents needed to complete your profile.",
  },
  {
    icon: "/images/shared/icon/documents.avif",
    title: "Police Verification (Where It Matters)",
    description:
      "For live-in, childcare, and elder-care roles, we also arrange police verification as an added layer of trust for families.",
  },
  {
    icon: "/images/shared/icon/family.avif",
    title: "Get Matched & Start Working",
    description:
      "Once your profile is verified, we match you with families looking for help and support you through your first placement.",
  },
];

function BenefitItem({
  icon,
  title,
  description,
  align,
}: {
  icon: string;
  title: string;
  description: string;
  align: "left" | "right" | "bottom";
}) {
  if (align === "bottom") {
    return (
      <div className="flex flex-col items-center text-center max-w-[280px] mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-[#e8f5d3] flex items-center justify-center flex-shrink-0 mb-4">
          <Image
            src={icon}
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
        </div>
        <h4 className="h4 text-text-primary mb-2">{title}</h4>
        <p className="body text-text-secondary">{description}</p>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-4 ${
        align === "right" ? "md:flex-row-reverse md:text-right" : "text-left"
      }`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#e8f5d3] flex items-center justify-center flex-shrink-0">
        <Image
          src={icon}
          alt=""
          width={28}
          height={28}
          className="w-7 h-7 object-contain"
        />
      </div>
      <div>
        <h4 className="h4 text-text-primary mb-2">{title}</h4>
        <p className="body text-text-secondary max-w-[260px]">{description}</p>
      </div>
    </div>
  );
}

const documentsNeeded = [
  "Aadhaar Card (front & back)",
  "One recent passport-size photo",
  "Bank account details, for salary payments",
  "PAN Card, if you have one",
  "Voter ID, if you have one",
  "Police Verification Certificate, for live-in, childcare, and elder-care roles (we can help arrange this if you don't have one yet)",
];

export default function WorkWithUsPage() {
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
              { "@type": "ListItem", position: 2, name: "Work With Us", item: "https://dontcookdontclean.in/work-with-us" },
            ],
          }),
        }}
      />
      <main>
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/work-with-us/join-us.avif')" }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 text-secondary mb-4">
              Want to Work With Us?
            </h1>
            <p className="body text-white/80 max-w-2xl mx-auto mb-8">
              Join a platform that keeps your pay on time, gives you real proof
              of employment, and connects you with families who actually want
              to hire — not just word of mouth.
            </p>
            <Link href="/work-with-us/apply" className="btn-primary">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>WHY JOIN US</SectionLabel>
            <h2 className="h2 text-text-primary mb-4">What You Get With Don&apos;t Cook Don&apos;t Clean</h2>
            <p className="body text-text-secondary">
              A platform built to treat domestic helpers fairly — here&apos;s what
              makes it different.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-8 items-center">
              {/* Left column */}
              <div className="space-y-12 flex flex-col items-center md:items-end">
                <BenefitItem {...benefits[0]} align="right" />
                <BenefitItem {...benefits[1]} align="right" />
              </div>

              {/* Center image */}
              <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)] mx-auto flex-shrink-0">
                <Image
                  src="/images/work-with-us/why-join-us.avif"
                  alt="Verified helper working with Don't Cook Don't Clean"
                  fill
                  className="object-cover"
                  sizes="260px"
                />
              </div>

              {/* Right column */}
              <div className="space-y-12 flex flex-col items-center md:items-start">
                <BenefitItem {...benefits[2]} align="left" />
                <BenefitItem {...benefits[3]} align="left" />
              </div>
            </div>

            {/* Connector line down to the bottom benefit */}
            <div className="hidden md:flex justify-center">
              <svg width="2" height="72" viewBox="0 0 2 72" className="flex-shrink-0">
                <line x1="1" y1="0" x2="1" y2="72" stroke="#3ca200" strokeWidth="2" strokeDasharray="6 6" />
              </svg>
            </div>

            {/* Bottom item */}
            <div className="flex justify-center mt-8 md:mt-2">
              <BenefitItem {...benefits[4]} align="bottom" />
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/work-with-us/apply" className="btn-primary">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>HOW IT WORKS</SectionLabel>
            <h2 className="h2 text-text-primary">Your Onboarding Journey</h2>
            <p className="body text-text-secondary mt-4">
              From application to your first placement, here&apos;s exactly what happens.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting wavy line */}
            <div className="absolute left-1/2 top-12 bottom-0 w-full max-w-[340px] -translate-x-1/2 hidden md:block pointer-events-none z-0">
              <svg width="100%" height="100%" viewBox="0 0 340 1360" preserveAspectRatio="none">
                <path
                  d="M 170 0 C 330 130, 330 170, 170 300 C 10 430, 10 470, 170 600 C 330 730, 330 770, 170 900 C 10 1030, 10 1070, 170 1200 C 270 1260, 240 1300, 170 1360"
                  fill="none"
                  stroke="#3ca200"
                  strokeWidth="2.5"
                  strokeDasharray="8 8"
                />
              </svg>
            </div>

            {/* Steps */}
            <div className="space-y-12 md:space-y-24 relative z-10">
              {processSteps.map((step, idx) => (
                <div
                  key={step.title}
                  className={`flex flex-col items-center justify-between w-full ${
                    idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div className="hidden md:block w-[44%]" />

                  <div className="w-full md:w-[44%] flex flex-col items-center text-center">
                    <div className="relative mb-4 flex-shrink-0">
                      <div className="bg-[#e9f6d4] p-5 rounded-[28px] inline-block">
                        <Image
                          src={step.icon}
                          alt={step.title}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 27 35">
                          <path d="m13.3 4.7 2.5 10.42 7.08 2.5-7.09 2.28-2.48 10.4-2.5-10.41-6.86-2.28 6.86-2.48 2.5-10.43Z" fill="#3ca200" stroke="#fff" strokeWidth="2"/>
                        </svg>
                      </div>
                    </div>

                    <div className="max-w-[280px] md:max-w-[320px]">
                      <h5 className="h4 text-text-primary mb-2">
                        {idx + 1}. {step.title}
                      </h5>
                      <p className="body text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16 md:mt-24 relative z-20">
              <Link href="/work-with-us/apply" className="btn-primary">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>BE PREPARED</SectionLabel>
              <h2 className="h2 text-text-primary mb-4">Documents You&apos;ll Need</h2>
              <p className="body text-text-secondary mb-6">
                You don&apos;t need everything ready on day one — our team will guide
                you through this after your initial application. It helps to have
                these ready when you can:
              </p>
              <ul className="space-y-3">
                {documentsNeeded.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="body text-text-secondary">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-[24px] overflow-hidden h-[320px] md:h-[420px]">
              <Image
                src="/images/work-with-us/documents.avif"
                alt="Documents required to join as a helper"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/images/work-with-us/cta-join-us.avif')" }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 container py-20 md:py-28 text-center">
          <h2 className="h2 text-secondary mb-4">Ready to Get Started?</h2>
          <p className="body text-white/80 max-w-xl mx-auto mb-8">
            Apply in minutes. Our team will call or WhatsApp you within 24-48 hours
            to take things forward.
          </p>
          <Link href="/work-with-us/apply" className="btn-primary">
            Apply Now
          </Link>
          <p className="small-text text-white/70 mt-6">
            Prefer to talk first? Call or WhatsApp us at{" "}
            <a href="tel:+918877194682" className="font-semibold text-secondary hover:underline">
              +91-88771-94682
            </a>
          </p>
        </div>
      </section>
      </main>
    </>
  );
}
