"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6">
      <div className="container flex items-center justify-between">
        {/* Logo - left */}
        <Link href="/" className="relative w-[120px] h-[70px] flex-shrink-0">
          <Image
            src="/images/nav-logo.avif"
            alt="Don't Cook Don't Clean"
            width={65}
            height={65}
            className="object-contain object-left h-auto"
            priority
          />
        </Link>

        {/* Desktop Nav pill - right */}
        <nav className="hidden md:flex items-center gap-4 bg-[#f2d701]/70 backdrop-blur-xl rounded-full px-8 shadow-lg h-[58px]">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-text-primary font-semibold text-lg hover:text-primary transition-colors duration-300 relative group whitespace-nowrap"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Mobile Burger Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-[#f2d701]/20 backdrop-blur-xl rounded-full shadow-lg"
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
        <div className="md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24">
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
