"use client";
import { useState } from "react";
import ThankYouPopup from "@/components/shared/ThankYouPopup";
import { generateTicketId } from "@/lib/ticketId";

const REASON_OPTIONS = [
  "General Inquiry",
  "New Service Question",
  "Existing Service Issue",
  "Replacement Request",
  "Feedback",
  "Complaint",
  "Work With Us / Join as a Helper",
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

export default function ContactForm() {
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
        : `[${ticketId}] New Contact Form Submission | ${formData.reason}`;

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
          from_name: "Don't Cook Don't Clean - Contact Page",
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
      console.error("Error submitting contact form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ThankYouPopup
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        title="Message Received!"
        message="Thanks for reaching out. Our team will get back to you within 24-48 hours."
        showGuarantee={false}
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
        <div>
          <label htmlFor="contact-name" className="block small-text text-text-secondary mb-1">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-phone" className="block small-text text-text-secondary mb-1">
            Phone Number
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={`form-input ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="block small-text text-text-secondary mb-1">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Your Email Address (Optional)"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="contact-reason" className="block small-text text-text-secondary mb-1">
            How can we help?
          </label>
          <select
            id="contact-reason"
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

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="block small-text text-text-secondary mb-1">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Tell us how we can assist you..."
            value={formData.message}
            onChange={handleChange}
            className={`form-textarea ${errors.message ? "border-red-500" : ""}`}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <button type="submit" disabled={isSubmitting} className="btn-secondary w-full">
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </>
  );
}
