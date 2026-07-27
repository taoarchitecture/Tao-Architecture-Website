import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';
import nodemailer from 'nodemailer';

// POST /api/career/[id]/approve — protected admin
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  const { id } = await params;
  try {
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      return NextResponse.json({ message: 'Invalid application id' }, { status: 400 });
    }

    const application = await prisma.application.findUnique({ where: { id: numId } });
    if (!application) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    // Idempotency: Prevent double approval
    if (application.status === 'approved') {
      return NextResponse.json({ message: 'Application is already approved' });
    }

    await prisma.application.update({
      where: { id: numId },
      data: { status: 'approved' },
    });

    // Send Approval Email to Applicant
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.zoho.in',
        port: 587,
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      await transporter.sendMail({
        from: `"Tao Architecture" <${process.env.SMTP_USER}>`,
        to: application.email,
        subject: `Update on your application for ${application.positionApply} at Tao Architecture`,
        text: `Dear ${application.firstName},\n\nWe are pleased to inform you that your application for the ${application.positionApply} position has been approved for the next stage. Our HR team will reach out to you shortly with further details.\n\nBest regards,\nTao Architecture Team`,
      });
    }

    return NextResponse.json({ message: 'Application approved successfully' });
  } catch (error) {
    console.error('POST /api/career/[id]/approve error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
