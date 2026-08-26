import prisma from './prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const seedData = [
    {
        slug: 'anand-villa',
        title: 'Anand Villa',
        category: 'cozyhomes',
        coverImage: '/img/villa/anandvilla/anandvilla-bg.jpg',
        description: JSON.stringify(['SPIRITUAL SYMPHONY']),
        isPublished: true
    },
    {
        slug: 'bhansali-landmarks',
        title: 'Bhansali Landmarks',
        category: 'corporate',
        coverImage: '/img/corporate/bhansali-landmarks/bhansali-landmarks-bg.jpg',
        description: JSON.stringify(['Modular office at Suyog Platinum']),
        isPublished: true
    },
    // Add more representative projects here
    {
        slug: 'nest-residence',
        title: 'Nest Residence, Pune',
        category: 'luxuryvillas',
        coverImage: '/img/villa/Nest/nest-bg.jpg',
        description: JSON.stringify(['A LUXURY ECO-ABODE']),
        isPublished: true
    },
    {
        slug: 'suzlon-one-earth',
        title: 'Suzlon One Earth',
        category: 'corporate',
        coverImage: '/img/corporate/suzlon-one-earth/suzlon-one-earth-bg.jpg',
        description: JSON.stringify(['A ZERO ENERGY CAMPUS']),
        isPublished: true
    }
];

async function main() {
  console.log('Start seeding ...');

  // Seed User — only ever creates the FIRST admin, and never touches an
  // existing one. (A previous version of this script deleted and recreated
  // the admin with a hardcoded password on every run, which is how a
  // known-password admin account ended up live in production.)
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    const email = 'admin@tao.com';
    const generatedPassword = crypto.randomBytes(24).toString('base64url');
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'admin',
      },
    });
    console.log(`Created admin user: ${email}`);
    console.log(`Generated password (shown once — save it now): ${generatedPassword}`);
  } else {
    console.log(`Skipping admin seed — ${userCount} user(s) already exist.`);
  }

  // Seed Projects
  for (const p of seedData) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
    console.log(`Seeded project: ${p.title}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
