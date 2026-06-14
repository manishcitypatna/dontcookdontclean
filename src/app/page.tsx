import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/ReviewsHero";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import FaqSection from "@/components/FaqSection";
import SupportSection from "@/components/SupportSection";

import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Services />
      <Process />
      <WhyUs />
      <Reviews />
      <ReviewsCarousel />
      <SupportSection />
      <FaqSection />
      {/* BLOG SECTION — Uncomment when articles are ready */}
      {/* <BlogSection /> */}
      <Footer />
    </div>
  );
}
