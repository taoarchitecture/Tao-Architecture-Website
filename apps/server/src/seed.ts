import prisma from './prisma';
import bcrypt from 'bcryptjs';

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

  // Seed User
  const email = 'admin@tao.com';
  // Check if user exists, if so delete to re-seed with known password
  const existingUser = await prisma.user.findUnique({ where: { email } });
  
  if (existingUser) {
    console.log('Resetting admin user...');
    await prisma.user.delete({ where: { email } });
  }

  // Password: admin123
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'admin'
    }
  });
  console.log('Created admin user: admin@tao.com / admin123');

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
