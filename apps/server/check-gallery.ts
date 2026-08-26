import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany({
    where: {
      title: {
        in: [
          'Paradiso',
          'Shunyam, Pune',
          'Vrindavan'
        ]
      }
    },
    select: {
      id: true,
      title: true,
      slug: true,
      gallery: true,
    }
  });

  // Also query by 'contains' in case of slight name mismatches
  const allProjects = await prisma.project.findMany({
    select: { id: true, title: true, slug: true, gallery: true }
  });

  const targetProjects = allProjects.filter(p => 
    p.title.includes('Paradiso') || 
    p.title.includes('Shunyam') || 
    p.title.includes('Vrindavan')
  );

  console.log(`Found ${targetProjects.length} matching projects.`);
  for (const p of targetProjects) {
    console.log(`\n--- Project: ${p.title} (${p.slug}) ---`);
    if (!p.gallery) {
      console.log('Gallery: NULL or EMPTY STRING');
    } else {
      try {
        const parsed = JSON.parse(p.gallery);
        console.log(`Gallery Items Count: ${parsed.length}`);
        if (parsed.length > 0) {
          console.log(`First item structure:`, parsed[0]);
        }
      } catch(e) {
        console.log(`Gallery parse error:`, p.gallery.substring(0, 50));
      }
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
