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
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="57" viewBox="0 0 46 57">
          <path d="M23 28.5c-12.67 0-23 10.16-23 22.67v5.83h46v-5.83c0-12.51-10.33-22.67-23-22.67zm0-5.67c4.34 0 7.87-3.53 7.87-7.87 0-4.34-3.53-7.87-7.87-7.87s-7.87 3.53-7.87 7.87c0 4.34 3.53 7.87 7.87 7.87z" fill="#fff"/>
          <path d="M23 28.5c-12.67 0-23 10.16-23 22.67v5.83h46v-5.83c0-12.51-10.33-22.67-23-22.67zm0-5.67c4.34 0 7.87-3.53 7.87-7.87 0-4.34-3.53-7.87-7.87-7.87s-7.87 3.53-7.87 7.87c0 4.34 3.53 7.87 7.87 7.87z" fill="none" stroke="#000" strokeWidth=".3"/>
          <rect x="5" y="39.7" width="36" height="8.3" rx="1" fill="#5ab691" stroke="#000" strokeWidth=".3"/>
          <path d="M9 46.7h28M9 51h22" stroke="#000" strokeLinecap="round" strokeWidth=".3"/>
          <circle cx="36.8" cy="21.2" r="8.8" fill="#fff" stroke="#000" strokeWidth=".5"/>
          <path d="M32.3 16.8c.8-.2 1.7-.2 2.5 0 1.1.3 2 .9 2.7 1.7.7.8 1.1 1.8 1.1 2.8 0 1-.4 2-1.1 2.8-.5.6-1.2 1.1-2 1.4-.8.3-1.7.3-2.5 0-1.1-.3-2-.9-2.7-1.7-.7-.8-1.1-1.8-1.1-2.8 0-1 .4-2 1.1-2.8.7-.8 1.6-1.4 2.7-1.7z" fill="#3ca200"/>
        </svg>
      ),
      align: "right"
    },
    {
      number: "2",
      title: "Get Matched with Helpers",
      description: "We'll recommend suitable verified maids based on your requirements.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="49" height="63" viewBox="0 0 49 63">
          <path d="M44.46 58c-9.42 0-43.86-.13-44.2-.13a.22.22 0 0 1-.17-.07.24.24 0 0 1-.07-.17c0-.35.74-35.3-.02-51.39 0-.06.02-.12.06-.17.05-.05.1-.07.17-.07 5.5 0 12.8.03 20.52.07 8.35.04 16.98.08 24.02.08.06 0 .12.03.16.08.05.04.07.1.07.17-.59 10.6-.43 24.48-.3 35.6.08 7.22.14 12.93 0 15.76 0 .07-.02.13-.07.17a.23.23 0 0 1-.17.07Z" fill="#fff"/>
          <path d="M44.46 58.23c-9.52 0-44.3-.13-44.65-.13a.22.22 0 0 1-.17-.07.24.24 0 0 1-.07-.16c0-.36.75-35.38-.02-51.5 0-.06.02-.12.06-.17.05-.04.1-.07.17-.07 5.56 0 12.93.04 20.73.08 8.43.03 17.16.08 24.27.08.06 0 .12.02.16.07.05.05.07.1.07.17-.6 10.62-.43 24.53-.3 35.68.08 7.23.14 12.93 0 15.78a.23.23 0 0 1-.25.24ZM.5 57.63c3.08 0 34.8.13 44.2.14.14-2.9.08-8.5 0-15.54-.13-11.1-.29-24.87.29-35.47-7.07 0-15.68-.05-24.02-.09C13.26 6.64 6 6.6.47 6.6 1.2 22.11.56 54.52.5 57.62v.02Z" fill="#000" fillRule="nonzero"/>
          <path d="M4.06 54.14c-.02 0-.04 0-.05-.02V12.17a.1.1 0 0 1 .05 0l37.7.13c.04 0 .08.03.08.07L42 53.98c0 .05-.04.08-.08.08l-37.84.1-.02-.02ZM4 12.17l.02 42L42 54.06l-.16-41.77L4 12.17Z" stroke="#000" strokeWidth=".3" fill="#5ab691"/>
          <path d="M3.69 19.84c9.28-.67 16.24-1 20.88-1 4.64 0 10.38.33 17.2 1v-8H3.7v8Z" stroke="#000" strokeWidth=".3" fill="#3ca200"/>
          <path d="M22.9.4A3.09 3.09 0 0 1 26 3.57h5l.6 4.6-16.6.6-.6-4.6 5.41-.6A3.1 3.1 0 0 1 22.91.4Z" stroke="#000" strokeWidth=".8" fill="#fff"/>
          <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M9.5 27.67h26M9.5 33.67h22M9.5 39.67h16"/>
          <path d="M37.48 42.7c1.87-.37 4.7-.6 7.04.8 1.6.97 2.95 2.69 3.64 5.63.45 2 .84 5.34-.47 8.13-.87 1.83-2.48 3.41-5.3 4.19-2.78.74-5.17.47-7.06-.43a8.72 8.72 0 0 1-4.47-5.03c-.91-2.63-.85-6 .5-8.72 1.11-2.22 3.1-4 6.12-4.58Z" stroke="#000" strokeWidth=".5" fill="#fff"/>
          <path d="M43.71 47.07c-.47 1.14-1.07 2.27-1.78 3.02-.72.75-1.52 1.01-2.44.79-.92-.22-1.7-.99-2.1-2.12-.39-1.13-.38-2.58.03-4.01.57-2.02 1.87-3.54 3.58-3.87 1.7-.33 3.57.24 4.85 1.43.67.62 1.16 1.41 1.42 2.27.25.86.27 1.78 0 2.65-.26.87-.72 1.65-1.34 2.17-.35.3-.77.48-1.22.48" stroke="#000" strokeWidth=".5" fill="none"/>
        </svg>
      ),
      align: "left"
    },
    {
      number: "3",
      title: "Start Receiving Support",
      description: "Choose your preferred helper and enjoy reliable household assistance with ongoing support from our team.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="79" height="78" viewBox="0 0 79 78">
          <path d="M26.71 14.88C4.7 19.08-.43 42.53 5 58.08c4.4 12.62 18.02 23.06 37.71 17.8 23.26-6.3 21.48-29.24 19-40-5.6-23.68-24.68-22.97-35-21Z" fill="#fff"/>
          <path d="M26.71 14.88c10.32-1.97 29.4-2.68 35 21 2.48 10.76 4.26 33.7-19 40C23.01 81.14 9.41 70.7 5 58.08c-5.43-15.55-.31-39 21.71-43.2Zm.1.5C16.7 17.3 9.63 23.45 6.02 32.42a37.42 37.42 0 0 0-.55 25.5c24.71 14.2 19.48 22.18 37.11 17.48 10.36-2.8 16.37-9.09 18.8-17.98 1.81-6.62 1.5-14.2-.16-21.42-2.5-10.61-7.86-16.94-15.41-19.77-5.67-2.13-12.1-2.18-19-.85Z" fill="#000" fillRule="nonzero"/>
          <g fillRule="nonzero">
            <path d="M29.5 29.33c-.85 2.68-5.48 6.15-8.19 6.18-2.7.03-3.61-1.27-4.46-3.93-2.58 1.9-4.57 3.87-7.08 4.57A7.64 7.64 0 0 1 .64 30.5c-.87-4 1.91-8.5 5.81-9.35-2.6.37-2.07-2.4-4.71-5.1.34-2.72 2.18-5.01 4.77-5.96 2.45-.95 5.17-.88 7.84-1.03-.76-2.7.79-5.75 3.13-7.23A10.73 10.73 0 0 1 25.43.75a9.58 9.58 0 0 1 4.77 2.33 6.22 6.22 0 0 1 1.84 5.18c2.62-2.75 6.61-4.39 10.12-3.22C45.68 6.21 48 10.8 48 13.81c1.91-1.98 4.39-3.52 7.07-3.14 5.31.76 6.11 5.34 3.18 10.94 1.7-.58 3.57-.4 5.12.5a6.12 6.12 0 0 1 2.97 4.16c.75 3.13-.83 7.9-3.19 10.08-2.36 2.2-10.1 3.58-15.05-.63a14.13 14.13 0 0 1-4.5-8.05c-1.8 2.53-3.12 4.26-7.14 5.2-2.94.67-6.23-.75-6.96-3.54Z" fill="#3ca200"/>
            <path d="M56.1 38.91c-3.02.07-5.96-.93-8.3-2.83a14.08 14.08 0 0 1-4.4-7.3c-1.54 2.4-4.01 4.04-6.83 4.54a6.48 6.48 0 0 1-7.1-2.83c-1.54 2.63-5.55 5.43-8.16 5.46h-.1c-2.67 0-3.75-1.29-4.6-3.65l-1.3 1.01a16.26 16.26 0 0 1-5.41 3.25 7.7 7.7 0 0 1-5.93-.89 8.04 8.04 0 0 1-3.82-5.03 8.7 8.7 0 0 1 4.35-9.24 4.54 4.54 0 0 1-1.45-.94A5.64 5.64 0 0 1 2.27 16c.21-3.07 2.7-5.4 5.07-6.35 2.1-.7 4.3-1.04 6.5-.99h.96a7.45 7.45 0 0 1 3.46-7.19 11.15 11.15 0 0 1 8.3-1.12c1.86.33 3.6 1.17 2.37 2.43a6.7 6.7 0 0 1 2 4.36c2.93-2.57 6.68-3.56 9.78-2.53 3.26 1.08 5.65 4.57 6.08 8.19 2.24-2.03 4.5-2.9 6.73-2.58a5.82 5.82 0 0 1 4.65 2.89c2.56 4.68-1.4 10.46-7.45 10.82Z" fill="#fff"/>
          </g>
        </svg>
      ),
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
                      {step.icon}
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