import HeroSlider from '@/components/home/HeroSlider';
import Banner from '@/components/home/Banner';
import PortfolioGrid, { PortfolioItem } from '@/components/home/PortfolioGrid';
import HomeBottomSection from '@/components/home/HomeBottomSection';
import { getHomeConfig, getProjects } from '@/lib/api';
import { Project } from '@/types';

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

  const featuredProjects = (projects as Project[])
    .filter(p => p.isFeatured)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    .map(p => ({
      id: String(p.id),
      category: p.category,
      title: p.title,
      titleLines: [p.title], // Simplified
      subheading: p.category, // Use category as subheading
      image: p.coverImage || '/img/placeholder.jpg',
      link: `/projects/${p.slug}`,
      overlayStyle: true // Default to true for featured? Or logic based on category
    } as PortfolioItem));

  return (
    <main className="min-h-screen bg-white">
      <HeroSlider slides={homeConfig?.heroSlides?.length ? homeConfig.heroSlides : defaultSlides} />
      <Banner />
      <PortfolioGrid items={featuredProjects} />
      <HomeBottomSection config={homeConfig} />
    </main>
  );
}
