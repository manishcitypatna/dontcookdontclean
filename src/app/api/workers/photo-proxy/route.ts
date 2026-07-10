import { NextRequest, NextResponse } from 'next/server';

// Proxies a Google Drive thumbnail through our own origin. The browser can display
// the direct Drive URL fine (no CORS involved in a plain <img> load), but Drive's
// thumbnail endpoint doesn't reliably send CORS headers, so canvas-based capture
// (html2canvas, for the bio-data PDF download) can't read the pixels cross-origin.
// Fetching it here server-side sidesteps CORS entirely since it's not a browser request.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const size = searchParams.get('size') || '600';

  if (!id || !/^[a-zA-Z0-9_-]+$/.test(id)) {
    return NextResponse.json({ error: 'Invalid file id' }, { status: 400 });
  }

  try {
    const driveResponse = await fetch(`https://drive.google.com/thumbnail?id=${id}&sz=w${size}`);
    if (!driveResponse.ok) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    const buffer = await driveResponse.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': driveResponse.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('[PHOTO PROXY] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}
