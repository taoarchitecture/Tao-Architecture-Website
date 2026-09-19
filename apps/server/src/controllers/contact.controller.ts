import { Request, Response } from 'express';
import prisma from '../prisma';
import { z } from 'zod';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';
import { sendContactNotification } from '../services/email.service';

const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  companyName: z.string().optional().nullable(),
  email: z.string().trim().email('Valid email is required'),
  subject: z.string().trim().min(1, 'Subject is required'),
  message: z.string().trim().min(1, 'Message is required'),
});

export const submitContact = asyncHandler(async (req: Request, res: Response) => {
  const parseResult = contactSchema.safeParse(req.body);
  if (!parseResult.success) {
    const errorMsg = parseResult.error.issues.map(issue => issue.message).join(', ');
    throw new AppError(errorMsg, 400);
  }

  const { firstName, lastName, companyName, email, subject, message } = parseResult.data;

  // 1. Save submission to database
  const submission = await prisma.contactSubmission.create({
    data: {
      firstName,
      lastName,
      companyName: companyName || null,
      email,
      subject,
      message,
    },
  });

  // 2. Dispatch email notification asynchronously (without blocking or failing the request)
  sendContactNotification({
    firstName,
    lastName,
    email,
    subject,
    message,
  }).catch((err) => {
    console.warn('Failed to send contact notification email:', err instanceof Error ? err.message : err);
  });

  res.status(201).json({
    message: 'Message sent successfully',
    id: submission.id,
  });
});

export const getContactSubmissions = asyncHandler(async (req: Request, res: Response) => {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(submissions);
});

export const deleteContactSubmission = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.contactSubmission.delete({ where: { id: Number(id) } });
  res.json({ message: 'Deleted successfully' });
});
