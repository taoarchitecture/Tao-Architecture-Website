import { Request, Response } from 'express';
import prisma from '../prisma';

// Sensible defaults shown on the public site until an admin configures real
// services. Returned as-is when the table is empty — never persisted here;
// a GET must stay read-only (use the repo's seed scripts to create real rows).
const FALLBACK_SERVICES = [
  {
    slug: 'architecture-interiors',
    title: 'Architecture + Interior Design', image: '/img/services/architecture-interiordesign.jpg',
    items: ['Design Brief Preparation', 'Conceptualization of Design', 'Engineering Integration & Coordination', 'Design Finalization', 'Tender Documentation', 'Construction Documentation', 'Onsite Design Verification', 'Onsite design assistance', 'Certification of Bills', 'Project Closure Documentation']
  },
  {
    slug: 'design-coordination',
    title: 'Design Coordination', image: '/img/services/design-coordination.jpg',
    items: ['Design Brief Preparation', 'Project Mapping', 'Selection of Suitable Stakeholders', 'Monitoring Design Outputs', 'Engineering and services integration', 'Structural integration', 'Material and Methodology', 'Finalization of Design', 'Verifying Engineering Integration', 'Certification & Tender Documents', 'Onsite Design Assistance', 'Certifying Project Closure Documents']
  },
  {
    slug: 'procurement-assistance',
    title: 'Procurement Assistance', image: '/img/services/procurement-assistance.jpg',
    items: ['Optional presentation of product samples as per specifications', 'Quantification of products', 'Visit to showrooms/factories for material selection', 'Onsite mockup approval']
  },
  {
    slug: 'execution-coordination',
    title: 'Execution Coordination', image: '/img/services/execution-coordination.jpg',
    items: ['Project Mapping', 'Sequential scheduling of project', 'Selection of Suitable Stakeholders', 'Cross checking products and work orders', 'Onsite design assistance', 'Verifying translation of drawings onsite', 'Ensuring quality of work']
  },
  {
    slug: 'custom-furniture',
    title: 'Custom Furniture + Art', image: '/img/services/customfurniture-art.jpg',
    items: ['Design Brief and Ideology Preparation', 'Conceptualization', 'Selection of Artists/Skilled Resources', 'Preparation of Technical Documents', 'Approval of Mock-Up and Finishes', 'Installation Schedule and Program', 'Onsite Assistance', 'Quality Certification', 'Final Documentation']
  },
  {
    slug: 'project-management',
    title: 'Project Management : To Be Outsourced', image: '/img/services/project-management.jpg',
    subtitle: '*At TAO, we work towards design and execution assistance whereas the below services are outsourced:',
    items: ['Project Management', 'Regular onsite supervision', 'Onsite safety and sanitation', 'Placement of orders for commercial transactions', 'Management of agencies']
  },
];

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    if (services.length === 0) {
      const fallback = FALLBACK_SERVICES.map((s, index) => ({
        title: s.title,
        slug: s.slug,
        subtitle: (s as any).subtitle || null,
        description: null,
        image: s.image || null,
        items: s.items,
        order: index,
        isActive: true,
      }));
      return res.json(fallback);
    }

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
    const { title, slug, subtitle, description, items, image: bodyImage, order, isActive } = req.body;
    const file = req.file;

    // Admin UI's real flow uploads to Cloudinary client-side and sends the
    // resulting URL as `image` in the JSON body; multer's file path (if this
    // ever receives an actual multipart upload) takes precedence when present.
    const image = file
      ? (file.path.includes('http') ? file.path : `/uploads/${file.filename}`)
      : (bodyImage || null);

    // The real admin form sends `items` as a JS array and `isActive` as a
    // real boolean (JSON), not the stringified/form-encoded values a
    // multipart submission would produce — accept either.
    const itemsValue = items === undefined ? '[]' : (typeof items === 'string' ? items : JSON.stringify(items));
    const isActiveValue = isActive === undefined ? true : !(isActive === false || isActive === 'false');

    const service = await prisma.service.create({
      data: {
        title,
        slug,
        subtitle: subtitle || null,
        description: description || null,
        items: itemsValue,
        image,
        order: Number(order || 0),
        isActive: isActiveValue,
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
    const { title, slug, subtitle, description, items, image: bodyImage, order, isActive } = req.body;
    const file = req.file;

    const existing = await prisma.service.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ message: 'Not found' });

    let image = existing.image;
    if (file) {
      image = file.path.includes('http') ? file.path : `/uploads/${file.filename}`;
    } else if (bodyImage !== undefined) {
      image = bodyImage;
    }

    const itemsValue = items === undefined ? existing.items : (typeof items === 'string' ? items : JSON.stringify(items));
    const isActiveValue = isActive === undefined ? existing.isActive : !(isActive === false || isActive === 'false');

    const updated = await prisma.service.update({
      where: { id: Number(id) },
      data: {
        title,
        slug,
        subtitle: subtitle || null,
        description: description || null,
        items: itemsValue,
        image,
        order: Number(order),
        isActive: isActiveValue,
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
