import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/ReviewsHero";
import Footer from "@/components/Footer";

const ReviewsCarousel = dynamic(() => import("@/components/ReviewsCarousel"), { loading: () => null });
const SupportSection = dynamic(() => import("@/components/SupportSection"), { loading: () => null });
const FaqSection = dynamic(() => import("@/components/FaqSection"), { loading: () => null });

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
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
    </main>
  );
}
