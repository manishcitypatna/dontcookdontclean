"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { reviews } from "@/data/reviews";

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === reviews.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full -mt-1">
      <div className="relative bg-background w-full ">
        
        {/* Google Rating Badge */}
        <div className="absolute left-1/2 -top-40 -translate-x-1/2 z-20">
          <div className="bg-primary rounded-[28px] px-7 py-5 min-w-[290px] text-center">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-3">
              <Image
                src="/images/google_icon.avif"
                alt="Google"
                width={16}
                height={16}
                className="object-contain"
              />

              <span className="text-secondary text-[13px] tracking-wide">
                ★★★★★
              </span>
            </div>

            <h4 className="h4 text-white mb-2">
              4.8 Rating
            </h4>

            <p className="small-text text-white/80">
              Based on verified customer reviews
            </p>
          </div>
        </div>

        
        <div className="container pt-40">
          {/* Cards */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="
                    bg-white
                    rounded-[24px]
                    p-8
                    shrink-0
                    w-[85%]
                    md:w-[46%]
                    lg:w-[31.8%]
                    min-h-[300px]
                    border
                    border-border
                    flex
                    flex-col
                    shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                  "
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={52}
                      height={52}
                      className="rounded-full w-auto h-auto"
                    />

                    <div>
                      <h4 className="h4 text-text-primary leading-none">
                        {review.name}, {review.location}
                      </h4>

                      <p className="small-text text-text-secondary mt-1">
                        {review.reviewAge}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-secondary text-[16px]">
                          {"★".repeat(Math.floor(review.rating))}
                        </span>

                        <span className="small-text text-text-secondary">
                          {review.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review */}
                  <div className="flex-grow">
                    <p className="body text-text-secondary">
                      {review.review}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10 pb-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to review ${index + 1}`}
                className={`transition-all rounded-full ${
                  currentIndex === index
                    ? "w-8 h-2 bg-primary"
                    : "w-3 h-3 bg-primary/25"
                }`}
              />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
