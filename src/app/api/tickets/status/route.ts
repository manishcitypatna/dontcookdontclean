import { NextRequest, NextResponse } from 'next/server';
import { remapTicketKeys } from '@/lib/ticketFieldMapping';

export async function POST(request: NextRequest) {
  try {
    const { ticketId } = await request.json();
    const response = await fetch(process.env.TICKET_STATUS_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId }),
    });
    const data = await response.json();
    const row = Array.isArray(data) ? data[0] ?? {} : data;
    return NextResponse.json(remapTicketKeys(row), { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Proxy failed', detail: String(error) }, { status: 500 });
  }
}
