"use client";

// src/components/FooterSection.tsx
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterSection() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <footer
      className="
        bg-background
        rounded-t-[48px]
        lg:rounded-t-[64px]
        overflow-hidden
      "
    >
      <div className="container pt-12 pb-12 lg:pt-16 lg:pb-16">
        {/* Contact Bar */}
        {isLandingPage && (
          <div className="bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 md:p-10 mb-16 lg:mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex items-center gap-4">
                <Image src="/images/shared/icon/calling.avif" alt="" width={28} height={28} className="h-7 w-7" />
                <div>
                  <p className="small-text text-text-secondary">Call or WhatsApp</p>
                  <a href="tel:+918877194682" className="h4 text-text-primary hover:text-primary transition-colors">
                    +91-88771-94682
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Image src="/images/shared/icon/address.avif" alt="" width={28} height={28} className="h-7 w-7" />
                <div>
                  <p className="small-text text-text-secondary">Service Area</p>
                  <p className="h4 text-text-primary">Patna, Bihar</p>
                </div>
              </div>

              <div className="flex md:justify-end">
                <a href="#lead-form" className="btn-primary w-full md:w-auto">
                  Get Instant Quote
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-20">
          {/* Brand */}
          <div className="flex flex-col items-start text-left">
            {/* Logo */}
            <Image
              src="/images/shared/logo.avif"
              alt="Don't Cook Don't Clean"
              width={220}
              height={80}
              priority
              className="block mb-8 self-start h-auto w-auto"
            />

            {/* Description */}
            <p className="body text-text-secondary max-w-sm">
              <span className="font-semibold text-primary">
                Don&apos;t Cook Don&apos;t Clean
              </span>{" "}
              helps households find reliable support for cooking,
              cleaning, childcare, elderly care, and everyday household
              management.
            </p>

            {/* Contact */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-text-secondary">
                <Image src="/images/shared/icon/phone-call.avif" alt="Phone" width={24} height={24} className="h-6 w-6" />
                <span>+91-88771-94682</span>
              </div>

              <div className="flex items-center gap-3 text-text-secondary">
                <Image src="/images/shared/icon/mail.avif" alt="Email" width={24} height={24} className="h-6 w-6" />
                <a href="mailto:info@dontcookdontclean.in" className="hover:text-primary transition-colors">info@dontcookdontclean.in</a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <Link href="/work-with-us" className="btn-primary">
                Work With Us
              </Link>
              <a href="https://www.instagram.com/dontcook_dontclean" target="_blank" rel="noopener noreferrer">
                <Image src="/images/shared/icon/instagram.avif" alt="Instagram" width={28} height={28} className="h-7 w-7 hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590679025518" target="_blank" rel="noopener noreferrer">
                <Image src="/images/shared/icon/facebook.avif" alt="Facebook" width={28} height={28} className="h-7 w-7 hover:scale-110 transition-transform" />
              </a>
            </div>


          </div>

          {/* Services */}
          <div>
            <p className="small-text uppercase tracking-[0.2em] text-primary font-semibold mb-8" style={{ letterSpacing: '0.2em' }}>
              SERVICES
            </p>

            <ul className="space-y-4 text-text-secondary">
              <li>Maid Services</li>
              <li>House Cleaning</li>
              <li>Cooking Assistance</li>
              <li>Babysitter / Childcare</li>
              <li>Elderly Care Support</li>
              <li>Part-Time Helpers</li>
              <li>Full-Time Helpers</li>
              <li>Live-In Helpers</li>
              <li>Replacement Assistance</li>
              <li>Verified Staff</li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div>
            <p className="small-text uppercase tracking-[0.2em] text-primary font-semibold mb-8" style={{ letterSpacing: '0.2em' }}>
              WHY FAMILIES CHOOSE US
            </p>

            <ul className="space-y-4 text-text-secondary">
              <li>ID Verified Staff</li>
              <li>Background Verification</li>
              <li>Replacement Support</li>
              <li>Dedicated Customer Assistance</li>
              <li>Flexible Hiring Options</li>
              <li>Trusted Domestic Helpers</li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <p className="small-text uppercase tracking-[0.2em] text-primary font-semibold mb-8" style={{ letterSpacing: '0.2em' }}>
              SERVICE AREAS
            </p>

            <div className="space-y-6">
              <div>
                <Link href="/areas" className="text-text-secondary hover:text-primary transition-colors">
                  Patna
                </Link>
              </div>

              <div aria-hidden="true">
                <span className="text-text-secondary/40">Ranchi <em>(Coming Soon)</em></span>
              </div>

              <div aria-hidden="true">
                <span className="text-text-secondary/40">Jamshedpur <em>(Coming Soon)</em></span>
              </div>

              <div aria-hidden="true">
                <span className="text-text-secondary/40">Kolkata <em>(Coming Soon)</em></span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-16 pt-8">
          <div className="text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <p className="small-text text-text-secondary">
                © 2026 Don&apos;t Cook Don&apos;t Clean. All Rights Reserved.
              </p>
              <div className="hidden md:block text-text-secondary/40">•</div>
              <Link href="/privacy-policy" className="small-text text-text-secondary hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>

            <p className="small-text text-text-secondary/60">
              Serving households in Patna and Bihar with trusted, verified domestic help solutions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}