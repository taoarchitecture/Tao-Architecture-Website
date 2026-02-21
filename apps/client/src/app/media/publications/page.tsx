'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPublications } from '@/lib/api';
import { Publication } from '@/types';

const PublicationCard = ({ pub }: { pub: Publication }) => (
  <div className="flex flex-col h-full group">
    {/* Image Container with Border */}
    <div className="border border-gray-800 p-4 mb-5">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={pub.image}
          alt={pub.title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col flex-grow">
      {/* Category */}
      <h4 className="text-[10px] text-red-600 font-bold uppercase tracking-widest mb-3 leading-relaxed">
        {pub.category}
      </h4>

      {/* Title */}
      <h3 className="text-xl font-light text-gray-800 leading-snug mb-6 flex-grow">
        {pub.title}
      </h3>

      {/* Button */}
      <div>
        {pub.link ? (
          <Link
            href={pub.link}
            className="inline-block border border-gray-800 text-gray-800 px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 hover:text-white transition-all duration-300"
          >
            See Projects
          </Link>
        ) : (
          <span className="inline-block border border-gray-400 text-gray-400 px-6 py-2 text-[10px] font-bold uppercase tracking-widest cursor-not-allowed">
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
      <main className="min-h-screen bg-white pt-32 pb-20 flex justify-center items-center">
        <div className="text-neutral-light-grey uppercase tracking-widest text-xs">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20 flex flex-col justify-center items-center">
        <div className="text-red-600 uppercase tracking-widest text-xs mb-4">{error}</div>
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
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 uppercase tracking-wide">
            Publications
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {publications.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} />
          ))}
        </div>
      </div>
    </main>
  );
}
