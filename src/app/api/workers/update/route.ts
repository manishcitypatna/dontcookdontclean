import { NextRequest, NextResponse } from 'next/server';
import { getSection } from '@/lib/onboardingSections';

function resolveWebhookUrl(section: string | null): string | null {
  if (!section) return null;
  const envVar = getSection(section)?.updateWebhookEnvVar;
  return envVar ? process.env[envVar] ?? null : null;
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const isMultipart = contentType.includes('multipart/form-data');

    let section: string | null;
    let response: Response;

    if (isMultipart) {
      const formData = await request.formData();
      section = formData.get('section') as string | null;
      const webhookUrl = resolveWebhookUrl(section);
      if (!webhookUrl) {
        console.error('[WORKER UPDATE API] Unknown section or missing webhook env var:', section);
        return NextResponse.json({ success: false, error: `No update webhook configured for section "${section}"` }, { status: 400 });
      }
      console.log('[WORKER UPDATE API] Section:', section, 'Webhook URL:', webhookUrl);
      response = await fetch(webhookUrl, { method: 'POST', body: formData });
    } else {
      const body = await request.json();
      section = body.section ?? null;
      const webhookUrl = resolveWebhookUrl(section);
      if (!webhookUrl) {
        console.error('[WORKER UPDATE API] Unknown section or missing webhook env var:', section);
        return NextResponse.json({ success: false, error: `No update webhook configured for section "${section}"` }, { status: 400 });
      }
      console.log('[WORKER UPDATE API] Section:', section, 'Webhook URL:', webhookUrl);
      response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    console.log('[WORKER UPDATE API] Webhook response status:', response.status);

    const text = await response.text();
    console.log('[WORKER UPDATE API] Webhook response text:', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('[WORKER UPDATE API] Failed to parse JSON:', parseError);
      return NextResponse.json({ success: false, error: 'Invalid response from webhook' }, { status: 500 });
    }

    console.log('[WORKER UPDATE API] Webhook response data:', data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[WORKER UPDATE API] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
