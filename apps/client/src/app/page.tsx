import HeroSlider from '@/components/home/HeroSlider';
import Banner from '@/components/home/Banner';
import PortfolioGrid from '@/components/home/PortfolioGrid';
import HomeBottomSection from '@/components/home/HomeBottomSection';
import { getHomeConfig } from '@/lib/api';
// Default slides if API fails or empty
const defaultSlides = [
  { image: '/img/portfolio/b14.jpg' },
  { image: '/img/portfolio/b15.jpg' },
  { image: '/img/portfolio/b17.jpg' }
];

export default async function Home() {
  const homeConfig = await getHomeConfig();

  return (
    <main className="min-h-screen bg-white">
      <HeroSlider slides={homeConfig?.heroSlides?.length ? homeConfig.heroSlides : defaultSlides} />
      <Banner />
      <PortfolioGrid />
      <HomeBottomSection />
    </main>
  );
}
