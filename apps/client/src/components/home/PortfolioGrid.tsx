'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

const categories = [
  {
    id: 'residences',
    title: 'Residences',
    image: '/img/bunglow_b.jpg',
    span: 'col-span-12 md:col-span-8',
    height: 'h-[300px] md:h-[500px]',
    link: '/work#residences',
  },
  {
    id: 'commercial',
    title: 'Commercial',
    image: '/img/suzlononeearth.jpg',
    span: 'col-span-12 md:col-span-4',
    height: 'h-[300px] md:h-[500px]',
    link: '/work#commercial',
  },
  {
    id: 'work',
    title: 'Work',
    image: '/img/bkgd2.png',
    span: 'col-span-12 md:col-span-4',
    height: 'h-[300px] md:h-[400px]',
    link: '/work',
    isOverlay: true,
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    image: '/img/building.jpg',
    span: 'col-span-12 md:col-span-4',
    height: 'h-[300px] md:h-[400px]',
    link: '/work#hospitality',
  },
  {
    id: 'housing',
    title: 'Housing',
    image: '/img/Solhavn-Unit-E_3200px.png',
    span: 'col-span-12 md:col-span-4',
    height: 'h-[300px] md:h-[400px]',
    link: '/work#housing',
  },
];

export default function PortfolioGrid() {
  return (
    <section className="bg-neutral-bg-warm py-4 md:py-8">
      <div className="container-fluid mx-auto px-2 md:px-4">
        <div className="grid grid-cols-12 gap-2 md:gap-4">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className={`${category.span} relative group overflow-hidden bg-neutral-black`}
            >
              <ScrollReveal variant="fade-up" delay={index * 100} className="h-full w-full">
                {category.isOverlay ? (
                  <Link href={category.link} className={`block relative w-full ${category.height} bg-neutral-dark-grey hover:bg-neutral-black transition-colors duration-500 p-8 md:p-12 flex flex-col justify-center items-center text-center outline outline-1 -outline-offset-[16px] outline-white/20 group-hover:outline-primary-gold/70`}>
                    <div className="absolute inset-0 opacity-15 bg-[url('/img/pattern.jpg')] bg-repeat mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-transparent group-hover:bg-white/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative z-10 transform transition-transform duration-700 ease-out-expo group-hover:-translate-y-2">
                      <h3 className="text-white text-3xl md:text-5xl font-light font-agenda mb-6 tracking-wide shadow-sm">
                        View Our <br/><span className="font-bold text-primary-gold">Work</span>
                      </h3>
                      <div className="inline-flex items-center gap-4 text-white">
                        <span className="w-8 h-[1px] bg-primary-gold block transform origin-left transition-transform duration-500 group-hover:scale-x-150"></span>
                        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-primary-gold group-hover:border-primary-gold transition-all duration-500 shadow-elegant group-hover:text-neutral-black">
                           <span className="text-xl leading-none font-light">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link href={category.link} className={`block relative w-full ${category.height} img-zoom`}>
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
                    />
                    
                    {/* Cinematic Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 ease-out-expo"></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-start z-10 overflow-hidden">
                      <div className="transform transition-transform duration-700 ease-out-expo translate-y-6 group-hover:translate-y-0">
                        <span className="inline-block bg-primary-red text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 mb-6 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          Portfolio
                        </span>
                        <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold font-agenda tracking-[-0.02em] shadow-sm">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )}
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
