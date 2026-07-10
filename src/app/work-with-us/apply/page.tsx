"use client";
import { useState } from "react";
import ThankYouPopup from "@/components/shared/ThankYouPopup";
import WorkerIntakeForm from "@/components/forms/WorkerIntakeForm";

export default function ApplyPage() {
  const [showThankYou, setShowThankYou] = useState(false);

  return (
    <>
      <ThankYouPopup
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        title="Thanks for Reaching Out!"
        message="Our team will call or WhatsApp you within 24-48 hours to complete your registration."
        showAssistance={true}
        showGuarantee={false}
      />

      <div className="min-h-screen bg-background pb-12">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-8 pt-12">
            <h1 className="h2 text-text-primary mb-2">Join as a Helper</h1>
            <p className="text-text-secondary">
              Tell us a little about yourself and our team will reach out to complete your registration.
            </p>
          </div>

          <WorkerIntakeForm
            joiningSource="Website"
            createdBy="Website Form"
            submitLabel="Submit Application"
            onSuccess={() => setShowThankYou(true)}
          />
        </div>
      </div>
    </>
  );
}
