import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/shared/SectionLabel";

const benefits = [
  {
    icon: "/images/shared/icon/documents.avif",
    title: "Verified & ID-Checked",
    description:
      "Every helper undergoes identity verification and background checks before we recommend them to your family.",
  },
  {
    icon: "/images/shared/icon/service.avif",
    title: "Replacement Support",
    description:
      "Not the right fit? We'll find you a suitable replacement without extra hassle or extra cost.",
  },
  {
    icon: "/images/shared/icon/hourly.avif",
    title: "Flexible Service Plans",
    description:
      "Part-time, full-time, or live-in — choose the plan that matches your household's rhythm.",
  },
  {
    icon: "/images/shared/icon/phone-call.avif",
    title: "Dedicated Customer Care",
    description:
      "Our team stays reachable by call and WhatsApp for support before and after you hire.",
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
  align: "left" | "right";
}) {
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

export default function WhyChooseUs() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>WHY CHOOSE US</SectionLabel>
          <h2 className="h2 text-text-primary mb-4">
            Why Patna Families Choose Don&apos;t Cook Don&apos;t Clean
          </h2>
          <p className="body text-text-secondary">
            We connect households with domestic helpers they can genuinely rely
            on. Here&apos;s what sets our service apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-8 items-center max-w-5xl mx-auto">
          {/* Left column */}
          <div className="space-y-12 flex flex-col items-center md:items-end">
            <BenefitItem {...benefits[0]} align="right" />
            <BenefitItem {...benefits[1]} align="right" />
          </div>

          {/* Center image */}
          <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)] mx-auto flex-shrink-0">
            <Image
              src="/images/home/maid-cooking-daal.avif"
              alt="Trusted domestic helper at work"
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

        <div className="text-center mt-16">
          <Link href="/about" className="btn-primary">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
