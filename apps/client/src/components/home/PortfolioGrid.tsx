'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Magnetic from '@/components/ui/Magnetic';

export interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  titleLines?: string[];
  subheading?: string;
  image: string;
  link: string;
  heightClass?: string;
  overlayStyle?: boolean;
  overlayCtaClass?: string;
  disciplines?: string; // e.g. "ARCHITECTURE • INTERIORS • LANDSCAPE"
}

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // easeOutExpo
    } 
  }
};

// ─── Large Overlay Card (left column main cards) ──────────────────────────────
// Category badge on image bottom-left, title overlay on top, SEE PROJECTS below
const OverlayCard = ({ item, index = 0 }: { item: PortfolioItem, index?: number }) => {
  const lines = item.titleLines || [item.title];

  return (
    <motion.div variants={cardVariants} className="mb-16 group">
      {/* Image wrapper with overlay */}
      <div className="relative overflow-hidden w-full inline-block">
        {/* Top Black Bar */}
        <div className="absolute top-0 left-0 w-full h-[12px] bg-neutral-black z-20 pointer-events-none" />
        {/* Category Badge — hanging from the bar, inset from left */}
        <div className="absolute top-[12px] left-8 md:left-12 z-20 pointer-events-none">
          <span className="portfolio-badge block !pt-2.5 !pb-3 shadow-none">
            {item.category}
          </span>
        </div>

        {/* Image */}
        <Link href={item.link} className="block relative focus-ring" aria-label={`View ${item.title}`}>
          <div className={`relative w-full ${item.heightClass || (index % 2 === 0 ? 'aspect-square' : 'aspect-[4/5]')} overflow-hidden`}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover img-hover-zoom"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
            {/* Premium hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50 opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
          </div>
        </Link>

        {/* Text overlay — uniform block sliced by gaps */}
        <div className="absolute top-[15%] left-0 z-10 max-w-[90%] pointer-events-none">
          <div className="flex flex-col items-stretch gap-[2px] pointer-events-auto w-max">
            {lines.map((line, index) => (
              <div
                key={index}
                className="bg-white/85 px-4 py-1.5 md:px-6 md:py-2 w-full relative overflow-hidden"
              >
                <div 
                  className="absolute inset-0 bg-neutral-black/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                  style={{ transitionDelay: `${index * 50}ms` }}
                />
                <h3 className="tao-fs-ovr-h font-normal leading-none font-agenda text-neutral-dark-grey tracking-tight whitespace-nowrap relative z-10">
                  <Link href={item.link} className="hover:text-primary-red transition-colors duration-300">
                    {line}
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* SEE PROJECTS CTA — anchored to bottom-left of the image */}
        <div className="absolute bottom-8 left-0 z-10 pl-6 md:pl-8 pointer-events-auto">
          <Link
            href={item.link}
            className={`inline-block border px-3.5 py-1.5 text-[10px] md:text-[11px] uppercase font-bold tracking-[0.12em] hover:tracking-[0.16em] transition-all duration-300 glass-subtle ${item.overlayCtaClass || 'border-white text-white hover:bg-white hover:text-neutral-dark-grey'}`}
          >
            See Projects
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Standard Card (right column / smaller cards) ────────────────────────────
const StandardCard = ({ item, index = 0 }: { item: PortfolioItem, index?: number }) => (
  <motion.div variants={cardVariants} className="mb-16 group">
    {/* Image with category badge */}
    <div className="relative overflow-hidden w-full inline-block">
      {/* Top Black Bar */}
      <div className="absolute top-0 left-0 w-full h-[10px] bg-neutral-black z-20 pointer-events-none" />
      {/* Category Badge — hanging from the bar, inset from left */}
      <div className="absolute top-[10px] left-6 md:left-8 z-20 pointer-events-none">
        <span className="portfolio-badge block !pt-2 !pb-2.5 shadow-none">
          {item.category}
        </span>
      </div>

      {/* Image */}
      <Link href={item.link} className="block relative focus-ring" aria-label={`View ${item.title}`}>
        <div className={`relative w-full ${item.heightClass || (index % 2 === 0 ? 'aspect-square' : 'aspect-[4/5]')} overflow-hidden`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover img-hover-zoom"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
          />
          {/* Premium hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-700" />
        </div>
      </Link>
    </div>

    {/* Below-image content */}
    <div className="mt-4 pl-0">
      {item.disciplines && (
        <p className="tao-fs-sub font-bold font-agenda uppercase tracking-[0.1em] text-primary-red mb-1.5 opacity-90">
          {item.disciplines}
        </p>
      )}
      <h3 className="tao-fs-thumb-h font-normal font-agenda leading-snug text-neutral-dark-grey mb-3 transition-colors duration-300">
        <Link href={item.link} className="hover:text-primary-red transition-colors duration-300">
          {item.title}
        </Link>
      </h3>
      <div className="mt-1">
         <Link
            href={item.link}
            className="inline-block border border-neutral-dark-grey text-neutral-dark-grey px-3.5 py-[5px] text-[10px] md:text-[11px] uppercase font-bold tracking-[0.12em] hover:tracking-[0.16em] hover:bg-neutral-dark-grey hover:text-white transition-all duration-300"
         >
            See Projects
         </Link>
      </div>
    </div>
  </motion.div>
);

// ─── Grid ─────────────────────────────────────────────────────────────────────
const PortfolioGrid = ({ items }: { items: PortfolioItem[] }) => {
  if (!items || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 bg-white max-w-6xl text-center">
        <p className="text-neutral-medium-grey text-sm tracking-wide">No projects found.</p>
      </div>
    );
  }

  const midPoint = Math.ceil(items.length / 2);
  const leftCol  = items.slice(0, midPoint);
  const rightCol = items.slice(midPoint);

  return (
    <section className="container mx-auto px-4 py-16 bg-white max-w-6xl">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.2 }}
      >
        {/* Left Column */}
        <div className="flex flex-col">
          {leftCol.map((item, index) =>
            item.overlayStyle
              ? <OverlayCard key={item.id} item={item} index={index} />
              : <StandardCard key={item.id} item={item} index={index} />
          )}
        </div>
        {/* Right Column — staggered down */}
        <div className="flex flex-col md:pt-24">
          {rightCol.map((item, index) =>
            item.overlayStyle
              ? <OverlayCard key={item.id} item={item} index={index + 1} />
              : <StandardCard key={item.id} item={item} index={index + 1} />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PortfolioGrid;
