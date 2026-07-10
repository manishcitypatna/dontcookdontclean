"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WorkerIntakeForm, { WorkerIntakePayload } from "@/components/forms/WorkerIntakeForm";

export default function AdminAddWorkerPage() {
  const router = useRouter();
  const [lastSubmitted, setLastSubmitted] = useState<WorkerIntakePayload | null>(null);

  if (lastSubmitted) {
    return (
      <div className="min-h-screen bg-background pb-12">
        <div className="container max-w-2xl mx-auto pt-12">
          <div className="card text-center space-y-4">
            <h1 className="h2 text-text-primary">Worker Added</h1>
            <p className="body text-text-secondary">
              <strong>{lastSubmitted.fullName}</strong> was created with Worker ID{" "}
              <strong>{lastSubmitted.workerId}</strong>. Remaining sections (personal details,
              address, references, banking, documents) can be filled in from the onboarding
              worklist.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                className="btn-primary"
                onClick={() => router.push("/admin/worker-management")}
              >
                Go to Worklist
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setLastSubmitted(null)}
              >
                Add Another Worker
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container max-w-2xl mx-auto">
        <div className="pt-8 pb-4">
          <Link href="/admin/worker-management" className="text-sm text-primary hover:underline">
            &larr; Back to Worker List
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="h2 text-text-primary mb-2">Add Worker</h1>
          <p className="text-text-secondary">
            Capture the basics for a walk-in or phone applicant. The remaining details can be
            filled in later, section by section, from the onboarding worklist.
          </p>
        </div>

        <WorkerIntakeForm
          allowJoiningSourceSelection
          createdBy="Admin Staff"
          submitLabel="Add Worker"
          onSuccess={setLastSubmitted}
        />
      </div>
    </div>
  );
}
