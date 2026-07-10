"use client";
import { useState } from "react";
import SearchableDropdown from "@/components/shared/SearchableDropdown";
import { LOCALITY_OPTIONS } from "@/data/localities";

const GENDER_OPTIONS = ["Male", "Female", "Other"];

const JOINING_SOURCE_OPTIONS = [
  "Agent",
  "Existing Worker",
  "Facebook",
  "Leaflet",
  "NGO",
  "OLX Ad",
  "Other",
  "Paper Insert",
  "Quicker Ad",
  "Referral",
  "Walk-in",
  "Wall Poster",
  "Website",
  "WhatsApp",
];

export interface WorkerIntakePayload {
  workerId: string;
  onboardingDate: string;
  fullName: string;
  mobile: string;
  gender: string;
  locality: string;
  city: string;
  cookingServices: boolean;
  cleaningServices: boolean;
  babyCareServices: boolean;
  elderCareServices: boolean;
  otherServices: boolean;
  shiftFullTime: boolean;
  shiftPartTime: boolean;
  shiftLiveIn: boolean;
  shiftDaily: boolean;
  remarks: string;
  joiningSource: string;
  createdBy: string;
}

interface WorkerIntakeFormProps {
  /** Fixed joining source (e.g. "Website"). Omit and set allowJoiningSourceSelection instead
   * when the source varies per submission (e.g. staff adding a worker). */
  joiningSource?: string;
  allowJoiningSourceSelection?: boolean;
  createdBy: string;
  submitLabel?: string;
  onSuccess: (payload: WorkerIntakePayload) => void;
}

interface FormData {
  fullName: string;
  mobile: string;
  gender: string;
  locality: string;
  otherLocality: string;
  joiningSource: string;
  cookingServices: boolean;
  cleaningServices: boolean;
  babyCareServices: boolean;
  elderCareServices: boolean;
  otherServices: boolean;
  shiftFullTime: boolean;
  shiftPartTime: boolean;
  shiftLiveIn: boolean;
  shiftDaily: boolean;
  remarks: string;
}

interface ValidationErrors {
  fullName?: string;
  mobile?: string;
  gender?: string;
  locality?: string;
  otherLocality?: string;
  joiningSource?: string;
  services?: string;
}

const initialFormData: FormData = {
  fullName: "",
  mobile: "",
  gender: "",
  locality: "",
  otherLocality: "",
  joiningSource: "",
  cookingServices: false,
  cleaningServices: false,
  babyCareServices: false,
  elderCareServices: false,
  otherServices: false,
  shiftFullTime: false,
  shiftPartTime: false,
  shiftLiveIn: false,
  shiftDaily: false,
  remarks: "",
};

export default function WorkerIntakeForm({
  joiningSource,
  allowJoiningSourceSelection = false,
  createdBy,
  submitLabel = "Submit Application",
  onSuccess,
}: WorkerIntakeFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateFullName = (value: string) => {
    if (!value.trim()) return "Name is required";
    if (!/^[a-zA-Z\s]+$/.test(value)) return "Name should not contain special characters or numbers";
    return "";
  };

  const validateMobile = (value: string) => {
    if (!value.trim()) return "Mobile number is required";
    if (!/^[6-9]\d{9}$/.test(value)) return "Enter a valid 10-digit mobile number starting with 6,7,8, or 9";
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const nextValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleLocalityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, locality: value, otherLocality: "" }));
    setErrors((prev) => ({ ...prev, locality: undefined, otherLocality: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ValidationErrors = {
      fullName: validateFullName(formData.fullName),
      mobile: validateMobile(formData.mobile),
      gender: formData.gender ? "" : "Please select your gender",
      locality: formData.locality ? "" : "Please select your locality",
    };
    if (formData.locality === "Other") {
      newErrors.otherLocality = formData.otherLocality.trim() ? "" : "Please enter your locality";
    }
    if (allowJoiningSourceSelection) {
      newErrors.joiningSource = formData.joiningSource ? "" : "Please select a joining source";
    }
    const hasService =
      formData.cookingServices ||
      formData.cleaningServices ||
      formData.babyCareServices ||
      formData.elderCareServices ||
      formData.otherServices;
    newErrors.services = hasService ? "" : "Please select at least one service";

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const workerId = `DCDC-${Date.now().toString().slice(-8)}`;
      const payload: WorkerIntakePayload = {
        workerId,
        onboardingDate: new Date().toISOString().split("T")[0],
        fullName: formData.fullName,
        mobile: formData.mobile,
        gender: formData.gender,
        locality: formData.locality === "Other" ? formData.otherLocality : formData.locality,
        city: "Patna",
        cookingServices: formData.cookingServices,
        cleaningServices: formData.cleaningServices,
        babyCareServices: formData.babyCareServices,
        elderCareServices: formData.elderCareServices,
        otherServices: formData.otherServices,
        shiftFullTime: formData.shiftFullTime,
        shiftPartTime: formData.shiftPartTime,
        shiftLiveIn: formData.shiftLiveIn,
        shiftDaily: formData.shiftDaily,
        remarks: formData.remarks,
        joiningSource: allowJoiningSourceSelection ? formData.joiningSource : joiningSource ?? "",
        createdBy,
      };

      const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WORKER_INTAKE_WEBHOOK_URL;
      if (!n8nWebhookUrl) {
        console.error("NEXT_PUBLIC_N8N_WORKER_INTAKE_WEBHOOK_URL not configured");
        setSubmitError("Submissions are temporarily unavailable. Please try again later.");
        return;
      }

      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: { result?: string } = {};
      try {
        data = await response.json();
      } catch {
        // non-JSON response, treated as failure below
      }

      if (!response.ok || data.result !== "success") {
        setSubmitError("Something went wrong submitting your details. Please try again.");
        return;
      }

      setFormData(initialFormData);
      onSuccess(payload);
    } catch (error) {
      console.error("Error submitting worker intake:", error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-6">
      <div>
        <label className="block h4 mb-3 text-text-primary">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={`form-input ${errors.fullName ? "border-red-500" : ""}`}
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block h4 mb-3 text-text-primary">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className={`form-input ${errors.mobile ? "border-red-500" : ""}`}
          />
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
        </div>
        <div>
          <label className="block h4 mb-3 text-text-primary">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`form-input ${errors.gender ? "border-red-500" : ""}`}
          >
            <option value="">Select gender</option>
            {GENDER_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>
      </div>

      <div>
        <label className="block h4 mb-3 text-text-primary">Locality</label>
        <SearchableDropdown
          name="locality"
          options={LOCALITY_OPTIONS}
          value={formData.locality}
          onChange={handleLocalityChange}
          placeholder="Select your locality"
        />
        {errors.locality && <p className="text-red-500 text-sm mt-1">{errors.locality}</p>}
      </div>

      {formData.locality === "Other" && (
        <div>
          <label className="block h4 mb-3 text-text-primary">Enter Your Locality</label>
          <input
            type="text"
            name="otherLocality"
            value={formData.otherLocality}
            onChange={handleChange}
            placeholder="Your locality"
            className={`form-input ${errors.otherLocality ? "border-red-500" : ""}`}
          />
          {errors.otherLocality && <p className="text-red-500 text-sm mt-1">{errors.otherLocality}</p>}
        </div>
      )}

      {allowJoiningSourceSelection && (
        <div>
          <label className="block h4 mb-3 text-text-primary">Joining Source</label>
          <select
            name="joiningSource"
            value={formData.joiningSource}
            onChange={handleChange}
            className={`form-input ${errors.joiningSource ? "border-red-500" : ""}`}
          >
            <option value="">Select joining source</option>
            {JOINING_SOURCE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.joiningSource && <p className="text-red-500 text-sm mt-1">{errors.joiningSource}</p>}
        </div>
      )}

      <div>
        <h3 className="h4 text-text-primary mb-3">What kind of work are you looking for?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="cookingServices"
              checked={formData.cookingServices}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-text-primary">Cooking</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="cleaningServices"
              checked={formData.cleaningServices}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-text-primary">Cleaning</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="babyCareServices"
              checked={formData.babyCareServices}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-text-primary">Baby Care</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="elderCareServices"
              checked={formData.elderCareServices}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-text-primary">Elder Care</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="otherServices"
              checked={formData.otherServices}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-text-primary">Other</span>
          </label>
        </div>
        {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services}</p>}
      </div>

      <div>
        <h3 className="h4 text-text-primary mb-3">Preferred Shift (optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="shiftFullTime"
              checked={formData.shiftFullTime}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-text-primary">Full-Time</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="shiftPartTime"
              checked={formData.shiftPartTime}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-text-primary">Part-Time</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="shiftLiveIn"
              checked={formData.shiftLiveIn}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-text-primary">Live-In</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="shiftDaily"
              checked={formData.shiftDaily}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-text-primary">Daily</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block h4 mb-3 text-text-primary">Anything else you&apos;d like us to know? (optional)</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Past experience, availability, etc."
          className="form-textarea w-full"
          rows={3}
        />
      </div>

      {submitError && <p className="text-red-600 text-sm">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
}
