import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';
import nodemailer from 'nodemailer';

// POST /api/career/[id]/reject — protected admin
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

    // Idempotency: Prevent double rejection
    if (application.status === 'rejected') {
      return NextResponse.json({ message: 'Application is already rejected' });
    }

    await prisma.application.update({
      where: { id: numId },
      data: { status: 'rejected' },
    });

    // Send Rejection Email to Applicant
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
        text: `Dear ${application.firstName},\n\nThank you for taking the time to apply for the ${application.positionApply} position at Tao Architecture.\n\nAfter careful consideration of your application, we regret to inform you that we will not be moving forward with your candidacy at this time. We will keep your resume on file and may reach out if a suitable opportunity arises in the future.\n\nWe wish you all the best in your job search and future career endeavors.\n\nBest regards,\nTao Architecture Team`,
      });
    }

    return NextResponse.json({ message: 'Application rejected successfully' });
  } catch (error) {
    console.error('POST /api/career/[id]/reject error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
