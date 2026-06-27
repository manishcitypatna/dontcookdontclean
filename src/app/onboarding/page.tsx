"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ThankYouPopup from "@/components/shared/ThankYouPopup";

// Define form data types
type FormDataState = {
  // Step 1
  fullName: string;
  mobileNumber: string;
  emergencyMobileNumber: string;
  // Step 2
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  state: string;
  pinCode: string;
  // Step 3
  servicesOffered: string[];
  preferredShiftType: string[];
  // Step 4
  expectedPartTimeSalary: string;
  expectedFullTimeSalary: string;
  expectedLiveInSalary: string;
  expectedDailySalary: string;
  // Step 5
  photo: File | null;
  aadharFront: File | null;
  aadharBack: File | null;
  voterId: File | null;
  panCard: File | null;
};

const initialFormData: FormDataState = {
  fullName: "",
  mobileNumber: "",
  emergencyMobileNumber: "",
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  city: "",
  state: "Bihar",
  pinCode: "",
  servicesOffered: [],
  preferredShiftType: [],
  expectedPartTimeSalary: "",
  expectedFullTimeSalary: "",
  expectedLiveInSalary: "",
  expectedDailySalary: "",
  photo: null,
  aadharFront: null,
  aadharBack: null,
  voterId: null,
  panCard: null,
};

// Services options
const SERVICES = [
  { id: "cooking", label: "Cooking", hindi: "खाना पकाना", icon: "/images/icon/cooking.avif" },
  { id: "cleaning", label: "Cleaning", hindi: "सफाई", icon: "/images/icon/cleaning.avif" },
  { id: "babysitting", label: "Babysitting", hindi: "बच्चों की देखभाल", icon: "/images/icon/babysitting.avif" },
  { id: "elder-care", label: "Elder Care", hindi: "बुज़ुर्गों की देखभाल", icon: "/images/icon/elderly.avif" },
  { id: "full-housekeeping", label: "Full Housekeeping", hindi: "पूर्ण घर की देखभाल", icon: "/images/icon/full-housekeeping.avif" },
  { id: "laundry", label: "Laundry", hindi: "कपड़े धोना", icon: "/images/icon/laundry.avif" },
  { id: "dog-walker", label: "Dog Walker", hindi: "कुत्ता चलाना", icon: "/images/icon/dog-walker.avif" },
  { id: "dishes", label: "Dishes", hindi: "बर्तन धोना", icon: "/images/icon/dishes.avif" },
];

// Shift options
const SHIFTS = [
  { 
    id: "part-time", 
    label: "Part time", 
    hindi: "अंशकालिक", 
    detail: "2hr morning & 2hr evening", 
    hindiDetail: "सुबह 2 घंटे और शाम 2 घंटे", 
    icon: "/images/icon/part-time.avif" 
  },
  { 
    id: "full-time", 
    label: "Full time", 
    hindi: "पूर्णकालिक", 
    detail: "8-10 hours complete day", 
    hindiDetail: "8-10 घंटे पूरा दिन", 
    icon: "/images/icon/full-time.avif" 
  },
  { 
    id: "live-in", 
    label: "Live in", 
    hindi: "रहने वाला", 
    detail: "Stay in house completely", 
    hindiDetail: "घर में पूरी तरह रहें", 
    icon: "/images/icon/live-in.avif" 
  },
  { 
    id: "daily", 
    label: "Daily", 
    hindi: "दैनिक", 
    detail: "Work for 1 day", 
    hindiDetail: "1 दिन के लिए काम", 
    icon: "/images/icon/hourly.avif" 
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [showThankYou, setShowThankYou] = useState(false);

  const totalSteps = 5;

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Validation helpers
  const validateMobile = (num: string) => /^\d{10}$/.test(num);
  const validatePinCode = (pin: string) => /^\d{6}$/.test(pin);

  // Step validators
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return (
          formData.fullName.trim() !== "" &&
          validateMobile(formData.mobileNumber) &&
          validateMobile(formData.emergencyMobileNumber)
        );
      case 2:
        return (
          formData.addressLine1.trim() !== "" &&
          formData.city.trim() !== "" &&
          formData.state.trim() !== "" &&
          validatePinCode(formData.pinCode)
        );
      case 3:
        return formData.servicesOffered.length > 0 && formData.preferredShiftType.length > 0;
      case 4:
        return (
          formData.expectedPartTimeSalary.trim() !== "" &&
          formData.expectedFullTimeSalary.trim() !== "" &&
          formData.expectedLiveInSalary.trim() !== "" &&
          formData.expectedDailySalary.trim() !== ""
        );
      case 5:
        return formData.photo !== null && formData.aadharFront !== null && formData.aadharBack !== null;
      default:
        return true;
    }
  };

  // Handlers
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => {
      if (prev.servicesOffered.includes(serviceId)) {
        return { ...prev, servicesOffered: prev.servicesOffered.filter((id) => id !== serviceId) };
      } else {
        return { ...prev, servicesOffered: [...prev.servicesOffered, serviceId] };
      }
    });
  };

  const handleShiftToggle = (shiftId: string) => {
    setFormData((prev) => {
      if (prev.preferredShiftType.includes(shiftId)) {
        return { ...prev, preferredShiftType: prev.preferredShiftType.filter((id) => id !== shiftId) };
      } else {
        return { ...prev, preferredShiftType: [...prev.preferredShiftType, shiftId] };
      }
    });
  };

  const handleFileChange = (name: keyof FormDataState, file: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps && isStepValid(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      setShowTutorial(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setShowTutorial(false);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid(5)) return;

    setIsSubmitting(true);
    try {
      const formDataToSubmit = new FormData();

      // Add text fields
      formDataToSubmit.append("fullName", formData.fullName);
      formDataToSubmit.append("mobileNumber", formData.mobileNumber);
      formDataToSubmit.append("emergencyMobileNumber", formData.emergencyMobileNumber);
      formDataToSubmit.append("addressLine1", formData.addressLine1);
      formDataToSubmit.append("addressLine2", formData.addressLine2);
      formDataToSubmit.append("addressLine3", formData.addressLine3);
      formDataToSubmit.append("city", formData.city);
      formDataToSubmit.append("state", formData.state);
      formDataToSubmit.append("pinCode", formData.pinCode);
      formDataToSubmit.append("servicesOffered", formData.servicesOffered.join(","));
      formDataToSubmit.append("preferredShiftType", formData.preferredShiftType.join(","));
      formDataToSubmit.append("expectedPartTimeSalary", formData.expectedPartTimeSalary);
      formDataToSubmit.append("expectedFullTimeSalary", formData.expectedFullTimeSalary);
      formDataToSubmit.append("expectedLiveInSalary", formData.expectedLiveInSalary);
      formDataToSubmit.append("expectedDailySalary", formData.expectedDailySalary);

      // Add files
      if (formData.photo) formDataToSubmit.append("photo", formData.photo);
      if (formData.aadharFront) formDataToSubmit.append("aadharFront", formData.aadharFront);
      if (formData.aadharBack) formDataToSubmit.append("aadharBack", formData.aadharBack);
      if (formData.voterId) formDataToSubmit.append("voterId", formData.voterId);
      if (formData.panCard) formDataToSubmit.append("panCard", formData.panCard);

      const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_ONBOARDING_WEBHOOK_URL;
      if (!n8nWebhookUrl) {
        throw new Error("n8n webhook URL not configured");
      }

      console.log("Submitting to n8n webhook:", n8nWebhookUrl);
      console.log("Form data keys:", [...formDataToSubmit.keys()]);

      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        body: formDataToSubmit,
      });

      console.log("Response status:", response.status, response.statusText);
      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (response.ok) {
        setShowThankYou(true);
      } else {
        throw new Error(`Submission failed: ${response.status} ${response.statusText} - ${responseText}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step icons
  const getStepIcon = () => {
    switch (currentStep) {
      case 1:
        return "/images/icon/personal_details.avif";
      case 2:
        return "/images/icon/address.avif";
      case 3:
        return "/images/icon/service.avif";
      case 4:
        return "/images/icon/salary.avif";
      case 5:
        return "/images/icon/documents.avif";
      default:
        return "";
    }
  };

  // Render steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">Full Name</span>
                <span className="text-text-secondary ml-2">(पूरा नाम)</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleTextChange}
                className="form-input"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">Mobile Number</span>
                <span className="text-text-secondary ml-2">(मोबाइल नंबर)</span>
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleTextChange}
                className="form-input"
                placeholder="10-digit number"
                maxLength={10}
              />
            </div>
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">Emergency Mobile Number</span>
                <span className="text-text-secondary ml-2">(आपातकालीन मोबाइल नंबर)</span>
              </label>
              <input
                type="tel"
                name="emergencyMobileNumber"
                value={formData.emergencyMobileNumber}
                onChange={handleTextChange}
                className="form-input"
                placeholder="10-digit number"
                maxLength={10}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">Address Line 1</span>
                <span className="text-text-secondary ml-2">(पता पंक्ति 1)</span>
              </label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleTextChange}
                className="form-input"
                placeholder="House number, street"
              />
            </div>
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">Address Line 2</span>
                <span className="text-text-secondary ml-2">(पता पंक्ति 2 - वैकल्पिक)</span>
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleTextChange}
                className="form-input"
                placeholder="Landmark, area"
              />
            </div>
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">Address Line 3</span>
                <span className="text-text-secondary ml-2">(पता पंक्ति 3 - वैकल्पिक)</span>
              </label>
              <input
                type="text"
                name="addressLine3"
                value={formData.addressLine3}
                onChange={handleTextChange}
                className="form-input"
                placeholder="Additional details"
              />
            </div>
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">City</span>
                <span className="text-text-secondary ml-2">(शहर)</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleTextChange}
                className="form-input"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">State</span>
                <span className="text-text-secondary ml-2">(राज्य)</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleTextChange}
                className="form-input"
                placeholder="State"
              />
            </div>
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">Pin Code</span>
                <span className="text-text-secondary ml-2">(पिन कोड)</span>
              </label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleTextChange}
                className="form-input"
                placeholder="6-digit pin"
                maxLength={6}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div>
              <label className="block h4 mb-4">
                <span className="text-text-primary">Services Offered</span>
                <span className="text-text-secondary ml-2">(प्रदान की जाने वाली सेवाएं)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceToggle(service.id)}
                    className={`h-auto rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all p-4 ${
                      formData.servicesOffered.includes(service.id)
                        ? "border-primary bg-primary/10"
                        : "border-border bg-white"
                    }`}
                  >
                    <Image src={service.icon} alt={service.label} width={48} height={48} className="object-contain" />
                    <div className="flex flex-col items-center gap-1 text-center">
                      <span className="font-semibold text-base">{service.label}</span>
                      <span className="text-sm text-text-secondary">{service.hindi}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block h4 mb-4">
                <span className="text-text-primary">Preferred Shift Type</span>
                <span className="text-text-secondary ml-2">(पसंदीदा शिफ्ट प्रकार)</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SHIFTS.map((shift) => (
                  <button
                    key={shift.id}
                    type="button"
                    onClick={() => handleShiftToggle(shift.id)}
                    className={`h-auto rounded-2xl border-2 flex flex-col items-start justify-between gap-4 transition-all p-5 ${
                      formData.preferredShiftType.includes(shift.id)
                        ? "border-primary bg-primary/10"
                        : "border-border bg-white"
                    }`}
                  >
                    <Image src={shift.icon} alt={shift.label} width={48} height={48} className="object-contain" />
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{shift.label}</span>
                        <span className="text-text-secondary text-base">({shift.hindi})</span>
                      </div>
                      <p className="body text-text-secondary mt-1">{shift.detail}</p>
                      <p className="text-sm text-text-secondary">{shift.hindiDetail}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">Part Time Monthly Salary (INR)</span>
                <span className="text-text-secondary ml-2">(अंशकालिक मासिक वेतन)</span>
              </label>
              <input
                type="number"
                name="expectedPartTimeSalary"
                value={formData.expectedPartTimeSalary}
                onChange={handleTextChange}
                className="form-input"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">Full Time Monthly Salary (INR)</span>
                <span className="text-text-secondary ml-2">(पूर्णकालिक मासिक वेतन)</span>
              </label>
              <input
                type="number"
                name="expectedFullTimeSalary"
                value={formData.expectedFullTimeSalary}
                onChange={handleTextChange}
                className="form-input"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">Live In Monthly Salary (INR)</span>
                <span className="text-text-secondary ml-2">(रहने वाला मासिक वेतन)</span>
              </label>
              <input
                type="number"
                name="expectedLiveInSalary"
                value={formData.expectedLiveInSalary}
                onChange={handleTextChange}
                className="form-input"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block h4 mb-3">
                <span className="text-text-primary">Daily Salary (INR)</span>
                <span className="text-text-secondary ml-2">(दैनिक वेतन)</span>
              </label>
              <input
                type="number"
                name="expectedDailySalary"
                value={formData.expectedDailySalary}
                onChange={handleTextChange}
                className="form-input"
                placeholder="Enter amount"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            {[
              { name: "photo", label: "Upload Photo", hindi: "फोटो अपलोड करें", accept: "image/*", required: true },
              { name: "aadharFront", label: "Aadhar Card Front", hindi: "आधार कार्ड सामने", accept: "image/*,.pdf", required: true },
              { name: "aadharBack", label: "Aadhar Card Back", hindi: "आधार कार्ड पीछे", accept: "image/*,.pdf", required: true },
              { name: "voterId", label: "Voter ID Card (Optional)", hindi: "वोटर आईडी कार्ड (वैकल्पिक)", accept: "image/*,.pdf", required: false },
              { name: "panCard", label: "PAN Card (Optional)", hindi: "पैन कार्ड (वैकल्पिक)", accept: "image/*,.pdf", required: false },
            ].map((fileField) => (
              <div key={fileField.name}>
                <label className="block h4 mb-3">
                  <span className="text-text-primary">{fileField.label}</span>
                  <span className="text-text-secondary ml-2">({fileField.hindi})</span>
                </label>
                {formData[fileField.name as keyof FormDataState] ? (
                  <div className="flex items-center gap-3 p-5 bg-primary/10 border-2 border-primary rounded-2xl">
                    <span className="text-3xl">✅</span>
                    <span className="body font-medium text-text-primary">
                      {(formData[fileField.name as keyof FormDataState] as File).name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleFileChange(fileField.name as keyof FormDataState, null)}
                      className="ml-auto text-red-600 font-semibold text-lg"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="block">
                    <input
                      type="file"
                      accept={fileField.accept}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file && file.size > 10 * 1024 * 1024) {
                          alert("File size must be less than 10MB");
                          return;
                        }
                        handleFileChange(fileField.name as keyof FormDataState, file);
                      }}
                    />
                    <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-primary transition-colors min-h-[48px]">
                      <p className="body font-medium text-text-primary">Click to choose a file or drag here</p>
                      <p className="text-sm text-text-secondary mt-2">Size limit: 10 MB</p>
                    </div>
                  </label>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
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
        title="Thank you! धन्यवाद!"
        message="Your onboarding form has been successfully submitted. Our team will contact you on WhatsApp within 24 hours. हमारी टीम 24 घंटे के भीतर आपको व्हाट्सएप पर संपर्क करेगी।"
        showAssistance={true}
        showGuarantee={false}
      >
        <div className="mb-6 text-center">
          <p className="text-xl font-semibold text-primary">
            +91-88771-94682
          </p>
        </div>
      </ThankYouPopup>

      {/* Error screen */}
      {submissionStatus === "error" && (
        <div className="min-h-screen flex items-center justify-center bg-background pt-24 pb-12">
          <div className="container max-w-md">
            <div className="card text-center">
              <div className="text-6xl mb-6">❌</div>
              <h2 className="h3 mb-4">
                <span className="text-text-primary">Something went wrong</span>
                <span className="text-text-secondary ml-2">कुछ गलत हो गया</span>
              </h2>
              <p className="body mb-6 text-text-secondary">
                Please try again.
                <br />
                कृपया पुनः प्रयास करें।
              </p>
              <button onClick={() => setSubmissionStatus("idle")} className="btn-primary w-full">
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main form */}
      {submissionStatus === "idle" && (
        <div className="min-h-screen bg-background pt-24 pb-12">
          <div className="container max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="h2 text-text-primary mb-2">
                Don&apos;t Cook Don&apos;t Clean Onboarding Form
              </h1>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="h4 text-text-primary">
                  Step {currentStep} of {totalSteps}
                  <span className="text-text-secondary ml-2">({currentStep} कदम {totalSteps} में से)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowTutorial(!showTutorial)}
                  className="btn-outline"
                >
                  {showTutorial ? (
                    <span>Hide Tutorial <span className="text-text-secondary ml-2">(ट्यूटोरियल छिपाएं)</span></span>
                  ) : (
                    <span>Tutorial <span className="text-text-secondary ml-2">(ट्यूटोरियल)</span></span>
                  )}
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Tutorial Video */}
            {showTutorial && (
              <div className="mb-8">
                <video
                  src={`/videos/onboarding-step-${currentStep}.mp4`}
                  controls
                  muted
                  className="w-full rounded-2xl"
                />
              </div>
            )}

            {/* Form Card */}
            <div className="card">
              {/* Step Icon */}
              <div className="text-center mb-6">
                <Image src={getStepIcon()} alt={`Step ${currentStep}`} width={60} height={60} className="mx-auto object-contain" />
              </div>

              {/* Step Content */}
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-10">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-outline flex-1"
                  >
                    Back <span className="text-text-secondary ml-2">(पीछे)</span>
                  </button>
                )}
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                    className={`flex-1 ${isStepValid(currentStep) ? "btn-primary" : "btn-primary opacity-50 cursor-not-allowed"}`}
                  >
                    Next <span className="ml-2">(आगे)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isStepValid(currentStep) || isSubmitting}
                    className={`flex-1 ${isStepValid(currentStep) && !isSubmitting ? "btn-primary" : "btn-primary opacity-50 cursor-not-allowed"}`}
                  >
                    {isSubmitting ? (
                      <span>Submitting... <span className="ml-2">(सबमिट हो रहा है...)</span></span>
                    ) : (
                      <span>Submit <span className="ml-2">(सबमिट करें)</span></span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
