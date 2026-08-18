import { Request, Response } from 'express';
import { SubmitApplicationInput } from '../schemas/career.schemas';
import {
  createApplicationService,
  deleteApplicationService,
  getApplicationByIdService,
  listApplicationsService,
  updateApplicationStatusService,
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
  // Real submissions upload to Cloudinary client-side first and send the
  // resulting URLs as plain string fields; a genuine multipart upload (if
  // this endpoint is ever called that way) still takes precedence.
  const body = req.body as SubmitApplicationInput & {
    resume?: string;
    salarySlip?: string;
    portfolio?: string;
    refLetter?: string;
  };

  if (!files?.resume?.[0] && !body.resume) {
    throw new AppError('Resume is required', 400);
  }

  const application = await createApplicationService(body, files);

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

export const approveApplication = asyncHandler(async (req: Request, res: Response) => {
  const id = parseIdParam(req.params.id);
  const result = await updateApplicationStatusService(id, 'approved');

  if (!result) {
    throw new AppError('Application not found', 404);
  }
  if (result.alreadyInStatus) {
    res.json({ message: 'Application is already approved' });
    return;
  }
  res.json({ message: 'Application approved successfully' });
});

export const rejectApplication = asyncHandler(async (req: Request, res: Response) => {
  const id = parseIdParam(req.params.id);
  const result = await updateApplicationStatusService(id, 'rejected');

  if (!result) {
    throw new AppError('Application not found', 404);
  }
  if (result.alreadyInStatus) {
    res.json({ message: 'Application is already rejected' });
    return;
  }
  res.json({ message: 'Application rejected successfully' });
});

export const deleteApplication = asyncHandler(async (req: Request, res: Response) => {
  const id = parseIdParam(req.params.id);
  await deleteApplicationService(id);
  res.json({ message: 'Application deleted successfully' });
});
