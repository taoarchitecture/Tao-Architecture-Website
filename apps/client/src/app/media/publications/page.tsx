'use client';

import Image from 'next/image';
import Link from 'next/link';
import { publications } from '@/data/studio';

export default function Publications() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-light mb-12 font-agenda uppercase">Publications</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((pub) => (
              <div key={pub.id} className="group">
                  <div className="relative w-full overflow-hidden border-t-2 border-neutral-light-grey mb-4">
                      {pub.link ? (
                          <Link href={pub.link} className="block w-full">
                            <div className="relative w-full h-[300px]">
                                <Image 
                                    src={pub.image} 
                                    alt={pub.title} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                          </Link>
                      ) : (
                        <div className="relative w-full h-[300px]">
                            <Image 
                                src={pub.image} 
                                alt={pub.title} 
                                fill 
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                      )}
                  </div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-dark-grey mb-2 font-agenda">{pub.category}</h4>
                  <h3 className="text-lg font-bold uppercase leading-snug font-agenda">
                     {pub.title}
                  </h3>
                  {pub.link && (
                      <Link href={pub.link} className="btn btn-stroke mt-4">
                          SEE PROJECTS
                      </Link>
                  )}
              </div>
          ))}
       </div>
      </div>
    </main>
  );
}