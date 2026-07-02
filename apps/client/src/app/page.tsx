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
      category: 'CORPORATE ARCHITECTURE',
      title: 'Designing sustainable corporate headquarters with a collaborative work culture',
      titleLines: ['Designing sustainable', 'corporate headquarters', '& work culture'],
      image: '/img/corporate/nyati-unitree/3unitree-facade-bg.jpg',
      link: '/work#corporate',
      overlayStyle: true,
      overlayCtaClass: 'border-white text-white bg-white/10 hover:bg-white hover:text-black',
    },
    {
      id: 'commercial',
      category: 'COMMERCIAL DESIGN',
      disciplines: 'PREMIUM ARCHITECTURE • RETAIL SPACES • RECREATION',
      title: 'Formulating energetic commercial architecture to blend high-end retail and modern recreation',
      image: '/img/commercial/manikchand-plaza/manikchand-plaza-bg.jpg',
      link: '/work#commercial',
      overlayStyle: false,
    },
    {
      id: 'institutional',
      category: 'INSTITUTIONAL SPACES',
      disciplines: 'EDUCATIONAL ARCHITECTURE • INTERIORS • LANDSCAPE',
      title: 'Nurturing progressive learning through eco-conscious and interactive educational spaces',
      image: '/img/institution/suzlon-corporate-learning-centre/suzlon-corporate-learning-centre-bg.jpg',
      link: '/work#institutional',
      overlayStyle: false,
    },
    {
      id: 'tao-the-way',
      category: 'SUSTAINABLE DESIGN',
      disciplines: 'BIOPHILIC ARCHITECTURE • ECO-CONSCIOUS',
      title: 'Breaking barriers between indoors and outdoors with sustainable biophilic architecture',
      image: '/img/villa/vrindavan/vrindavan-bg.jpg',
      link: '/work#luxuryvillas',
      overlayStyle: false,
    },
    {
      id: 'products',
      category: 'PRODUCT DESIGN',
      title: 'Crafting bespoke furniture and functional interactive surfaces for modern interiors',
      image: '/img/products/desking-and-tables/desking-and-tables-bg.jpg',
      link: '/work#products',
      overlayStyle: false,
    },
    
    // --- RIGHT COLUMN (4 items) ---
    {
      id: 'luxury-villas',
      category: 'LUXURY VILLAS',
      disciplines: 'HIGH-END RESIDENTIAL • INTERIORS • LANDSCAPE',
      title: 'Rendering bespoke luxury villas and expansive homes as private wellness resorts',
      image: '/img/villa/azaan/10-bg.jpg',
      link: '/work#luxuryvillas',
      overlayStyle: false,
    },
    {
      id: 'cozy-homes',
      category: 'RESIDENTIAL HAVENS',
      disciplines: 'INTIMATE ARCHITECTURE • BESPOKE INTERIORS • CRAFT',
      title: 'Nourishing contemporary lifestyles through intimate, sensitive residential architecture',
      image: '/img/cozy_homes/garden-villa/garden-villa-bg.jpg',
      link: '/work#cozyhomes',
      overlayStyle: false,
    },
    {
      id: 'luxury-apartments',
      category: 'PREMIUM APARTMENTS',
      disciplines: 'MODERN INTERIORS • CUSTOM FURNITURE • INSTALLATIONS',
      title: 'Designing high-altitude luxury apartments with panoramic architectural layouts',
      image: '/img/luxuryappartments/aurum/aurum-bg.jpg',
      link: '/work#apartments',
      overlayStyle: false,
    },
    {
      id: 'housing',
      category: 'URBAN HOUSING',
      title: 'Formulating cohesive socio-cultural urban housing and sustainable environments',
      titleLines: ['Formulating cohesive', 'socio-cultural urban', 'housing environments'],
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
