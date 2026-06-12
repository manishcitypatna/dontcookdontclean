import SectionLabel from "./SectionLabel";

export default function Process() {
  const plans = [
    {
      title: "Part-Time Maid",
      subtitle: "Flexible Household Assistance",
      gradient: "linear-gradient(180deg, #f2d701 0%, #e9f6d4 100%)",
    },
    {
      title: "Full-Time Maid",
      subtitle: "Daily Household Support",
      gradient: "linear-gradient(180deg, #f2d701 0%, #e9f6d4 100%)",
    },
    {
      title: "Live-In Maid",
      subtitle: "Dedicated Full-Time Help",
      gradient: "linear-gradient(180deg, #f2d701 0%, #e9f6d4 100%)",
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Tell Us Your Requirements",
      description: "Share your household needs, preferred schedule, and the type of assistance you're looking for.",
      icon: "/images/requirements.png",
      align: "right"
    },
    {
      number: "2",
      title: "Get Matched with Helpers",
      description: "We'll recommend suitable verified maids based on your requirements.",
      icon: "/images/matched.png",
      align: "left"
    },
    {
      number: "3",
      title: "Start Receiving Support",
      description: "Choose your preferred helper and enjoy reliable household assistance with ongoing support from our team.",
      icon: "/images/support.png",
      align: "right"
    }
  ];

  return (
    <section className="section bg-background">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <SectionLabel>OUR PROCESS</SectionLabel>
          <h2 className="h2 text-text-primary">
            What to Expect From Don't Cook Don't Clean
          </h2>
        </div>
        
        {/* Grid Container for top cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24 items-stretch">
          {plans.map((plan, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              
              {/* Checkmark Circle Badge */}
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#3ca200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* Box Element */}
              <div 
                className="w-full flex-1 flex flex-col justify-center items-center text-center py-10 px-8 relative"
                style={{
                  background: plan.gradient,
                  borderRadius: "24px",
                }}
              >
                {/* Header Subtitle text */}
                <span className="body text-text-secondary mb-2 block">
                  {plan.title}
                </span>
                
                {/* Main Action Text */}
                <h4 className="h4 text-text-primary max-w-[210px]">
                  {plan.subtitle}
                </h4>

                {/* Bottom Notch Arrow Shape */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: "14px solid transparent",
                    borderRight: "14px solid transparent",
                    borderTop: "12px solid #e9f6d4",
                    transform: "translate(-50%, 100%)",
                    zIndex: "10"
                  }}
                />
              </div>

            </div>
          ))}
        </div>

        {/* How It Works Header Section */}
        <div className="text-center mb-12">
          <h3 className="h3 text-text-primary">
            How It Works
          </h3>
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
                      <img src={step.icon} alt={step.title} className="w-12 h-12 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(37%) sepia(95%) saturate(1311%) hue-rotate(90deg) brightness(99%) contrast(101%)' }} />
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
            <button className="btn-primary">
              Hire a Maid
            </button>
          </div>

        </div>
        
      </div>
    </section>
  );
}