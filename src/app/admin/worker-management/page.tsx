'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatCard, { StatCardGrid } from '@/components/admin/StatCard';
import { computeSectionCompleteness } from '@/lib/onboardingSections';

type WorkerListItem = {
  workerId: string;
  fullName: string;
  locality: string;
  status: 'Active' | 'Inactive' | 'Blacklisted';
  onboardingDate?: string;
  mobile?: string | number;
  whatsapp?: string | number;
  preferredWorkArea?: string;
  documentStatus?: string;
  cookingServices?: unknown;
  cleaningServices?: unknown;
  babyCareServices?: unknown;
  elderCareServices?: unknown;
  otherServices?: unknown;
  [key: string]: unknown;
};

const SERVICE_FIELDS: { key: keyof WorkerListItem; label: string }[] = [
  { key: 'cookingServices', label: 'Cooking' },
  { key: 'cleaningServices', label: 'Cleaning' },
  { key: 'babyCareServices', label: 'Baby Care' },
  { key: 'elderCareServices', label: 'Elder Care' },
  { key: 'otherServices', label: 'Other' },
];

const isYes = (value: unknown): boolean =>
  value === true || value === 'Yes' || value === 'yes' || value === 'true';

function activeServices(worker: WorkerListItem): string {
  const active = SERVICE_FIELDS.filter((f) => isYes(worker[f.key])).map((f) => f.label);
  return active.length > 0 ? active.join(', ') : '-';
}

export default function AdminWorkerManagementPage() {
  const router = useRouter();
  const [workerList, setWorkerList] = useState<WorkerListItem[] | null>(null);
  const [isLoadingWorkers, setIsLoadingWorkers] = useState(false);

  // Fetches only on manual "Refresh" clicks — never automatically on page load.
  const fetchWorkerList = async () => {
    setIsLoadingWorkers(true);
    try {
      const response = await fetch('/api/workers/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setWorkerList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('[WORKERS UI] Error fetching worker list:', error);
    } finally {
      setIsLoadingWorkers(false);
    }
  };

  const rows = useMemo(() => {
    if (!workerList) return [];
    return workerList.map((worker) => ({
      worker,
      sections: computeSectionCompleteness(worker),
    }));
  }, [workerList]);

  const stats = useMemo(() => {
    const total = rows.length;
    const pending = rows.filter((r) => !r.sections.every((s) => s.isComplete)).length;
    const blacklisted = rows.filter((r) => r.worker.status === 'Blacklisted').length;
    return { total, pending, blacklisted };
  }, [rows]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        <section className="py-12">
          <div className="container">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-8 flex-wrap">
                <Link href="/admin" className="btn-outline">
                  ← Back to Dashboard
                </Link>
                <h1 className="h1 text-text-primary flex-1">Worker Management</h1>
                <button
                  type="button"
                  onClick={fetchWorkerList}
                  disabled={isLoadingWorkers}
                  className="btn-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className={isLoadingWorkers ? 'animate-spin' : ''}>↻</span>
                  {isLoadingWorkers ? 'Loading...' : 'Refresh'}
                </button>
                <Link href="/admin/worker-management/new" className="btn-primary">
                  + Add Worker
                </Link>
              </div>

              {workerList !== null && (
                <StatCardGrid columns={3}>
                  <StatCard label="Total Workers" value={stats.total} accent="primary" />
                  <StatCard label="Onboarding Pending" value={stats.pending} accent="warning" />
                  <StatCard
                    label="Blacklisted"
                    value={stats.blacklisted}
                    accent={stats.blacklisted > 0 ? 'warning' : 'default'}
                  />
                </StatCardGrid>
              )}

              <div className="card overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="py-4 px-4 text-text-primary font-semibold">Worker ID</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Onboarding Date</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Full Name</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Mobile</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">WhatsApp</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Locality</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Service</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Preferred Work Area</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Document Status</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Onboarding Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingWorkers ? (
                      <tr>
                        <td colSpan={10} className="py-8 px-4 text-center text-text-secondary">
                          Loading workers...
                        </td>
                      </tr>
                    ) : workerList === null ? (
                      <tr>
                        <td colSpan={10} className="py-16 px-4 text-center text-text-secondary">
                          <p className="mb-4">Worker list not loaded yet.</p>
                          <button type="button" onClick={fetchWorkerList} className="btn-primary">
                            ↻ Load Workers
                          </button>
                        </td>
                      </tr>
                    ) : rows.length > 0 ? (
                      rows.map(({ worker, sections }) => {
                        const isComplete = sections.every((s) => s.isComplete);
                        const pendingCount = sections.filter((s) => !s.isComplete).length;
                        return (
                          <tr
                            key={worker.workerId}
                            onClick={() => router.push(`/admin/worker-management/${worker.workerId}`)}
                            className="border-b border-border last:border-0 cursor-pointer hover:bg-gray-50"
                          >
                            <td className="py-4 px-4 text-text-primary font-medium">{worker.workerId}</td>
                            <td className="py-4 px-4 text-text-secondary">{worker.onboardingDate || '-'}</td>
                            <td className="py-4 px-4 text-text-secondary">{worker.fullName || '-'}</td>
                            <td className="py-4 px-4 text-text-secondary">{worker.mobile || '-'}</td>
                            <td className="py-4 px-4 text-text-secondary">{worker.whatsapp || '-'}</td>
                            <td className="py-4 px-4 text-text-secondary">{worker.locality || '-'}</td>
                            <td className="py-4 px-4 text-text-secondary">{activeServices(worker)}</td>
                            <td className="py-4 px-4 text-text-secondary">{worker.preferredWorkArea || '-'}</td>
                            <td className="py-4 px-4 text-text-secondary">{worker.documentStatus || '-'}</td>
                            <td className="py-4 px-4">
                              <span
                                className={`small-text px-2.5 py-1 rounded-full whitespace-nowrap ${
                                  isComplete ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                }`}
                              >
                                {isComplete ? 'Complete' : `${pendingCount} section${pendingCount === 1 ? '' : 's'} pending`}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={10} className="py-8 px-4 text-center text-text-secondary">
                          No workers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
