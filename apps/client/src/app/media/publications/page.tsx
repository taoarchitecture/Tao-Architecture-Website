'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPublications } from '@/lib/api';
import { Publication } from '@/types';

const PublicationCard = ({ pub, index }: { pub: Publication, index: number }) => (
  <div className="flex flex-col h-full group">
    {/* Image Container with Frame Appearance */}
    <div className="border-[1.5px] border-neutral-dark-grey p-[14px] mb-5 bg-white shadow-sm transition-shadow duration-500 hover:shadow-premium-md">
      {/* Dynamic Aspect Ratios to give a masonry feel like the mockup */}
      <div className={`relative ${index % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'} w-full overflow-hidden`}>
        <Image
          src={pub.image}
          alt={pub.title}
          fill
          priority={index < 3}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
        />
      </div>
    </div>

    {/* Text Content */}
    <div className="flex flex-col flex-grow px-1">
      {/* Category */}
      <h4 className="text-[11px] md:text-sm text-primary-red font-bold uppercase tracking-[0.15em] mb-2 leading-relaxed">
        {pub.category}
      </h4>

      {/* Title */}
      <h3 className="text-[17px] md:text-xl font-normal font-agenda text-neutral-dark-grey leading-[1.4] mb-5 flex-grow">
        {pub.title}
      </h3>

      {/* CTA Button */}
      <div>
        {pub.link ? (
          <Link
            href={pub.link}
            className="inline-block border-[1.5px] border-neutral-dark-grey text-neutral-dark-grey px-4 py-[6px] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-neutral-dark-grey hover:text-white transition-all duration-300"
          >
            See Projects
          </Link>
        ) : (
          <span className="inline-block border-[1.5px] border-neutral-medium-grey text-neutral-medium-grey px-4 py-[6px] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] cursor-not-allowed">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  </div>
);

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublications = async () => {
    setIsLoading(true);
    setError(null);
    
    const MAX_RETRIES = 3;
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const data = await getPublications();
        setPublications(data);
        clearTimeout(timeoutId);
        setIsLoading(false);
        return;
      } catch (err: any) {
        clearTimeout(timeoutId);
        attempt++;
        
        if (attempt === MAX_RETRIES) {
          if (err.name === 'AbortError') {
            setError('Request timed out. Please try again.');
          } else {
            console.error('Failed to fetch publications:', err);
            setError('Failed to load publications. Please try again later.');
          }
          setIsLoading(false);
        } else {
          // Exponential backoff: 1s, 2s...
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000));
        }
      }
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20 animate-pulse">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <div className="h-12 w-64 bg-neutral-100/50 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`skel-${i}`} className="flex flex-col h-full">
                <div className="border-[1.5px] border-neutral-100/50 p-[14px] mb-5 bg-white">
                  <div className={`relative ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'} w-full bg-neutral-100/50`}></div>
                </div>
                <div className="flex flex-col px-1">
                  <div className="h-3 w-1/3 bg-neutral-100/50 mb-2"></div>
                  <div className="h-6 w-full bg-neutral-100/50 mb-2"></div>
                  <div className="h-6 w-3/4 bg-neutral-100/50 mb-5"></div>
                  <div className="h-8 w-32 bg-neutral-100/50"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20 flex flex-col justify-center items-center">
        <div className="text-primary-red uppercase tracking-widest text-xs mb-4">{error}</div>
        <button 
          onClick={fetchPublications}
          className="px-6 py-2 border border-neutral-dark-grey text-xs font-bold uppercase tracking-widest hover:bg-neutral-dark-grey hover:text-white transition-colors"
        >
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Title */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-red uppercase tracking-wide">
            Publications
          </h1>
        </div>

        {/* Grid */}
        {publications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {publications.map((pub, index) => (
              <PublicationCard key={pub.id} pub={pub} index={index} />
            ))}
          </div>
        ) : (
          <div className="border border-neutral-border bg-neutral-bg px-6 py-12 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-medium-grey">
              Publications will appear here once the content service is available.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
