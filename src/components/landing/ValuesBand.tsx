import Image from "next/image";
import SectionLabel from "@/components/shared/SectionLabel";

const values = [
  {
    icon: "/images/shared/icon/family.avif",
    title: "Family-First Care",
    description:
      "We treat every household like our own, matching helpers who genuinely care about your home.",
  },
  {
    icon: "/images/shared/icon/guide.avif",
    title: "Verified & Trustworthy",
    description:
      "Every helper is ID-verified and background-checked before ever stepping into a home.",
  },
  {
    icon: "/images/shared/icon/help.avif",
    title: "Always Ready to Help",
    description:
      "Our support team stays on call for questions, concerns, or replacement requests.",
  },
];

export default function ValuesBand() {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/home/kitchen-apron-shelf.avif')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel dark>WHAT MATTERS MOST</SectionLabel>
          <h2 className="h2 text-secondary">
            Nothing Matters More Than Your Family&apos;s Comfort
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {values.map((value, idx) => (
            <div key={idx} className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-5">
                <Image
                  src={value.icon}
                  alt=""
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <h4 className="h4 text-white mb-2">{value.title}</h4>
              <p className="body text-white/80">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
