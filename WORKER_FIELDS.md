# Worker Management — Section Fields Reference

Complete list of every input field on `/admin/worker-management/[workerId]/[section]`, grouped by section. This is the same field set for every worker — the page just fills in that worker's saved values.

Source of truth: `src/lib/onboardingSections.ts`. Each section saves independently via its own n8n webhook (see `N8N_WORKFLOWS.md`).

Reorganized 2026-07-10: Personal Details and Contact & Address merged into one section; Age/Religion moved from Status & Operations into Personal Details; languages (Hindi/English) and Preferred Work Area moved from References & Experience / Contact & Address into Work Preferences.

## 1. Personal Details — `.../personal-details`

| Field | Label | Type | Required |
|---|---|---|---|
| `gender` | Gender | select (Male/Female/Other) | ✓ |
| `dob` | Date of Birth | date | ✓ |
| `age` | Age | text | |
| `religion` | Religion | text | |
| `maritalStatus` | Marital Status | select (Single/Married/Widow(er)/Divorced) | ✓ |
| `education` | Education | select (8 options) | ✓ |
| `mothersName` | Mother's Name | text | |
| `fathersName` | Father's Name | text | |
| `husbandsName` | Husband's Name | text | |
| `whatsapp` | WhatsApp Number | tel | ✓ |
| `email` | Email | email | ✓ |
| `presentAddress` | Present Address | textarea | ✓ |
| `permanentAddress` | Permanent Address | textarea | ✓ |

## 2. References & Experience — `.../references-experience`

| Field | Label | Type | Required |
|---|---|---|---|
| `reference1` | Reference 1 Name | text | ✓ |
| `reference1Relation` | Reference 1 Relation | text | ✓ |
| `reference2` | Reference 2 Name | text | |
| `reference2Relation` | Reference 2 Relation | text | |
| `emergency1` | Emergency Contact 1 Name | text | ✓ |
| `emergency1Relation` | Emergency Contact 1 Relation | text | ✓ |
| `emergency2` | Emergency Contact 2 Name | text | |
| `emergency2Relation` | Emergency Contact 2 Relation | text | |
| `pastExperience` | Past Experience | textarea | ✓ |
| `previousEmployer1` | Previous Employer 1 | text | |
| `previousEmployer2` | Previous Employer 2 | text | |
| `previousEmployerRemarks` | Previous Employer Remarks | textarea | |
| `healthConditions` | Health Conditions | textarea | ✓ |

## 3. Work Preferences — `.../work-preferences`

| Field | Label | Type | Required |
|---|---|---|---|
| `workingStatus` | Working Status | select (Job Less/Working) | ✓ |
| `willingToWork` | Willing to Work | select (yes/no) | ✓ |
| `preferredWorkArea` | Preferred Work Area | text | ✓ |
| `availabilityMorning` / `availabilityNoon` / `availabilityEvening` | Morning / Noon / Evening | checkbox (grouped "Availability") | |
| `fullTimeShift` / `partTimeShift` / `liveInShift` / `dailyShift` | Full-Time / Part-Time / Live-In / Daily | checkbox (grouped "Shift Preferences") | |
| `hindiSpeak` / `hindiRead` / `hindiWrite` | Hindi: Speak / Read / Write | checkbox (grouped "Hindi") | |
| `englishSpeak` / `englishRead` / `englishWrite` | English: Speak / Read / Write | checkbox (grouped "English") | |

## 4. Banking — `.../banking`

| Field | Label | Type | Required |
|---|---|---|---|
| `bankAccountHolderName` | Bank Account Holder Name | text | ✓ |
| `bankName` | Bank Name | select (29 banks) | ✓ |
| `branchName` | Branch Name | text | ✓ |
| `bankAccountNumber` | Bank Account Number | text | ✓ |
| `ifsc` | IFSC Code | text | ✓ |
| `upiId` | UPI ID | text | |

## 5. Documents — `.../documents`

| Field | Label | Type | Required |
|---|---|---|---|
| `workerPhoto` | Worker Photo | file | ✓ |
| `aadhaarNumber` | Aadhaar Number | text | ✓ |
| `aadhaarFront` / `aadhaarBack` | Aadhaar Front / Back | file | ✓ / ✓ |
| `voterIdNumber` | Voter ID Number | text | |
| `voterIdFront` / `voterIdBack` | Voter ID Front / Back | file | |
| `panNumber` | PAN Number | text | |
| `panCard` | PAN Card | file | |
| `parentAadhaarNumber` | Parent/Husband Aadhaar Number | text | |
| `parentAadhaarFront` / `parentAadhaarBack` | Parent/Husband Aadhaar Front / Back | file | |
| `policeVerification` | Police Verification Certificate | file | |

## 6. Status & Operations — `.../status-operations`

| Field | Label | Type | Required |
|---|---|---|---|
| `status` | Status | select (Active/Inactive/Blacklisted) | |
| `assignedClientName` | Assigned Client Name | text | |
| `assignedClientId` | Assigned Client ID | text | |
| `documentStatus` | Document Status | select (Pending/Verified/Rejected) | |
| `physicalVerificationStatus` | Physical Verification Status | select (Pending/Verified/Rejected) | |
| `followUpDate` | Follow-up Date | date | |
| `remarksDocumentSide` / `remarksClientSide` / `remarksOverall` | Remarks (Document/Client/Overall) | textarea | |

No fields in this last section are required — it's informational/admin-managed and doesn't count toward the "onboarding pending" progress shown on the worklist.
