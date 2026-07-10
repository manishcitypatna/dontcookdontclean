import type { Metadata } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Alkatra, Quicksand } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";

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
  metadataBase: new URL("https://dontcookdontclean.in"),
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
    images: ["https://dontcookdontclean.in/og-image.jpg"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Don't Cook Don't Clean",
              "url": "https://dontcookdontclean.in",
              "logo": "https://dontcookdontclean.in/images/shared/logo.avif",
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
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <SiteChrome>{children}</SiteChrome>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-65TXQTKK7P"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-65TXQTKK7P');
          `}
        </Script>
        <SpeedInsights />
      </body>
    </html>
  );
}
