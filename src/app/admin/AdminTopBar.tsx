"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminTopBar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <div className="container h-20 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/images/shared/nav-logo.avif"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-text-primary text-base">
              Don&apos;t Cook Don&apos;t Clean
            </span>
            <span className="small-text uppercase tracking-[0.15em] text-primary font-semibold text-[11px]">
              Admin
            </span>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="btn-outline !h-10 !px-5 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
