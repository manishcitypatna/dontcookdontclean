'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatCard, { StatCardGrid } from '@/components/admin/StatCard';

type Placement = {
  placementId?: string;
  leadId?: string | number;
  workerId?: string;
  clientName?: string;
  workerName?: string;
  serviceType?: string;
  shiftType?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  replacementWorkerId?: string;
  workType?: string;
  amountReceived?: string | number;
  workerCharge?: string | number;
  netProfit?: string | number;
  [key: string]: unknown;
};

function field(value: unknown): string {
  return value !== undefined && value !== null && value !== '' ? String(value) : '-';
}

function money(value: unknown): string {
  const num = Number(value);
  return Number.isFinite(num) ? `₹${num.toLocaleString('en-IN')}` : '-';
}

function statusColor(status: string): string {
  const s = status.toLowerCase();
  if (s.includes('active') || s.includes('ongoing')) return 'bg-green-100 text-green-700';
  if (s.includes('ended') || s.includes('completed')) return 'bg-gray-100 text-gray-700';
  if (s.includes('cancel') || s.includes('terminat')) return 'bg-red-100 text-red-700';
  return 'bg-gray-100 text-gray-700';
}

/** Pure fetch — no React state — so it's safe to call from both the mount effect and the refresh handler. */
async function fetchPlacementsData(): Promise<Placement[] | null> {
  try {
    const response = await fetch('/api/placements/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    const list = Array.isArray(data) ? data : null;
    return !response.ok || data?.error || list === null ? null : list;
  } catch {
    return null;
  }
}

export default function ActivePlacementsPage() {
  const [placements, setPlacements] = useState<Placement[] | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetches only on manual "Refresh" clicks — never automatically on page load, and never polls.
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPlacementsData().then((list) => {
      setIsConnected(list !== null);
      setPlacements(list ?? []);
      setIsRefreshing(false);
    });
  };

  const hasLoaded = placements !== null;
  const allPlacements = placements ?? [];
  const activeCount = allPlacements.filter((p) => field(p.status).toLowerCase().includes('active') || field(p.status).toLowerCase().includes('ongoing')).length;
  const endedCount = allPlacements.filter((p) => field(p.status).toLowerCase().includes('ended') || field(p.status).toLowerCase().includes('completed')).length;
  const totalRevenue = allPlacements.reduce((sum, p) => sum + (Number(p.amountReceived) || 0), 0);
  const totalNetProfit = allPlacements.reduce((sum, p) => sum + (Number(p.netProfit) || 0), 0);

  const idCounts = allPlacements.reduce<Record<string, number>>((acc, p) => {
    const id = field(p.placementId);
    if (id !== '-') acc[id] = (acc[id] ?? 0) + 1;
    return acc;
  }, {});
  const seenIds: Record<string, number> = {};

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        <section className="py-12">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-8 flex-wrap">
                <Link href="/admin" className="btn-outline">
                  ← Back to Dashboard
                </Link>
                <h1 className="h1 text-text-primary flex-1">Active Placements</h1>
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="btn-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className={isRefreshing ? 'animate-spin' : ''}>↻</span>
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
                <a
                  href="https://agreement.dontcookdontclean.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  + New Agreement
                </a>
              </div>

              {hasLoaded && !isRefreshing && !isConnected && (
                <div className="card bg-yellow-50 border-yellow-200 mb-8">
                  <p className="h4 text-yellow-800 flex items-center justify-center gap-2 text-center">
                    <span>🔌</span> Couldn&apos;t reach the placements webhook. Check{' '}
                    <code className="text-sm">PLACEMENTS_LIST_WEBHOOK</code> and that the n8n workflow is active.
                  </p>
                </div>
              )}

              {hasLoaded && !isRefreshing && isConnected && (
                <StatCardGrid columns={5}>
                  <StatCard label="Total Placements" value={allPlacements.length} accent="primary" />
                  <StatCard label="Active" value={activeCount} accent="secondary" />
                  <StatCard label="Ended" value={endedCount} />
                  <StatCard label="Total Revenue" value={money(totalRevenue)} accent="primary" />
                  <StatCard label="Total Net Profit" value={money(totalNetProfit)} accent="primary" />
                </StatCardGrid>
              )}

              <div className="card overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="py-4 px-4 text-text-primary font-semibold">Placement ID</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Client Name</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Worker Name</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Service</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Work Type</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Start Date</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">End Date</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Net Profit</th>
                      <th className="py-4 px-4 text-text-primary font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isRefreshing ? (
                      <tr>
                        <td colSpan={9} className="py-8 px-4 text-center text-text-secondary">
                          Loading placements...
                        </td>
                      </tr>
                    ) : !hasLoaded ? (
                      <tr>
                        <td colSpan={9} className="py-16 px-4 text-center text-text-secondary">
                          <p className="mb-4">Placements not loaded yet.</p>
                          <button type="button" onClick={handleRefresh} className="btn-primary">
                            ↻ Load Placements
                          </button>
                        </td>
                      </tr>
                    ) : allPlacements.length > 0 ? (
                      allPlacements.map((placement, i) => {
                        const id = field(placement.placementId);
                        const isDuplicateGroup = id !== '-' && idCounts[id] > 1;
                        seenIds[id] = (seenIds[id] ?? 0) + 1;
                        const isDuplicateRow = isDuplicateGroup && seenIds[id] > 1;
                        const cellClass = isDuplicateRow ? 'py-4 px-4 text-red-700' : 'py-4 px-4 text-text-secondary';

                        return (
                          <tr
                            key={(placement.row_number as number | string | undefined) ?? i}
                            className={`border-b border-border last:border-0 ${isDuplicateRow ? 'bg-red-50' : ''}`}
                          >
                            <td className={cellClass}>
                              {field(placement.placementId)}
                              {isDuplicateRow && <span className="ml-2 text-xs font-semibold uppercase">Duplicate</span>}
                            </td>
                            <td className={isDuplicateRow ? 'py-4 px-4 text-red-700 font-medium' : 'py-4 px-4 text-text-primary font-medium'}>
                              {field(placement.clientName)}
                            </td>
                            <td className={cellClass}>{field(placement.workerName)}</td>
                            <td className={cellClass}>{field(placement.serviceType)}</td>
                            <td className={cellClass}>{field(placement.workType)}</td>
                            <td className={cellClass}>{field(placement.startDate)}</td>
                            <td className={cellClass}>{field(placement.endDate)}</td>
                            <td className={cellClass}>{money(placement.netProfit)}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColor(field(placement.status))}`}>
                                {field(placement.status)}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={9} className="py-8 px-4 text-center text-text-secondary">
                          No placements yet.
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
