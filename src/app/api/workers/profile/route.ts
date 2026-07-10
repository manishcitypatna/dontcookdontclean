import { NextRequest, NextResponse } from 'next/server';
import { remapWorkerKeys } from '@/lib/workerFieldMapping';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[WORKER PROFILE API] Request body:', body);
    console.log('[WORKER PROFILE API] Webhook URL:', process.env.WORKER_PROFILE_WEBHOOK);
    
    const response = await fetch(process.env.WORKER_PROFILE_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    console.log('[WORKER PROFILE API] Webhook response status:', response.status);
    console.log('[WORKER PROFILE API] Webhook response headers:', Object.fromEntries(response.headers));
    
    const text = await response.text();
    console.log('[WORKER PROFILE API] Webhook response text:', text);
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('[WORKER PROFILE API] Failed to parse JSON:', parseError);
      return NextResponse.json({ error: 'Invalid response from webhook' }, { status: 500 });
    }
    
    console.log('[WORKER PROFILE API] Webhook response data:', data);
    
    // Remap the keys from Google Sheets style to camelCase for UI
    const remappedData = remapWorkerKeys(data);
    console.log('[WORKER PROFILE API] Remapped data:', remappedData);

    return NextResponse.json(remappedData, { status: response.status });
  } catch (error) {
    console.error('[WORKER PROFILE API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
