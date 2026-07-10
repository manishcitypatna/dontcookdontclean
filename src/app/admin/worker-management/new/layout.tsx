import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Worker | Don't Cook Don't Clean Admin",
};

export default function AdminWorkerOnboardingNewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
