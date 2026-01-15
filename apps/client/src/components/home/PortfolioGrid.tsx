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
  overlayStyle?: boolean;
}

const leftColumnItems: PortfolioItem[] = [
  {
    id: 'corporate',
    category: 'CORPORATE',
    title: 'Creating collaborative and contemporary work culture',
    image: '/img/portfolio/masonry/1.jpg',
    link: '/work#corporate',
    overlayStyle: true,
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
    overlayStyle: true,
  },
  {
    id: 'studio',
    category: 'TAO – THE WAY',
    title: 'Breaking barriers between indoors and outdoors',
    subheading: 'SUSTAINABLE + ECO-CONSCIOUS',
    image: '/img/portfolio/masonry/landscape.jpg',
    link: '/studio',
    overlayStyle: true,
  },
  {
    id: 'products',
    category: 'PRODUCTS',
    title: 'Carving functional sculptures as integral part of architecture',
    subheading: 'CREATIVITY + INTERIORS',
    image: '/img/portfolio/masonry/furniture.jpg',
    link: '/work#products',
    overlayStyle: true,
  },
  {
    id: 'installations',
    category: 'INSTALLATIONS',
    title: 'Filling soulful spirit within spaces',
    subheading: 'CREATIVITY + CRAFT + COLLABORATION',
    image: '/img/portfolio/masonry/artinstallation.jpg',
    link: '/work#installations',
    overlayStyle: true,
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
    overlayStyle: true,
  },
  {
    id: 'coordination',
    category: 'COORDINATION',
    title: 'Collaborating global expertise with local enterprise',
    subheading: 'COLLABORATION + INTEGRATION + ENTERPRISING',
    image: '/img/portfolio/masonry/coordination.jpg',
    link: '/work#corporate',
    overlayStyle: true,
  },
];

const PortfolioCard = ({ item }: { item: PortfolioItem }) => {
  if (item.overlayStyle) {
    return (
      <div className="mb-16 group relative">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <Link href={item.link} className="block relative overflow-hidden">
            <div className={`relative w-full ${item.heightClass || 'h-[400px]'} overflow-hidden`}>
               <Image
                 src={item.image}
                 alt={item.title}
                 fill
                 className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                 sizes="(max-width: 768px) 100vw, 50vw"
                 quality={90}
               />
            </div>
          </Link>

          {/* Overlay Content Block */}
          <div className="absolute top-[8%] left-0 z-20 max-w-[85%]">
            {/* Category Badge */}
            <div className="bg-neutral-900 text-white px-5 py-1.5 inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-0 shadow-sm">
              {item.category}
            </div>
            
            {/* White Content Box */}
            <div className="bg-white p-5 md:p-7 shadow-lg border-l-4 border-transparent">
              {item.subheading && (
                <h4 className="text-[10px] text-gray-500 mb-3 font-bold uppercase tracking-widest border-b border-gray-200 pb-2 inline-block">
                  {item.subheading}
                </h4>
              )}
              <h3 className="text-xl md:text-[26px] font-light leading-snug text-gray-800 mb-6 border-b border-gray-300 pb-4">
                <Link href={item.link} className="hover:text-gray-600 transition-colors duration-300">
                  {item.title}
                </Link>
              </h3>
              
              <Link 
                href={item.link}
                className="inline-flex items-center justify-center bg-gray-400 text-white border border-gray-400 px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-600 hover:border-gray-600 transition-all duration-300 ease-in-out"
              >
                See Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Style (Text below image)
  return (
    <div className="mb-16 group">
      {/* Badge/Category positioned top-left over the image */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 z-10 bg-black text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em]">
          {item.category}
        </div>
        
        <Link href={item.link} className="block relative overflow-hidden">
          <div className={`relative w-full ${item.heightClass || 'h-[320px]'} overflow-hidden`}>
             <Image
               src={item.image}
               alt={item.title}
               fill
               className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
               sizes="(max-width: 768px) 100vw, 50vw"
               quality={90}
             />
          </div>
        </Link>
      </div>
      
      <div className="mt-5 font-agenda">
        {item.subheading && (
          <h4 className="text-[10px] text-red-600 mb-2 font-bold uppercase tracking-widest">
            {item.subheading}
          </h4>
        )}
        <h3 className="text-xl md:text-[22px] font-normal leading-snug text-gray-900 mb-5 max-w-md">
          <Link href={item.link} className="sliding-link hover:text-black transition-colors duration-300">
            {item.title}
          </Link>
        </h3>
        <div>
          <Link 
            href={item.link}
            className="inline-flex items-center justify-center border border-black text-black px-5 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
          >
            See Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

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
