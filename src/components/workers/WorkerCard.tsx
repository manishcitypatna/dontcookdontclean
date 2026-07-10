import Image from "next/image";
import type { PublicWorker } from "@/lib/workers";
import { getWorkerRoleLabel } from "@/lib/workers";
import { buildAvailabilityWhatsAppLink } from "@/lib/whatsapp";
import WorkerInfoRow from "@/components/workers/WorkerInfoRow";

export default function WorkerCard({ worker }: { worker: PublicWorker }) {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-shadow flex flex-col">
      <div className="p-4 flex items-start gap-3">
        <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#e8f5d3] flex items-center justify-center text-xl sm:text-2xl shrink-0 overflow-hidden">
          {worker.photoUrl ? (
            <Image
              src={worker.photoUrl}
              alt={worker.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <span>🧑</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="h4 text-text-primary text-[1rem] sm:text-[1.05rem] truncate">{worker.name}</h4>
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

      <div className="p-4 grid grid-cols-2 gap-y-3 gap-x-4 flex-1">
        <WorkerInfoRow label="Age" value={worker.age ? `${worker.age} Yrs` : undefined} />
        <WorkerInfoRow label="Gender" value={worker.gender || undefined} />
        <WorkerInfoRow label="Marital Status" value={worker.maritalStatus} />
        <WorkerInfoRow label="Education" value={worker.education || undefined} />
        <WorkerInfoRow label="Religion" value={worker.religion} />
        <WorkerInfoRow label="Working Hours" value={worker.workTypes.length > 0 ? worker.workTypes.join(", ") : undefined} />
        <WorkerInfoRow label="Experience" value={worker.experience} />
        <WorkerInfoRow label="Language" value={worker.languages.length > 0 ? worker.languages.join(", ") : undefined} />
        <WorkerInfoRow label="Expected Salary" value={worker.expectedSalary} />
        <WorkerInfoRow label="Service" value={worker.services.length > 0 ? worker.services.join(", ") : undefined} />
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
