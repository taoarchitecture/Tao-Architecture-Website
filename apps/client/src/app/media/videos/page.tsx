'use client';

import { useState, useEffect } from 'react';
import { getVideos } from '@/lib/api';
import { Video } from '@/types';
import { PlayerModal } from '@/app/video/player-modal';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const VideoCard = ({ video }: { video: Video }) => (
  <div className="break-inside-avoid mb-16 flex flex-col group">
    {/* Image Container with Frame Appearance — matches PublicationCard exactly */}
    <div className="border-[1.5px] border-neutral-dark-grey p-[14px] mb-5 bg-white shadow-sm transition-shadow duration-500 hover:shadow-premium-md">
      <PlayerModal
        videoId={video.videoId}
        trigger={
          <div className={`relative w-full overflow-hidden cursor-pointer bg-neutral-bg ${video.isShort ? 'aspect-[9/16]' : 'aspect-video'}`}>
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {video.isShort && (
              <div className="absolute top-2 right-2 rounded bg-primary-red px-2 py-1 text-[10px] font-bold text-white">
                SHORT
              </div>
            )}
            {/* Play button overlay — the one card element that has to stay: video cards need a "this plays" affordance */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-500">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                <svg className="w-5 h-5 text-neutral-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        }
      />
    </div>

    {/* Text Content */}
    <div className="flex flex-col px-1">
      {/* Date, standing in for PublicationCard's category slot */}
      <h4 className="text-[11px] md:text-sm text-primary-red font-bold uppercase tracking-[0.15em] mb-2 leading-relaxed">
        {formatDate(video.publishedAt)}
      </h4>

      {/* Title */}
      <h3 className="text-[17px] md:text-xl font-normal font-agenda text-neutral-dark-grey leading-[1.4] mb-5 line-clamp-2">
        {video.title}
      </h3>

      {/* CTA Button */}
      <div>
        <PlayerModal
          videoId={video.videoId}
          trigger={
            <button className="inline-block border-[1.5px] border-neutral-dark-grey text-neutral-dark-grey px-4 py-[6px] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-neutral-dark-grey hover:text-white transition-all duration-300">
              Watch Video
            </button>
          }
        />
      </div>
    </div>
  </div>
);

const INITIAL_VISIBLE_COUNT = 9;

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const fetchVideos = async () => {
    setIsLoading(true);
    setError(null);

    const MAX_RETRIES = 3;
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const data = await getVideos();
        setVideos(data);
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
            console.error('Failed to fetch videos:', err);
            setError('Failed to load videos. Please try again later.');
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
    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white pb-20 animate-pulse">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="h-16 w-72 bg-neutral-100/50 mx-auto"></div>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`skel-${i}`} className="break-inside-avoid mb-16 flex flex-col">
                <div className="border-[1.5px] border-neutral-100/50 p-[14px] mb-5 bg-white">
                  <div className={`relative ${i % 3 === 0 ? 'aspect-[9/16]' : 'aspect-video'} w-full bg-neutral-100/50`}></div>
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
      <main className="min-h-screen bg-white pb-20 flex flex-col justify-center items-center">
        <div className="text-primary-red uppercase tracking-widest text-xs mb-4">{error}</div>
        <button
          onClick={fetchVideos}
          className="px-6 py-2 border border-neutral-dark-grey text-xs font-bold uppercase tracking-widest hover:bg-neutral-dark-grey hover:text-white transition-colors"
        >
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Title */}
        <div className="text-center mb-14">
          <span className="inline-block h-[3px] w-12 bg-primary-gold mb-5" />
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-primary-red">Media &amp; Awards</p>
          <h1 className="text-fluid-h1 font-agenda font-bold uppercase tracking-[0.04em] text-neutral-dark-grey">
            Videos
          </h1>
        </div>

        {/* Masonry Grid */}
        {videos.length > 0 ? (
          <>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-8">
              {videos.slice(0, visibleCount).map((video) => (
                <VideoCard key={video.videoId} video={video} />
              ))}
            </div>

            {visibleCount < videos.length && (
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
              Videos will appear here once the content service is available.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
