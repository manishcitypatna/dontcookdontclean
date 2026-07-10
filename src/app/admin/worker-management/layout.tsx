import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Worker Management | Don't Cook Don't Clean Admin",
};

export default function AdminWorkerManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
