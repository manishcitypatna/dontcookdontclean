"use client";

import { useState } from "react";
import { faqs as globalFaqs } from "@/data/faqs";
import SectionLabel from "@/components/shared/SectionLabel";

export default function FaqSection({
  faqs = globalFaqs,
  showHeading = true,
  showSectionLabel = true,
}: {
  faqs?: { question: string; answer: string }[];
  showHeading?: boolean;
  showSectionLabel?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const leftColumn = faqs.slice(0, Math.ceil(faqs.length / 2));
  const rightColumn = faqs.slice(Math.ceil(faqs.length / 2));

  const FaqCard = ({
    index,
    question,
    answer,
  }: {
    index: number;
    question: string;
    answer: string;
  }) => {
    const isOpen = openIndex === index;

    return (
      <div
        className="
          bg-white
          border
          border-border
          rounded-[24px]
          overflow-hidden
          transition-all
          duration-300
        "
      >
        <button
          onClick={() => toggleFaq(index)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          className="
            w-full
            flex
            items-center
            justify-between
            text-left
            px-6
            md:px-8
            py-6
          "
        >
          <span className="h4 text-text-primary pr-6">
            {question}
          </span>

          <span
            className="
              flex
              items-center
              justify-center
              w-10
              h-10
              rounded-full
              bg-[#F4F3EE]
              text-[28px]
              leading-none
              shrink-0
            "
          >
            {isOpen ? "−" : "+"}
          </span>
        </button>

        <div
          className={`
            grid transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }
          `}
        >
          <div className="overflow-hidden" id={`faq-answer-${index}`}>
            <div className="px-6 md:px-8 pb-6 text-text-secondary leading-relaxed">
              {answer}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="section bg-background">
      <div className="container">
        
        {/* Label */}
        {showSectionLabel && (
          <div className="text-center mb-4">
            <SectionLabel>FAQ</SectionLabel>
          </div>
        )}

        {/* Heading */}
        {showHeading && (
          <h2 className="h2 text-text-primary text-center mb-16">
            Frequently Asked Questions
          </h2>
        )}

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-5">
            {leftColumn.map((faq, idx) => (
              <FaqCard key={idx} index={idx} {...faq} />
            ))}
          </div>

          <div className="space-y-5">
            {rightColumn.map((faq, idx) => (
              <FaqCard key={leftColumn.length + idx} index={leftColumn.length + idx} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
