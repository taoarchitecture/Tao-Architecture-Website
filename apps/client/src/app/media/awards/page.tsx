'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { awards } from '@/data/studio';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] as const
    } 
  }
};

export default function Awards() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-16 md:mb-24 text-center md:text-left"
        >
          <h1 className="text-fluid-h1 mb-4 font-agenda font-bold uppercase text-neutral-black">
            Awards & <span className="text-primary-red">Appreciation</span>
          </h1>
          <p className="mx-auto max-w-2xl font-agenda tao-fs-desc text-neutral-medium-grey md:mx-0">
            Recognizing our steadfast commitment to sustainable design, 
            spatial innovation, and architectural excellence across varied domains.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {awards.map((award, index) => (
            <motion.div key={award.id} variants={cardVariants} className="group flex flex-col h-full">
              {/* Image & Overlay Wrapper */}
              <div className="relative overflow-hidden w-full inline-block mb-6">
                {/* Top Black Bar */}
                <div className="absolute top-0 left-0 w-full h-[8px] bg-neutral-black z-20 pointer-events-none" />
                
                {/* Category Badge */}
                <div className="absolute top-[8px] left-6 z-20 pointer-events-none">
                  <span className="portfolio-badge block !pt-2 !pb-2.5 shadow-none text-[10px] sm:text-[11px]">
                    {award.category}
                  </span>
                </div>

                <Link href={award.link} className="block relative focus-ring" aria-label={`View ${award.title}`}>
                  <div className={`relative w-full ${index % 2 === 0 ? 'aspect-square' : 'aspect-[4/5]'} overflow-hidden bg-neutral-bg`}>
                    <Image 
                      src={award.image} 
                      alt={award.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                  </div>
                </Link>
                
                {/* SEE PROJECT Overlay CTA */}
                <div className="absolute bottom-6 left-6 z-20 pointer-events-auto opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <Link
                    href={award.link}
                    className="inline-block border border-white/80 bg-black/30 backdrop-blur-sm text-white px-4 py-2 text-[10px] uppercase font-bold tracking-[0.15em] hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    View Project
                  </Link>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-grow flex flex-col justify-start">
                {award.subtitle && (
                  <h4 className="text-[11px] md:text-sm font-bold uppercase tracking-[0.1em] text-primary-red mb-2 opacity-90 line-clamp-1">
                    {award.subtitle}
                  </h4>
                )}
                <h3 className="text-base md:text-lg font-normal font-agenda text-neutral-dark-grey leading-snug group-hover:text-primary-red transition-colors duration-300">
                  <Link href={award.link} className="hover:underline decoration-1 underline-offset-4 decoration-primary-red/50">
                    {award.title}
                  </Link>
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
