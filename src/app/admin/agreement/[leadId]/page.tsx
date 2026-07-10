import type { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ leadId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { leadId } = await params;
  return {
    title: `Service Agreement ${leadId} | Don't Cook Don't Clean`,
    description: `Service agreement for lead ${leadId}.`,
    robots: { index: false, follow: false },
  };
}

export default async function AgreementPage({ params }: Props) {
  const { leadId } = await params;
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/shared/logo.avif"
                    alt="Don't Cook Don't Clean"
                    width={120}
                    height={120}
                    className="h-24 w-auto"
                  />
                </div>
                <h1 className="h1 text-text-primary mb-2">Don&apos;t Cook Don&apos;t Clean</h1>
                <p className="body text-text-secondary mb-8">A brand of GSMA Technologies</p>
                <h2 className="h2 text-text-primary mb-4">Service Agreement</h2>
                <p className="body text-text-secondary mb-4">Lead ID: {leadId}</p>
                <div className="card bg-yellow-50 border-yellow-200 mb-8">
                  <p className="h4 text-yellow-800 flex items-center justify-center gap-2">
                    <span>🚧</span> Agreement signing system is being set up. Please contact us at +91-88771-94682 to proceed.
                  </p>
                </div>
                <a href="tel:+918877194682" className="btn-primary">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
