export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string[];
}

export interface Award {
  id: string;
  title: string;
  subtitle?: string;
  project: string;
  category: string;
  image: string;
  link: string;
}

export interface Publication {
  id: string;
  title: string;
  category: string;
  image: string;
  link?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'manish-banker',
    name: 'Ar. Manish Banker',
    role: 'Principal, Tao Architecture Pvt. Ltd.',
    image: '/img/studio/manish-banker.jpg',
    bio: [
      "Manish graduated with distinction from the Institute of Environmental Design, Gujarat in 1991. Thereafter, he worked at The Osho Commune International in Pune, for two years, contributing immensely to the Commune’s varied ongoing projects. Here, he imbibed a new spiritual approach to spatial design, as a means of connecting man with himself and his environment. Having identified the true meaning and purpose of Architecture, he established TAO Architecture Pvt. Ltd. in 1994. An Associate Member of the Council of Architecture & Indian Institute of Architects, he has gained immense recognition and appreciation for his contribution to sustainable design.",
      "Passionate and enterprising, Manish has a dynamic creative energy and an innate live for nature. He enjoys imparting his knowledge and enthusiasm to budding Architects by participating in academic studios as a speaker and juror. He has been a keynote speaker at the yearlong ‘Design Yatra’ organized by the Institute of Indian Interior Designers in 2017."
    ]
  },
  {
    id: 'kavish-shaikh',
    name: 'Ar. Kavish Shaikh',
    role: 'Project Architect, Client Coordinator',
    image: '/img/studio/kavish-shaikh.jpg',
    bio: [
      "Kavish graduated in Architecture from the Bhartiya Vidya Peeth, Pune University, in 2006. He has been a significant part of the TAO team since his association with us in 2009.",
      "Kavish's expertise lies in integrated master planning of large projects, and on-site coordination of services. With a vast technical knowledge of integrated services and infrastructure design, he has successfully executed some extensive corporate, residential and institutional projects at TAO.",
      "Kavish has also been a major coordinating force, integrating the studio and site through his project management and coordination skills.",
      "Kavish enjoys travelling and exploring natural hotspots. His keen eye for detail can be seen in his extraordinary photography."
    ]
  },
  {
    id: 'vishwajeet-koregave',
    name: 'ID Vishwajeet Koregave',
    role: 'Senior Interior Designer',
    image: '/img/studio/vishwajeet-koregave.jpg',
    bio: [
      "Vishwajeet Koregave graduated in B.Des, Interior from Deccan Technology Institute, Kolhapur in 2011. Vishwajeet is an integral part of the TAO team for the past 10 years. His enthusiasm & curiosity at solving new challenges is his strong attribute. He brings a dynamic energy, as he leads the interior team at TAOStudiO. He has individually handled a number of interior projects at TAO, developing not only aesthetics, but also integrating all services imperative to the generation of humane living and working conditions. Vishwajeet has a good taste of Indian classical music and he expresses his thoughts through his sketches. He is fond of traveling and researching on various aspects of Interior architecture."
    ]
  },
  {
    id: 'motilal-banker',
    name: 'Motilal Banker',
    role: 'Managing Director',
    image: '/img/studio/motilal-banker.jpg',
    bio: [
      "Motilal Banker has been working as managing director for more than 2 decades at TAO. With 36 years of banking experience behind him, he ensures smooth finance and administration at the office while being an encouraging mentor, boosting the team spirit and welfare of each employee."
    ]
  },
  {
    id: 'rachna-banker',
    name: 'Rachna Banker',
    role: 'Director - Operations',
    image: '/img/studio/rachna-banker.jpg',
    bio: [
      "The administrative head at Tao studio, Rachna is a Psychology major. Her contribution ranges from managing precious human resource at the Studio, to making critical decisions for the team. Coordination of administrative procedures, recruitment, team management and building a positive work culture, are only some of the areas immaculately handled by her. With her ability to handle day to day operations as well as challenging situations, her immense knowledge, and 15 years of experience in office management, she is undoubtedly the spine of the studio."
    ]
  }
];

export const awards: Award[] = [
  {
    id: 'award-1',
    title: 'NYATI UNITREE Awarded best commercial Architecture award',
    subtitle: 'AESA BEHAREY RATHI AWARD',
    project: 'Nyati Unitree',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/award/01.jpg',
    link: '/projects/nyati-unitree'
  },
  {
    id: 'award-2',
    title: 'NYATI UNITREE Corporate Office Awarded Best Office Architecture India, 2018',
    subtitle: 'ASIA PACIFIC PROPERTY AWARD',
    project: 'Nyati Unitree',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/award/02.jpg',
    link: '/projects/nyati-unitree'
  },
  {
    id: 'award-3',
    title: 'NYATI UNITREE Awarded for contributing to the Architecture of Pune City, 2018',
    subtitle: 'AESA PRESIDENT’S AWARD',
    project: 'Nyati Unitree',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/award/03.jpg',
    link: '/projects/nyati-unitree'
  },
  {
    id: 'award-4',
    title: 'Courtyard House, Ahmednagar awarded nationally for best Interior Design, 2016',
    subtitle: 'IIID DESIGN EXCELLENCE AWARD',
    project: 'Courtyard House',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/award/04.jpg',
    link: '/projects/courtyard-house'
  },
  {
    id: 'award-5',
    title: 'NYATI UNITREE Awarded commendation for Furniture Design, 2016',
    subtitle: 'IIID Design Excellence Award',
    project: 'Nyati Unitree',
    category: 'ARCHITECTURE + INTERIORS + FURNITURE',
    image: '/img/studio/award/05.jpg',
    link: '/projects/nyati-unitree'
  },
  {
    id: 'award-6',
    title: 'Nyati Unitree awarded IGBC’s LEED India Core and Shell Platinum for Green Building Design and execution',
    subtitle: 'IGBC’S LEED INDIA PLATINUM',
    project: 'Nyati Unitree',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/award/06.jpg',
    link: '/projects/nyati-unitree'
  },
  {
    id: 'award-7',
    title: 'ONELLA RESIDENCE Awarded Jury Commendation: Saint Gobain Smart Green Summit & Awards, Living Spaces, Homes 2016',
    subtitle: 'SMART GREEN AWARDS',
    project: 'Onella Residence',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/award/07.jpg',
    link: '/projects/onella'
  },
  {
    id: 'award-8',
    title: 'Courtyard House, Ahmednagar awarded AESA Award 2015 for residential category, Pune 2015',
    subtitle: 'AESA AWARD 2015',
    project: 'Courtyard House',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/award/08.jpg',
    link: '/projects/courtyard-house'
  },
  {
    id: 'award-9',
    title: 'Courtyard House, Ahmednagar awarded Special Mention at Kohler &Abraxis Designer of Tomorrow 2015',
    subtitle: 'KOHLER Designer of Tomorrow',
    project: 'Courtyard House',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/award/09.jpg',
    link: '/projects/courtyard-house'
  },
  {
    id: 'award-10',
    title: 'Shunyam, Jodhpur awarded AESA Award in Outside Pune Category, 2014',
    subtitle: 'AESA TESE Award',
    project: 'Shunyam Jodhpur',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/award/10.jpg',
    link: '/projects/shunyam-jodhpur'
  }
];

export const publications: Publication[] = [
  {
    id: 'pub-1',
    title: 'Paradiso Residence in Timeless Living: Houses Under the Sun',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/publication/01.jpg',
    link: '/projects/paradiso-residence'
  },
  {
    id: 'pub-2',
    title: 'Nest Residence in The Modern Home',
    category: 'ARCHITECTURE + INTERIORS',
    image: '/img/studio/publication/02.jpg',
    link: '/projects/nest-residence'
  },
  {
    id: 'pub-3',
    title: 'Manish Banker’s Editorial note on \'The TAO of Architecture\' for Building Giants Magazine May-July 2017',
    category: 'ARCHITECTURE + RETAIL + RECREATION',
    image: '/img/studio/publication/03.jpg'
  },
  {
    id: 'pub-4',
    title: 'Onella Residence in Design Detail Magazine, Oct, 2017',
    category: 'ARCHITECTURE + INTERIORS + CRAFT + LANDSCAPE',
    image: '/img/studio/publication/04.jpg',
    link: '/projects/onella'
  }
];
