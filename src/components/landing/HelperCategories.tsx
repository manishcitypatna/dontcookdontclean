import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/shared/SectionLabel";

const categories = [
  {
    icon: "/images/shared/icon/cooking.avif",
    title: "Cook",
    description: "Daily home-style meals prepared fresh in your kitchen.",
  },
  {
    icon: "/images/shared/icon/cleaning.avif",
    title: "House Cleaner",
    description: "Thorough cleaning, sweeping, mopping, and tidying.",
  },
  {
    icon: "/images/shared/icon/babysitting.avif",
    title: "Babysitter / Nanny",
    description: "Caring, attentive support for your children.",
  },
  {
    icon: "/images/shared/icon/elderly.avif",
    title: "Elder Care Companion",
    description: "Compassionate assistance for seniors at home.",
  },
  {
    icon: "/images/shared/icon/live-in.avif",
    title: "Live-In Helper",
    description: "Round-the-clock household support and management.",
  },
  {
    icon: "/images/shared/icon/dog-walker.avif",
    title: "Pet Walker",
    description: "Reliable daily walks and care for your pets.",
  },
];

export default function HelperCategories() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>OUR HELPERS</SectionLabel>
          <h2 className="h2 text-text-primary mb-4">
            Meet the Kind of Help You Can Hire
          </h2>
          <p className="body text-text-secondary">
            Every category of helper is background-checked and ID-verified
            before we recommend them to your family.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="border border-border rounded-[24px] p-6 flex items-start gap-4 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e8f5d3] flex items-center justify-center flex-shrink-0">
                <Image
                  src={category.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <h4 className="h4 text-text-primary text-[1.1rem] mb-1">
                  {category.title}
                </h4>
                <p className="small-text text-text-secondary">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/workers" className="btn-primary">
            View All Verified Helpers
          </Link>
          <a href="#lead-form" className="btn-outline">
            Submit Your Requirement
          </a>
        </div>
      </div>
    </section>
  );
}
