import prisma from '../prisma';
import { deleteUploadedFile } from '../middleware/upload.middleware';
import { CreateProjectInput, UpdateProjectInput } from '../schemas/project.schemas';
import { AppError } from '../utils/app-error';
import { safeJsonParse } from '../utils/json';

type UploadedFields = {
  [fieldname: string]: Express.Multer.File[] | undefined;
};

type GalleryItem = {
  url: string;
  caption: string;
  order: number;
};

const isUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const toPublicFilePath = (file: Express.Multer.File): string => {
  return isUrl(file.path) ? file.path : `/uploads/${file.filename}`;
};

const mapProjectForRead = (project: {
  description: string | null;
  gallery: string | null;
}) => ({
  ...project,
  description: safeJsonParse(project.description, null),
  gallery: safeJsonParse<GalleryItem[]>(project.gallery, []),
});

export const listProjects = async (limit?: number, cursor?: number, onlyPublished = false) => {
  const where = onlyPublished ? { isPublished: true } : undefined;

  if (!limit) {
    // Admin-configurable display order, not insertion order — this is what the
    // public site's category listings (e.g. /work) expect to sort by.
    const projects = await prisma.project.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    return projects.map(mapProjectForRead);
  }

  const projects = await prisma.project.findMany({
    where,
    orderBy: { id: 'desc' },
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasNextPage = projects.length > limit;
  const items = hasNextPage ? projects.slice(0, limit) : projects;
  const nextCursor = hasNextPage ? items[items.length - 1]?.id ?? null : null;

  return {
    items: items.map(mapProjectForRead),
    nextCursor,
    hasNextPage,
  };
};

// onlyPublished uses findFirst (not findUnique) so it can combine the unique
// lookup with the isPublished condition without depending on Prisma's
// extended-where-unique support — a filtered-out project surfaces as the same
// "not found" 404 as a nonexistent one, rather than a distinct 403 that would
// confirm a hidden project exists at that slug/id.
export const getProjectBySlugService = async (slug: string, onlyPublished = false) => {
  const project = await prisma.project.findFirst({
    where: onlyPublished ? { slug, isPublished: true } : { slug },
  });

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  return mapProjectForRead(project);
};

export const getProjectByIdService = async (id: number, onlyPublished = false) => {
  const project = await prisma.project.findFirst({
    where: onlyPublished ? { id, isPublished: true } : { id },
  });

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  return mapProjectForRead(project);
};

export const createProjectService = async (input: CreateProjectInput, files?: UploadedFields) => {
  const coverImageFile = files?.coverImage?.[0];
  const galleryFiles = files?.gallery || [];

  const galleryData: GalleryItem[] = galleryFiles.map((file, index) => ({
    url: toPublicFilePath(file),
    caption: '',
    order: index,
  }));

  const project = await prisma.project.create({
    data: {
      title: input.title,
      slug: input.slug,
      subtitle: input.subtitle,
      category: input.category,
      location: input.location,
      status: input.status,
      plotArea: input.plotArea,
      builtUpArea: input.builtUpArea,
      description: input.description || '[]',
      seoTitle: input.seoTitle,
      seoDesc: input.seoDesc,
      isPublished: input.isPublished,
      isFeatured: input.isFeatured,
      order: input.order,
      relatedProjects: input.relatedProjects || '[]',
      coverImage: input.coverImage || (coverImageFile ? toPublicFilePath(coverImageFile) : null),
      gallery: input.gallery || JSON.stringify(galleryData),
    },
  });

  return project;
};

export const updateProjectService = async (
  id: number,
  input: UpdateProjectInput,
  files?: UploadedFields
) => {
  const existingProject = await prisma.project.findUnique({ where: { id } });
  if (!existingProject) {
    throw new AppError('Project not found', 404);
  }

  const coverImageFile = files?.coverImage?.[0];
  const newGalleryFiles = files?.gallery || [];

  let coverImageUrl = existingProject.coverImage;
  if (input.coverImage !== undefined) {
    // Clean up the previous Cloudinary/local file whenever it's actually being
    // replaced — deleteUploadedFile already knows how to handle both kinds of
    // path, so there's no need to special-case URLs here.
    if (existingProject.coverImage && existingProject.coverImage !== input.coverImage) {
      await deleteUploadedFile(existingProject.coverImage);
    }
    coverImageUrl = input.coverImage;
  } else if (coverImageFile) {
    if (existingProject.coverImage) {
      await deleteUploadedFile(existingProject.coverImage);
    }
    coverImageUrl = toPublicFilePath(coverImageFile);
  }

  let galleryDataString = input.gallery;
  if (galleryDataString === undefined) {
    const existingGallery = safeJsonParse<GalleryItem[]>(input.existingGallery, []);
    const newGalleryItems: GalleryItem[] = newGalleryFiles.map((file, idx) => ({
      url: toPublicFilePath(file),
      caption: '',
      order: existingGallery.length + idx,
    }));
    galleryDataString = JSON.stringify([...existingGallery, ...newGalleryItems]);
  }

  const updatedProject = await prisma.project.update({
    where: { id },
    data: {
      title: input.title ?? existingProject.title,
      slug: input.slug ?? existingProject.slug,
      subtitle: input.subtitle ?? existingProject.subtitle,
      category: input.category ?? existingProject.category,
      location: input.location ?? existingProject.location,
      status: input.status ?? existingProject.status,
      plotArea: input.plotArea ?? existingProject.plotArea,
      builtUpArea: input.builtUpArea ?? existingProject.builtUpArea,
      description: input.description ?? existingProject.description,
      seoTitle: input.seoTitle ?? existingProject.seoTitle,
      seoDesc: input.seoDesc ?? existingProject.seoDesc,
      isPublished: input.isPublished ?? existingProject.isPublished,
      isFeatured: input.isFeatured ?? existingProject.isFeatured,
      order: input.order ?? existingProject.order,
      relatedProjects: input.relatedProjects ?? existingProject.relatedProjects,
      coverImage: coverImageUrl,
      gallery: galleryDataString,
    },
  });

  return updatedProject;
};

export const deleteProjectService = async (id: number) => {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  if (project.coverImage) {
    await deleteUploadedFile(project.coverImage);
  }

  const galleryItems = safeJsonParse<GalleryItem[]>(project.gallery, []);
  for (const item of galleryItems) {
    if (item?.url) {
      await deleteUploadedFile(item.url);
    }
  }

  await prisma.project.delete({ where: { id } });
};
