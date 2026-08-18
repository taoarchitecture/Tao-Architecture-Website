import { z } from 'zod';

const booleanLike = z.preprocess((value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }
  return value;
}, z.boolean());

const numberLike = z.preprocess((value) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim().length > 0) {
    return Number(value);
  }
  return value;
}, z.number().int().nonnegative());

const optionalString = z.preprocess((value) => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'string' && value.trim() === '') return undefined;
  return value;
}, z.string().max(4000).optional());

export const createProjectSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  subtitle: optionalString,
  category: z.string().min(1).max(255),
  location: optionalString,
  status: optionalString,
  plotArea: optionalString,
  builtUpArea: optionalString,
  description: optionalString,
  seoTitle: optionalString,
  seoDesc: optionalString,
  isPublished: booleanLike.default(true),
  isFeatured: booleanLike.default(false),
  order: numberLike.default(0),
  relatedProjects: optionalString,
  coverImage: optionalString,
  gallery: optionalString,
});

export const updateProjectSchema = z.object({
  title: optionalString,
  slug: optionalString,
  subtitle: optionalString,
  category: optionalString,
  location: optionalString,
  status: optionalString,
  plotArea: optionalString,
  builtUpArea: optionalString,
  description: optionalString,
  seoTitle: optionalString,
  seoDesc: optionalString,
  isPublished: z.preprocess((value) => {
    if (value === undefined || value === null || value === '') return undefined;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === 'true') return true;
      if (normalized === 'false') return false;
    }
    return value;
  }, z.boolean().optional()),
  isFeatured: z.preprocess((value) => {
    if (value === undefined || value === null || value === '') return undefined;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === 'true') return true;
      if (normalized === 'false') return false;
    }
    return value;
  }, z.boolean().optional()),
  order: z.preprocess((value) => {
    if (value === undefined || value === null || value === '') return undefined;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return Number(value);
    return value;
  }, z.number().int().nonnegative().optional()),
  relatedProjects: optionalString,
  existingGallery: optionalString,
  coverImage: optionalString,
  gallery: optionalString,
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
