import { Request, Response } from 'express';
import prisma from '../prisma';

// --- Team Members ---

export const getTeamMembers = async (req: Request, res: Response) => {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
    });
    const parsed = members.map(m => ({
      ...m,
      bio: m.bio ? JSON.parse(m.bio) : [],
    }));
    res.json(parsed);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team' });
  }
};

export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const { name, role, bio, order, active } = req.body;
    const file = req.file; // Multer 'image' field

    const image = file ? (file.path.includes('http') ? file.path : `/uploads/${file.filename}`) : '';

    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        bio: bio ? bio : '[]',
        image,
        order: Number(order || 0),
        active: active === 'true',
      },
    });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team member' });
  }
};

export const updateTeamMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { name, role, bio, order, active } = req.body;
    const file = req.file;

    const existing = await prisma.teamMember.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: 'Not found' });

    let image = existing.image;
    if (file) {
      image = file.path.includes('http') ? file.path : `/uploads/${file.filename}`;
    }

    const updated = await prisma.teamMember.update({
      where: { id: Number(id) },
      data: {
        name,
        role,
        bio,
        image,
        order: Number(order),
        active: active === 'true',
      },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating team member' });
  }
};

export const deleteTeamMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.teamMember.delete({ where: { id: Number(id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting' });
  }
};
