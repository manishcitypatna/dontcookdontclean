import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply to Join as a Helper | Don't Cook Don't Clean",
  description:
    "Apply in minutes to join Don't Cook Don't Clean as a verified maid, cook, babysitter, or elder-care helper in Patna.",
  alternates: {
    canonical: "/work-with-us/apply",
  },
};

export default function ApplyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
