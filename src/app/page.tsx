import dynamic from "next/dynamic";
import Hero from "@/components/landing/Hero";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import ValuesBand from "@/components/landing/ValuesBand";
import AboutTeaser from "@/components/landing/AboutTeaser";
import Services from "@/components/landing/Services";
import Process from "@/components/landing/Process";
import TrustBand from "@/components/shared/TrustBand";
import Pricing from "@/components/landing/Pricing";
import ReviewsSectionHeader from "@/components/landing/ReviewsSectionHeader";
import BlogSection from "@/components/landing/BlogSection";
import { getLatestBlogs } from "@/data/blog/blogUtils";
import { faqs } from "@/data/faqs";

const ReviewsCarousel = dynamic(() => import("@/components/landing/ReviewsCarousel"), { loading: () => null });
const HelperCategories = dynamic(() => import("@/components/landing/HelperCategories"), { loading: () => null });
const FindHelpers = dynamic(() => import("@/components/landing/FindHelpers"), { loading: () => null });
const SupportSection = dynamic(() => import("@/components/shared/SupportSection"), { loading: () => null });
const FaqSection = dynamic(() => import("@/components/shared/FaqSection"), { loading: () => null });

export default function HomePage() {
  const blogs = getLatestBlogs(5);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <Hero />
      <TrustBand />
      <WhyChooseUs />
      <Services />
      <HelperCategories />
      <Process />
      <FindHelpers />
      <AboutTeaser />
      <ValuesBand />
      <Pricing />
      <ReviewsSectionHeader />
      <ReviewsCarousel />
      <FaqSection />
      <SupportSection />
      <BlogSection blogs={blogs} />
    </>
  );
}
