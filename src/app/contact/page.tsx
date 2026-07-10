import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/shared/SectionLabel";
import FaqSection from "@/components/shared/FaqSection";
import ContactForm from "@/components/forms/ContactForm";
import TicketStatusCheck from "@/components/shared/TicketStatusCheck";

export const metadata: Metadata = {
  title: "Contact Us | Don't Cook Don't Clean",
  description:
    "Get in touch with Don't Cook Don't Clean for maid, cook, babysitter, or elder care services in Patna. Call, WhatsApp, email, or send us a message and we'll respond within 24-48 hours.",
  alternates: {
    canonical: "https://dontcookdontclean.in/contact",
  },
  openGraph: {
    title: "Contact Don't Cook Don't Clean | Patna's Trusted Domestic Help Platform",
    description:
      "Reach out for maid, cook, babysitter, or elder care services in Patna. We typically respond within 24-48 hours.",
    url: "https://dontcookdontclean.in/contact",
    type: "website",
  },
};

const contactCards = [
  {
    icon: "/images/shared/icon/phone-call.avif",
    label: "Call or WhatsApp",
    value: "+91-88771-94682",
    href: "tel:+918877194682",
  },
  {
    icon: "/images/shared/icon/mail.avif",
    label: "Email Us",
    value: "info@dontcookdontclean.in",
    href: "mailto:info@dontcookdontclean.in",
  },
  {
    icon: "/images/shared/icon/address.avif",
    label: "Service Area",
    value: "Patna, Bihar",
    href: null,
  },
];

const contactFaqs = [
  {
    question: "How quickly will I hear back after submitting the contact form?",
    answer:
      "Our team typically calls or WhatsApps you within 24-48 hours of receiving your message. For urgent requirements, calling or WhatsApping us directly is the fastest way to reach us.",
  },
  {
    question: "Can I call or WhatsApp instead of filling out the form?",
    answer:
      "Yes. You can reach us anytime at +91-88771-94682 by call or WhatsApp between 9 AM and 8 PM, and we'll be happy to help.",
  },
  {
    question: "Do you operate outside Patna?",
    answer:
      "Right now we serve households across Patna. We're working on expanding to Ranchi, Jamshedpur, and Kolkata soon.",
  },
  {
    question: "I'm a worker looking for a job — is this the right place to reach out?",
    answer:
      "Yes, select \"Work With Us / Join as a Helper\" in the form, or visit our Work With Us page to apply directly.",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://dontcookdontclean.in/" },
              { "@type": "ListItem", position: 2, name: "Contact", item: "https://dontcookdontclean.in/contact" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: contactFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <main>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-primary">
        <div className="relative z-10 container py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="h1 text-secondary mb-4">Get in Touch</h1>
            <p className="body text-white/85 max-w-xl mx-auto">
              Have a question, a service request, or feedback for us? Reach out
              and our Patna-based team will get back to you within 24-48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative">
        <div className="container -mt-10 md:-mt-12 relative z-10">
          <div className="bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 md:p-10 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactCards.map((card, index) => {
                const justify =
                  index === 1 ? "md:justify-center" : index === 2 ? "md:justify-end" : "md:justify-start";
                const align = index === 1 ? "md:text-center" : index === 2 ? "md:text-right" : "md:text-left";

                return (
                  <div
                    key={card.label}
                    className={`flex items-center justify-center gap-4 min-w-0 ${justify}`}
                  >
                    <Image src={card.icon} alt="" width={28} height={28} className="h-7 w-7 flex-shrink-0" />
                    <div className={`min-w-0 text-center ${align}`}>
                      <p className="small-text text-text-secondary">{card.label}</p>
                      {card.href ? (
                        <a
                          href={card.href}
                          className="h4 text-text-primary hover:text-primary transition-colors break-words"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <p className="h4 text-text-primary break-words">{card.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3 bg-background rounded-[24px] p-8 md:p-10">
              <SectionLabel>SEND US A MESSAGE</SectionLabel>
              <h2 className="h2 text-text-primary mb-6">We&apos;d Love to Hear From You</h2>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <SectionLabel>NEED HELP RIGHT NOW?</SectionLabel>
                <h3 className="h3 text-text-primary mb-3">Talk to Our Team Directly</h3>
                <p className="body text-text-secondary">
                  For urgent requirements or immediate assistance, calling or
                  WhatsApping us is the fastest way to reach our Patna
                  operations team.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-text-secondary">
                  <Image src="/images/shared/icon/message.avif" alt="" width={24} height={24} className="h-6 w-6" />
                  <span>Available 9 AM - 8 PM, all days</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <Image src="/images/shared/icon/documents.avif" alt="" width={24} height={24} className="h-6 w-6" />
                  <span>We typically respond within 24-48 hours</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+918877194682" className="btn-primary">
                  Call Now
                </a>
                <Link href="/#lead-form" className="btn-outline">
                  Get Instant Quote
                </Link>
              </div>

              <div className="border-t border-border pt-6">
                <p className="small-text text-text-secondary mb-3">
                  Looking for work as a helper instead?
                </p>
                <Link href="/work-with-us" className="text-primary font-semibold hover:underline">
                  Apply to Work With Us →
                </Link>
              </div>

              <TicketStatusCheck />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqs={contactFaqs} />
      </main>
    </>
  );
}
