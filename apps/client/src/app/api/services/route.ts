import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth, unauthorized } from '@/lib/auth';

const parseService = (s: { items: string | null;[key: string]: unknown }) => ({
  ...s,
  items: s.items ? JSON.parse(s.items as string) : [],
});

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

// GET /api/services — public (active only)
export async function GET() {
  try {
    let services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    // Auto-seed default services if the table is completely empty
    if (services.length === 0) {
      for (let index = 0; index < FALLBACK_SERVICES.length; index++) {
        const s = FALLBACK_SERVICES[index];
        await prisma.service.create({
          data: {
            title: s.title,
            slug: s.slug,
            subtitle: (s as any).subtitle || null,
            image: s.image || null,
            items: JSON.stringify(s.items),
            order: index,
            isActive: true,
          }
        });
      }
      services = await prisma.service.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      });
    }

    return NextResponse.json(services.map(parseService));
  } catch (error) {
    console.error('GET /api/services error:', error);
    return NextResponse.json({ message: 'Error fetching services' }, { status: 500 });
  }
}

// POST /api/services — protected, image is Cloudinary URL
export async function POST(req: NextRequest) {
  const actor = verifyAuth(req);
  if (!actor || actor.role !== 'admin') return unauthorized();

  try {
    const { title, slug, subtitle, description, items, image, order, isActive } = await req.json();

    if (!title || !slug) {
      return NextResponse.json({ message: 'title and slug are required' }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        title, slug,
        subtitle: subtitle || null,
        description: description || null,
        items: items ? JSON.stringify(items) : '[]',
        image: image || null,
        order: Number(order || 0),
        isActive: isActive !== false,
      },
    });
    return NextResponse.json(parseService(service), { status: 201 });
  } catch (error) {
    console.error('POST /api/services error:', error);
    return NextResponse.json({ message: 'Error creating service' }, { status: 500 });
  }
}
