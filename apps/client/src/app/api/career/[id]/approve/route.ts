import { NextRequest } from 'next/server';
import { proxyToServer } from '@/lib/proxyToServer';

// POST /api/career/[id]/approve — protected admin. Express also owns sending
// the approval email (see career.service.ts's updateApplicationStatusService).
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToServer(req, `/api/career/${id}/approve`);
}
