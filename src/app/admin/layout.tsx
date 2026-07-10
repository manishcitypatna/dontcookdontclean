import type { Metadata } from "next";
import AdminTopBar from "./AdminTopBar";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminTopBar />
      {children}
    </>
  );
}
