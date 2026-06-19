import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const indexPath = path.join(process.cwd(), 'public', 'admin', 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8');

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

export const dynamic = 'force-dynamic';
