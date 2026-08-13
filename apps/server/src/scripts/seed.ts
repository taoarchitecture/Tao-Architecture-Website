import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const teamMembers = [
  {
    name: 'Ar. Manish Banker',
    role: 'Principal, Tao Architecture Pvt. Ltd.',
    image: '/img/studio/manish-banker.jpg',
    bio: [
      "Manish graduated with distinction from the Institute of Environmental Design, Gujarat in 1991. Thereafter, he worked at The Osho Commune International in Pune, for two years, contributing immensely to the Commune’s varied ongoing projects. Here, he imbibed a new spiritual approach to spatial design, as a means of connecting man with himself and his environment. Having identified the true meaning and purpose of Architecture, he established TAO Architecture Pvt. Ltd. in 1994. An Associate Member of the Council of Architecture & Indian Institute of Architects, he has gained immense recognition and appreciation for his contribution to sustainable design.",
      "Passionate and enterprising, Manish has a dynamic creative energy and an innate live for nature. He enjoys imparting his knowledge and enthusiasm to budding Architects by participating in academic studios as a speaker and juror. He has been a keynote speaker at the yearlong ‘Design Yatra’ organized by the Institute of Indian Interior Designers in 2017."
    ],
    order: 1
  },
  {
    name: 'Ar. Kavish Shaikh',
    role: 'Project Architect, Client Coordinator',
    image: '/img/studio/kavish-shaikh.jpg',
    bio: [
      "Kavish graduated in Architecture from the Bhartiya Vidya Peeth, Pune University, in 2006. He has been a significant part of the TAO team since his association with us in 2009.",
      "Kavish's expertise lies in integrated master planning of large projects, and on-site coordination of services. With a vast technical knowledge of integrated services and infrastructure design, he has successfully executed some extensive corporate, residential and institutional projects at TAO.",
      "Kavish has also been a major coordinating force, integrating the studio and site through his project management and coordination skills.",
      "Kavish enjoys travelling and exploring natural hotspots. His keen eye for detail can be seen in his extraordinary photography."
    ],
    order: 2
  },
  {
    name: 'ID Vishwajeet Koregave',
    role: 'Senior Interior Designer',
    image: '/img/studio/vishwajeet-koregave.jpg',
    bio: [
      "Vishwajeet Koregave graduated in B.Des, Interior from Deccan Technology Institute, Kolhapur in 2011. Vishwajeet is an integral part of the TAO team for the past 10 years. His enthusiasm & curiosity at solving new challenges is his strong attribute. He brings a dynamic energy, as he leads the interior team at TAOStudiO. He has individually handled a number of interior projects at TAO, developing not only aesthetics, but also integrating all services imperative to the generation of humane living and working conditions. Vishwajeet has a good taste of Indian classical music and he expresses his thoughts through his sketches. He is fond of traveling and researching on various aspects of Interior architecture."
    ],
    order: 3
  },
  {
    name: 'Motilal Banker',
    role: 'Managing Director',
    image: '/img/studio/motilal-banker.jpg',
    bio: [
      "Motilal Banker has been working as managing director for more than 2 decades at TAO. With 36 years of banking experience behind him, he ensures smooth finance and administration at the office while being an encouraging mentor, boosting the team spirit and welfare of each employee."
    ],
    order: 4
  },
  {
    name: 'Rachna Banker',
    role: 'Director - Operations',
    image: '/img/studio/rachna-banker.jpg',
    bio: [
      "The administrative head at Tao studio, Rachna is a Psychology major. Her contribution ranges from managing precious human resource at the Studio, to making critical decisions for the team. Coordination of administrative procedures, recruitment, team management and building a positive work culture, are only some of the areas immaculately handled by her. With her ability to handle day to day operations as well as challenging situations, her immense knowledge, and 15 years of experience in office management, she is undoubtedly the spine of the studio."
    ],
    order: 5
  }
];

const publications = [
  {
    title: 'Paradiso Residence in Timeless Living: Houses Under the Sun',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/publication/01.jpg',
    link: '/projects/paradiso',
    order: 1
  },
  {
    title: 'Manish Banker’s Editorial note on \'The TAO of Architecture\' for Building Giants Magazine May-July 2017',
    category: 'ARCHITECTURE + RETAIL + RECREATION',
    image: '/img/studio/publication/03.jpg',
    order: 2
  },
  {
    title: 'Our Unbuilt \'Wind Dunes\' Project featured in FOAID IdeaNext Coffee Table Book, 2017',
    category: 'ARCHITECTURE + RETAIL + RECREATION',
    image: '/img/studio/publication/05.jpg',
    order: 3
  },
  {
    title: 'Nest Residence in The Modern Home',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/publication/02.jpg',
    link: '/projects/nest-residence',
    order: 4
  },
  {
    title: 'Onella Residence in Design Detail Magazine, Oct, 2017',
    category: 'ARCHITECTURE + INTERIORS + CRAFT + LANDSCAPE',
    image: '/img/studio/publication/04.jpg',
    link: '/projects/onella',
    order: 5
  },
  {
    title: 'God\'s Blessing featured in the book, 50 Luxury Apartments in India',
    category: 'ARCHITECTURE + INTERIORS + CRAFT + LANDSCAPE',
    image: '/img/studio/publication/10.jpg',
    link: '/projects/gods-blessing',
    order: 6
  },
  {
    title: 'Paradiso Residence featured in Luxury Indian Interiors: Perspectives of the New Indian Aesthetics',
    category: 'ARCHITECTURE + RETAIL + RECREATION',
    image: '/img/studio/publication/07.jpg',
    link: '/projects/paradiso',
    order: 7
  },
  {
    title: 'Shunyam Jodhpur, featured in 50 Amazing Homes in India, Vol 1',
    category: 'ARCHITECTURE + RETAIL + RECREATION',
    image: '/img/studio/publication/09.jpg',
    link: '/projects/shunyam-jodhpur',
    order: 8
  },
  {
    title: 'Nyati Unitree shortlisted among the Top 50 at IIA Awards for Excellence in Architecture, 2016',
    category: 'ARCHITECTURE + INTERIORS + CRAFT + LANDSCAPE',
    image: '/img/studio/publication/08.jpg',
    link: '/projects/nyati-unitree',
    order: 9
  }
];

const awards = [
  {
    title: 'NYATI UNITREE Awarded best commercial Architecture award',
    description: 'AESA BEHAREY RATHI AWARD',
    image: '/img/studio/award/01.jpg',
    order: 1
  },
  {
    title: 'NYATI UNITREE Corporate Office Awarded Best Office Architecture India, 2018',
    description: 'ASIA PACIFIC PROPERTY AWARD',
    image: '/img/studio/award/02.jpg',
    order: 2
  },
  // Add more awards here...
];

async function main() {
  console.log('Seeding database...');

  // Seed Team Members
  for (const member of teamMembers) {
    await prisma.teamMember.create({
      data: {
        name: member.name,
        role: member.role,
        image: member.image,
        bio: JSON.stringify(member.bio),
        order: member.order,
        active: true
      }
    });
  }
  console.log('Team Members seeded.');

  // Seed Publications
  await prisma.publication.deleteMany();
  for (const pub of publications) {
    await prisma.publication.create({
      data: {
        title: pub.title,
        category: pub.category,
        image: pub.image,
        link: pub.link,
        order: pub.order
      }
    });
  }
  console.log('Publications seeded.');

  // Seed Awards
  for (const award of awards) {
    await prisma.award.create({
      data: {
        title: award.title,
        description: award.description,
        image: award.image,
        order: award.order
      }
    });
  }
  console.log('Awards seeded.');

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
