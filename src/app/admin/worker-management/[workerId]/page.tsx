"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ONBOARDING_SECTIONS, computeSectionCompleteness, SectionCompleteness } from "@/lib/onboardingSections";

interface WorkerProfile {
  workerId: string;
  fullName: string;
  locality: string;
  city: string;
  status: string;
  [key: string]: unknown;
}

export default function WorkerSectionPickerPage() {
  const params = useParams<{ workerId: string }>();
  const workerId = params.workerId;

  const [profile, setProfile] = useState<WorkerProfile | null>(null);
  const [sections, setSections] = useState<SectionCompleteness[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/workers/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId }),
      });
      const data = await response.json();

      if (!data || !data.workerId) {
        setError("Worker not found.");
        setProfile(null);
        setSections(null);
        return;
      }

      setProfile(data);
      setSections(computeSectionCompleteness(data));
    } catch (err) {
      console.error("[SECTION PICKER] Error loading profile:", err);
      setError("Failed to load worker profile.");
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-3xl mx-auto pt-8">
        <Link href="/admin/worker-management" className="text-sm text-primary hover:underline">
          &larr; Back to Worker List
        </Link>

        {!hasLoaded ? (
          <div className="card text-center py-16 mt-8">
            {isLoading ? (
              <p className="text-text-secondary">Loading worker profile…</p>
            ) : (
              <>
                <p className="text-text-secondary mb-4">Worker data not loaded yet.</p>
                <button type="button" onClick={load} className="btn-primary">
                  ↻ Load Worker Data
                </button>
              </>
            )}
          </div>
        ) : error ? (
          <div className="card text-center py-16 mt-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button type="button" onClick={load} className="btn-outline">
              Try Again
            </button>
          </div>
        ) : profile && sections ? (
          <>
            <div className="mt-6 mb-8 flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="h2 text-text-primary mb-1">{profile.fullName}</h1>
                <p className="text-text-secondary">
                  {profile.workerId} · {profile.locality || "—"}, {profile.city || "—"} · {profile.status}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/admin/worker-management/${workerId}/biodata`} className="btn-outline">
                  View Full Bio-Data
                </Link>
                <button
                  type="button"
                  onClick={load}
                  disabled={isLoading}
                  className="btn-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className={isLoading ? "animate-spin" : ""}>↻</span>
                  {isLoading ? "Loading..." : "Refresh"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ONBOARDING_SECTIONS.map((section) => {
                const status = sections.find((s) => s.slug === section.slug);
                const isComplete = status?.isComplete;
                return (
                  <Link
                    key={section.slug}
                    href={`/admin/worker-management/${workerId}/${section.slug}`}
                    className="card hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="h4 text-text-primary">{section.title}</h3>
                      <span
                        className={`small-text px-2.5 py-1 rounded-full whitespace-nowrap ${
                          isComplete ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {isComplete ? "Complete" : `${status?.missingFields.length ?? "?"} pending`}
                      </span>
                    </div>
                    <p className="body text-text-secondary">{section.description}</p>
                  </Link>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
