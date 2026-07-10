import type { PublicWorker } from "@/lib/workers";

export function buildAvailabilityWhatsAppLink(worker: PublicWorker): string {
  const message = `Hi, I'd like to check availability for ${worker.name} (ID: ${worker.workerId})${
    worker.locality ? ` in ${worker.locality}` : ""
  }.`;
  return `https://wa.me/918877194682?text=${encodeURIComponent(message)}`;
}
