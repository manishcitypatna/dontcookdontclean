import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Don't Cook Don't Clean",
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
