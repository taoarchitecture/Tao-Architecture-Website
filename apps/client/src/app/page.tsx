import HeroSlider from '@/components/home/HeroSlider';
import Banner from '@/components/home/Banner';
import PortfolioGrid from '@/components/home/PortfolioGrid';
import HomeBottomSection from '@/components/home/HomeBottomSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSlider />
      <Banner />
      <PortfolioGrid />
      <HomeBottomSection />
    </main>
  );
}
