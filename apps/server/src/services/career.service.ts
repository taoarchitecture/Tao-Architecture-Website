import prisma from '../prisma';
import { SubmitApplicationInput } from '../schemas/career.schemas';
import {
  sendCareerApplicationNotification,
  sendApplicationApprovedEmail,
  sendApplicationRejectedEmail,
} from './email.service';

type UploadedFields = {
  [fieldname: string]: Express.Multer.File[] | undefined;
};

type FileUrlFields = {
  resume?: string;
  salarySlip?: string;
  portfolio?: string;
  refLetter?: string;
};

const getFilePath = (
  files: UploadedFields | undefined,
  key: keyof FileUrlFields,
  bodyValue?: string
): string | null => {
  const file = files?.[key]?.[0];
  if (file?.path) return file.path;
  return bodyValue || null;
};

export const createApplicationService = async (
  input: SubmitApplicationInput & FileUrlFields,
  files?: UploadedFields
) => {
  const application = await prisma.application.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      positionApply: input.positionApply,
      availabilityDate: input.availabilityDate,
      whyTao: input.whyTao,
      landline: input.landline,
      address: input.address,
      permanentAddress: input.permanentAddress,
      birthDate: input.birthDate,
      gender: input.gender,
      maritalStatus: input.maritalStatus,
      education: input.education,
      experience: input.experience,
      references: input.references,
      skills: input.skills,
      expectedSalary: input.expectedSalary,
      commitmentPeriod: input.commitmentPeriod,
      resume: getFilePath(files, 'resume', input.resume),
      salarySlip: getFilePath(files, 'salarySlip', input.salarySlip),
      portfolio: getFilePath(files, 'portfolio', input.portfolio),
      refLetter: getFilePath(files, 'refLetter', input.refLetter),
    },
  });

  await sendCareerApplicationNotification({
    firstName: application.firstName,
    lastName: application.lastName,
    email: application.email,
    phone: application.phone,
    positionApply: application.positionApply,
    applicationId: application.id,
  });

  return application;
};

export const listApplicationsService = async () => {
  return prisma.application.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getApplicationByIdService = async (id: number) => {
  return prisma.application.findUnique({
    where: { id },
  });
};

export const updateApplicationStatusService = async (
  id: number,
  status: 'approved' | 'rejected'
) => {
  const application = await prisma.application.findUnique({ where: { id } });
  if (!application) return null;

  // Idempotent: re-approving/re-rejecting doesn't re-send the email.
  if (application.status === status) {
    return { application, alreadyInStatus: true };
  }

  const updated = await prisma.application.update({
    where: { id },
    data: { status },
  });

  const emailPayload = {
    firstName: updated.firstName,
    email: updated.email,
    positionApply: updated.positionApply,
  };

  if (status === 'approved') {
    await sendApplicationApprovedEmail(emailPayload);
  } else {
    await sendApplicationRejectedEmail(emailPayload);
  }

  return { application: updated, alreadyInStatus: false };
};

export const deleteApplicationService = async (id: number) => {
  await prisma.application.delete({ where: { id } });
};
