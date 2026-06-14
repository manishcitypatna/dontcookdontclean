"use client";
import Image from "next/image";
import { useState } from "react";
import SectionLabel from "./SectionLabel";

export default function About() {
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
    <section className="section bg-white">
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

          {/* Image */}
          <div className="rounded-[24px] overflow-hidden">
            <Image
              src="/images/who-we-are.png"
              alt="Domestic helper working"
              width={1024}
              height={814}
              className="w-full h-auto rounded-[24px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
