import { Request, Response } from 'express';
import prisma from '../prisma';
import nodemailer from 'nodemailer';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';

export const submitContact = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, companyName, email, subject, message } = req.body;

  if (!firstName || !lastName || !email || !subject || !message) {
    throw new AppError('All required fields must be filled', 400);
  }

  try {
    await prisma.contactSubmission.create({
      data: { firstName, lastName, companyName, email, subject, message },
    });

    // Send email notification if SMTP is configured — the submission above
    // has already been saved either way, so a missing/misconfigured SMTP
    // setup shouldn't turn a successful submission into a 500.
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: '"Tao Architecture" <noreply@taoarchitecture.com>',
        to: process.env.CONTACT_EMAIL || 'info@taoarchitecture.com',
        subject: `New Contact Submission: ${subject}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
      });
    }

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message' });
  }
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
