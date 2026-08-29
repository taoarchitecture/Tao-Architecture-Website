import { z } from 'zod';

const optionalString = z.preprocess((value) => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'string' && value.trim() === '') return undefined;
  return value;
}, z.string().max(4000).optional());

export const submitApplicationSchema = z
  .object({
    firstName: z.string().trim().min(1).max(120),
    middleName: optionalString,
    lastName: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().min(6).max(30),
    positionApply: z.string().trim().min(1).max(255),
    availabilityDate: optionalString,
    whyTao: optionalString,
    landline: optionalString,
    address: optionalString,
    permanentAddress: optionalString,
    birthDate: optionalString,
    gender: optionalString,
    maritalStatus: optionalString,
    familyDetails: optionalString,
    education: optionalString,
    experience: optionalString,
    references: optionalString,
    skills: optionalString,
    expectedSalary: optionalString,
    commitmentPeriod: optionalString,
  })
  .passthrough();

export type SubmitApplicationInput = z.infer<typeof submitApplicationSchema>;
