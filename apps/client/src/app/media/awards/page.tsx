'use client';

import Image from 'next/image';
import Link from 'next/link';
import { awards } from '@/data/studio';
import ScrollReveal from '@/components/ScrollReveal';

export default function Awards() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      
      {/* Page Header Banner */}
      <div className="relative z-10 container mx-auto px-4 mt-8 mb-16">
        <ScrollReveal variant="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-agenda uppercase tracking-wider mb-2 text-neutral-dark-grey">
            Awards & <span className="font-bold text-primary-gold">Appreciation</span>
          </h1>
          <div className="w-16 h-[2px] bg-primary-red mb-8"></div>
        </ScrollReveal>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {awards.map((award, index) => (
             <ScrollReveal key={award.id} variant="fade-up" delay={index * 100}>
                <div className="group h-full flex flex-col cursor-pointer">
                    <div className="relative w-full border border-neutral-border overflow-hidden mb-5 img-zoom shadow-sm group-hover:shadow-elegant transition-shadow duration-500">
                        <Link href={award.link} className="block w-full">
                          <div className="relative w-full aspect-[4/3]">
                              <Image 
                                  src={award.image} 
                                  alt={award.title} 
                                  fill 
                                  className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.08]"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                              />
                          </div>
                          <div className="absolute inset-0 bg-neutral-black/0 group-hover:bg-neutral-black/10 transition-colors duration-500 ease-out-expo"></div>
                        </Link>
                    </div>
                    
                    <div className="flex flex-col flex-grow">
                      <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary-red mb-2 font-agenda">{award.category}</h4>
                      {award.subtitle && <span className="block text-sm font-agenda italic text-primary-gold mb-1">{award.subtitle}</span>}
                      <h3 className="text-[16px] font-bold uppercase leading-snug font-agenda text-neutral-dark-grey group-hover:text-primary-red transition-colors duration-300">
                        <Link href={award.link}>{award.title}</Link>
                      </h3>
                    </div>
                </div>
             </ScrollReveal>
          ))}
       </div>
      </div>
    </main>
  );
}