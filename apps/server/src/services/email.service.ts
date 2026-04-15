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
