export type OnboardingFieldType =
  | "text"
  | "tel"
  | "email"
  | "date"
  | "select"
  | "textarea"
  | "checkbox"
  | "file";

export interface OnboardingFieldConfig {
  /** camelCase key — matches workerFieldMapping.ts */
  key: string;
  label: string;
  type: OnboardingFieldType;
  options?: string[];
  required?: boolean;
  /** Group checkboxes under one heading (e.g. "Hindi", "Shift Preferences") */
  group?: string;
}

export interface OnboardingSection {
  slug: string;
  title: string;
  description: string;
  fields: OnboardingFieldConfig[];
  /** env var name backing this section's dedicated update webhook */
  updateWebhookEnvVar: string;
}

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const MARITAL_STATUS_OPTIONS = ["Single", "Married", "Widow/Widower", "Divorced"];
const EDUCATION_OPTIONS = [
  "No Formal Education",
  "Primary (1st-5th)",
  "Middle School (6th-8th)",
  "High School (10th)",
  "Higher Secondary (12th)",
  "Graduate",
  "Post Graduate",
  "Other",
];
const WORKING_STATUS_OPTIONS = ["Job Less", "Working"];
const WILLING_TO_WORK_OPTIONS = ["yes", "no"];
const WORKER_STATUS_OPTIONS = ["Active", "Inactive", "Blacklisted"];
const RELIGION_OPTIONS = [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Buddhist",
  "Jain",
  "Jewish",
  "Baha'i",
  "Shinto",
  "Taoist",
  "Zoroastrian",
  "Animist",
  "Atheist",
  "Agnostic",
  "Other",
];
const DOCUMENT_STATUS_OPTIONS = ["Pending", "Verified", "Rejected"];
const PHYSICAL_VERIFICATION_STATUS_OPTIONS = ["Pending", "Verified", "Rejected"];
const BANK_OPTIONS = [
  "AU Small Finance Bank",
  "Axis Bank",
  "Bandhan Bank",
  "Bank of Baroda",
  "Bank of India",
  "Bank of Maharashtra",
  "Canara Bank",
  "Central Bank of India",
  "Dakshin Bihar Gramin Bank",
  "ESAF Small Finance Bank",
  "Federal Bank",
  "HDFC Bank",
  "ICICI Bank",
  "IDBI Bank",
  "IDFC First Bank",
  "Indian Bank",
  "Indian Overseas Bank",
  "IndusInd Bank",
  "Karnataka Bank",
  "Kotak Mahindra Bank",
  "Punjab & Sind Bank",
  "Punjab National Bank",
  "Reserve Bank of India",
  "South Indian Bank",
  "State Bank of India",
  "UCO Bank",
  "Ujjivan Small Finance Bank",
  "Union Bank of India",
  "Utkarsh Small Finance Bank",
  "Yes Bank",
];

export const ONBOARDING_SECTIONS: OnboardingSection[] = [
  {
    slug: "personal-details",
    title: "Personal Details",
    description: "Gender, date of birth, family names, marital status, education, contact & address",
    updateWebhookEnvVar: "WORKER_UPDATE_PERSONAL_DETAILS_WEBHOOK",
    fields: [
      { key: "gender", label: "Gender", type: "select", options: GENDER_OPTIONS, required: true },
      { key: "dob", label: "Date of Birth", type: "date", required: true },
      { key: "age", label: "Age", type: "text" },
      { key: "religion", label: "Religion", type: "select", options: RELIGION_OPTIONS },
      { key: "maritalStatus", label: "Marital Status", type: "select", options: MARITAL_STATUS_OPTIONS, required: true },
      { key: "education", label: "Education", type: "select", options: EDUCATION_OPTIONS, required: true },
      { key: "mothersName", label: "Mother's Name", type: "text" },
      { key: "fathersName", label: "Father's Name", type: "text" },
      { key: "husbandsName", label: "Husband's Name", type: "text" },
      { key: "whatsapp", label: "WhatsApp Number", type: "tel", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "presentAddress", label: "Present Address", type: "textarea", required: true },
      { key: "permanentAddress", label: "Permanent Address", type: "textarea", required: true },
    ],
  },
  {
    slug: "references-experience",
    title: "References & Experience",
    description: "References, emergency contacts, past experience, health",
    updateWebhookEnvVar: "WORKER_UPDATE_REFERENCES_EXPERIENCE_WEBHOOK",
    fields: [
      { key: "reference1", label: "Reference 1 Name", type: "text", required: true },
      { key: "reference1Relation", label: "Reference 1 Relation", type: "text", required: true },
      { key: "reference2", label: "Reference 2 Name", type: "text" },
      { key: "reference2Relation", label: "Reference 2 Relation", type: "text" },
      { key: "emergency1", label: "Emergency Contact 1 Name", type: "text", required: true },
      { key: "emergency1Relation", label: "Emergency Contact 1 Relation", type: "text", required: true },
      { key: "emergency2", label: "Emergency Contact 2 Name", type: "text" },
      { key: "emergency2Relation", label: "Emergency Contact 2 Relation", type: "text" },
      { key: "pastExperience", label: "Past Experience", type: "textarea", required: true },
      { key: "previousEmployer1", label: "Previous Employer 1", type: "text" },
      { key: "previousEmployer2", label: "Previous Employer 2", type: "text" },
      { key: "previousEmployerRemarks", label: "Previous Employer Remarks", type: "textarea" },
      { key: "healthConditions", label: "Health Conditions", type: "textarea", required: true },
    ],
  },
  {
    slug: "work-preferences",
    title: "Work Preferences",
    description: "Working status, availability, shift preferences, languages, preferred work area",
    updateWebhookEnvVar: "WORKER_UPDATE_WORK_PREFERENCES_WEBHOOK",
    fields: [
      { key: "workingStatus", label: "Working Status", type: "select", options: WORKING_STATUS_OPTIONS, required: true },
      { key: "willingToWork", label: "Willing to Work", type: "select", options: WILLING_TO_WORK_OPTIONS, required: true },
      { key: "preferredWorkArea", label: "Preferred Work Area", type: "text", required: true },
      { key: "availabilityMorning", label: "Availability — Morning", type: "text" },
      { key: "availabilityNoon", label: "Availability — Noon", type: "text" },
      { key: "availabilityEvening", label: "Availability — Evening", type: "text" },
      { key: "fullTimeShift", label: "Full-Time (8-10 Hours)", type: "checkbox", group: "Shift Preferences" },
      { key: "partTimeShift", label: "Part-Time (4-5 Hours)", type: "checkbox", group: "Shift Preferences" },
      { key: "liveInShift", label: "Live-In (24/7 Stay)", type: "checkbox", group: "Shift Preferences" },
      { key: "dailyShift", label: "Daily Basis", type: "checkbox", group: "Shift Preferences" },
      { key: "hindiSpeak", label: "Speak", type: "checkbox", group: "Hindi" },
      { key: "hindiRead", label: "Read", type: "checkbox", group: "Hindi" },
      { key: "hindiWrite", label: "Write", type: "checkbox", group: "Hindi" },
      { key: "englishSpeak", label: "Speak", type: "checkbox", group: "English" },
      { key: "englishRead", label: "Read", type: "checkbox", group: "English" },
      { key: "englishWrite", label: "Write", type: "checkbox", group: "English" },
    ],
  },
  {
    slug: "banking",
    title: "Banking",
    description: "Bank account and UPI details",
    updateWebhookEnvVar: "WORKER_UPDATE_BANKING_WEBHOOK",
    fields: [
      { key: "bankAccountHolderName", label: "Bank Account Holder Name", type: "text", required: true },
      { key: "bankName", label: "Bank Name", type: "select", options: BANK_OPTIONS, required: true },
      { key: "branchName", label: "Branch Name", type: "text", required: true },
      { key: "bankAccountNumber", label: "Bank Account Number", type: "text", required: true },
      { key: "ifsc", label: "IFSC Code", type: "text", required: true },
      { key: "upiId", label: "UPI ID", type: "text" },
    ],
  },
  {
    slug: "documents",
    title: "Documents",
    description: "Photo, ID proofs, and verification documents",
    updateWebhookEnvVar: "WORKER_UPDATE_DOCUMENTS_WEBHOOK",
    fields: [
      { key: "workerPhoto", label: "Worker Photo", type: "file", required: true },
      { key: "aadhaarNumber", label: "Aadhaar Number", type: "text", required: true },
      { key: "aadhaarFront", label: "Aadhaar Front", type: "file", required: true },
      { key: "aadhaarBack", label: "Aadhaar Back", type: "file", required: true },
      { key: "voterIdNumber", label: "Voter ID Number", type: "text" },
      { key: "voterIdFront", label: "Voter ID Front", type: "file" },
      { key: "voterIdBack", label: "Voter ID Back", type: "file" },
      { key: "panNumber", label: "PAN Number", type: "text" },
      { key: "panCard", label: "PAN Card", type: "file" },
      { key: "parentAadhaarNumber", label: "Parent/Husband Aadhaar Number", type: "text" },
      { key: "parentAadhaarFront", label: "Parent/Husband Aadhaar Front", type: "file" },
      { key: "parentAadhaarBack", label: "Parent/Husband Aadhaar Back", type: "file" },
      { key: "policeVerification", label: "Police Verification Certificate", type: "file" },
    ],
  },
  {
    slug: "status-operations",
    title: "Status & Operations",
    description: "Status, assignment, verification, and admin remarks",
    updateWebhookEnvVar: "WORKER_UPDATE_STATUS_OPERATIONS_WEBHOOK",
    fields: [
      { key: "status", label: "Status", type: "select", options: WORKER_STATUS_OPTIONS },
      { key: "assignedClientName", label: "Assigned Client Name", type: "text" },
      { key: "assignedClientId", label: "Assigned Client ID", type: "text" },
      { key: "documentStatus", label: "Document Status", type: "select", options: DOCUMENT_STATUS_OPTIONS },
      {
        key: "physicalVerificationStatus",
        label: "Physical Verification Status",
        type: "select",
        options: PHYSICAL_VERIFICATION_STATUS_OPTIONS,
      },
      { key: "followUpDate", label: "Follow-up Date", type: "date" },
      { key: "remarksDocumentSide", label: "Remarks (Document Side)", type: "textarea" },
      { key: "remarksClientSide", label: "Remarks (Client Side)", type: "textarea" },
      { key: "remarksOverall", label: "Remarks (Overall)", type: "textarea" },
    ],
  },
];

export function getSection(slug: string): OnboardingSection | undefined {
  return ONBOARDING_SECTIONS.find((s) => s.slug === slug);
}

const isFieldFilled = (value: unknown): boolean => {
  if (value === undefined || value === null) return false;
  const str = String(value).trim();
  return str !== "" && str.toUpperCase() !== "NA" && str.toUpperCase() !== "FALSE";
};

export interface SectionCompleteness {
  slug: string;
  title: string;
  totalFields: number;
  missingFields: string[];
  isComplete: boolean;
}

export function computeSectionCompleteness(
  profile: Record<string, unknown>
): SectionCompleteness[] {
  return ONBOARDING_SECTIONS.map((section) => {
    const requiredFields = section.fields.filter((f) => f.required);
    const missingFields = requiredFields
      .filter((f) => !isFieldFilled(profile[f.key]))
      .map((f) => f.key);
    return {
      slug: section.slug,
      title: section.title,
      totalFields: requiredFields.length,
      missingFields,
      isComplete: missingFields.length === 0,
    };
  });
}
