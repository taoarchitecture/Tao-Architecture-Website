import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slotKey: string }> }) {
  const { slotKey } = await params;
  return proxyToServer(req, `/api/home-grid/${slotKey}`);
}
