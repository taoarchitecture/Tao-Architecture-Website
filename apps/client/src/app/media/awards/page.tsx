'use client';

import Image from 'next/image';
import Link from 'next/link';
import { awards } from '@/data/studio';

export default function Awards() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-light mb-12 font-agenda uppercase">Awards & Appreciation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award) => (
              <div key={award.id} className="group">
                  <div className="relative w-full border-t-2 border-black overflow-hidden mb-4">
                      <Link href={award.link} className="block w-full">
                        <div className="relative w-full h-[250px]">
                            <Image 
                                src={award.image} 
                                alt={award.title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                      </Link>
                  </div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-dark-grey mb-2 font-agenda">{award.category}</h4>
                  <h3 className="text-lg font-bold uppercase leading-snug font-agenda group-hover:text-primary-gold transition-colors">
                    {award.subtitle && <span className="block text-sm font-normal mb-1">{award.subtitle}</span>}
                    <Link href={award.link}>{award.title}</Link>
                  </h3>
              </div>
          ))}
       </div>
      </div>
    </main>
  );
}