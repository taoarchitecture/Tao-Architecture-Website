import { Request, Response } from 'express';
import prisma from '../prisma';
import path from 'path';
import fs from 'fs';

// Helper to delete file
const deleteFile = (filePath: string) => {
  if (!filePath) return;
  const fullPath = path.join(__dirname, '../../../uploads', path.basename(filePath));
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    // Parse JSON strings back to objects
    const parsedProjects = projects.map(p => ({
      ...p,
      description: p.description ? JSON.parse(p.description) : null,
      gallery: p.gallery ? JSON.parse(p.gallery) : [],
    }));
    res.json(parsedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const parsedProject = {
      ...project,
      description: project.description ? JSON.parse(project.description) : null,
      gallery: project.gallery ? JSON.parse(project.gallery) : [],
    };
    res.json(parsedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const parsedProject = {
      ...project,
      description: project.description ? JSON.parse(project.description) : null,
      gallery: project.gallery ? JSON.parse(project.gallery) : [],
    };
    res.json(parsedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, slug, category, location, status, plotArea, builtUpArea, description, seoTitle, seoDesc, isPublished } = req.body;
    
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const coverImageFile = files['coverImage']?.[0];
    const galleryFiles = files['gallery'] || [];

    const coverImageUrl = coverImageFile ? `/uploads/${coverImageFile.filename}` : null;
    
    // Process gallery images
    // In a real app, we might receive existing gallery JSON and append new files
    // Here we assume basic creation
    const galleryData = galleryFiles.map(file => ({
      url: `/uploads/${file.filename}`,
      caption: '',
      order: 0 // Default order
    }));

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        category,
        location,
        status,
        plotArea,
        builtUpArea,
        description: description ? description : '[]', // Expecting JSON string from frontend
        seoTitle,
        seoDesc,
        isPublished: isPublished === 'true',
        coverImage: coverImageUrl,
        gallery: JSON.stringify(galleryData),
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { title, slug, category, location, status, plotArea, builtUpArea, description, seoTitle, seoDesc, isPublished, existingGallery } = req.body;
    
    const project = await prisma.project.findUnique({ where: { id: Number(id) } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const coverImageFile = files['coverImage']?.[0];
    const newGalleryFiles = files['gallery'] || [];

    let coverImageUrl = project.coverImage;
    if (coverImageFile) {
      // Delete old cover image
      if (project.coverImage) deleteFile(project.coverImage);
      coverImageUrl = `/uploads/${coverImageFile.filename}`;
    }

    // Handle Gallery
    // Combine existing gallery (parsed from JSON string) with new files
    let galleryData = existingGallery ? JSON.parse(existingGallery) : [];
    
    const newGalleryItems = newGalleryFiles.map(file => ({
      url: `/uploads/${file.filename}`,
      caption: '',
      order: galleryData.length // Append to end
    }));

    galleryData = [...galleryData, ...newGalleryItems];

    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        title,
        slug,
        category,
        location,
        status,
        plotArea,
        builtUpArea,
        description: description || project.description,
        seoTitle,
        seoDesc,
        isPublished: isPublished === 'true',
        coverImage: coverImageUrl,
        gallery: JSON.stringify(galleryData),
      },
    });

    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({ where: { id: Number(id) } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete images
    if (project.coverImage) deleteFile(project.coverImage);
    if (project.gallery) {
      const gallery = JSON.parse(project.gallery);
      gallery.forEach((item: any) => deleteFile(item.url));
    }

    await prisma.project.delete({ where: { id: Number(id) } });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
};
