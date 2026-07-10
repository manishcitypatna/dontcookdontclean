'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Placement = {
  status?: string;
  amountReceived?: string | number;
  netProfit?: string | number;
  [key: string]: unknown;
};

function isActive(status: string): boolean {
  const s = status.toLowerCase();
  return s.includes('active') || s.includes('ongoing');
}

function isEnded(status: string): boolean {
  const s = status.toLowerCase();
  return s.includes('ended') || s.includes('completed');
}

function compactMoney(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value.toLocaleString('en-IN')}`;
}

/** Pure fetch — no React state — so it's safe to call from both the mount effect and the refresh handler. */
async function fetchPlacementsData(): Promise<Placement[]> {
  try {
    const res = await fetch('/api/placements/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function PlacementsOverviewCard() {
  const [placements, setPlacements] = useState<Placement[] | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetches only on manual "Refresh" clicks — never automatically on page load, and never polls.
  const handleRefreshClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRefreshing(true);
    fetchPlacementsData().then((list) => {
      setPlacements(list);
      setIsRefreshing(false);
    });
  };

  const hasLoaded = placements !== null;
  const total = placements?.length ?? 0;
  const active = placements?.filter((p) => isActive(String(p.status ?? ''))).length ?? 0;
  const ended = placements?.filter((p) => isEnded(String(p.status ?? ''))).length ?? 0;
  const totalRevenue = placements?.reduce((sum, p) => sum + (Number(p.amountReceived) || 0), 0) ?? 0;
  const totalProfit = placements?.reduce((sum, p) => sum + (Number(p.netProfit) || 0), 0) ?? 0;

  const activePct = total > 0 ? (active / total) * 100 : 0;
  const endedPct = total > 0 ? (ended / total) * 100 : 0;
  const otherPct = Math.max(0, 100 - activePct - endedPct);
  const profitPct = totalRevenue > 0 ? Math.min(100, (totalProfit / totalRevenue) * 100) : 0;

  return (
    <Link
      href="/admin/active-placements"
      className="card hover:shadow-lg hover:-translate-y-1 transition-all md:col-span-2"
    >
      <div className="flex items-start gap-5 mb-6">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Image
            src="/images/shared/icon/link.avif"
            alt=""
            width={26}
            height={26}
            className="w-[26px] h-[26px] object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="h3 text-text-primary mb-2">Active Placements</h3>
          <p className="body text-text-secondary">Monitor active worker-client placements</p>
        </div>
        <button
          type="button"
          onClick={handleRefreshClick}
          disabled={isRefreshing}
          aria-label="Refresh placement stats"
          className="small-text text-text-secondary hover:text-text-primary flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <span className={isRefreshing ? 'animate-spin' : ''}>↻</span>
          Refresh
        </button>
      </div>

      {isRefreshing ? (
        <p className="small-text text-text-secondary">Loading placement stats...</p>
      ) : !hasLoaded ? (
        <p className="small-text text-text-secondary">Click refresh to load placement stats.</p>
      ) : total === 0 ? (
        <p className="small-text text-text-secondary">No placements yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <p className="small-text text-text-secondary mb-1">Total</p>
                <p className="h4 text-text-primary">{total}</p>
              </div>
              <div>
                <p className="small-text text-text-secondary mb-1">Active</p>
                <p className="h4 text-green-600">{active}</p>
              </div>
              <div>
                <p className="small-text text-text-secondary mb-1">Ended</p>
                <p className="h4 text-text-primary">{ended}</p>
              </div>
            </div>

            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden flex gap-[2px]">
              {activePct > 0 && (
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${activePct}%` }} />
              )}
              {endedPct > 0 && (
                <div className="h-full bg-gray-400 rounded-full" style={{ width: `${endedPct}%` }} />
              )}
              {otherPct > 0 && (
                <div className="h-full bg-gray-200 rounded-full" style={{ width: `${otherPct}%` }} />
              )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <span className="small-text text-text-secondary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" /> Active
              </span>
              <span className="small-text text-text-secondary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-400" /> Ended
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <p className="small-text text-text-secondary">Revenue</p>
              <p className="small-text font-semibold text-text-primary">{compactMoney(totalRevenue)}</p>
            </div>
            <div className="h-2 w-full rounded-full bg-primary/15 overflow-hidden mb-3">
              <div className="h-full bg-primary rounded-full" style={{ width: `${profitPct}%` }} />
            </div>
            <div className="flex justify-between items-baseline">
              <p className="small-text text-text-secondary">Net profit</p>
              <p className="small-text font-semibold text-primary">
                {compactMoney(totalProfit)} · {profitPct.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
