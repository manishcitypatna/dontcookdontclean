"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Helpers", href: "/workers" },
    { label: "Blog", href: "/blog" },
    { label: "Work With Us", href: "/work-with-us" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-secondary shadow-sm">
      <div className="container h-20 flex items-center justify-between">
        {/* Logo - left */}
        <Link href="/" className="relative w-[100px] h-14 flex-shrink-0">
          <Image
            src="/images/shared/nav-logo.avif"
            alt="Don't Cook Don't Clean"
            width={56}
            height={56}
            className="object-contain object-left h-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-text-primary font-semibold text-base hover:text-primary transition-colors duration-300 relative group whitespace-nowrap"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Mobile Burger Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 z-40 bg-white">
          <nav className="container flex flex-col items-center gap-6 py-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-text-primary font-semibold text-2xl hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
