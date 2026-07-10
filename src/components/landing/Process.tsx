import Link from "next/link";
import SectionLabel from "@/components/shared/SectionLabel";

export default function Process() {
  const steps = [
    {
      number: "1",
      title: "Tell Us Your Requirements",
      description: "Share your household needs, preferred schedule, and the type of assistance you're looking for.",
      icon: "/images/home/requirements.avif",
      align: "right"
    },
    {
      number: "2",
      title: "Get Matched with Helpers",
      description: "We'll recommend suitable verified maids based on your requirements.",
      icon: "/images/home/matched.avif",
      align: "left"
    },
    {
      number: "3",
      title: "Start Receiving Support",
      description: "Choose your preferred helper and enjoy reliable household assistance with ongoing support from our team.",
      icon: "/images/home/support.avif",
      align: "right"
    }
  ];

  return (
    <section className="section bg-background">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionLabel>OUR PROCESS</SectionLabel>
          <h2 className="h2 text-text-primary">
              How It Works
            </h2>
        </div>
        
        {/* Step-by-Step Layout Tracks with Integrated Bottom CTA Button */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Extended Background Line - Connects Steps and endpoints exactly into the CTA Button area */}
          <div className="absolute left-1/2 top-12 bottom-0 w-full max-w-[340px] -translate-x-1/2 hidden md:block pointer-events-none z-0">
            <svg width="100%" height="100%" viewBox="0 0 340 760" preserveAspectRatio="none">
              <path 
                d="M 170 0 C 330 130, 330 170, 170 300 C 10 430, 10 470, 170 600 C 270 660, 240 700, 170 760" 
                fill="none" 
                stroke="#3ca200" 
                strokeWidth="2.5" 
                strokeDasharray="8 8"
              />
            </svg>
          </div>
          
          {/* Step Timeline Render List */}
          <div className="space-y-12 md:space-y-24 relative z-10">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center justify-between w-full ${
                  step.align === "left" ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Structural desktop offset layout */}
                <div className="hidden md:block w-[44%]" />
                
                {/* Step Block Wrapper */}
                <div className="w-full md:w-[44%] flex flex-col items-center text-center">
                  
                  {/* Icon Block with Sparkle Element */}
                  <div className="relative mb-4 flex-shrink-0">
                    <div className="bg-[#e9f6d4] p-5 rounded-[28px] inline-block">
                      <span
                        role="img"
                        aria-label={step.title}
                        className="block w-12 h-12"
                        style={{
                          backgroundColor: "var(--primary)",
                          WebkitMaskImage: `url(${step.icon})`,
                          maskImage: `url(${step.icon})`,
                          WebkitMaskSize: "contain",
                          maskSize: "contain",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          maskPosition: "center",
                        }}
                      />
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 27 35">
                        <path d="m13.3 4.7 2.5 10.42 7.08 2.5-7.09 2.28-2.48 10.4-2.5-10.41-6.86-2.28 6.86-2.48 2.5-10.43Z" fill="#3ca200" stroke="#fff" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Step Descriptive Texts Container */}
                  <div className="max-w-[280px] md:max-w-[320px]">
                    <h5 className="h4 text-text-primary mb-2">
                      {step.number}. {step.title}
                    </h5>
                    <p className="body text-text-secondary">
                      {step.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Connected Bottom Call to Action Button inside the context timeline */}
          <div className="text-center mt-16 md:mt-24 relative z-20">
            <Link href="/workers" className="btn-primary">
              Hire a Maid
            </Link>
          </div>

        </div>
        
      </div>
    </section>
  );
}