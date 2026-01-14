import { Request, Response } from 'express';
import prisma from '../prisma';
import nodemailer from 'nodemailer';

export const submitContact = async (req: Request, res: Response) => {
  const { firstName, lastName, email, subject, message } = req.body;

  try {
    await prisma.contactSubmission.create({
      data: { firstName, lastName, email, subject, message },
    });

    // Send Email
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
      to: 'info@taoarchitecture.com', // Admin email
      subject: `New Contact Submission: ${subject}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message' });
  }
};
