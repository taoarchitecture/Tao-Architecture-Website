import dynamic from 'next/dynamic';
import HeroSlider from '@/components/home/HeroSlider';
import { getHomeConfig } from '@/lib/api';
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
  const [homeConfig] = await Promise.all([
    getHomeConfig()
  ]);

  // Exact data from the mockup to recreate the Category Grid
  const homeGridItems: PortfolioItem[] = [
    // --- LEFT COLUMN (5 items) ---
    {
      id: 'corporate',
      category: 'CORPORATE',
      title: 'Creating collaborative and contemporary work culture',
      titleLines: ['Creating collaborative', 'and contemporary', 'work culture'],
      image: '/img/corporate/nyati-unitree/3unitree-facade-bg.jpg',
      link: '/work#corporate',
      overlayStyle: true,
      overlayCtaClass: 'border-white text-white bg-white/10 hover:bg-white hover:text-black',
    },
    {
      id: 'commercial',
      category: 'COMMERCIAL',
      disciplines: 'ARCHITECTURE • RETAIL • RECREATION',
      title: 'Formulating energetic architecture to blend commerce and recreation',
      image: '/img/commercial/manikchand-plaza/manikchand-plaza-bg.jpg',
      link: '/work#commercial',
      overlayStyle: false,
    },
    {
      id: 'institutional',
      category: 'INSTITUTIONAL',
      disciplines: 'ARCHITECTURE • INTERIORS • LANDSCAPE • ART INSTALLATION',
      title: 'Nurturing learning through interactive spaces',
      image: '/img/institution/suzlon-corporate-learning-centre/suzlon-corporate-learning-centre-bg.jpg',
      link: '/work#institutional',
      overlayStyle: false,
    },
    {
      id: 'tao-the-way',
      category: 'TAO - THE WAY',
      disciplines: 'SUSTAINABLE • ECO-CONSCIOUS',
      title: 'Breaking barriers between indoors and outdoors',
      image: '/img/villa/vrindavan/vrindavan-bg.jpg',
      link: '/work#luxuryvillas',
      overlayStyle: false,
    },
    {
      id: 'products',
      category: 'PRODUCTS',
      title: 'Productive and social surfaces',
      image: '/img/products/desking-and-tables/desking-and-tables-bg.jpg',
      link: '/work#products',
      overlayStyle: false,
    },
    
    // --- RIGHT COLUMN (4 items) ---
    {
      id: 'luxury-villas',
      category: 'LUXURY VILLAS',
      disciplines: 'ARCHITECTURE • INTERIORS • LANDSCAPE • ART INSTALLATION',
      title: 'Rendering homes as personal resorts',
      image: '/img/villa/azaan/10-bg.jpg',
      link: '/work#luxuryvillas',
      overlayStyle: false,
    },
    {
      id: 'cozy-homes',
      category: 'COZY HOMES',
      disciplines: 'ARCHITECTURE • INTERIORS • CRAFT • LANDSCAPE',
      title: 'Nourishing lives through intimate and sensitive spaces',
      image: '/img/cozy_homes/garden-villa/garden-villa-bg.jpg',
      link: '/work#cozyhomes',
      overlayStyle: false,
    },
    {
      id: 'luxury-apartments',
      category: 'LUXURY APARTMENTS',
      disciplines: 'INTERIORS • FURNITURE • ART INSTALLATION',
      title: 'Forming nests around the sky',
      image: '/img/luxuryappartments/aurum/aurum-bg.jpg',
      link: '/work#apartments',
      overlayStyle: false,
    },
    {
      id: 'housing',
      category: 'HOUSING',
      title: 'Formulating cohesive and socio-culture environments',
      titleLines: ['Formulating cohesive', 'and socio-culture', 'environments'],
      image: '/img/housing/pinewood/pinewood-bg.jpg',
      link: '/work#housing',
      overlayStyle: true,
      overlayCtaClass: 'border-neutral-dark-grey text-neutral-dark-grey bg-white/20 hover:bg-neutral-dark-grey hover:text-white',
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <HeroSlider slides={homeConfig?.heroSlides?.length ? homeConfig.heroSlides : defaultSlides} />
      <PortfolioGrid items={homeGridItems} />
      <HomeBottomSection config={homeConfig} />
    </main>
  );
}
