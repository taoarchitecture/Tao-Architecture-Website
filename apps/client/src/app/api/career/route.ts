import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

// GET /api/career — protected admin, returns all applications
export async function GET(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error('GET /api/career error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// POST /api/career — public, submit an application
// In the new serverless model, file URLs (resume, portfolio, etc.) come from
// direct Cloudinary uploads done client-side before form submission.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName, lastName, email, phone, positionApply,
      availabilityDate, whyTao, landline, address, permanentAddress,
      birthDate, gender, maritalStatus, education, experience,
      references, skills, expectedSalary, commitmentPeriod,
      resume, salarySlip, portfolio, refLetter,
    } = body;

    if (!firstName || !lastName || !email || !phone || !positionApply) {
      return NextResponse.json(
        { message: 'firstName, lastName, email, phone, and positionApply are required' },
        { status: 400 }
      );
    }

    if (!resume) {
      return NextResponse.json({ message: 'Resume is required' }, { status: 400 });
    }

    const application = await prisma.application.create({
      data: {
        firstName, lastName, email, phone, positionApply,
        availabilityDate, whyTao, landline, address, permanentAddress,
        birthDate, gender, maritalStatus,
        education: education ? JSON.stringify(education) : null,
        experience: experience ? JSON.stringify(experience) : null,
        references: references ? JSON.stringify(references) : null,
        skills: skills ? JSON.stringify(skills) : null,
        expectedSalary, commitmentPeriod,
        resume, salarySlip, portfolio, refLetter,
        status: 'pending',
      },
    });

    return NextResponse.json(
      { message: 'Application submitted successfully', applicationId: application.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/career error:', error);
    return NextResponse.json({ message: 'Error submitting application' }, { status: 500 });
  }
}
