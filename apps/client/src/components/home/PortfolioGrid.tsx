import Link from 'next/link';
import Image from 'next/image';

interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  subheading?: string;
  image: string;
  link: string;
  heightClass?: string;
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
    heightClass: 'h-[500px]',
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
    {/* Badge/Category positioned top-left over the image */}
    <div className="relative">
      <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
        {item.category}
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
        <h4 className="text-xs text-red-500 mb-2 uppercase tracking-wide font-bold">
          {item.subheading}
        </h4>
      )}
      <h3 className="text-xl md:text-2xl font-light leading-tight text-gray-800 mb-4">
        <Link href={item.link} className="sliding-link hover:text-black transition-colors duration-300">
          {item.title}
        </Link>
      </h3>
      <div>
        <Link 
          href={item.link}
          className="inline-block border border-black text-black px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
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
