import SectionLabel from "./SectionLabel";
import Image from "next/image";

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
      icon: "/images/maid_service.png"
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
      icon: "/images/child_elder_care.png"
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
      icon: "/images/specialized_assistance.png"
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
                <Image src={service.icon} alt={service.title} width={48} height={48} className="w-12 h-12 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(37%) sepia(95%) saturate(1311%) hue-rotate(90deg) brightness(99%) contrast(101%)' }} />
              </div>
              <h4 className="h4 text-text-primary mb-4">{service.title}</h4>
              <ul className="space-y-2">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-primary text-lg">✓</span>
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
            <button className="btn-primary w-full">
              Get Price
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
