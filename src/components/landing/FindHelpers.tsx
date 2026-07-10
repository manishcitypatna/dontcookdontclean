"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SectionLabel from "@/components/shared/SectionLabel";
import SearchableDropdown from "@/components/shared/SearchableDropdown";
import { LOCALITY_OPTIONS } from "@/data/localities";
import { MOCK_WORKERS } from "@/data/workers";
import WorkerScrollCard from "@/components/landing/WorkerScrollCard";

export default function FindHelpers() {
  const router = useRouter();
  const [locality, setLocality] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleFindHelpers = () => {
    if (locality && locality !== "Other") {
      router.push(`/workers?locality=${encodeURIComponent(locality)}`);
    } else {
      router.push("/workers");
    }
  };

  const pauseAutoScroll = () => {
    pausedRef.current = true;
    clearTimeout(resumeTimeoutRef.current);
    scrollerRef.current?.classList.add("snap-x", "snap-mandatory");
  };
  const resumeAutoScrollAfter = (delay: number) => {
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
      scrollerRef.current?.classList.remove("snap-x", "snap-mandatory");
    }, delay);
  };

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    pauseAutoScroll();
    el.scrollBy({ left: direction * 280, behavior: "smooth" });
    resumeAutoScrollAfter(2500);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let frameId: number;

    const step = () => {
      if (!pausedRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          if (el.scrollLeft >= maxScroll - 1) {
            pauseAutoScroll();
            resumeAutoScrollAfter(1500);
            el.scrollLeft = 0;
          } else {
            el.scrollLeft += 0.6;
          }
        }
      }
      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);

    const onEnter = () => pauseAutoScroll();
    const onLeave = () => resumeAutoScrollAfter(0);
    const onTouchStart = () => pauseAutoScroll();
    const onTouchEnd = () => resumeAutoScrollAfter(2500);
    const onPointerDown = () => pauseAutoScroll();
    const onPointerUp = () => resumeAutoScrollAfter(2500);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resumeTimeoutRef.current);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <section className="section bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionLabel>FIND A HELPER</SectionLabel>
          <h2 className="h2 text-text-primary mb-4">
            Find Verified Helpers Near You
          </h2>
          <p className="body text-text-secondary">
            Select your locality to see available helpers in your area.
          </p>
        </div>

        {/* Locality search bar */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-3 flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <SearchableDropdown
                id="find-helpers-locality"
                name="locality"
                options={LOCALITY_OPTIONS}
                value={locality}
                onChange={setLocality}
                placeholder="Select Your Locality"
              />
            </div>
            <button onClick={handleFindHelpers} className="btn-primary sm:w-auto w-full">
              Find Helpers
            </button>
          </div>
        </div>

        {/* Worker cards carousel */}
        <div className="relative mb-4">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll left"
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-border shadow-[0_10px_30px_rgba(0,0,0,0.12)] items-center justify-center text-text-primary text-2xl leading-none hover:bg-secondary/20 transition-colors"
          >
            ‹
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto hide-scrollbar overscroll-x-contain pb-2"
          >
            {MOCK_WORKERS.map((worker) => (
              <WorkerScrollCard key={worker.workerId} worker={worker} />
            ))}

            {/* 16th card: CTA to view the full directory */}
            <Link
              href="/workers"
              className="snap-start shrink-0 w-[240px] bg-primary rounded-[24px] flex flex-col items-center justify-center text-center gap-3 p-6 text-white hover:scale-[1.02] transition-transform"
            >
              <span className="text-4xl">→</span>
              <span className="h4 text-white text-[1.05rem]">
                Click for more worker details
              </span>
              <span className="small-text text-white/85">
                View all verified helpers
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll right"
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-border shadow-[0_10px_30px_rgba(0,0,0,0.12)] items-center justify-center text-text-primary text-2xl leading-none hover:bg-secondary/20 transition-colors"
          >
            ›
          </button>
        </div>

        <p className="small-text text-text-secondary text-center max-w-xl mx-auto mb-8">
          Scroll to browse helpers, or select your locality above to see who&apos;s available near you.
        </p>

        <div className="text-center">
          <button onClick={handleFindHelpers} className="btn-outline">
            View More Helpers
          </button>
        </div>
      </div>
    </section>
  );
}
