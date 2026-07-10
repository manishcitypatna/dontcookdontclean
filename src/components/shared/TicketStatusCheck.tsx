"use client";
import { useState } from "react";
import SectionLabel from "@/components/shared/SectionLabel";

interface TicketResult {
  ticketId?: string;
  status?: string;
  resolutionRemarks?: string;
  nextFollowUp?: string;
}

const TICKET_ID_PATTERN = /^TKT-[A-Z]{2}\d{2}[A-Z]{2}$/i;

export default function TicketStatusCheck() {
  const [ticketId, setTicketId] = useState("");
  const [formatError, setFormatError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TicketResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setNotFound(false);

    const trimmedId = ticketId.trim().toUpperCase();
    if (!TICKET_ID_PATTERN.test(trimmedId)) {
      setFormatError("Enter a valid Ticket ID, e.g. TKT-XB17FX");
      return;
    }
    setFormatError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/tickets/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId: trimmedId }),
      });
      const data: TicketResult = await response.json();

      if (!data?.status) {
        setNotFound(true);
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error("Error checking ticket status:", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-border pt-6">
      <SectionLabel>CHECK YOUR TICKET STATUS</SectionLabel>
      <p className="small-text text-text-secondary mt-1 mb-3">
        Already submitted a request? Enter your Ticket ID to see where it stands.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={ticketId}
          onChange={(e) => {
            setTicketId(e.target.value.toUpperCase());
            setFormatError("");
          }}
          placeholder="TKT-XXXXXX"
          className={`form-input w-full ${formatError ? "border-red-500" : ""}`}
        />
        <button type="submit" disabled={isLoading} className="btn-secondary w-full">
          {isLoading ? "Checking..." : "Check Status"}
        </button>
      </form>
      {formatError && <p className="text-red-500 text-sm mt-1">{formatError}</p>}

      {notFound && (
        <p className="text-red-500 text-sm mt-3">
          We couldn&apos;t find a ticket with that ID — please double check and try again.
        </p>
      )}

      {result && (
        <div className="mt-4 space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary">
            {result.status}
          </span>
          {result.resolutionRemarks && (
            <p className="body text-text-secondary">{result.resolutionRemarks}</p>
          )}
          {result.nextFollowUp && (
            <p className="small-text text-text-secondary">Next follow-up: {result.nextFollowUp}</p>
          )}
        </div>
      )}
    </div>
  );
}
