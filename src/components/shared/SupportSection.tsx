"use client";
import { useState } from "react";
import SectionLabel from "@/components/shared/SectionLabel";
import ThankYouPopup from "@/components/shared/ThankYouPopup";
import { generateTicketId } from "@/lib/ticketId";

const REASON_OPTIONS = [
  "General Inquiry",
  "New Service Question",
  "Existing Service Issue",
  "Replacement Request",
  "Feedback",
  "Complaint",
  "Other",
];

interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  reason: REASON_OPTIONS[0],
  message: "",
};

const SupportSection = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const validateName = (name: string) => {
    if (!name.trim()) return "Name is required";
    if (!/^[a-zA-Z\s]+$/.test(name)) return "Name should not contain special characters or numbers";
    return "";
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return "Phone number is required";
    if (!/^[6-9]\d{9}$/.test(phone)) return "Enter a valid 10-digit mobile number starting with 6,7,8, or 9";
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address";
    return "";
  };

  const validateMessage = (message: string) => {
    if (!message.trim()) return "Please tell us how we can help";
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "name") setErrors((prev) => ({ ...prev, name: validateName(value) }));
    if (name === "phone") setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    if (name === "email") setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "message") setErrors((prev) => ({ ...prev, message: validateMessage(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ValidationErrors = {
      name: validateName(formData.name),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      message: validateMessage(formData.message),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    setIsSubmitting(true);

    try {
      const ticketId = generateTicketId();

      // Submit to n8n webhook
      const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        try {
          await fetch(n8nWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ticketId, ...formData }),
          });
        } catch (n8nError) {
          console.error("Error submitting to n8n:", n8nError);
        }
      }

      const subject = formData.name
        ? `[${ticketId}] ${formData.name} | ${formData.reason}`
        : `[${ticketId}] New Support Form Submission | ${formData.reason}`;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "ff5518a3-f898-43de-b14b-6bdfd2d83626",
          ticketId,
          ...formData,
          subject,
          from_name: "Don't Cook Don't Clean - Support Section",
          redirect: "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowThankYou(true);
        setFormData(initialFormData);
        setErrors({});
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting support form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative section bg-background flex items-center justify-center">
      <ThankYouPopup
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        title="Message Received!"
        message="Thanks for reaching out. Our team will get back to you within 24-48 hours."
        showGuarantee={false}
      />

      <div className="relative z-10 container">
        <div className="flex flex-col lg:flex-row bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] max-w-6xl mx-auto">
          {/* Left Column - Image and Statistics */}
          <div className="lg:w-1/2 relative bg-cover bg-center flex flex-col justify-end p-6 md:p-10 rounded-l-[24px]"
               style={{ backgroundImage: "url('/images/shared/support-banner.avif')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 rounded-l-[24px]"></div>
            <div className="relative z-10 text-white">
              <div className="flex flex-col md:flex-row md:justify-around text-center gap-4 md:gap-0">
                <div className="flex flex-col items-center p-4">
                  <span className="text-3xl md:text-4xl font-bold">98%</span>
                  <span className="text-xs md:small-text mt-1 leading-tight text-center">Customer Satisfaction</span>
                </div>
                <div className="flex flex-col items-center p-4">
                  <span className="text-3xl md:text-4xl font-bold">10+</span>
                  <span className="text-xs md:small-text mt-1 leading-tight text-center">Service Categories</span>
                </div>
                <div className="flex flex-col items-center p-4">
                  <span className="text-3xl md:text-4xl font-bold">500+</span>
                  <span className="text-xs md:small-text mt-1 leading-tight text-center">Families Helped</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:w-1/2 p-12">
            <div className="max-w-md mx-auto">
              <SectionLabel>SUPPORT</SectionLabel>
              <h2 className="mt-2 h2 text-text-primary">Need Help? <br />We&apos;re Here to Assist</h2>
              <p className="mt-4 body text-text-secondary">Whether you have a question, service concern, replacement request, or feedback, our support team is ready to help.</p>

              <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                {/* Name */}
                <div>
                  <label htmlFor="support-name" className="block small-text text-text-secondary">Name</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="support-name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${errors.name ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="support-phone" className="block small-text text-text-secondary">Phone Number</label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="support-phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-input ${errors.phone ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="support-email" className="block small-text text-text-secondary">Email Address</label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="support-email"
                      placeholder="Your Email Address (Optional)"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* How can we help? */}
                <div>
                  <label htmlFor="support-reason" className="block small-text text-text-secondary">How can we help?</label>
                  <div className="mt-1">
                    <select
                      id="support-reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="form-input"
                    >
                      {REASON_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="support-message" className="block small-text text-text-secondary">Message</label>
                  <div className="mt-1">
                    <textarea
                      id="support-message"
                      name="message"
                      rows={4}
                      placeholder="Please tell us how we can assist you..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-textarea ${errors.message ? "border-red-500" : ""}`}
                    ></textarea>
                  </div>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Send Message Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-secondary w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center text-text-secondary small-text">
                <p>If you have any questions, call or Whatsapp at: <span className="font-medium text-text-primary">+91-88771-94682</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
