import dynamic from "next/dynamic";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Process from "@/components/landing/Process";
import WhyUs from "@/components/landing/WhyUs";
import Reviews from "@/components/landing/ReviewsHero";
import BlogSection from "@/components/landing/BlogSection";
import { getLatestBlogs } from "@/data/blog/blogUtils";

const ReviewsCarousel = dynamic(() => import("@/components/landing/ReviewsCarousel"), { loading: () => null });
const SupportSection = dynamic(() => import("@/components/landing/SupportSection"), { loading: () => null });
const FaqSection = dynamic(() => import("@/components/landing/FaqSection"), { loading: () => null });

export default function Home() {
  const blogs = getLatestBlogs(5);
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <WhyUs />
      <Reviews />
      <ReviewsCarousel />
      <SupportSection />
      <FaqSection />
      <BlogSection blogs={blogs} />
    </>
  );
}
