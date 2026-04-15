import dynamic from 'next/dynamic';
import HeroSlider from '@/components/home/HeroSlider';
import { getHomeConfig, getProjects } from '@/lib/api';
import { Project } from '@/types';
import { PortfolioItem } from '@/components/home/PortfolioGrid';

const PortfolioGrid = dynamic(() => import('@/components/home/PortfolioGrid'), {
  ssr: true,
  loading: () => (
    <div className="container mx-auto px-4 py-16 bg-white max-w-6xl animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="h-[390px] bg-neutral-border rounded"></div>
        <div className="h-[280px] bg-neutral-border rounded md:mt-24"></div>
      </div>
    </div>
  ),
});

const HomeBottomSection = dynamic(() => import('@/components/home/HomeBottomSection'), {
  ssr: true,
});

// Default slides if API fails or empty
const defaultSlides = [
  { image: '/img/portfolio/b14.jpg' },
  { image: '/img/portfolio/b15.jpg' },
  { image: '/img/portfolio/b17.jpg' }
];

export default async function Home() {
  const [homeConfig, projects] = await Promise.all([
    getHomeConfig(),
    getProjects()
  ]);

  const featuredProjectsRaw = (projects as Project[])
    .filter(p => p.isFeatured)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  const midPoint = Math.ceil(featuredProjectsRaw.length / 2);

  const featuredProjects = featuredProjectsRaw.map((p, idx) => ({
    id: String(p.id),
    category: p.category,
    title: p.title,
    titleLines: p.title.split(' ').length > 4
      ? [p.title.split(' ').slice(0, Math.ceil(p.title.split(' ').length / 2)).join(' '),
         p.title.split(' ').slice(Math.ceil(p.title.split(' ').length / 2)).join(' ')]
      : [p.title],
    subheading: p.category,
    disciplines: p.category ? p.category.toUpperCase() : undefined,
    image: p.coverImage || '/img/placeholder.jpg',
    link: `/projects/${p.slug}`,
    // Left column (indices 0..midPoint-1) get overlay style, right column gets standard
    overlayStyle: idx < midPoint,
  } as PortfolioItem));

  return (
    <main className="min-h-screen bg-white">
      <HeroSlider slides={homeConfig?.heroSlides?.length ? homeConfig.heroSlides : defaultSlides} />
      <PortfolioGrid items={featuredProjects} />
      <HomeBottomSection config={homeConfig} />
    </main>
  );
}
