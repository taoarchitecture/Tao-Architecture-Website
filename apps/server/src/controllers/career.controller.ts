import { Request, Response } from 'express';
import { SubmitApplicationInput } from '../schemas/career.schemas';
import {
  createApplicationService,
  getApplicationByIdService,
  listApplicationsService,
} from '../services/career.service';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';

const parseIdParam = (value: string) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError('Invalid application id', 400);
  }
  return id;
};

export const submitApplication = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

  if (!files?.resume?.[0]) {
    throw new AppError('Resume is required', 400);
  }

  const application = await createApplicationService(req.body as SubmitApplicationInput, files);

  res.status(201).json({
    message: 'Application submitted successfully',
    applicationId: application.id,
  });
});

export const getApplications = asyncHandler(async (_req: Request, res: Response) => {
  const applications = await listApplicationsService();
  res.json(applications);
});

export const getApplicationById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseIdParam(req.params.id);
  const application = await getApplicationByIdService(id);

  if (!application) {
    throw new AppError('Application not found', 404);
  }

  res.json(application);
});
