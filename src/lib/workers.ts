import { remapWorkerKeys } from "@/lib/workerFieldMapping";
import { getMockWorkersList } from "@/data/workers";

export interface PublicWorker {
  workerId: string;
  name: string;
  age: string;
  gender: string;
  locality: string;
  city: string;
  services: string[];
  workTypes: string[];
  languages: string[];
  education: string;
  documentVerified: boolean;
  available: boolean;
  photoUrl: string | null;
  maritalStatus?: string;
  religion?: string;
  experience?: string;
  expectedSalary?: string;
}

/** Raw worker record after key remapping — only the fields we ever read from it. */
interface RemappedWorker {
  workerId?: string;
  fullName?: string;
  age?: string | number;
  gender?: string;
  locality?: string;
  city?: string;
  education?: string;
  status?: string;
  workingStatus?: string;
  willingToWork?: string;
  documentStatus?: string;
  physicalVerificationStatus?: string;
  workerPhoto?: string;
  cookingServices?: string;
  cleaningServices?: string;
  babyCareServices?: string;
  elderCareServices?: string;
  otherServices?: string;
  fullTimeShift?: string;
  partTimeShift?: string;
  liveInShift?: string;
  dailyShift?: string;
  hindiRead?: string;
  hindiWrite?: string;
  hindiSpeak?: string;
  englishRead?: string;
  englishWrite?: string;
  englishSpeak?: string;
  [key: string]: unknown;
}

const TRUTHY_PATTERN = /^(yes|y|true|1)$/i;
const VERIFIED_PATTERN = /verified|approved|completed/i;
const EXCLUDED_STATUS_PATTERN = /inactive|blacklist/i;

function isTruthy(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return TRUTHY_PATTERN.test(value.trim());
  return false;
}

function isVerified(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return TRUTHY_PATTERN.test(value.trim()) || VERIFIED_PATTERN.test(value.trim());
  return false;
}

function nonEmpty(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/** True when a worker record is eligible to appear anywhere on the public site at all. */
export function isPubliclyVisible(worker: RemappedWorker): boolean {
  const status = worker.status ?? "";
  return !EXCLUDED_STATUS_PATTERN.test(status);
}

function deriveServices(worker: RemappedWorker): string[] {
  const services: string[] = [];
  if (isTruthy(worker.cookingServices)) services.push("Cooking");
  if (isTruthy(worker.cleaningServices)) services.push("Cleaning");
  if (isTruthy(worker.babyCareServices)) services.push("Baby & Child Care");
  if (isTruthy(worker.elderCareServices)) services.push("Elder Care");
  const other = nonEmpty(worker.otherServices);
  if (other && !TRUTHY_PATTERN.test(other) && other.toLowerCase() !== "no") {
    services.push(other);
  }
  return services;
}

function deriveWorkTypes(worker: RemappedWorker): string[] {
  const types: string[] = [];
  if (isTruthy(worker.fullTimeShift)) types.push("Full-Time");
  if (isTruthy(worker.partTimeShift)) types.push("Part-Time");
  if (isTruthy(worker.liveInShift)) types.push("Live-In");
  if (isTruthy(worker.dailyShift)) types.push("Daily");
  return types;
}

function deriveLanguages(worker: RemappedWorker): string[] {
  const languages: string[] = [];

  const hindiSkills = [
    isTruthy(worker.hindiSpeak) && "Speak",
    isTruthy(worker.hindiRead) && "Read",
    isTruthy(worker.hindiWrite) && "Write",
  ].filter(Boolean) as string[];
  if (hindiSkills.length > 0) languages.push(`Hindi (${hindiSkills.join(", ")})`);

  const englishSkills = [
    isTruthy(worker.englishSpeak) && "Speak",
    isTruthy(worker.englishRead) && "Read",
    isTruthy(worker.englishWrite) && "Write",
  ].filter(Boolean) as string[];
  if (englishSkills.length > 0) languages.push(`English (${englishSkills.join(", ")})`);

  return languages;
}

/**
 * Maps a raw (already key-remapped) worker record to the safe public shape.
 * Deliberately allowlist-based: only fields explicitly read here ever reach the client.
 * Never pass through mobile, whatsapp, email, addresses, bank details, or ID document numbers/links.
 */
export function mapToPublicWorker(worker: RemappedWorker): PublicWorker {
  return {
    workerId: nonEmpty(worker.workerId) ?? "",
    name: nonEmpty(worker.fullName) ?? "Helper",
    age: nonEmpty(String(worker.age ?? "")) ?? "",
    gender: nonEmpty(worker.gender) ?? "",
    locality: nonEmpty(worker.locality) ?? "",
    city: nonEmpty(worker.city) ?? "Patna",
    services: deriveServices(worker),
    workTypes: deriveWorkTypes(worker),
    languages: deriveLanguages(worker),
    education: nonEmpty(worker.education) ?? "",
    documentVerified: isVerified(worker.documentStatus) && isVerified(worker.physicalVerificationStatus),
    available: isTruthy(worker.willingToWork) && !EXCLUDED_STATUS_PATTERN.test(worker.workingStatus ?? ""),
    photoUrl: nonEmpty(worker.workerPhoto),
  };
}

const SERVICE_ROLE_LABELS: Record<string, string> = {
  "Cooking": "Cook",
  "Cleaning": "Maid",
  "Baby & Child Care": "Nanny",
  "Elder Care": "Caretaker",
};

/** Short one-word role badge derived from a worker's primary service. */
export function getWorkerRoleLabel(worker: PublicWorker): string {
  return SERVICE_ROLE_LABELS[worker.services[0]] ?? "Helper";
}

function matchesLocality(worker: PublicWorker, locality?: string): boolean {
  if (!locality) return true;
  // Exact match (not substring) — locality always comes from the fixed
  // LOCALITY_OPTIONS dropdown, and substring matching wrongly pulled
  // "New Patliputra Colony" workers into "Patliputra Colony" results.
  return worker.locality.toLowerCase() === locality.toLowerCase();
}

async function fetchWebhook(url: string | undefined, body: unknown): Promise<unknown> {
  if (!url) return null;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export interface WorkerFilterOptions {
  service?: string;
  workType?: string;
  sort?: string;
}

function parseLeadingNumber(value: string | undefined): number {
  if (!value) return 0;
  const match = value.replace(/,/g, "").match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

/** Filters and sorts an already-fetched worker list based on listing-page query params. */
export function filterAndSortWorkers(workers: PublicWorker[], options: WorkerFilterOptions): PublicWorker[] {
  let result = workers;

  if (options.service) {
    result = result.filter((worker) => worker.services.includes(options.service!));
  }
  if (options.workType) {
    result = result.filter((worker) => worker.workTypes.includes(options.workType!));
  }

  switch (options.sort) {
    case "experience_desc":
      result = [...result].sort((a, b) => parseLeadingNumber(b.experience) - parseLeadingNumber(a.experience));
      break;
    case "experience_asc":
      result = [...result].sort((a, b) => parseLeadingNumber(a.experience) - parseLeadingNumber(b.experience));
      break;
    case "age_asc":
      result = [...result].sort((a, b) => parseLeadingNumber(a.age) - parseLeadingNumber(b.age));
      break;
    case "age_desc":
      result = [...result].sort((a, b) => parseLeadingNumber(b.age) - parseLeadingNumber(a.age));
      break;
    case "salary_asc":
      result = [...result].sort((a, b) => parseLeadingNumber(a.expectedSalary) - parseLeadingNumber(b.expectedSalary));
      break;
    case "salary_desc":
      result = [...result].sort((a, b) => parseLeadingNumber(b.expectedSalary) - parseLeadingNumber(a.expectedSalary));
      break;
  }

  return result;
}

export async function getPublicWorkersList(locality?: string): Promise<PublicWorker[]> {
  // The connected sheet currently only has a handful of sparsely-filled test rows.
  // Serve the fully-detailed mock directory until WORKERS_USE_LIVE_DATA is flipped on.
  if (process.env.WORKERS_USE_LIVE_DATA !== "true") {
    return getMockWorkersList(locality);
  }

  const data = await fetchWebhook(process.env.WORKER_LIST_WEBHOOK, {});
  const rawList = Array.isArray(data) ? data : Array.isArray((data as { workers?: unknown })?.workers) ? (data as { workers: unknown[] }).workers : [];

  const remapped = remapWorkerKeys(rawList) as RemappedWorker[];

  return remapped
    .filter(isPubliclyVisible)
    .map(mapToPublicWorker)
    .filter((worker) => matchesLocality(worker, locality));
}
