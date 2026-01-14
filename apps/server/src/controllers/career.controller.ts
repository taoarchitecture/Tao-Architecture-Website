import { Request, Response } from 'express';
import prisma from '../prisma';

export const submitApplication = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const {
      firstName, lastName, email, phone, positionApply,
      // ... extract other fields
      ...otherData
    } = req.body;

    // Construct file paths
    const resumePath = files['resume'] ? files['resume'][0].path : null;
    const salarySlipPath = files['salarySlip'] ? files['salarySlip'][0].path : null;
    const portfolioPath = files['portfolio'] ? files['portfolio'][0].path : null;
    const refLetterPath = files['refLetter'] ? files['refLetter'][0].path : null;

    const application = await prisma.application.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        positionApply,
        resume: resumePath,
        salarySlip: salarySlipPath,
        portfolio: portfolioPath,
        refLetter: refLetterPath,
        // Map other fields from req.body
        // For simplicity in this demo, assuming otherData matches schema or needs explicit mapping
        // In production, validate and map all 60+ fields
      },
    });

    // TODO: Send email notification

    res.status(201).json({ message: 'Application submitted successfully', applicationId: application.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting application' });
  }
};

export const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

export const getApplicationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const application = await prisma.application.findUnique({
      where: { id: Number(id) },
    });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application' });
  }
};
