import type { Metadata } from "next";
import { Alkatra, Quicksand } from "next/font/google";
import "./globals.css";

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
  title: "Don't Cook Don't Clean - Trusted Maids & Domestic Helpers",
  description: "Don't Cook Don't Clean connects families with verified domestic helpers for cooking, cleaning, childcare, elder care, and more. Available in Patna with flexible plans.",
  icons: {
    icon: [
      { url: '/fav-icon.png' },
      { url: '/fav-icon-150x150.png', sizes: '150x150', type: 'image/png' },
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
      <body className="min-h-full flex flex-col bg-background">{children}</body>
    </html>
  );
}
