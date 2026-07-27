import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';
import nodemailer from 'nodemailer';

// POST /api/contact — public
export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, companyName, email, subject, message } = await req.json();

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ message: 'All required fields must be filled' }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: { firstName, lastName, companyName, email, subject, message },
    });

    // Send email notification if SMTP is configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.zoho.in',
        port: 587,
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      await transporter.sendMail({
        from: `"Tao Architecture" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || 'info@taoarchitecture.com',
        subject: `New Contact Submission: ${subject}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nCompany: ${companyName || 'N/A'}\nMessage: ${message}`,
      });
    }

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/contact error:', error);
    return NextResponse.json({ message: 'Error sending message' }, { status: 500 });
  }
}

// GET /api/contact — protected admin
export async function GET(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('GET /api/contact error:', error);
    return NextResponse.json({ message: 'Error fetching submissions' }, { status: 500 });
  }
}
