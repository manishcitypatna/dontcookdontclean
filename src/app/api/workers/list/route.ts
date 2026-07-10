import { NextRequest, NextResponse } from 'next/server';
import { remapWorkerKeys } from '@/lib/workerFieldMapping';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[WORKER LIST API] Request body:', body);
    console.log('[WORKER LIST API] Webhook URL:', process.env.WORKER_LIST_WEBHOOK);
    
    const response = await fetch(process.env.WORKER_LIST_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    console.log('[WORKER LIST API] Webhook response status:', response.status);
    console.log('[WORKER LIST API] Webhook response headers:', Object.fromEntries(response.headers));
    
    const data = await response.json();
    console.log('[WORKER LIST API] Webhook response data:', data);
    
    // Get workers array from data (data.workers) or use data directly if it's an array
    let workers = Array.isArray(data) ? data : (Array.isArray(data?.workers) ? data.workers : []);
    console.log('[WORKER LIST API] Workers array before remap:', workers);
    
    // Remap keys for each worker
    workers = remapWorkerKeys(workers);
    console.log('[WORKER LIST API] Workers array after remap:', workers);

    return NextResponse.json(workers, { status: response.status });
  } catch (error) {
    console.error('[WORKER LIST API] Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
