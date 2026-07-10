import Image from "next/image";

const badges = [
  {
    icon: "/images/shared/icon/documents.avif",
    label: "Verified & Background-Checked",
  },
  {
    icon: "/images/shared/icon/address.avif",
    label: "Serving Households Across Patna",
  },
  {
    icon: "/images/shared/icon/hourly.avif",
    label: "Part-Time to Live-In Plans",
  },
  {
    icon: "/images/shared/icon/help.avif",
    label: "Dedicated Replacement Support",
  },
];

export default function TrustBand() {
  return (
    <section className="bg-primary py-14 md:py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
                <Image
                  src={badge.icon}
                  alt=""
                  width={26}
                  height={26}
                  className="w-[26px] h-[26px] object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <span className="font-semibold text-white text-sm md:text-base leading-snug">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
