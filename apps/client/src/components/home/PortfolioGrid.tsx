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

const portfolioItems: PortfolioItem[] = [
  // LEFT COLUMN
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
  // RIGHT COLUMN
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
    overlayStyle: true,
  },
  {
    id: 'apartments',
    category: 'LUXURY APARTMENTS',
    title: 'Forming nests around the sky',
    subheading: 'INTERIORS + FURNITURE + ART INSTALLATION',
    image: '/img/portfolio/masonry/pent.jpg',
    link: '/work#apartments',
    overlayStyle: true,
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
  // CORPORATE / OVERLAY STYLE
  if (item.overlayStyle) {
    return (
      <div className="mb-16 group relative w-[90%] mx-auto">
        <div className="relative">
           {/* Badge on Top Left */}
           <div className="absolute top-0 left-0 z-30">
             <div className="bg-[#222] text-white px-4 py-1 text-[11px] font-bold uppercase tracking-[0.15em]">
                {item.category}
             </div>
           </div>

          {/* Image */}
          <Link href={item.link} className="block relative overflow-hidden">
            <div className={`relative w-full ${item.heightClass || 'h-[380px]'} overflow-hidden`}>
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

          {/* White Overlay Box */}
          <div className="absolute top-[12%] left-0 z-20 w-[65%] bg-white p-6 shadow-sm">
             <div className="flex flex-col gap-3">
               {/* Title split into lines if needed */}
               <h3 className="text-[22px] font-light leading-tight text-gray-800 border-b border-gray-300 pb-3">
                 <Link href={item.link} className="hover:text-gray-600 transition-colors">
                   {item.title}
                 </Link>
               </h3>
               {item.subheading && (
                 <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest border-b border-gray-300 pb-2">
                   {item.subheading}
                 </h4>
               )}
               <div className="mt-2">
                 <Link 
                   href={item.link}
                   className="inline-block bg-[#9CA3AF] text-white px-5 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-700 transition-colors"
                 >
                   See Projects
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD STYLE (Commercial, Luxury Villas)
  return (
    <div className="mb-16 group w-[90%] mx-auto">
      <div className="relative">
        {/* Badge on Image */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-[#222] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]">
            {item.category}
          </div>
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
      
      <div className="mt-5 font-agenda pl-1">
        {item.subheading && (
          <h4 className="text-[10px] text-[#EF4444] mb-2 font-bold uppercase tracking-widest">
            {item.subheading}
          </h4>
        )}
        <h3 className="text-[22px] font-light leading-snug text-gray-800 mb-5 max-w-md">
          <Link href={item.link} className="sliding-link hover:text-black transition-colors duration-300">
            {item.title}
          </Link>
        </h3>
        <div>
          <Link 
            href={item.link}
            className="inline-block border border-black text-black px-5 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
          >
            See Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

const PortfolioGrid = () => {
  // Split items manually for 2-column masonry simulation
  const leftCol = portfolioItems.slice(0, 6);
  const rightCol = portfolioItems.slice(6);

  return (
    <div className="container mx-auto px-4 py-16 bg-white max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col">
          {leftCol.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex flex-col md:pt-32"> {/* Staggered Right Column */}
          {rightCol.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioGrid;
