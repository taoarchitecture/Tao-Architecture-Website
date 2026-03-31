import { Request, Response } from 'express';
import prisma from '../prisma';
import nodemailer from 'nodemailer';

export const submitContact = async (req: Request, res: Response) => {
  const { firstName, lastName, companyName, email, subject, message } = req.body;

  try {
    await prisma.contactSubmission.create({
      data: { firstName, lastName, companyName, email, subject, message },
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

export const getContactSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ message: 'Error fetching contact submissions' });
  }
};

export const deleteContactSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.contactSubmission.delete({ where: { id: Number(id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    res.status(500).json({ message: 'Error deleting contact submission' });
  }
};
