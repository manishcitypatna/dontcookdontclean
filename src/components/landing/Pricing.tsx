import Image from "next/image";
import SectionLabel from "@/components/shared/SectionLabel";

const plans = [
  {
    icon: "/images/shared/icon/part-time.avif",
    title: "Part-Time Maid",
    subtitle: "1–2 hours / day",
    price: "₹2,500",
    highlighted: false,
    features: [
      "Cooking or cleaning (choose one)",
      "6 days/week service",
      "Ideal for small families",
      "Replacement support included",
    ],
  },
  {
    icon: "/images/shared/icon/full-time.avif",
    title: "Full-Time Maid",
    subtitle: "8–10 hours / day",
    price: "₹7,500",
    highlighted: true,
    features: [
      "Cooking + cleaning + laundry",
      "6 days/week service",
      "Great for families with kids or elders",
      "Replacement support included",
    ],
  },
  {
    icon: "/images/shared/icon/live-in.avif",
    title: "Live-In Maid",
    subtitle: "24-hour availability",
    price: "₹12,000",
    highlighted: false,
    features: [
      "Full household management",
      "Live-in accommodation required",
      "Best for elder care or large households",
      "Replacement support included",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>PRICING</SectionLabel>
          <h2 className="h2 text-text-primary mb-4">
            Simple Plans, Simple Pricing
          </h2>
          <p className="body text-text-secondary">
            Transparent starting prices for every household need — share your
            requirements and we&apos;ll give you an exact quote in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col rounded-[24px] p-8 bg-white ${
                plan.highlighted
                  ? "border-2 border-primary shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:-translate-y-3"
                  : "border border-border"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white small-text font-semibold px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="w-14 h-14 rounded-2xl bg-[#e8f5d3] flex items-center justify-center mb-6">
                <Image
                  src={plan.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
              </div>

              <h4 className="h4 text-text-primary mb-1">{plan.title}</h4>
              <p className="small-text text-text-secondary mb-6">
                {plan.subtitle}
              </p>

              <div className="mb-6">
                <p className="small-text text-text-secondary mb-1">Starting from</p>
                <span className="text-3xl font-bold text-primary">
                  {plan.price}
                </span>
                <span className="body text-text-secondary">/month</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <span className="text-primary text-lg leading-none mt-0.5">✓</span>
                    <span className="body text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#lead-form"
                className={plan.highlighted ? "btn-primary w-full" : "btn-outline w-full"}
              >
                Get Custom Quote
              </a>
            </div>
          ))}
        </div>

        <p className="small-text text-text-secondary text-center max-w-2xl mx-auto mt-10">
          *Final pricing depends on specific tasks, working hours, and
          locality. Talk to our team for an exact quote tailored to your
          household.
        </p>
      </div>
    </section>
  );
}
