import { PrismaClient } from '@prisma/client';
import { projects, projectDetails } from '../client/src/data/projects';
import process from 'process';
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing stub projects...');
  await prisma.project.deleteMany({});
  
  const featuredSlugs = [
    'corporate', 'commercial', 'institutional', 'studio', 'products', 
    'installations', 'luxury-villas', 'cozy-homes', 'apartments', 'housing', 'coordination'
  ];

  const formattedProjects = projects.map((p, index) => {
    const details = projectDetails[p.id as keyof typeof projectDetails];
    
    const descJson = details?.description 
      ? JSON.stringify(details.description) 
      : '[]';

    const galleryJson = details?.gallery
      ? JSON.stringify(details.gallery.map(g => ({ url: g.src, caption: g.title || '' })))
      : '[]';

    const relatedJson = details?.relatedProjects
      ? JSON.stringify(details.relatedProjects)
      : '[]';

    return {
      slug: p.id,
      title: p.title,
      subtitle: details?.subtitle || p.description || '',
      category: p.category,
      coverImage: details?.heroImage || p.image,
      location: details?.details?.location || '',
      status: details?.details?.status || '',
      plotArea: details?.details?.plotArea || '',
      builtUpArea: details?.details?.builtUpArea || '',
      description: descJson,
      gallery: galleryJson,
      relatedProjects: relatedJson,
      isFeatured: featuredSlugs.includes(p.id),
      order: index,
      isPublished: true,
    };
  });

  console.log(`Inserting ${formattedProjects.length} full legacy projects...`);
  await prisma.project.createMany({
    data: formattedProjects,
  });
  
  console.log('Successfully fully seeded all projects!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
