import { Request, Response } from 'express';
import prisma from '../prisma';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    // Parse the JSON items field for each service
    const parsed = services.map(s => ({
      ...s,
      items: s.items ? JSON.parse(s.items) : [],
    }));
    res.json(parsed);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services' });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    // Admin view: return all services including inactive
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    const parsed = services.map(s => ({
      ...s,
      items: s.items ? JSON.parse(s.items) : [],
    }));
    res.json(parsed);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const service = await prisma.service.findUnique({
      where: { id: Number(id) },
    });
    if (!service) return res.status(404).json({ message: 'Not found' });
    res.json({
      ...service,
      items: service.items ? JSON.parse(service.items) : [],
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Error fetching service' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { title, slug, subtitle, description, items, order, isActive } = req.body;
    const file = req.file;

    const image = file
      ? (file.path.includes('http') ? file.path : `/uploads/${file.filename}`)
      : null;

    const service = await prisma.service.create({
      data: {
        title,
        slug,
        subtitle: subtitle || null,
        description: description || null,
        items: items || '[]',
        image,
        order: Number(order || 0),
        isActive: isActive !== 'false',
      },
    });
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Error creating service' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { title, slug, subtitle, description, items, order, isActive } = req.body;
    const file = req.file;

    const existing = await prisma.service.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: 'Not found' });

    let image = existing.image;
    if (file) {
      image = file.path.includes('http') ? file.path : `/uploads/${file.filename}`;
    }

    const updated = await prisma.service.update({
      where: { id: Number(id) },
      data: {
        title,
        slug,
        subtitle: subtitle || null,
        description: description || null,
        items: items || existing.items,
        image,
        order: Number(order),
        isActive: isActive !== 'false',
      },
    });
    res.json(updated);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Error updating service' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.service.delete({ where: { id: Number(id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Error deleting service' });
  }
};
