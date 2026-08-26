import { PrismaClient } from '@prisma/client';
import { projectDetails } from '../client/src/data/projects';
import process from 'process';

const prisma = new PrismaClient();

async function main() {
  const slugsToFix = ['paradiso', 'shunyam-pune', 'vrindavan'];

  for (const slug of slugsToFix) {
    const details = projectDetails[slug as keyof typeof projectDetails];
    if (!details || !details.gallery) {
      console.log(`No gallery data found in projects.ts for slug: ${slug}`);
      continue;
    }

    const galleryJson = JSON.stringify(
      details.gallery.map((g: any) => ({ url: g.src, caption: g.title || '' }))
    );

    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) {
      console.log(`Project ${slug} not found in DB!`);
      continue;
    }

    await prisma.project.update({
      where: { slug },
      data: { gallery: galleryJson }
    });

    console.log(`Successfully updated gallery for ${slug} (Items: ${details.gallery.length})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
