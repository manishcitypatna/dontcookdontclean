"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { reviews } from "@/data/reviews";

export default function ReviewsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const scrollToIndex = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    // Horizontal-only scroll: scrollIntoView would also drag the page
    // vertically since the card isn't yet visible in the viewport.
    const delta = card.getBoundingClientRect().left - scroller.getBoundingClientRect().left;
    scroller.scrollTo({ left: scroller.scrollLeft + delta, behavior: "smooth" });
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev === reviews.length - 1 ? 0 : prev + 1;
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex]);

  const pauseAutoplay = () => {
    pausedRef.current = true;
    clearTimeout(resumeTimeoutRef.current);
  };
  const resumeAutoplayAfter = (delay: number) => {
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  };

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      if (!pausedRef.current) goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  // Keep the dot indicator in sync when the user drags the scroller by hand.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setCurrentIndex(idx);
          }
        });
      },
      { root: el, threshold: [0.6] }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full -mt-1">
      <div className="relative bg-background w-full ">

        {/* Google Rating Badge */}
        <div className="absolute left-1/2 -top-40 -translate-x-1/2 z-20">
          <div className="bg-primary rounded-[28px] px-7 py-5 min-w-[290px] text-center">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-3">
              <Image
                src="/images/home/google-icon.avif"
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
          <div
            ref={scrollerRef}
            onPointerDown={pauseAutoplay}
            onPointerUp={() => resumeAutoplayAfter(3000)}
            onTouchStart={pauseAutoplay}
            onTouchEnd={() => resumeAutoplayAfter(3000)}
            onMouseEnter={pauseAutoplay}
            onMouseLeave={() => resumeAutoplayAfter(0)}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar overscroll-x-contain pb-2"
          >
            {reviews.map((review, index) => (
              <div
                key={review.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="
                  bg-white
                  rounded-[24px]
                  p-8
                  shrink-0
                  snap-start
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

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10 pb-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  pauseAutoplay();
                  setCurrentIndex(index);
                  scrollToIndex(index);
                  resumeAutoplayAfter(4000);
                }}
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
