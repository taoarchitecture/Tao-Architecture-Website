import { Request, Response } from 'express';
import { CreateProjectInput, UpdateProjectInput } from '../schemas/project.schemas';
import {
  createProjectService,
  deleteProjectService,
  getProjectByIdService,
  getProjectBySlugService,
  listProjects,
  updateProjectService,
} from '../services/project.service';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';

const parseIdParam = (value: string) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError('Invalid project id', 400);
  }
  return id;
};

const parsePositiveInteger = (value?: string) => {
  if (!value) return undefined;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError('Pagination values must be positive integers', 400);
  }
  return parsed;
};

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const limit = parsePositiveInteger(req.query.limit?.toString());
  const cursor = parsePositiveInteger(req.query.cursor?.toString());
  const response = await listProjects(limit, cursor);
  res.json(response);
});

export const getProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
  const project = await getProjectBySlugService(req.params.slug);
  res.json(project);
});

export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseIdParam(req.params.id);
  const project = await getProjectByIdService(id);
  res.json(project);
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const created = await createProjectService(
    req.body as CreateProjectInput,
    req.files as { [fieldname: string]: Express.Multer.File[] } | undefined
  );
  res.status(201).json(created);
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const id = parseIdParam(req.params.id);
  const updated = await updateProjectService(
    id,
    req.body as UpdateProjectInput,
    req.files as { [fieldname: string]: Express.Multer.File[] } | undefined
  );
  res.json(updated);
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const id = parseIdParam(req.params.id);
  await deleteProjectService(id);
  res.json({ message: 'Project deleted successfully' });
});
