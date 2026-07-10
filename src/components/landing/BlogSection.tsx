"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/data/blog/types";
import SectionLabel from "@/components/shared/SectionLabel";

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= maxScroll - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges, blogs.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = 24; // gap-6
    el.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="section bg-white overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-center gap-14">
          {/* Left Content */}
          <div className="lg:w-[28%]">
            <SectionLabel>FROM OUR BLOG</SectionLabel>

            <h2 className="h2 text-text-primary mb-10">
              Maid & Cook Help for Patna Families
            </h2>

            <Link href="/blog" className="btn-primary">
              More Tips
            </Link>
          </div>

          {/* Right Content */}
          <div className="lg:w-[72%]">
            <div
              ref={scrollerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar overscroll-x-contain pr-2 pb-1"
            >
              {blogs.map((blog) => (
                <div
                  key={blog.slug}
                  className="
                    shrink-0
                    snap-start
                    w-[88vw]
                    md:w-[calc(50%-12px)]
                  "
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={() => scrollByCard(-1)}
                disabled={atStart}
                className="
                  w-12 h-12
                  rounded-full
                  bg-white
                  shadow-md
                  flex items-center justify-center
                  transition
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() => scrollByCard(1)}
                disabled={atEnd}
                className="
                  w-12 h-12
                  rounded-full
                  bg-white
                  shadow-md
                  flex items-center justify-center
                  transition
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface BlogCardProps {
  blog: BlogPost;
}

function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <article
        className="
          bg-white
          rounded-[24px]
          overflow-hidden
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
          hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
          hover:-translate-y-1
          transition-all
          duration-300
        "
      >
        <div className="relative w-full h-[260px] md:h-[300px]">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="px-6 md:px-7 pt-5 pb-2">
          <p className="small-text uppercase tracking-[0.14em] text-primary mb-4">
            {blog.category}
          </p>

          <h3 className="h3 text-text-primary">
            {blog.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}
