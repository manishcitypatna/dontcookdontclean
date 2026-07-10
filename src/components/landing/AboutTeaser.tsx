"use client";
import Image from "next/image";
import { useState } from "react";
import SectionLabel from "@/components/shared/SectionLabel";

export default function AboutTeaser() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const accordionItems = [
    {
      title: "Verified & Experienced Maids",
      content: "Our professional maids bring years of experience and a friendly attitude to every job. Trained to deliver top-quality service, they go above and beyond to make your home life easier.",
    },
    {
      title: "ID-Verified Domestic Helpers",
      content: "We understand that letting someone into your home requires trust. That's why all our domestic helpers are carefully vetted, ID-verified, and background-checked to ensure reliability and professionalism.",
    },
  ];

  return (
    <section id="about" className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <SectionLabel>WHO WE ARE</SectionLabel>
            <h2 className="h2 text-text-primary">
              Bringing Reliable Domestic Help to Every Home
            </h2>
            <p className="body text-text-secondary">
              At Don&apos;t Cook Don&apos;t Clean, we connect families with trusted household helpers who make everyday life easier. From cooking meals and cleaning your home to caring for children, seniors, and pets, our mission is to provide dependable support that gives you more time for what matters most.
            </p>

            {/* Accordion */}
            <div className="space-y-4">
              {accordionItems.map((item, index) => (
                <div key={index} className="border border-border rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex justify-between items-center p-6 text-left"
                    aria-expanded={openIndex === index}
                  >
                    <span className="h4 text-text-primary">
                      {item.title}
                    </span>
                    <span className="text-xl font-bold">
                      {openIndex === index ? "-" : "+"}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="body text-text-secondary pt-2">
                        {item.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Photo Collage */}
          <div className="grid grid-cols-2 gap-4 h-[420px] md:h-[500px]">
            <div className="relative row-span-2 rounded-[24px] overflow-hidden">
              <Image
                src="/images/home/who-we-are.avif"
                alt="Domestic helper working"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative rounded-[24px] overflow-hidden">
              <Image
                src="/images/home/why-us.avif"
                alt="Trusted domestic helper caring for a household"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative rounded-[24px] overflow-hidden">
              <Image
                src="/images/home/young-girl-cooking.avif"
                alt="Helper preparing a meal for the household"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
