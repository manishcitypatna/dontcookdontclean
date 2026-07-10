import { NextRequest, NextResponse } from 'next/server';
import { remapPlacementKeys } from '@/lib/placementFieldMapping';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(process.env.PLACEMENTS_LIST_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    const placements = Array.isArray(data) ? data : Array.isArray(data?.placements) ? data.placements : [];
    return NextResponse.json(remapPlacementKeys(placements));
  } catch (error) {
    return NextResponse.json({ error: 'Proxy failed', detail: String(error) }, { status: 500 });
  }
}
