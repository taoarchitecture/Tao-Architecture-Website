import nodemailer from 'nodemailer';

type CareerEmailInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  positionApply: string;
  applicationId: number;
};

const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendCareerApplicationNotification = async (
  payload: CareerEmailInput
): Promise<void> => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('Skipping career email notification: SMTP credentials are missing.');
    return;
  }

  const transporter = createTransporter();
  const recipient = process.env.CAREER_NOTIFICATION_EMAIL || process.env.SMTP_USER;
  const sender = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"Tao Architecture" <${sender}>`,
    to: recipient,
    subject: `New Career Application - ${payload.positionApply}`,
    text: [
      `Application ID: ${payload.applicationId}`,
      `Name: ${payload.firstName} ${payload.lastName}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Position: ${payload.positionApply}`,
    ].join('\n'),
  });
};

type ApplicationStatusEmailInput = {
  firstName: string;
  email: string;
  positionApply: string;
};

export const sendApplicationApprovedEmail = async (
  payload: ApplicationStatusEmailInput
): Promise<void> => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('Skipping application-approved email: SMTP credentials are missing.');
    return;
  }

  const transporter = createTransporter();
  const sender = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"Tao Architecture" <${sender}>`,
    to: payload.email,
    subject: `Update on your application for ${payload.positionApply} at Tao Architecture`,
    text: `Dear ${payload.firstName},\n\nWe are pleased to inform you that your application for the ${payload.positionApply} position has been approved for the next stage. Our HR team will reach out to you shortly with further details.\n\nBest regards,\nTao Architecture Team`,
  });
};

export const sendApplicationRejectedEmail = async (
  payload: ApplicationStatusEmailInput
): Promise<void> => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('Skipping application-rejected email: SMTP credentials are missing.');
    return;
  }

  const transporter = createTransporter();
  const sender = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"Tao Architecture" <${sender}>`,
    to: payload.email,
    subject: `Update on your application for ${payload.positionApply} at Tao Architecture`,
    text: `Dear ${payload.firstName},\n\nThank you for taking the time to apply for the ${payload.positionApply} position at Tao Architecture.\n\nAfter careful consideration of your application, we regret to inform you that we will not be moving forward with your candidacy at this time. We will keep your resume on file and may reach out if a suitable opportunity arises in the future.\n\nWe wish you all the best in your job search and future career endeavors.\n\nBest regards,\nTao Architecture Team`,
  });
};
