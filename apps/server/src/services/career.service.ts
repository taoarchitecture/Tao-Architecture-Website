import prisma from '../prisma';
import { SubmitApplicationInput } from '../schemas/career.schemas';
import { sendCareerApplicationNotification } from './email.service';

type UploadedFields = {
  [fieldname: string]: Express.Multer.File[] | undefined;
};

const getFilePath = (files: UploadedFields | undefined, key: string): string | null => {
  const file = files?.[key]?.[0];
  return file?.path || null;
};

export const createApplicationService = async (
  input: SubmitApplicationInput,
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
      resume: getFilePath(files, 'resume'),
      salarySlip: getFilePath(files, 'salarySlip'),
      portfolio: getFilePath(files, 'portfolio'),
      refLetter: getFilePath(files, 'refLetter'),
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
