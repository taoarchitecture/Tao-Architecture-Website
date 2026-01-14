import Link from 'next/link';
import Image from 'next/image';

interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  subheading?: string;
  image: string;
  link: string;
  heightClass?: string; // Tailwind height class for specific sizing
}

const leftColumnItems: PortfolioItem[] = [
  {
    id: 'corporate',
    category: 'CORPORATE',
    title: 'Creating collaborative and contemporary work culture',
    image: '/img/portfolio/masonry/1.jpg',
    link: '/work#corporate',
  },
  {
    id: 'commercial',
    category: 'COMMERCIAL',
    title: 'Formulating energetic architecture to blend commerce and recreation',
    subheading: 'ARCHITECTURE + RETAIL + RECREATION',
    image: '/img/portfolio/masonry/commercial.jpg',
    link: '/work#commercial',
  },
  {
    id: 'institutional',
    category: 'INSTITUTIONAL',
    title: 'Nurturing learning through interactive spaces',
    subheading: 'ARCHITECTURE + INTERIORS + LANDSCAPE + ART INSTALLATION',
    image: '/img/portfolio/masonry/institutional.jpg',
    link: '/work#institutional',
  },
  {
    id: 'studio',
    category: 'TAO – THE WAY',
    title: 'Breaking barriers between indoors and outdoors',
    subheading: 'SUSTAINABLE + ECO-CONSCIOUS',
    image: '/img/portfolio/masonry/landscape.jpg',
    link: '/studio',
  },
  {
    id: 'products',
    category: 'PRODUCTS',
    title: 'Carving functional sculptures as integral part of architecture',
    subheading: 'CREATIVITY + INTERIORS',
    image: '/img/portfolio/masonry/furniture.jpg',
    link: '/work#products',
  },
  {
    id: 'installations',
    category: 'INSTALLATIONS',
    title: 'Filling soulful spirit within spaces',
    subheading: 'CREATIVITY + CRAFT + COLLABORATION',
    image: '/img/portfolio/masonry/artinstallation.jpg',
    link: '/work#installations',
  },
];

const rightColumnItems: PortfolioItem[] = [
  {
    id: 'luxury-villas',
    category: 'LUXURY VILLAS',
    title: 'Rendering homes as personal resorts',
    subheading: 'ARCHITECTURE + INTERIORS + LANDSCAPE + ART INSTALLATION',
    image: '/img/portfolio/masonry/luxury.jpg',
    link: '/work#luxuryvillas',
    heightClass: 'h-[500px]', // Taller item
  },
  {
    id: 'cozy-homes',
    category: 'COZY HOMES',
    title: 'Nourishing lives through intimate and sensitive spaces',
    subheading: 'ARCHITECTURE + INTERIORS + CRAFT + LANDSCAPE',
    image: '/img/portfolio/masonry/cozyhomes.jpg',
    link: '/work#cozyhomes',
  },
  {
    id: 'apartments',
    category: 'LUXURY APARTMENTS',
    title: 'Forming nests around the sky',
    subheading: 'INTERIORS + FURNITURE + ART INSTALLATION',
    image: '/img/portfolio/masonry/pent.jpg',
    link: '/work#apartments',
  },
  {
    id: 'housing',
    category: 'HOUSING',
    title: 'Formulating cohesive and socio-culture environments',
    image: '/img/portfolio/masonry/aparments.jpg',
    link: '/work#housing',
  },
  {
    id: 'coordination',
    category: 'COORDINATION',
    title: 'Collaborating global expertise with local enterprise',
    subheading: 'COLLABORATION + INTEGRATION + ENTERPRISING',
    image: '/img/portfolio/masonry/coordination.jpg',
    link: '/work#corporate',
  },
];

const PortfolioCard = ({ item }: { item: PortfolioItem }) => (
  <div className="mb-12 group">
    <div className="relative overflow-hidden border-t-2 border-neutral-dark-grey pt-2">
      <div className="flex justify-between items-center mb-2 font-agenda">
        <span className="text-sm font-bold uppercase tracking-wider">{item.category}</span>
      </div>
      
      <Link href={item.link} className="block relative overflow-hidden">
        <div className={`relative w-full ${item.heightClass || 'h-[300px]'} transition-transform duration-700 group-hover:scale-105`}>
           <Image
             src={item.image}
             alt={item.title}
             fill
             className="object-cover"
             sizes="(max-width: 768px) 100vw, 50vw"
             quality={80}
           />
        </div>
      </Link>
    </div>
    
    <div className="mt-4 font-agenda">
      {item.subheading && (
        <h4 className="text-xs text-neutral-light-grey mb-2 uppercase tracking-wide">
          {item.subheading}
        </h4>
      )}
      <h3 className="text-xl md:text-2xl font-light leading-tight">
        <Link href={item.link} className="sliding-link hover:text-primary-red transition-colors duration-300">
          {item.title}
        </Link>
      </h3>
      <div className="mt-6">
        <Link 
          href={item.link}
          className="btn border-2 border-primary-red text-primary-red hover:bg-primary-red hover:text-white"
        >
          See Projects
        </Link>
      </div>
    </div>
  </div>
);

const PortfolioGrid = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col">
          {leftColumnItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex flex-col md:pt-20"> {/* Offset for masonry effect */}
          {rightColumnItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioGrid;
