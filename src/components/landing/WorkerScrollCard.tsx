import Image from "next/image";
import type { PublicWorker } from "@/lib/workers";
import { getWorkerRoleLabel } from "@/lib/workers";
import { buildAvailabilityWhatsAppLink } from "@/lib/whatsapp";
import WorkerInfoRow from "@/components/workers/WorkerInfoRow";

export default function WorkerScrollCard({ worker }: { worker: PublicWorker }) {
  return (
    <div className="snap-start shrink-0 w-[280px] bg-white rounded-2xl border border-border overflow-hidden flex flex-col">
      <div className="p-4 flex items-start gap-3">
        <div className="relative w-12 h-12 rounded-full bg-[#e8f5d3] flex items-center justify-center text-xl shrink-0 overflow-hidden">
          {worker.photoUrl ? (
            <Image
              src={worker.photoUrl}
              alt={worker.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <span>🧑</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="h4 text-text-primary text-[1rem] truncate">{worker.name}</h4>
            <span className="small-text bg-secondary/20 text-text-primary px-2 py-0.5 rounded-full shrink-0">
              {getWorkerRoleLabel(worker)}
            </span>
          </div>
          {(worker.locality || worker.city) && (
            <p className="small-text text-text-secondary truncate">
              {[worker.locality, worker.city].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
        {worker.documentVerified && (
          <span className="small-text bg-primary text-white font-semibold px-3 py-1 rounded-full shrink-0">
            Verified
          </span>
        )}
      </div>

      <div className="border-t border-border" />

      <div className="p-4 flex flex-col gap-3 flex-1">
        <WorkerInfoRow label="Age" value={worker.age ? `${worker.age} Yrs` : undefined} />
        <WorkerInfoRow label="Gender" value={worker.gender || undefined} />
        <WorkerInfoRow label="Marital Status" value={worker.maritalStatus} />
        <WorkerInfoRow label="Religion" value={worker.religion} />
        <WorkerInfoRow label="Working Hours" value={worker.workTypes.length > 0 ? worker.workTypes.join(", ") : undefined} />
        <WorkerInfoRow label="Experience" value={worker.experience} />
        <WorkerInfoRow label="Language" value={worker.languages.length > 0 ? worker.languages.join(", ") : undefined} />
        <WorkerInfoRow label="Expected Salary" value={worker.expectedSalary} />
      </div>

      {worker.expectedSalary && (
        <p className="px-4 pb-4 text-xs text-text-secondary italic">
          *Salary may vary depending on locality, timing, shift, and family size.
        </p>
      )}

      <div className="border-t border-border" />

      <div className="p-4">
        <a
          href={buildAvailabilityWhatsAppLink(worker)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full rounded-full bg-primary text-white text-sm font-semibold py-2.5 hover:scale-[1.02] transition-transform"
        >
          Check Availability
        </a>
      </div>
    </div>
  );
}
