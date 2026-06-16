import Image from "next/image";
import SectionLabel from "@/components/shared/SectionLabel";

export default function ReviewsHero() {
  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="container pt-16 md:pt-24 pb-40 md:pb-48">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 items-center">
          
          {/* Image Column */}
          <div className="relative">
            <div className="overflow-hidden rounded-[24px]">
              <Image
                src="/images/review_heroNabber.avif"
                alt="Happy family at home after hiring a trusted maid service in Patna"
                width={1024}
                height={631}
                className="w-full h-[360px] md:h-[420px] object-cover"
                loading="eager"
              />
            </div>

            {/* Floating Review Card */}
            <div className="absolute bottom-[-28px] left-[58%] -translate-x-1/2 bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-4 w-[220px]">
              <p className="small-text text-text-primary mb-4">
                Amazing service. The helper was punctual,
                polite and made household management much
                easier for our family.
              </p>

              <div className="flex items-center gap-3">
                <Image
                  src="/images/review/review_female_1.avif"
                  alt="Priya Sharma, customer review"
                  width={34}
                  height={34}
                  className="rounded-full h-auto w-auto"
                />

                <div>
                  <h4 className="small-text uppercase tracking-wide text-text-primary">
                    Priya Sharma, Patna
                  </h4>

                  <p className="small-text text-text-secondary">
                    Customer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="text-white">
            <SectionLabel dark>REVIEWS</SectionLabel>

            <h2 className="h2 text-white mb-8 max-w-[520px]">
              Helping Families Live
              <br />
              More Comfortably
            </h2>

            <p className="body text-white/85 max-w-[480px] mb-10">
              Our mission is to connect households with dependable
              domestic helpers who make everyday life simpler and
              more manageable.
            </p>

            <div className="w-full h-px bg-white/20 mb-8" />

            <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6">
              <div>
                <span className="h4 text-white">
                  ID Verified Staff
                </span>
              </div>

              <div>
                <span className="h4 text-white">
                  Replacement Assistance
                </span>
              </div>

              <div>
                <span className="h4 text-white">
                  Customer Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curved Transition */}
      <div className="absolute bottom-0 left-0 w-full h-20 md:h-24 bg-background rounded-t-[60px]" />
    </section>
  );
}
