"use client";
import { useState } from "react";
import ThankYouPopup from "@/components/shared/ThankYouPopup";
import SearchableDropdown from "@/components/shared/SearchableDropdown";
import { useRouter } from "next/navigation";

const LOCALITY_OPTIONS = [
  "Other",
  "Ashiana Nagar",
  "Bailey Road (Nehru Path)",
  "Bhoothnath Road",
  "Boring Road",
  "Danapur",
  "Digha",
  "Exhibition Road",
  "Fraser Road",
  "Gola Road",
  "Hanuman Nagar",
  "Kadamkuan",
  "Kankarbagh",
  "Kidwaipuri",
  "Nageshwar Colony",
  "New Patliputra Colony",
  "Patliputra Colony",
  "Raja Bazar",
  "Rajendra Nagar",
  "Saguna More",
  "Shastrinagar",
  "Sri Krishna Puri (SK Puri)",
];

const SERVICE_OPTIONS = [
  "Other",
  "Cooking Only",
  "House Cleaning Only",
  "Laundry and Utensil Washing Only",
  "Child Care and Nanny Services",
  "Elderly Care and Patient Assistance",
  "Cooking and House Cleaning Combined",
  "Full Housekeeper (Cooking, Cleaning, and Laundry)",
];

const SHIFT_OPTIONS = [
  "Other",
  "Part-Time (1 to 2 Hours Daily)",
  "Half-Day (4 to 5 Hours Daily)",
  "Full-Time Day Shift (8 to 10 Hours Daily)",
  "24-Hour Live-In Management",
];

const DURATION_OPTIONS = [
  "Other",
  "Regular Contract (Monthly / Permanent Basis)",
  "Single-Day Trial Booking",
  "Short-Term Cover (1 to 2 Weeks)",
  "Event and House Party Support (1 to 2 Days)",
  "Festival Management Assistance",
  "Wedding and Function Management Support",
];

interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  locality?: string;
  otherLocality?: string;
  serviceRequired?: string;
  otherService?: string;
  shiftPreference?: string;
  otherShift?: string;
  engagementDuration?: string;
  otherDuration?: string;
}

export default function LeadForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    locality: "",
    otherLocality: "",
    serviceRequired: "",
    otherService: "",
    shiftPreference: "",
    otherShift: "",
    engagementDuration: "",
    otherDuration: "",
    remarks: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const validateName = (name: string) => {
    if (!name.trim()) return "Name is required";
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) return "Name should not contain special characters or numbers";
    return "";
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return "Phone number is required";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) return "Enter a valid 10-digit mobile number starting with 6,7,8, or 9";
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email address";
    return "";
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return validateName(value);
      case "phone":
        return validatePhone(value);
      case "email":
        return validateEmail(value);
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleLocalityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, locality: value, otherLocality: "" }));
    setErrors((prev) => ({ ...prev, locality: value ? "" : "Please select a locality", otherLocality: "" }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceRequired: value, otherService: "" }));
    setErrors((prev) => ({ ...prev, serviceRequired: value ? "" : "Please select a service", otherService: "" }));
  };

  const handleShiftChange = (value: string) => {
    setFormData((prev) => ({ ...prev, shiftPreference: value, otherShift: "" }));
    setErrors((prev) => ({ ...prev, shiftPreference: value ? "" : "Please select a shift preference", otherShift: "" }));
  };

  const handleDurationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, engagementDuration: value, otherDuration: "" }));
    setErrors((prev) => ({ ...prev, engagementDuration: value ? "" : "Please select an engagement duration", otherDuration: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: ValidationErrors = {};
    newErrors.name = validateName(formData.name);
    newErrors.phone = validatePhone(formData.phone);
    newErrors.email = validateEmail(formData.email);
    newErrors.locality = formData.locality ? "" : "Please select a locality";
    if (formData.locality === "Other") {
      newErrors.otherLocality = formData.otherLocality.trim() ? "" : "Please enter your locality";
    }
    newErrors.serviceRequired = formData.serviceRequired ? "" : "Please select a service";
    if (formData.serviceRequired === "Other") {
      newErrors.otherService = formData.otherService.trim() ? "" : "Please enter your service";
    }
    newErrors.shiftPreference = formData.shiftPreference ? "" : "Please select a shift preference";
    if (formData.shiftPreference === "Other") {
      newErrors.otherShift = formData.otherShift.trim() ? "" : "Please enter your shift";
    }
    newErrors.engagementDuration = formData.engagementDuration ? "" : "Please select an engagement duration";
    if (formData.engagementDuration === "Other") {
      newErrors.otherDuration = formData.otherDuration.trim() ? "" : "Please enter your duration";
    }

    setErrors(newErrors);

    // Check if any errors exist
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare final form data - map human-readable labels back to original keys
      const serviceMap: Record<string, string> = {
        "Cooking Only": "cooking-only",
        "House Cleaning Only": "house-cleaning-only",
        "Laundry and Utensil Washing Only": "laundry-utensil-only",
        "Child Care and Nanny Services": "child-care-nanny",
        "Elderly Care and Patient Assistance": "elder-care-patient",
        "Cooking and House Cleaning Combined": "cooking-cleaning-combined",
        "Full Housekeeper (Cooking, Cleaning, and Laundry)": "full-housekeeper",
      };

      const shiftMap: Record<string, string> = {
        "Part-Time (1 to 2 Hours Daily)": "part-time",
        "Half-Day (4 to 5 Hours Daily)": "half-day",
        "Full-Time Day Shift (8 to 10 Hours Daily)": "full-time-day",
        "24-Hour Live-In Management": "live-in",
      };

      const durationMap: Record<string, string> = {
        "Regular Contract (Monthly / Permanent Basis)": "regular-contract",
        "Single-Day Trial Booking": "single-day-trial",
        "Short-Term Cover (1 to 2 Weeks)": "short-term-cover",
        "Event and House Party Support (1 to 2 Days)": "event-house-party",
        "Festival Management Assistance": "festival-management",
        "Wedding and Function Management Support": "wedding-function",
      };

      const {
        otherLocality,
        otherService,
        otherShift,
        otherDuration,
        ...baseFormData
      } = formData;
      
      const finalFormData = {
        ...baseFormData,
        locality:
          formData.locality === "Other" ? formData.otherLocality : formData.locality,
        serviceRequired: formData.serviceRequired === "Other" 
          ? formData.otherService 
          : (serviceMap[formData.serviceRequired] || formData.serviceRequired),
        shiftPreference: formData.shiftPreference === "Other" 
          ? formData.otherShift 
          : (shiftMap[formData.shiftPreference] || formData.shiftPreference),
        engagementDuration: formData.engagementDuration === "Other" 
          ? formData.otherDuration 
          : (durationMap[formData.engagementDuration] || formData.engagementDuration),
      };

      // Submit to n8n webhook
      const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_LEAD_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        try {
          await fetch(n8nWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(finalFormData),
          });
        } catch (n8nError) {
          console.error("Error submitting to n8n:", n8nError);
        }
      }

      // Submit to web3forms
      const subject = formData.name
        ? `${formData.name} | New lead form`
        : "New Lead Form Submission";
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "ff5518a3-f898-43de-b14b-6bdfd2d83626",
          ...finalFormData,
          subject,
          from_name: "Don't Cook Don't Clean",
          redirect: "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowThankYou(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          locality: "",
          otherLocality: "",
          serviceRequired: "",
          otherService: "",
          shiftPreference: "",
          otherShift: "",
          engagementDuration: "",
          otherDuration: "",
          remarks: "",
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ThankYouPopup
        isOpen={showThankYou}
        onClose={() => {
          setShowThankYou(false);
          router.push("/");
        }}
      />
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Name */}
          <div className="md:col-span-1">
            <label htmlFor="lead-name" className="sr-only">
              Your Name
            </label>
            <input
              id="lead-name"
              type="text"
              name="name"
              placeholder="Enter your name"
              aria-required="true"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div className="md:col-span-1">
            <label htmlFor="lead-phone" className="sr-only">
              Phone Number
            </label>
            <input
              id="lead-phone"
              type="tel"
              name="phone"
              placeholder="Phone"
              aria-required="true"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div className="md:col-span-1">
            <label htmlFor="lead-email" className="sr-only">
              Email Address
            </label>
            <input
              id="lead-email"
              type="email"
              name="email"
              placeholder="Email Address"
              aria-required="true"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Locality */}
          <div className="md:col-span-1">
            <label htmlFor="lead-locality" className="sr-only">
              Work Area / Locality
            </label>
            <SearchableDropdown
              id="lead-locality"
              name="locality"
              options={LOCALITY_OPTIONS}
              value={formData.locality}
              onChange={handleLocalityChange}
              placeholder="Select Work Area / Locality"
            />
            {errors.locality && <p className="text-red-500 text-sm mt-1">{errors.locality}</p>}
          </div>

          {/* Other Locality (conditional) */}
          {formData.locality === "Other" && (
            <div className="md:col-span-1">
              <label htmlFor="lead-other-locality" className="sr-only">
                Other Locality
              </label>
              <input
                id="lead-other-locality"
                type="text"
                name="otherLocality"
                placeholder="Enter your locality"
                aria-required="true"
                value={formData.otherLocality}
                onChange={handleChange}
                className={`form-input ${errors.otherLocality ? "border-red-500" : ""}`}
              />
              {errors.otherLocality && <p className="text-red-500 text-sm mt-1">{errors.otherLocality}</p>}
            </div>
          )}

          {/* Service Required */}
          <div className="md:col-span-1">
            <label htmlFor="lead-service" className="sr-only">
              Select Service
            </label>
            <SearchableDropdown
              id="lead-service"
              name="serviceRequired"
              options={SERVICE_OPTIONS}
              value={formData.serviceRequired}
              onChange={handleServiceChange}
              placeholder="Select Service..."
            />
            {errors.serviceRequired && <p className="text-red-500 text-sm mt-1">{errors.serviceRequired}</p>}
          </div>

          {/* Other Service (conditional) */}
          {formData.serviceRequired === "Other" && (
            <div className="md:col-span-1">
              <label htmlFor="lead-other-service" className="sr-only">
                Other Service
              </label>
              <input
                id="lead-other-service"
                type="text"
                name="otherService"
                placeholder="Enter your service"
                aria-required="true"
                value={formData.otherService}
                onChange={handleChange}
                className={`form-input ${errors.otherService ? "border-red-500" : ""}`}
              />
              {errors.otherService && <p className="text-red-500 text-sm mt-1">{errors.otherService}</p>}
            </div>
          )}

          {/* Shift Preference */}
          <div className="md:col-span-1">
            <label htmlFor="lead-shift" className="sr-only">
              Select Shift Type
            </label>
            <SearchableDropdown
              id="lead-shift"
              name="shiftPreference"
              options={SHIFT_OPTIONS}
              value={formData.shiftPreference}
              onChange={handleShiftChange}
              placeholder="Select Shift Type..."
            />
            {errors.shiftPreference && <p className="text-red-500 text-sm mt-1">{errors.shiftPreference}</p>}
          </div>

          {/* Other Shift (conditional) */}
          {formData.shiftPreference === "Other" && (
            <div className="md:col-span-1">
              <label htmlFor="lead-other-shift" className="sr-only">
                Other Shift
              </label>
              <input
                id="lead-other-shift"
                type="text"
                name="otherShift"
                placeholder="Enter your shift"
                aria-required="true"
                value={formData.otherShift}
                onChange={handleChange}
                className={`form-input ${errors.otherShift ? "border-red-500" : ""}`}
              />
              {errors.otherShift && <p className="text-red-500 text-sm mt-1">{errors.otherShift}</p>}
            </div>
          )}

          {/* Engagement Duration */}
          <div className="md:col-span-1">
            <label htmlFor="lead-duration" className="sr-only">
              Select Duration
            </label>
            <SearchableDropdown
              id="lead-duration"
              name="engagementDuration"
              options={DURATION_OPTIONS}
              value={formData.engagementDuration}
              onChange={handleDurationChange}
              placeholder="Select Duration..."
            />
            {errors.engagementDuration && <p className="text-red-500 text-sm mt-1">{errors.engagementDuration}</p>}
          </div>

          {/* Other Duration (conditional) */}
          {formData.engagementDuration === "Other" && (
            <div className="md:col-span-1">
              <label htmlFor="lead-other-duration" className="sr-only">
                Other Duration
              </label>
              <input
                id="lead-other-duration"
                type="text"
                name="otherDuration"
                placeholder="Enter your duration"
                aria-required="true"
                value={formData.otherDuration}
                onChange={handleChange}
                className={`form-input ${errors.otherDuration ? "border-red-500" : ""}`}
              />
              {errors.otherDuration && <p className="text-red-500 text-sm mt-1">{errors.otherDuration}</p>}
            </div>
          )}
        </div>

        {/* Remarks (Optional) */}
        <div className="w-full mb-4">
          <label htmlFor="lead-remarks" className="sr-only">
            Remarks
          </label>
          <textarea
            id="lead-remarks"
            name="remarks"
            placeholder="Any additional remarks or special requirements (optional)"
            value={formData.remarks}
            onChange={handleChange}
            className="form-textarea w-full"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-secondary w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
