"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { blogs, BlogPost } from "@/data/blog/blogs";
import SectionLabel from "./SectionLabel";

export default function BlogSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else {
        setVisibleCards(2);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const maxIndex = Math.max(0, blogs.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <section className="section bg-white overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-center gap-14">
          {/* Left Content */}
          <div className="lg:w-[28%]">
            <SectionLabel>FROM OUR BLOG</SectionLabel>

            <h2 className="h2 text-text-primary mb-10">
              Cleaning Tips & Hacks
            </h2>

            <button className="btn-primary">
              More Tips
            </button>
          </div>

          {/* Right Content */}
          <div className="lg:w-[72%]">
            <div className="overflow-hidden pr-2">
              <div
                ref={trackRef}
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${
                    currentIndex *
                    (visibleCards === 2 ? 50 : 88)
                  }%)`,
                }}
              >
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="
                      shrink-0
                      w-[88vw]
                      md:w-[calc(50%-12px)]
                    "
                  >
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
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
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
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
  );
}