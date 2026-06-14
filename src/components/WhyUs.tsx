"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "./SectionLabel";

export default function WhyUs() {
  const benefits = [
    "Background & ID Verification",
    "Replacement Support",
    "Friendly and Reliable Helpers",
    "Flexible Service Plans",
    "Dedicated Customer Care",
    "Household-Specific Matching",
  ];

  const { scrollY } = useScroll();

  const leaf1Y = useTransform(scrollY, [0, 1200], [0, 35]);
  const leaf2Y = useTransform(scrollY, [0, 1200], [0, 60]);
  const leaf3Y = useTransform(scrollY, [0, 1200], [0, 45]);

  return (
    <section className="section overflow-hidden bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-14 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <SectionLabel>WHY US</SectionLabel>

            <h2 className="h2 text-text-primary mb-8">
              The Don&apos;t Cook Don&apos;t
              <br />
              Clean Difference
            </h2>

            <p className="body text-text-secondary max-w-[420px] mb-10">
              Finding trustworthy domestic help shouldn&apos;t be stressful. We
              carefully verify helpers, understand your requirements, and
              provide ongoing support throughout your service journey.
            </p>

            <div className="max-w-[530px]">
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 py-5 border-b border-border"
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M13.3334 4L6.00002 11.3333L2.66669 8"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <span className="h4 text-text-primary">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Leaf 1 */}
            <motion.div
              style={{ y: leaf1Y }}
              className="absolute -top-6 left-2 z-20"
            >
              <Image
                src="/images/growth-close-up-environmental-lush-natural.png"
                alt=""
                width={55}
                height={55}
                className="w-[55px] h-auto w-auto"
              />
            </motion.div>

            {/* Leaf 2 */}
            <motion.div
              style={{ y: leaf2Y }}
              className="absolute top-12 -left-14 z-20"
            >
              <Image
                src="/images/growth-close-up-environmental-lush-natural-copy.png"
                alt=""
                width={95}
                height={95}
                className="w-[95px] h-auto w-auto"
              />
            </motion.div>

            {/* Leaf 3 */}
            <motion.div
              style={{ y: leaf3Y }}
              className="absolute top-28 -left-6 z-20"
            >
              <Image
                src="/images/growth-close-up-environmental-lush-natural-copy-2.png"
                alt=""
                width={70}
                height={70}
                className="w-[70px] h-auto w-auto"
              />
            </motion.div>

            {/* Main Image */}
            <div className="relative w-full h-[420px] md:h-[560px] lg:h-[650px] overflow-hidden rounded-[24px]">
              <Image
                src="/images/why_us.png"
                alt="Trusted Domestic Helpers"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
