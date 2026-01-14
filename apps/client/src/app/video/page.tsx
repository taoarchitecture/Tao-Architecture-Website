import React from 'react';
import { PlayerModal } from './player-modal';

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

  const res = await fetch(url.toString(), { next: { revalidate: 120 } });
  if (!res.ok) throw new Error('Failed to load videos');
  return res.json();
}

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const data = await fetchVideos(searchParams);

  return (
    <div className="px-6 py-8">
      <div className="mb-6 flex items-center gap-3">
        <form className="flex w-full max-w-lg" action="/video">
          <input
            name="q"
            defaultValue={searchParams.q || ''}
            placeholder="Search videos"
            className="flex-1 border border-gray-300 rounded-l px-3 py-2"
          />
          <button className="bg-black text-white px-4 py-2 rounded-r" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map((v: any) => (
          <div key={v.videoId} className="group border rounded overflow-hidden">
            <PlayerModal videoId={v.videoId} trigger={
               <div className="cursor-pointer">
                  <div className="aspect-video bg-gray-100">
                    <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
                  </div>
                   <div className="p-3">
                    <div className="text-sm text-gray-500">{new Date(v.publishedAt).toLocaleDateString()}</div>
                    <div className="font-medium leading-tight mt-1">{v.title}</div>
                    {typeof v.viewCount === 'number' && (
                      <div className="text-xs text-gray-500 mt-1">{v.viewCount.toLocaleString()} views</div>
                    )}
                  </div>
               </div>
            } />
          </div>
        ))}
      </div>
    </div>
  );
}
