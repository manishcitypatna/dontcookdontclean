import Image from "next/image";
import dynamic from "next/dynamic";
// Import LeadForm component from the components directory
import LeadForm from "@/components/forms/LeadForm";

const VideoPlayer = dynamic(() => import("@/components/shared/VideoPlayer"), { loading: () => null });

export default function Hero() {
  return (
    <section className="relative w-full" style={{ borderRadius: "0 0 32px 32px" }}>
      {/* Background Video Section */}
      <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[80vh] overflow-hidden" style={{ borderRadius: "0 0 32px 32px" }}>
        <VideoPlayer />
      </div>

      {/* Lead Form Section - positioned to overlap 30% of video from bottom */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 -mt-[30%] md:-mt-[30vh]">
        <div className="bg-white/80 backdrop-blur-sm rounded-[24px] p-4 md:p-[30px_30px_25px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          {/* Logo at top center */}
          <div className="w-full flex justify-center mb-3">
            <Image
              src="/images/logo.avif"
              alt="Don't Cook Don't Clean"
              width={160}
              height={64}
              priority
              className="h-auto w-auto"
            />
          </div>
          
          <div className="text-center mb-4">
            <h1 className="h1 text-text-primary mb-3">
              Hire Trusted Maids & Cook for Home in Patna — Cleaning, Cooking & Household Care
            </h1>
            <p className="body text-text-secondary">
              Verified cleaning maid services in Patna for cooking, house cleaning, clothes washing, childcare, elder care, and pet assistance — available across Patna with flexible part-time, full-time, and live-in plans.
            </p>
          </div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
