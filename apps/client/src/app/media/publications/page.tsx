'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPublications } from '@/lib/api';
import { Publication } from '@/types';
import ScrollReveal from '@/components/ScrollReveal';

const PublicationCard = ({ pub, delay }: { pub: Publication; delay: number }) => (
  <ScrollReveal variant="fade-up" delay={delay} className="h-full">
    <div className="flex flex-col h-full group bg-white shadow-sm border border-neutral-border hover:shadow-elegant hover:border-transparent transition-all duration-500 ease-out-expo cursor-pointer overflow-hidden p-[1px]">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden img-zoom bg-neutral-bg">
        <Image
          src={pub.image}
          alt={pub.title}
          fill
          className="object-cover object-top transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-neutral-black/0 group-hover:bg-neutral-black/5 transition-colors duration-500 ease-out-expo pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 md:p-8 relative bg-white transform transition-transform duration-500 group-hover:-translate-y-2 z-10">
        <h4 className="text-[10px] text-primary-red font-bold uppercase tracking-[0.2em] mb-4">
          {pub.category}
        </h4>

        <h3 className="text-xl lg:text-2xl font-bold text-neutral-dark-grey uppercase tracking-[-0.01em] leading-snug mb-8 flex-grow font-agenda">
          {pub.title}
        </h3>

        {/* Button */}
        <div>
          {pub.link ? (
            <Link
              href={pub.link}
              className="btn btn-outline border-neutral-dark-grey text-neutral-dark-grey hover:bg-neutral-dark-grey hover:text-white px-8 py-3 w-full sm:w-auto"
            >
              READ ARTICLE
            </Link>
          ) : (
            <span className="btn border border-neutral-light-grey text-neutral-light-grey px-8 py-3 cursor-not-allowed opacity-60 w-full sm:w-auto">
              COMING SOON
            </span>
          )}
        </div>
      </div>
    </div>
  </ScrollReveal>
);

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublications = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getPublications();
      setPublications(data);
    } catch (err: any) {
      setError('Failed to load publications. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-20 flex justify-center items-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-16 h-16 border-t-2 border-primary-red border-solid rounded-full animate-spinSlow"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-20 flex flex-col justify-center items-center">
        <div className="text-primary-red uppercase tracking-widest text-xs mb-6 font-bold font-agenda">{error}</div>
        <button 
          onClick={fetchPublications}
          className="btn btn-outline"
        >
          RETRY
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Page Header Banner */}
        <div className="relative z-10 mt-8 mb-16 text-center">
          <ScrollReveal variant="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-agenda uppercase tracking-wider mb-6 text-neutral-dark-grey">
              Featured <span className="font-bold text-primary-gold">Publications</span>
            </h1>
            <div className="w-16 h-[2px] bg-primary-red mx-auto mb-8"></div>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {publications.map((pub, index) => (
            <PublicationCard key={pub.id} pub={pub} delay={index * 100} />
          ))}
        </div>
      </div>
    </main>
  );
}
