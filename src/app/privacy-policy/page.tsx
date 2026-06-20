import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy | Don't Cook Don't Clean",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information when you use our services.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <span className="text-primary font-semibold">Your Privacy Matters</span>
            </div>
            <h1 className="h1 text-text-primary mb-4">Privacy Policy</h1>
            <p className="body text-text-secondary max-w-2xl mx-auto">
              We value your trust and are committed to protecting your personal information. Here's how we collect, use, and safeguard your data.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-text-secondary">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Last Updated: June 20, 2026</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
      </section>

      {/* Content Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <div className="prose prose-lg max-w-none text-text-secondary">
                <p>
                  Don&apos;t Cook Don&apos;t Clean (&quot;we,&quot; &quot;our,&quot; &quot;us,&quot; or &quot;the Company&quot;) operates the website dontcookdontclean.in (the &quot;Website&quot;) and provides domestic helper placement services connecting families in Patna, Bihar with verified maids, cooks, babysitters, elder care assistants, and household helpers (the &quot;Services&quot;).
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, store, share, and protect your personal information when you visit our Website, submit an inquiry, or use our Services. By using our Website or Services, you agree to the practices described in this policy.
                </p>
                <p>
                  We are committed to protecting your privacy and handling your personal data responsibly, in line with applicable Indian data protection laws, including the Digital Personal Data Protection Act, 2023 (DPDP Act).
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">1. Information We Collect</h2>
                <p>We collect information in the following ways:</p>

                <h3 className="h4 text-text-primary mt-8 mb-4">1.1 Information You Provide Directly</h3>
                <p>When you fill out our lead form, contact form, or reach out via phone or WhatsApp, we may collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Service requirement (e.g., cooking, cleaning, childcare, elder care)</li>
                  <li>Preferred shift type (part-time, full-time, live-in)</li>
                  <li>Preferred engagement duration</li>
                  <li>Area or locality in Patna</li>
                  <li>Any additional details you choose to share regarding your household requirements</li>
                </ul>

                <h3 className="h4 text-text-primary mt-8 mb-4">1.2 Information Collected from Domestic Helpers</h3>
                <p>If you are a domestic helper registering with us for work opportunities, we may additionally collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A valid government-issued photo identity document, used solely for in-person or photographic verification purposes</li>
                  <li>Address and contact details</li>
                  <li>Work experience and skill information</li>
                  <li>References from previous employers</li>
                  <li>Photographs for identification purposes</li>
                </ul>
                <p>
                  We use government-issued identity documents strictly to confirm a helper&apos;s identity before recommending them to a client household. We do not digitally store sensitive identity numbers (such as Aadhaar numbers) in our systems beyond what is necessary for one-time verification, and we do not use such documents for any purpose other than verification.
                </p>

                <h3 className="h4 text-text-primary mt-8 mb-4">1.3 Information Collected Automatically</h3>
                <p>When you visit our Website, we may automatically collect certain technical information through cookies and analytics tools, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device type</li>
                  <li>Pages visited and time spent on the Website</li>
                  <li>Referring website or search engine</li>
                  <li>General location data (city-level, based on IP address)</li>
                </ul>
                <p>
                  This information is collected through tools such as Google Analytics and helps us understand how visitors use our Website so we can improve it. This section applies once such analytics tools are active on our Website.
                </p>

                <h3 className="h4 text-text-primary mt-8 mb-4">1.4 Information from Third Parties</h3>
                <p>
                  We may receive limited information about you from third parties, such as when someone refers you to us, or when you interact with our Google Business Profile, Facebook page, or Instagram page.
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">2. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To match you with a suitable domestic helper based on your stated requirements</li>
                  <li>To verify the identity and background of domestic helpers before placement</li>
                  <li>To contact you regarding your inquiry, booking, or service request</li>
                  <li>To provide customer support and respond to questions, complaints, or replacement requests</li>
                  <li>To send service-related updates via phone, WhatsApp, SMS, or email</li>
                  <li>To improve our Website, Services, and overall customer experience</li>
                  <li>To maintain internal records for business operations</li>
                  <li>To comply with applicable legal and regulatory requirements</li>
                  <li>To detect, prevent, and address fraud, misuse, or security concerns</li>
                </ul>
                <p>
                  We do not use your personal information for purposes unrelated to providing and improving our domestic helper placement Services, except where you have given explicit consent or where required by law.
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">3. Legal Basis for Processing Your Data</h2>
                <p>We process your personal data based on:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Your consent</strong>, which you provide when submitting a form or contacting us</li>
                  <li><strong>Legitimate business interest</strong>, such as verifying domestic helpers for the safety of client households</li>
                  <li><strong>Contractual necessity</strong>, where processing is required to fulfill a service you have requested</li>
                  <li><strong>Legal obligation</strong>, where we are required to retain or disclose information under applicable law</li>
                </ul>
                <p>
                  You have the right to withdraw your consent at any time, as described in Section 7 of this policy.
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">4. How We Share Your Information</h2>
                <p>We may share your personal information in the following circumstances:</p>

                <h3 className="h4 text-text-primary mt-8 mb-4">4.1 With Domestic Helpers or Clients (As Applicable)</h3>
                <p>
                  If you are a client, we may share relevant details with a shortlisted domestic helper to facilitate the placement process. If you are a domestic helper, we may share your verified profile information with prospective client households.
                </p>

                <h3 className="h4 text-text-primary mt-8 mb-4">4.2 With Service Providers</h3>
                <p>
                  We may share information with trusted third-party service providers who assist us in operating our Website and Services, such as:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Website hosting and maintenance providers</li>
                  <li>Analytics providers (such as Google Analytics)</li>
                  <li>Communication tools (such as WhatsApp Business, SMS gateways, or email services)</li>
                  <li>Payment processing providers, if and when online payment options become available through our Website</li>
                </ul>
                <p>
                  These service providers are only permitted to use your information to perform services on our behalf and are not authorized to use it for any other purpose.
                </p>

                <h3 className="h4 text-text-primary mt-8 mb-4">4.3 For Legal Reasons</h3>
                <p>
                  We may disclose your information if required to do so by law, court order, or governmental request, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others, or to investigate fraud or security issues.
                </p>

                <h3 className="h4 text-text-primary mt-8 mb-4">4.4 Business Transfers</h3>
                <p>
                  If Don&apos;t Cook Don&apos;t Clean is involved in a merger, acquisition, or sale of business assets, your information may be transferred as part of that transaction. We will notify you of any such change and any choices you may have regarding your information.
                </p>

                <h3 className="h4 text-text-primary mt-8 mb-4">4.5 We Do Not Sell Your Personal Information</h3>
                <p>
                  We do not sell, rent, or trade your personal information to third parties for marketing or advertising purposes.
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">5. Data Storage and Security</h2>
                <p>
                  We take reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Secure data storage practices</li>
                  <li>Restricted access to personal information within our team</li>
                  <li>Regular review of our data handling practices</li>
                </ul>
                <p>
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">6. Data Retention</h2>
                <p>
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>For clients</strong>: for the duration of your active inquiry or service relationship, and for a reasonable period afterward for record-keeping and potential future service requests</li>
                  <li><strong>For domestic helpers</strong>: for as long as you remain part of our active network, and for a reasonable period after deactivation for verification record purposes</li>
                </ul>
                <p>
                  If you wish to have your data deleted earlier, you may submit a request as described in Section 7.
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">7. Your Rights</h2>
                <p>
                  As a data principal under the Digital Personal Data Protection Act, 2023, you have the following rights regarding your personal information:
                </p>

                <h3 className="h4 text-text-primary mt-8 mb-4">7.1 Right to Access</h3>
                <p>You can request a copy of the personal information we hold about you.</p>

                <h3 className="h4 text-text-primary mt-8 mb-4">7.2 Right to Correction</h3>
                <p>You can request that we correct any inaccurate or incomplete personal information.</p>

                <h3 className="h4 text-text-primary mt-8 mb-4">7.3 Right to Erasure</h3>
                <p>You can request that we delete your personal information, subject to any legal or legitimate business retention requirements.</p>

                <h3 className="h4 text-text-primary mt-8 mb-4">7.4 Right to Withdraw Consent</h3>
                <p>You can withdraw your consent to our processing of your personal information at any time. Please note this may affect our ability to provide certain Services to you.</p>

                <h3 className="h4 text-text-primary mt-8 mb-4">7.5 Right to Grievance Redressal</h3>
                <p>
                  If you have concerns about how your personal information is being handled, you have the right to raise a grievance with us, as described in Section 11.
                </p>
                <p>
                  To exercise any of these rights, please contact us using the details provided in Section 12.
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">8. Cookies and Tracking Technologies</h2>
                <p>
                  Our Website may use cookies and similar tracking technologies to enhance your browsing experience and gather analytics data.
                </p>

                <h3 className="h4 text-text-primary mt-8 mb-4">8.1 What Are Cookies</h3>
                <p>
                  Cookies are small text files stored on your device when you visit a website. They help us understand visitor behavior and improve our Website.
                </p>

                <h3 className="h4 text-text-primary mt-8 mb-4">8.2 Types of Cookies We May Use</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential cookies</strong>: Required for basic Website functionality</li>
                  <li><strong>Analytics cookies</strong>: Help us understand how visitors interact with our Website (e.g., Google Analytics)</li>
                  <li><strong>Functional cookies</strong>: Remember your preferences for a better browsing experience</li>
                </ul>

                <h3 className="h4 text-text-primary mt-8 mb-4">8.3 Managing Cookies</h3>
                <p>
                  You can control or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our Website.
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">9. Children&apos;s Privacy</h2>
                <p>
                  Our Services are intended for use by adults seeking domestic help services or adults seeking employment opportunities. We do not knowingly collect personal information from children under the age of 18 for employment or registration purposes. If you believe a child has provided us with personal information, please contact us so we can take appropriate action.
                </p>
                <p>
                  In cases where our Services involve childcare or babysitting arrangements, any information related to a child (such as age or care requirements) is provided by the parent or legal guardian and is used solely for the purpose of matching appropriate childcare support.
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">10. Third-Party Links</h2>
                <p>
                  Our Website may contain links to third-party websites, such as our social media profiles (Facebook, Instagram) or, where applicable, payment gateways. We are not responsible for the privacy practices or content of these third-party websites. We encourage you to review the privacy policies of any third-party websites you visit.
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">11. Grievance Redressal</h2>
                <p>
                  If you have any concerns, questions, or complaints regarding this Privacy Policy or how your personal information is handled, you may contact our Grievance Officer using the details below. We will make reasonable efforts to acknowledge and address your concerns within a reasonable timeframe.
                </p>
                <p className="mt-4">
                  <strong>Grievance Officer Contact:</strong><br />
                  Email: info@dontcookdontclean.in<br />
                  Phone: +91-88771-94682
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">12. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or wish to exercise any of your rights regarding your personal information, please contact us:
                </p>
                <p className="mt-4">
                  <strong>Don&apos;t Cook Don&apos;t Clean</strong><br />
                  Patna, Bihar, India<br />
                  Phone / WhatsApp: +91-88771-94682<br />
                  Email: info@dontcookdontclean.in
                </p>

                <hr className="my-12 border-border" />

                <h2 className="h3 text-text-primary mt-12 mb-6">13. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will post any updated version on this page with a revised &quot;Last Updated&quot; date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                </p>
                <p>
                  Continued use of our Website or Services after any changes to this Privacy Policy constitutes your acceptance of the updated terms.
                </p>

                <hr className="my-12 border-border" />

                <p className="text-sm text-text-secondary/70 italic">
                  This Privacy Policy is intended to provide transparency about our data practices. It does not constitute legal advice. For specific legal concerns, please consult a qualified legal professional licensed to practice in India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
