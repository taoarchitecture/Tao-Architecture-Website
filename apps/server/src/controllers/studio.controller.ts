import { Request, Response } from 'express';
import prisma from '../prisma';
import { deleteUploadedFile } from '../middleware/upload.middleware';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';

// --- Team Members ---

export const getTeamMembers = asyncHandler(async (req: Request, res: Response) => {
  const members = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' },
  });
  const parsed = members.map(m => ({
    ...m,
    bio: m.bio ? JSON.parse(m.bio) : [],
  }));
  res.json(parsed);
});

export const createTeamMember = asyncHandler(async (req: Request, res: Response) => {
  const { name, role, bio, order, active, image: bodyImage } = req.body;
  const file = req.file; // Multer 'image' field

  if (!name || !role) {
    throw new AppError('name and role are required', 400);
  }

  // Admin UI's real flow uploads to Cloudinary client-side and sends the
  // resulting URL as `image` in the JSON body; a genuine multipart upload
  // (if this endpoint is ever called that way) still takes precedence.
  const image = file ? (file.path.includes('http') ? file.path : `/uploads/${file.filename}`) : (bodyImage || '');
  // `bio` arrives as a real JS array (JSON) or a form-encoded string,
  // and `active` as a real boolean (JSON) or a form-encoded string — accept either.
  const bioValue = bio === undefined ? '[]' : (typeof bio === 'string' ? bio : JSON.stringify(bio));
  const activeValue = active === undefined ? true : (active === true || active === 'true');

  const member = await prisma.teamMember.create({
    data: {
      name,
      role,
      bio: bioValue,
      image,
      order: Number(order || 0),
      active: activeValue,
    },
  });
  res.status(201).json(member);
});

export const updateTeamMember = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, role, bio, order, active, image: bodyImage } = req.body;
  const file = req.file;

  const existing = await prisma.teamMember.findUnique({ where: { id: Number(id) } });
  if (!existing) throw new AppError('Not found', 404);

  let image = existing.image;
  if (file) {
    // Delete old photo from Cloudinary or local disk
    if (existing.image) await deleteUploadedFile(existing.image);
    image = file.path.includes('http') ? file.path : `/uploads/${file.filename}`;
  } else if (bodyImage !== undefined && bodyImage !== existing.image) {
    // Replaced via a pre-uploaded Cloudinary URL rather than a multipart file —
    // still clean up the old asset the same way the file-upload branch does.
    if (existing.image) await deleteUploadedFile(existing.image);
    image = bodyImage;
  }

  const bioValue = bio === undefined ? existing.bio : (typeof bio === 'string' ? bio : JSON.stringify(bio));
  const activeValue = active === undefined ? existing.active : (active === true || active === 'true');

  const updated = await prisma.teamMember.update({
    where: { id: Number(id) },
    data: {
      name,
      role,
      bio: bioValue,
      image,
      order: Number(order),
      active: activeValue,
    },
  });
  res.json(updated);
});

export const deleteTeamMember = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.teamMember.delete({ where: { id: Number(id) } });
  res.json({ message: 'Deleted successfully' });
});
