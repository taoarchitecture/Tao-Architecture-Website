'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { awards as awardsData, Award } from '@/data/studio';

// Real pixel aspect ratios (width/height) of the known local award images, so each
// card renders at its true proportions instead of an arbitrary alternating crop.
const AWARD_IMAGE_ASPECT: Record<string, number> = {
  '/img/studio/award/01.jpg': 600 / 734,
  '/img/studio/award/02.jpg': 600 / 495,
  '/img/studio/award/03.jpg': 600 / 869,
  '/img/studio/award/04.jpg': 600 / 396,
  '/img/studio/award/05.jpg': 600 / 416,
  '/img/studio/award/06.jpg': 600 / 416,
  '/img/studio/award/07.jpg': 600 / 416,
  '/img/studio/award/08.jpg': 1500 / 1000,
  '/img/studio/award/09.jpg': 1500 / 1000,
  '/img/studio/award/10.jpg': 1500 / 988,
};
const DEFAULT_AWARD_ASPECT = 4 / 5;

// AwardCard reuses PublicationCard's shell (framed border, native aspect ratio,
// text block, persistent bordered CTA) for structural parity with the
// Publications page, but keeps two signature Awards details: the black top
// bar on the image frame, and the filled category badge (vs. plain text).
const AwardCard = ({ award, index }: { award: Award; index: number }) => (
  <div className="break-inside-avoid mb-16 flex flex-col group">
    {/* Image Container with Frame Appearance — matches PublicationCard, plus the Awards top bar */}
    <div className="relative border-[1.5px] border-neutral-dark-grey p-[14px] mb-5 bg-white shadow-sm transition-shadow duration-500 hover:shadow-premium-md">
      <div className="absolute top-0 left-0 w-full h-[6px] bg-neutral-black pointer-events-none" />
      <Link href={award.link} className="block focus-ring" aria-label={`View ${award.title}`}>
        <div
          className="relative w-full overflow-hidden bg-neutral-bg"
          style={{ aspectRatio: AWARD_IMAGE_ASPECT[award.image] || DEFAULT_AWARD_ASPECT }}
        >
          <Image
            src={award.image}
            alt={award.title}
            fill
            priority={index < 3}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
          />
        </div>
      </Link>
    </div>

    {/* Text Content */}
    <div className="flex flex-col px-1">
      {/* Category — kept as the Awards filled badge instead of plain text */}
      <span className="portfolio-badge inline-block w-fit !px-3 !py-[5px] !text-[10px] md:!text-[11px] mb-3">
        {award.category}
      </span>

      {award.subtitle && (
        <h4 className="text-[11px] md:text-sm font-bold uppercase tracking-[0.1em] text-primary-red mb-2 opacity-90 line-clamp-1">
          {award.subtitle}
        </h4>
      )}

      {/* Title */}
      <h3 className="text-[17px] md:text-xl font-normal font-agenda text-neutral-dark-grey leading-[1.4] mb-5">
        {award.title}
      </h3>

      {/* CTA Button — Awards' own copy, Publications' persistent bordered style */}
      <div>
        <Link
          href={award.link}
          className="inline-block border-[1.5px] border-neutral-dark-grey text-neutral-dark-grey px-4 py-[6px] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-neutral-dark-grey hover:text-white transition-all duration-300"
        >
          View Project
        </Link>
      </div>
    </div>
  </div>
);

const INITIAL_VISIBLE_COUNT = 9;

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const loadAwards = () => {
    setIsLoading(true);
    setError(null);
    try {
      setAwards(awardsData);
    } catch (err) {
      console.error('Failed to load awards:', err);
      setError('Failed to load awards. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAwards();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white pb-24 animate-pulse">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <div className="h-12 w-64 bg-neutral-100/50 mx-auto"></div>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`skel-${i}`} className="break-inside-avoid mb-16 flex flex-col">
                <div className="border-[1.5px] border-neutral-100/50 p-[14px] mb-5 bg-white">
                  <div className={`relative ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'} w-full bg-neutral-100/50`}></div>
                </div>
                <div className="flex flex-col px-1">
                  <div className="h-5 w-24 bg-neutral-100/50 mb-3"></div>
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
      <main className="min-h-screen bg-white pb-24 flex flex-col justify-center items-center">
        <div className="text-primary-red uppercase tracking-widest text-xs mb-4">{error}</div>
        <button
          onClick={loadAwards}
          className="px-6 py-2 border border-neutral-dark-grey text-xs font-bold uppercase tracking-widest hover:bg-neutral-dark-grey hover:text-white transition-colors"
        >
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-red uppercase tracking-wide">
            Awards &amp; Appreciation
          </h1>
        </div>

        {/* Masonry Grid */}
        {awards.length > 0 ? (
          <>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-8">
              {awards.slice(0, visibleCount).map((award, index) => (
                <AwardCard key={award.id} award={award} index={index} />
              ))}
            </div>

            {visibleCount < awards.length && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE_COUNT)}
                  className="inline-block border-[1.5px] border-neutral-dark-grey text-neutral-dark-grey px-6 py-[10px] text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-neutral-dark-grey hover:text-white transition-all duration-300"
                >
                  Read More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="border border-neutral-border bg-neutral-bg px-6 py-12 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-medium-grey">
              Awards will appear here once the content service is available.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
