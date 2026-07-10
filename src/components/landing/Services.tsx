import SectionLabel from "@/components/shared/SectionLabel";
import Image from "next/image";

const ITEM_ICONS: Record<string, string> = {
  "House Cleaning": "/images/shared/icon/cleaning.avif",
  "Cooking Assistance": "/images/shared/icon/cooking.avif",
  "Clothes Washing": "/images/shared/icon/laundry.avif",
  "Kitchen Maintenance": "/images/shared/icon/dishes.avif",
  "Babysitting Services": "/images/shared/icon/babysitting.avif",
  "Child Supervision": "/images/shared/icon/family.avif",
  "Elderly Assistance": "/images/shared/icon/elderly.avif",
  "Companion Care": "/images/shared/icon/elderly.avif",
  "Full-Time Maids": "/images/shared/icon/full-time.avif",
  "Part-Time Maids": "/images/shared/icon/part-time.avif",
  "Live-In Helpers": "/images/shared/icon/live-in.avif",
  "Pet Walking": "/images/shared/icon/dog-walker.avif",
};

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Maid Services",
      items: [
        "House Cleaning",
        "Cooking Assistance",
        "Clothes Washing",
        "Kitchen Maintenance"
      ],
      bg: "#FFFFFF",
      icon: "/images/home/maid-service.avif"
    },
    {
      id: 2,
      title: "Child & Elder Care",
      items: [
        "Babysitting Services",
        "Child Supervision",
        "Elderly Assistance",
        "Companion Care"
      ],
      bg: "#FFFFFF",
      icon: "/images/home/child-elder-care.avif"
    },
    {
      id: 3,
      title: "Specialized Assistance",
      items: [
        "Full-Time Maids",
        "Part-Time Maids",
        "Live-In Helpers",
        "Pet Walking"
      ],
      bg: "#FFFFFF",
      icon: "/images/home/specialized-assistance.avif"
    }
  ]

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <SectionLabel>SERVICES</SectionLabel>
          <h2 className="h2 text-text-primary">Household Services for Every Family</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(service => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-[24px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-shadow border border-border"
              style={{ backgroundColor: service.bg }}
            >
              <div className="w-20 h-20 rounded-[24px] bg-[#e8f5d3] flex items-center justify-center mb-6">
                <span
                  role="img"
                  aria-label={service.title}
                  className="block w-12 h-12"
                  style={{
                    backgroundColor: "var(--primary)",
                    WebkitMaskImage: `url(${service.icon})`,
                    maskImage: `url(${service.icon})`,
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />
              </div>
              <h4 className="h4 text-text-primary mb-4">{service.title}</h4>
              <ul className="space-y-3">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    {ITEM_ICONS[item] ? (
                      <Image
                        src={ITEM_ICONS[item]}
                        alt=""
                        width={18}
                        height={18}
                        className="w-[18px] h-[18px] object-contain flex-shrink-0"
                      />
                    ) : (
                      <span className="text-primary text-lg">✓</span>
                    )}
                    <span className="body text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Trust Card */}
          <div className="p-8 rounded-[24px] border-2 border-primary bg-gradient-to-br from-green-50 to-[#e8f5d3]">
            <h4 className="h3 text-primary mb-6 text-center">
              100% Satisfaction Guarantee
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-primary text-lg">✓</span>
                <span className="body text-text-secondary">No contracts or commitments</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary text-lg">✓</span>
                <span className="body text-text-secondary">Easy last-minute bookings</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary text-lg">✓</span>
                <span className="body text-text-secondary">Secure online payments</span>
              </li>
            </ul>
            <a href="#pricing" className="btn-primary w-full block text-center">
              Get Price
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
