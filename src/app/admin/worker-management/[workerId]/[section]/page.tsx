"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getSection, OnboardingFieldConfig } from "@/lib/onboardingSections";

type FieldValue = string | boolean;

const isEmpty = (value: unknown): boolean => {
  if (value === undefined || value === null) return true;
  const str = String(value).trim();
  return str === "" || str.toUpperCase() === "NA";
};

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

// DOB may be "YYYY-MM-DD" (native date input) or "DD-MMM-YYYY" (sheet format, e.g. "12-Dec-1996")
const parseDob = (dobValue: string): Date | null => {
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dobValue);
  if (isoMatch) {
    const d = new Date(`${dobValue}T00:00:00`);
    return isNaN(d.getTime()) ? null : d;
  }
  const sheetMatch = /^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/.exec(dobValue);
  if (sheetMatch) {
    const month = MONTHS[sheetMatch[2].toLowerCase()];
    if (month === undefined) return null;
    const d = new Date(Number(sheetMatch[3]), month, Number(sheetMatch[1]));
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
};

const calculateAge = (dobValue: string): string | null => {
  const dob = parseDob(dobValue);
  if (!dob) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;
  return age >= 0 && age <= 130 ? String(age) : null;
};

export default function OnboardingSectionFormPage() {
  const params = useParams<{ workerId: string; section: string }>();
  const router = useRouter();
  const { workerId, section: sectionSlug } = params;

  const section = useMemo(() => getSection(sectionSlug), [sectionSlug]);
  const hasFileFields = useMemo(
    () => section?.fields.some((f) => f.type === "file") ?? false,
    [section]
  );

  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [values, setValues] = useState<Record<string, FieldValue>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const load = async () => {
    if (!section) return;
    setIsLoading(true);
    setLoadError("");
    try {
      const response = await fetch("/api/workers/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId }),
      });
      const data = await response.json();

      if (!data || !data.workerId) {
        setLoadError("Worker not found.");
        return;
      }

      setProfile(data);
      const initialValues: Record<string, FieldValue> = {};
      for (const field of section.fields) {
        if (field.type === "file") continue;
        if (field.type === "checkbox") {
          initialValues[field.key] = data[field.key] === true || data[field.key] === "true";
        } else {
          const raw = data[field.key];
          initialValues[field.key] = isEmpty(raw) ? "" : String(raw);
        }
      }
      if (section.fields.some((f) => f.key === "age") && section.fields.some((f) => f.key === "dob")) {
        const computedAge = calculateAge(String(initialValues.dob ?? ""));
        if (computedAge !== null) initialValues.age = computedAge;
      }
      setValues(initialValues);
    } catch (err) {
      console.error("[SECTION FORM] Error loading profile:", err);
      setLoadError("Failed to load worker profile.");
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  };

  if (!section) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="container max-w-2xl mx-auto pt-8">
          <Link href={`/admin/worker-management/${workerId}`} className="text-sm text-primary hover:underline">
            &larr; Back
          </Link>
          <p className="text-red-600 mt-8">Unknown section &quot;{sectionSlug}&quot;.</p>
        </div>
      </div>
    );
  }

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setValues((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      };
      if (name === "dob" && section.fields.some((f) => f.key === "age")) {
        const computedAge = calculateAge(value);
        if (computedAge !== null) updated.age = computedAge;
      }
      return updated;
    });
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (key: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
    setFieldErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!section) return;

    const newErrors: Record<string, string> = {};
    for (const field of section.fields) {
      if (!field.required) continue;
      if (field.type === "file") {
        const hasExisting = profile ? !isEmpty(profile[field.key]) : false;
        const hasNewFile = Boolean(files[field.key]);
        if (!hasExisting && !hasNewFile) newErrors[field.key] = `${field.label} is required`;
      } else if (field.type !== "checkbox" && isEmpty(values[field.key])) {
        newErrors[field.key] = `${field.label} is required`;
      }
    }
    setFieldErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSaving(true);
    setSaveError("");
    setSaveSuccess(false);
    try {
      let response: Response;
      if (hasFileFields) {
        const formData = new FormData();
        formData.append("workerId", workerId);
        formData.append("section", sectionSlug);
        for (const field of section.fields) {
          if (field.type === "file") continue;
          formData.append(field.key, String(values[field.key] ?? ""));
        }
        for (const [key, file] of Object.entries(files)) {
          if (file) formData.append(key, file);
        }
        response = await fetch("/api/workers/update", { method: "POST", body: formData });
      } else {
        response = await fetch("/api/workers/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workerId, section: sectionSlug, ...values }),
        });
      }

      let data: { result?: string; message?: string } = {};
      try {
        data = await response.json();
      } catch {
        // non-JSON response, treated as failure below
      }

      if (response.ok && data.result === "success") {
        setSaveSuccess(true);
        setTimeout(() => router.push(`/admin/worker-management/${workerId}`), 1200);
      } else {
        setSaveError(data.message || "Failed to save changes. Please try again.");
      }
    } catch (err) {
      console.error("[SECTION FORM] Error saving section:", err);
      setSaveError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderField = (field: OnboardingFieldConfig) => {
    const error = fieldErrors[field.key];
    const label = (
      <label className="block h4 mb-2 text-text-primary">
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>
    );

    switch (field.type) {
      case "select":
        return (
          <div key={field.key}>
            {label}
            <select
              name={field.key}
              value={(values[field.key] as string) ?? ""}
              onChange={handleTextChange}
              className={`form-input ${error ? "border-red-500" : ""}`}
            >
              <option value="">Select {field.label.toLowerCase()}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case "textarea":
        return (
          <div key={field.key}>
            {label}
            <textarea
              name={field.key}
              value={(values[field.key] as string) ?? ""}
              onChange={handleTextChange}
              rows={3}
              className={`form-textarea w-full ${error ? "border-red-500" : ""}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case "file": {
        const existingLink = profile ? profile[field.key] : undefined;
        return (
          <div key={field.key}>
            {label}
            {typeof existingLink === "string" && existingLink && !isEmpty(existingLink) && (
              <a
                href={existingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-primary hover:underline mb-2"
              >
                View current file
              </a>
            )}
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(field.key, e.target.files?.[0] ?? null)}
              className={`form-input ${error ? "border-red-500" : ""}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      }
      case "text":
      case "tel":
      case "email":
      case "date": {
        const isAutoAge = field.key === "age";
        return (
          <div key={field.key}>
            {label}
            <input
              type={field.type}
              name={field.key}
              value={(values[field.key] as string) ?? ""}
              onChange={handleTextChange}
              disabled={isAutoAge}
              placeholder={isAutoAge ? "Auto-calculated from Date of Birth" : undefined}
              className={`form-input ${isAutoAge ? "bg-gray-50 text-text-secondary cursor-not-allowed" : ""} ${error ? "border-red-500" : ""}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      }
      default:
        return null;
    }
  };

  // Group checkbox fields by their `group` label; everything else renders individually.
  const checkboxGroups = new Map<string, OnboardingFieldConfig[]>();
  const standaloneFields: OnboardingFieldConfig[] = [];
  for (const field of section.fields) {
    if (field.type === "checkbox" && field.group) {
      if (!checkboxGroups.has(field.group)) checkboxGroups.set(field.group, []);
      checkboxGroups.get(field.group)!.push(field);
    } else {
      standaloneFields.push(field);
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-2xl mx-auto">
        <div className="pt-8 pb-4">
          <Link href={`/admin/worker-management/${workerId}`} className="text-sm text-primary hover:underline">
            &larr; Back to Sections
          </Link>
        </div>

        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="h2 text-text-primary mb-2">{section.title}</h1>
            <p className="text-text-secondary">{section.description}</p>
          </div>
          {hasLoaded && !loadError && (
            <button
              type="button"
              onClick={load}
              disabled={isLoading}
              className="btn-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className={isLoading ? "animate-spin" : ""}>↻</span>
              {isLoading ? "Loading..." : "Refresh"}
            </button>
          )}
        </div>

        {!hasLoaded ? (
          <div className="card text-center py-16">
            {isLoading ? (
              <p className="text-text-secondary">Loading current data…</p>
            ) : (
              <>
                <p className="text-text-secondary mb-4">
                  Load the worker&apos;s current data before editing this section.
                </p>
                <button type="button" onClick={load} className="btn-primary">
                  ↻ Load Current Data
                </button>
              </>
            )}
          </div>
        ) : loadError ? (
          <div className="card text-center py-16">
            <p className="text-red-600 mb-4">{loadError}</p>
            <button type="button" onClick={load} className="btn-outline">
              Try Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-6">
            {standaloneFields.map(renderField)}

            {Array.from(checkboxGroups.entries()).map(([group, fields]) => (
              <div key={group}>
                <h3 className="h4 text-text-primary mb-3">{group}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fields.map((field) => (
                    <label key={field.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name={field.key}
                        checked={Boolean(values[field.key])}
                        onChange={handleTextChange}
                        className="w-5 h-5"
                      />
                      <span className="text-text-primary">{field.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {saveError && <p className="text-red-600">{saveError}</p>}
            {saveSuccess && <p className="text-green-600">Saved successfully. Returning to sections…</p>}

            <button type="submit" disabled={isSaving} className="btn-primary w-full">
              {isSaving ? "Saving..." : "Save Section"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
