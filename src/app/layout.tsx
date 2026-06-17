import type { Metadata } from "next";
import { Alkatra, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Configure Alkatra (for headings)
const alkatra = Alkatra({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-alkatra",
  display: "swap",
});

// Configure Quicksand (for body text)
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maid Service in Patna | Cook for Home & Cleaning Maid Services | Don't Cook Don't Clean",
  description: "Hire verified maids in Patna for cooking, cleaning, childcare & elder care. Flexible part-time, full-time & live-in plans. Background checked & ID verified helpers. Call +91-88771-94682.",
  keywords: [
    "maid service Patna",
    "cook maid Patna",
    "house cleaning Patna",
    "babysitter Patna",
    "elder care Patna",
    "domestic helper Patna",
    "part-time maid Patna",
    "full-time maid Patna",
    "live-in maid Patna",
    "verified maid Patna"
  ],
  alternates: {
    canonical: "https://dontcookdontclean.in/",
  },
  openGraph: {
    title: "Trusted Maid & Cook Services in Patna | Don't Cook Don't Clean",
    description: "Hire verified maids in Patna for cooking, cleaning, childcare & elder care. Flexible plans. Background checked helpers.",
    url: "https://dontcookdontclean.in/",
    type: "website",
    images: [
      {
        url: "https://dontcookdontclean.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Don't Cook Don't Clean — Trusted Maid Services in Patna",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trusted Maid & Cook Services in Patna | Don't Cook Don't Clean",
    description: "Hire verified maids in Patna for cooking, cleaning, childcare & elder care.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alkatra.variable} ${quicksand.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero_poster.avif"
        />
        <link
          rel="preload"
          as="video"
          href="/images/hero_Video.mp4"
          type="video/mp4"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Don't Cook Don't Clean",
              "url": "https://dontcookdontclean.in",
              "logo": "https://dontcookdontclean.in/images/logo.avif",
              "image": "https://dontcookdontclean.in/og-image.jpg",
              "description": "Don't Cook Don't Clean connects families in Patna with verified domestic helpers for cooking, cleaning, childcare, elder care, and household management.",
              "telephone": "+91-88771-94682",
              "email": "info@dontcookdontclean.in",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Patna",
                "addressRegion": "Bihar",
                "addressCountry": "IN"
              },
              "areaServed": {
                "@type": "City",
                "name": "Patna"
              },
              "serviceType": [
                "Maid Service",
                "House Cleaning",
                "Cooking Assistance",
                "Babysitting",
                "Elder Care",
                "Live-In Maid",
                "Part-Time Maid",
                "Pet Walking"
              ],
              "openingHours": "Mo-Su 08:00-20:00",
              "priceRange": "₹₹",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61590679025518",
                "https://www.instagram.com/dontcook_dontclean/"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "15",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do I hire a maid or domestic helper?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply submit your requirements through our website or contact our team. We'll help match you with a verified helper based on your household needs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are all helpers background verified?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. We perform identity verification and background checks before recommending helpers to families."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What if the helper is not the right fit?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer replacement assistance and work closely with families to find a more suitable match whenever required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I hire helpers for part-time work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. We provide both part-time and full-time domestic helper options depending on your requirements."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What services can domestic helpers provide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Services may include house cleaning, cooking, laundry, childcare assistance, elder care support, and other household tasks."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does the hiring process take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The timeline varies based on availability and requirements, but most families receive suitable matches within a few days."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
