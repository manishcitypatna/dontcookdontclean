// src/components/FooterSection.tsx
import Image from "next/image";
import SectionLabel from "./SectionLabel";
export default function FooterSection() {
  return (
    <footer
      className="
        bg-background
        rounded-t-[48px]
        lg:rounded-t-[64px]
        overflow-hidden
      "
    >
      <div className="container py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-20">
          {/* Brand */}
          <div className="flex flex-col items-start text-left">
            {/* Logo */}
            <Image
              src="/images/logo.png"
              alt="Don't Cook Don't Clean"
              width={220}
              height={80}
              priority
              className="block mb-8 self-start"
            />

            {/* Description */}
            <p className="body text-text-secondary max-w-sm">
              <span className="font-semibold text-primary">
                Don't Cook Don't Clean
              </span>{" "}
              helps households find reliable support for cooking,
              cleaning, childcare, elderly care, and everyday household
              management.
            </p>

            {/* Contact */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-text-secondary">
                <span className="text-lg">📞</span>
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex items-center gap-3 text-text-secondary">
                <span className="text-lg">📧</span>
                <span>hello@dontcookdontclean.com</span>
              </div>
            </div>

            {/* CTA */}
            <button className="btn-primary mt-8">
              Chat with Us
            </button>
          </div>

          {/* Services */}
          <div>
            <h3 className="small-text uppercase tracking-[0.2em] text-primary font-semibold mb-8" style={{ letterSpacing: '0.2em' }}>
              SERVICES
            </h3>

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
            <h3 className="small-text uppercase tracking-[0.2em] text-primary font-semibold mb-8" style={{ letterSpacing: '0.2em' }}>
              WHY FAMILIES CHOOSE US
            </h3>

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
            <h3 className="small-text uppercase tracking-[0.2em] text-primary font-semibold mb-8" style={{ letterSpacing: '0.2em' }}>
              SERVICE AREAS
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-text-secondary">Patna</p>
              </div>

              <div>
                <p className="text-text-secondary">Ranchi</p>
                <p className="small-text text-primary mt-1">
                  Coming Soon
                </p>
              </div>

              <div>
                <p className="text-text-secondary">Jamshedpur</p>
                <p className="small-text text-primary mt-1">
                  Coming Soon
                </p>
              </div>

              <div>
                <p className="text-text-secondary">Kolkata</p>
                <p className="small-text text-primary mt-1">
                  Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-16 pt-8">
          <div className="text-center">
            <p className="small-text text-text-secondary">
              © 2026 Don't Cook Don't Clean. All Rights Reserved.
            </p>

            <p className="small-text text-text-secondary/60 mt-2">
              Serving households across Eastern India with trusted
              domestic help solutions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}