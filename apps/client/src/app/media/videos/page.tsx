import React from 'react';
import { PlayerModal } from '@/app/video/player-modal';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export const metadata = {
  title: 'Videos | Tao Architecture',
  description: 'Watch our architectural films, project walkthroughs, and YouTube Shorts from TAO Studio.',
};

// In production the API lives on the same Vercel domain.
// In development the Express server runs on port 5000.
function getApiBase() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_API_BASE && !process.env.NEXT_PUBLIC_API_BASE.includes('localhost:3000')) {
    return process.env.NEXT_PUBLIC_API_BASE;
  }
  return 'http://localhost:5000';
}

async function fetchVideos(
  searchParams: { [key: string]: string | undefined },
  isShort: boolean,
) {
  const base = getApiBase();
  const url = new URL(`${base}/api/videos`);
  const q = searchParams?.q || '';
  const category = searchParams?.category || '';
  const tag = searchParams?.tag || '';
  const sort = searchParams?.sort || 'date';

  url.searchParams.set('page', '1');
  url.searchParams.set('pageSize', isShort ? '12' : '24');
  url.searchParams.set('sort', sort);
  url.searchParams.set('isShort', isShort ? 'true' : 'false');
  if (q) url.searchParams.set('q', q);
  if (category) url.searchParams.set('category', category);
  if (tag) url.searchParams.set('tag', tag);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`[Videos] Fetch failed: ${res.status} ${url}`);
      return { items: [], total: 0 };
    }
    return res.json();
  } catch (err) {
    console.error('[Videos] Fetch error:', err);
    return { items: [], total: 0 };
  }
}

export default async function VideosPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const [longFormVideos, shorts] = await Promise.all([
    fetchVideos(searchParams, false),
    fetchVideos(searchParams, true),
  ]);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Videos</h1>
        <p className="text-neutral-medium-grey">
          Architectural films, project walkthroughs, and behind-the-scenes from TAO Studio.
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <form className="flex w-full max-w-lg" action="/media/videos">
          <input
            name="q"
            defaultValue={searchParams?.q || ''}
            placeholder="Search videos…"
            className="flex-1 rounded-l border border-neutral-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-black"
          />
          <button
            className="rounded-r bg-neutral-black px-6 py-2 text-white transition-colors hover:bg-neutral-dark-grey"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      {longFormVideos.items.length === 0 && shorts.items.length === 0 ? (
        <div className="py-20 text-center text-neutral-medium-grey">
          <p className="text-xl mb-2">No videos found</p>
          <p>We couldn&apos;t load any videos at the moment. Please try again later.</p>
        </div>
      ) : (
        <>
          {/* Long-form videos */}
          {longFormVideos.items.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Long-Form Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {longFormVideos.items.map((v: any) => (
                  <div
                    key={v.videoId}
                    className="group flex flex-col overflow-hidden rounded-lg border border-neutral-border bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <PlayerModal
                      videoId={v.videoId}
                      trigger={
                        <div className="cursor-pointer">
                          <div className="relative aspect-video overflow-hidden bg-neutral-bg">
                            <img
                              src={v.thumbnailUrl}
                              alt={v.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
                              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                <svg className="w-6 h-6 text-neutral-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="mb-2 flex items-center justify-between text-sm text-neutral-medium-grey">
                              <span>
                                {new Date(v.publishedAt).toLocaleDateString(undefined, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                              {typeof v.viewCount === 'number' && (
                                <span>{v.viewCount.toLocaleString()} views</span>
                              )}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight text-neutral-dark-grey transition-colors group-hover:text-primary-red">
                              {v.title}
                            </h3>
                            <p className="mt-auto line-clamp-3 text-sm text-neutral-medium-grey">
                              {v.description}
                            </p>
                          </div>
                        </div>
                      }
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* YouTube Shorts */}
          {shorts.items.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-6">YouTube Shorts</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {shorts.items.map((v: any) => (
                  <div
                    key={v.videoId}
                    className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    <PlayerModal
                      videoId={v.videoId}
                      trigger={
                        <div className="relative aspect-[9/16] cursor-pointer bg-neutral-black">
                          <img
                            src={v.thumbnailUrl}
                            alt={v.title}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-medium text-white text-sm line-clamp-2 leading-snug mb-1">
                              {v.title}
                            </h3>
                            {typeof v.viewCount === 'number' && (
                              <span className="text-xs text-white/75">
                                {v.viewCount.toLocaleString()} views
                              </span>
                            )}
                          </div>
                          <div className="absolute top-2 right-2 rounded bg-primary-red px-2 py-1 text-[10px] font-bold text-white">
                            SHORT
                          </div>
                        </div>
                      }
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
