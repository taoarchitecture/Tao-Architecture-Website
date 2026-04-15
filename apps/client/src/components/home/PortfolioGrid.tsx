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
const OverlayCard = ({ item }: { item: PortfolioItem }) => {
  const lines = item.titleLines || [item.title];

  return (
    <motion.div variants={cardVariants} className="mb-14 group">
      {/* Image wrapper with overlay */}
      <div className="relative overflow-hidden">
        {/* Category Badge — overlaid on top-left of image */}
        <div className="absolute top-0 left-0 z-20">
          <span className="portfolio-badge shadow-premium-sm">
            {item.category}
          </span>
        </div>

        {/* Image */}
        <Link href={item.link} className="block relative focus-ring" aria-label={`View ${item.title}`}>
          <div className={`relative w-full ${item.heightClass || 'h-[390px]'} overflow-hidden`}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover img-hover-zoom"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 transition-opacity duration-500 group-hover:opacity-90" />
          </div>
        </Link>

        {/* Text overlay — stacked white line boxes on top of image */}
        <div className="absolute top-[14%] left-0 z-10 max-w-[85%] pointer-events-none">
          <div className="flex flex-col items-start pointer-events-auto">
            {lines.map((line, index) => (
              <div
                key={index}
                className="bg-white px-4 py-2 md:px-5 md:py-2.5 border-b border-gray-100 w-fit shadow-premium-sm relative overflow-hidden"
              >
                <div 
                  className="absolute inset-0 bg-neutral-black/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                  style={{ transitionDelay: `${index * 50}ms` }}
                />
                <h3 className="tao-fs-ovr-h font-normal leading-none font-agenda text-neutral-dark-grey whitespace-nowrap relative z-10">
                  <Link href={item.link} className="hover:text-primary-red transition-colors duration-300">
                    {line}
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Below-image: disciplines + description + CTA */}
      <div className="mt-4 pl-0">
        {item.disciplines && (
          <p className="tao-fs-sub font-bold font-agenda uppercase tracking-[0.1em] text-primary-red mb-1.5 opacity-90">
            {item.disciplines}
          </p>
        )}
        <div className="mt-3 overflow-hidden">
          <Magnetic>
            <Link
              href={item.link}
              className="group/btn inline-flex items-center gap-2 tao-fs-sub font-normal font-agenda text-neutral-dark-grey hover:text-primary-red transition-colors duration-300 relative"
            >
              <span className="relative z-10">See Projects</span>
              <svg className="w-3 h-3 relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary-red scale-x-0 origin-left transition-transform duration-300 group-hover/btn:scale-x-100" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Standard Card (right column / smaller cards) ────────────────────────────
const StandardCard = ({ item }: { item: PortfolioItem }) => (
  <motion.div variants={cardVariants} className="mb-14 group">
    {/* Image with category badge */}
    <div className="relative overflow-hidden">
      {/* Category Badge — top-left of image */}
      <div className="absolute top-0 left-0 z-10">
        <span className="portfolio-badge shadow-premium-sm">
          {item.category}
        </span>
      </div>

      {/* Image */}
      <Link href={item.link} className="block relative focus-ring" aria-label={`View ${item.title}`}>
        <div className={`relative w-full ${item.heightClass || 'h-[280px]'} overflow-hidden`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover img-hover-zoom"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
          />
          {/* Subtle hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
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
      <h3 className="tao-fs-thumb-h font-normal font-agenda leading-snug text-neutral-dark-grey mb-3 max-w-md transition-colors duration-300 group-hover:text-primary-gold">
        <Link href={item.link} className="hover:text-primary-red transition-colors duration-300">
          {item.title}
        </Link>
      </h3>
      <div className="overflow-hidden">
        <Magnetic>
          <Link
            href={item.link}
            className="group/btn inline-flex items-center gap-2 tao-fs-sub font-normal font-agenda text-neutral-dark-grey hover:text-primary-red transition-colors duration-300 relative"
          >
            <span className="relative z-10">See Projects</span>
            <svg className="w-3 h-3 relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary-red scale-x-0 origin-left transition-transform duration-300 group-hover/btn:scale-x-100" />
          </Link>
        </Magnetic>
      </div>
    </div>
  </motion.div>
);

// ─── Grid ─────────────────────────────────────────────────────────────────────
const PortfolioGrid = ({ items }: { items: PortfolioItem[] }) => {
  if (!items || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 bg-white max-w-6xl text-center">
        <p className="text-neutral-light-grey text-sm tracking-wide">No projects found.</p>
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
          {leftCol.map((item) =>
            item.overlayStyle
              ? <OverlayCard key={item.id} item={item} />
              : <StandardCard key={item.id} item={item} />
          )}
        </div>
        {/* Right Column — staggered down */}
        <div className="flex flex-col md:pt-24">
          {rightCol.map((item) =>
            item.overlayStyle
              ? <OverlayCard key={item.id} item={item} />
              : <StandardCard key={item.id} item={item} />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PortfolioGrid;
