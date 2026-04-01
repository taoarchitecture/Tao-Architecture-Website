import React from 'react';
import { PlayerModal } from './player-modal';
import ScrollReveal from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

async function fetchVideos(searchParams: { [key: string]: string | undefined }) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000'}/api/videos`);
  const q = searchParams.q || '';
  const category = searchParams.category || '';
  const tag = searchParams.tag || '';
  const sort = searchParams.sort || 'date';

  url.searchParams.set('page', '1');
  url.searchParams.set('pageSize', '24');
  url.searchParams.set('sort', sort);

  if (q) url.searchParams.set('q', q);
  if (category) url.searchParams.set('category', category);
  if (tag) url.searchParams.set('tag', tag);

  try {
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) {
      console.error(`Failed to fetch videos: ${res.status} ${res.statusText}`);
      return { items: [], total: 0 };
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    return { items: [], total: 0 };
  }
}

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const data = await fetchVideos(searchParams);

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      
      {/* Page Header Banner */}
      <div className="relative z-10 container mx-auto px-4 mt-8 mb-16">
        <ScrollReveal variant="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-agenda uppercase tracking-wider mb-2 text-neutral-dark-grey">
            Media & <span className="font-bold text-primary-gold">Video</span>
          </h1>
          <div className="w-16 h-[2px] bg-primary-red mb-8"></div>
        </ScrollReveal>
      </div>

      <div className="container mx-auto px-4">
        
        <ScrollReveal variant="fade-up" delay={100} className="mb-12">
          <form className="flex w-full max-w-xl border-b border-neutral-border pb-2 group focus-within:border-primary-red transition-colors duration-300" action="/video">
            <input
              name="q"
              defaultValue={searchParams.q || ''}
              placeholder="SEARCH VIDEOS..."
              className="flex-1 bg-transparent border-none px-0 py-2 focus:outline-none focus:ring-0 font-agenda text-sm tracking-widest uppercase text-neutral-dark-grey placeholder-neutral-light-grey"
            />
            <button className="text-primary-red uppercase text-[11px] font-bold tracking-widest px-4 hover:text-black transition-colors duration-300" type="submit">
              SEARCH
            </button>
          </form>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.items.map((v: any, index: number) => (
            <ScrollReveal key={v.videoId} variant="fade-up" delay={index * 50}>
              <div className="group border border-neutral-border bg-white overflow-hidden shadow-sm hover:shadow-elegant hover:border-transparent transition-all duration-500 ease-out-expo h-full flex flex-col">
                <PlayerModal videoId={v.videoId} trigger={
                   <div className="cursor-pointer h-full flex flex-col relative">
                      <div className="aspect-video relative overflow-hidden bg-neutral-bg img-zoom">
                        <img 
                          src={v.thumbnailUrl} 
                          alt={v.title} 
                          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.08]" 
                        />
                        {/* Play Icon Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out-expo bg-black/30 backdrop-blur-sm">
                                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                            </div>
                        </div>
                      </div>
                       <div className="p-6 flex-grow flex flex-col bg-white z-10">
                        <div className="text-[10px] text-primary-gold uppercase font-bold tracking-[0.2em] mb-3">
                          {new Date(v.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <h3 className="font-bold text-[15px] leading-tight font-agenda uppercase text-neutral-dark-grey group-hover:text-primary-red transition-colors duration-300 mb-2">
                          {v.title}
                        </h3>
                        {typeof v.viewCount === 'number' && (
                          <div className="text-[11px] text-neutral-light-grey tracking-wider uppercase font-agenda mt-auto pt-4">
                            {v.viewCount.toLocaleString()} views
                          </div>
                        )}
                      </div>
                   </div>
                } />
              </div>
            </ScrollReveal>
          ))}
          
          {data.items.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <span className="text-neutral-light-grey uppercase font-agenda tracking-widest text-sm font-bold">No videos found.</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
