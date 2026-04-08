import Link from 'next/link';
import Image from 'next/image';

export interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  titleLines?: string[]; // Manual line breaks for overlay style
  subheading?: string;
  image: string;
  link: string;
  heightClass?: string;
  overlayStyle?: boolean;
}

const PortfolioCard = ({ item }: { item: PortfolioItem }) => {
  // CORPORATE / OVERLAY STYLE
  if (item.overlayStyle) {
    // Use manual titleLines if available, otherwise fallback to simple split (though manual is preferred)
    const lines = item.titleLines || [item.title];

    return (
      <div className="mb-16 group relative w-[90%] mx-auto">
        <div className="relative border-t-[8px] border-[#222] pt-0">
           {/* Badge on Top Left - Overlapping the border */}
           <div className="absolute -top-[15px] left-0 z-30">
             <div className="bg-[#222] text-white px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] shadow-sm">
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

          {/* Overlay "Line Boxes" Content */}
          <div className="absolute top-[12%] left-0 z-20 max-w-[85%] pointer-events-none">
             <div className="flex flex-col items-start space-y-0 pointer-events-auto">
               {lines.map((line, index) => (
                 <div key={index} className="bg-white px-4 py-2 md:px-6 md:py-2.5 border-b border-[#cbd5e0] w-fit shadow-sm">
                   <h3 className="text-[16px] md:text-[22px] font-light leading-none text-gray-800 whitespace-nowrap">
                     <Link href={item.link} className="hover:text-gray-500 transition-colors">
                        {line}
                     </Link>
                   </h3>
                 </div>
               ))}
               
               {/* Button */}
               <div className="mt-4 ml-6">
                 <Link 
                   href={item.link}
                   className="inline-block border border-white bg-white/10 backdrop-blur-[2px] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-sm"
                   style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
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
      <div className="relative border-t-[8px] border-[#222] pt-0">
        {/* Badge on Image */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-[#222] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] shadow-sm">
            {item.category}
          </div>
        </div>
        
        <Link href={item.link} className="block relative overflow-hidden focus-ring rounded-sm">
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
          <h4 className="text-[10px] text-primary-red mb-2 font-bold uppercase tracking-widest">
            {item.subheading}
          </h4>
        )}
        <h3 className="text-xl md:text-2xl font-light leading-snug text-neutral-dark-grey mb-5 max-w-md">
          <Link href={item.link} className="sliding-link hover:text-neutral-black transition-colors duration-300">
            {item.title}
          </Link>
        </h3>
        <div>
          <Link 
            href={item.link}
            className="btn btn-outline hover:bg-neutral-black hover:text-white"
          >
            See Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

const PortfolioGrid = ({ items }: { items: PortfolioItem[] }) => {
  if (!items || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 bg-white max-w-6xl text-center">
        <p className="text-neutral-light-grey">No projects found.</p>
      </div>
    );
  }

  // Split items manually for 2-column masonry simulation
  // Ensure we have enough items to split, otherwise just put all in left
  const midPoint = Math.ceil(items.length / 2);
  const leftCol = items.slice(0, midPoint);
  const rightCol = items.slice(midPoint);

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
