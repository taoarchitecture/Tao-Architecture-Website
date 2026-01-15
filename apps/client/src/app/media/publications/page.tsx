'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Publication {
  id: string;
  category: string;
  title: string;
  description?: string;
  image: string;
  link: string;
}

const publications: Publication[] = [
  {
    id: '1',
    category: 'ARCHITECTURE + INTERIORS',
    title: 'Paradiso Residence in Timeless Living: Houses Under the Sun',
    image: '/img/publications/timeless-living.jpg',
    link: '#',
  },
  {
    id: '2',
    category: 'ARCHITECTURE + INTERIORS',
    title: 'Nest Residence in The Modern Home',
    image: '/img/publications/modern-home.jpg',
    link: '#',
  },
  {
    id: '3',
    category: 'ARCHITECTURE + RETAIL + RECREATION',
    title: 'Paradiso Residence featured in Luxury Indian Interiors: Perspectives of the New Indian Aesthetics',
    image: '/img/publications/luxury-indian.jpg',
    link: '#',
  },
  {
    id: '4',
    category: 'ARCHITECTURE + INTERIORS + CRAFT + LANDSCAPE',
    title: 'Featured in Detail Magazine',
    image: '/img/publications/detail.jpg',
    link: '#',
  },
  {
    id: '5',
    category: 'ARCHITECTURE',
    title: '50 Amazing Homes in India',
    image: '/img/publications/50-homes.jpg',
    link: '#',
  },
];

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
        <Link
          href={pub.link}
          className="inline-block border border-gray-800 text-gray-800 px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 hover:text-white transition-all duration-300"
        >
          See Projects
        </Link>
      </div>
    </div>
  </div>
);

export default function Publications() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {publications.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} />
          ))}
        </div>
      </div>
    </main>
  );
}
