import dynamic from 'next/dynamic';
import HeroSlider from '@/components/home/HeroSlider';
import { getHomeConfig, getHomeGridItems } from '@/lib/api';
import { PortfolioItem } from '@/components/home/PortfolioGrid';
import { getImageUrl } from '@/utils/image';

const PortfolioGrid = dynamic(() => import('@/components/home/PortfolioGrid'), {
  ssr: true,
  loading: () => (
    <section className="container mx-auto max-w-6xl bg-white px-4 pb-10 pt-20 sm:px-6 md:pb-14 md:pt-24 lg:px-8 lg:pt-28">
      <div className="space-y-12 md:hidden animate-pulse">
        <div className="space-y-4">
          <div className="aspect-[10/11] bg-neutral-border" />
          <div className="h-4 w-3/4 bg-neutral-border" />
          <div className="h-4 w-1/2 bg-neutral-border" />
        </div>
        <div className="space-y-4">
          <div className="aspect-[10/6] bg-neutral-border" />
          <div className="h-3 w-2/3 bg-neutral-border" />
          <div className="h-5 w-4/5 bg-neutral-border" />
        </div>
      </div>
      <div className="hidden animate-pulse md:grid md:grid-cols-2 md:gap-x-7 lg:gap-x-10">
        <div className="space-y-12 lg:space-y-16">
          <div className="space-y-4">
            <div className="aspect-[10/11] bg-neutral-border" />
            <div className="h-4 w-2/3 bg-neutral-border" />
          </div>
          <div className="space-y-4">
            <div className="aspect-[10/6] bg-neutral-border" />
            <div className="h-3 w-3/5 bg-neutral-border" />
            <div className="h-5 w-4/5 bg-neutral-border" />
          </div>
        </div>
        <div className="space-y-12 lg:space-y-16">
          <div className="space-y-4">
            <div className="aspect-[10/6] bg-neutral-border" />
            <div className="h-3 w-2/3 bg-neutral-border" />
            <div className="h-5 w-3/4 bg-neutral-border" />
          </div>
          <div className="space-y-4">
            <div className="aspect-[10/6] bg-neutral-border" />
            <div className="h-3 w-3/5 bg-neutral-border" />
            <div className="h-5 w-4/5 bg-neutral-border" />
          </div>
        </div>
      </div>
    </section>
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

// Layout for the homepage category grid — which column, card height/aspect
// ratio, and card style (overlay vs. standard) — is a design decision tied to
// this specific composition, so it stays defined here in code, keyed by the
// same slotKey the admin panel edits content for. Editorial content (image,
// title, category label, etc.) comes from the database via getHomeGridItems();
// these values are also the fallback if that fetch is ever empty or fails.
type GridSlotLayout = Pick<PortfolioItem, 'overlayStyle' | 'overlayCtaClass' | 'desktopColumn' | 'heightClass'> & {
  category: string;
  title: string;
  titleLines?: string[];
  disciplines?: string;
  image: string;
  link: string;
};

const gridSlots: Record<string, GridSlotLayout> = {
  corporate: {
    category: 'CORPORATE',
    title: 'Creating collaborative and contemporary work culture',
    titleLines: ['Creating collaborative', 'and contemporary', 'work culture'],
    image: '/img/portfolio/masonry/1.jpg',
    link: '/work#corporate',
    overlayStyle: true,
    overlayCtaClass: 'border-white text-white bg-white/10 hover:bg-white hover:text-black',
    desktopColumn: 'left',
    heightClass: 'aspect-[10/11]',
  },
  'luxury-villas': {
    category: 'LUXURY VILLAS',
    disciplines: 'ARCHITECTURE • INTERIORS • LANDSCAPE • ART INSTALLATION',
    title: 'Rendering homes as personal resorts',
    image: '/img/portfolio/masonry/luxury.jpg',
    link: '/work#luxuryvillas',
    overlayStyle: false,
    desktopColumn: 'right',
    heightClass: 'aspect-[10/5.9]',
  },
  commercial: {
    category: 'COMMERCIAL',
    disciplines: 'ARCHITECTURE • RETAIL • RECREATION',
    title: 'Formulating energetic architecture to blend commerce and recreation',
    image: '/img/portfolio/masonry/commercial.jpg',
    link: '/work#commercial',
    overlayStyle: false,
    desktopColumn: 'left',
    heightClass: 'aspect-[10/6.1]',
  },
  'cozy-homes': {
    category: 'COZY HOMES',
    disciplines: 'ARCHITECTURE • INTERIORS • CRAFT • LANDSCAPE',
    title: 'Nourishing lives through intimate and sensitive spaces',
    image: '/img/portfolio/masonry/cozyhomes.jpg',
    link: '/work#cozyhomes',
    overlayStyle: false,
    desktopColumn: 'right',
    heightClass: 'aspect-[10/6.1]',
  },
  institutional: {
    category: 'INSTITUTIONAL',
    disciplines: 'ARCHITECTURE • INTERIORS • LANDSCAPE • ART INSTALLATION',
    title: 'Nurturing learning through interactive spaces',
    image: '/img/portfolio/masonry/institutional.jpg',
    link: '/work#institutional',
    overlayStyle: false,
    desktopColumn: 'left',
    heightClass: 'aspect-[10/6.1]',
  },
  'luxury-apartments': {
    category: 'LUXURY APARTMENTS',
    disciplines: 'INTERIORS • FURNITURE • ART INSTALLATION',
    title: 'Forming nests around the sky',
    image: '/img/portfolio/masonry/pent.jpg',
    link: '/work#apartments',
    overlayStyle: false,
    desktopColumn: 'right',
    heightClass: 'aspect-[10/6.1]',
  },
  'tao-the-way': {
    category: 'SUSTAINABLE DESIGN',
    disciplines: 'BIOPHILIC ARCHITECTURE • ECO-CONSCIOUS',
    title: 'Breaking barriers between indoors and outdoors',
    image: '/img/portfolio/masonry/landscape.jpg',
    link: '/studio',
    overlayStyle: false,
    desktopColumn: 'left',
    heightClass: 'aspect-[10/6.1]',
  },
  housing: {
    category: 'HOUSING',
    title: 'Formulating cohesive and socio-cultural environments',
    titleLines: ['Formulating cohesive', 'and socio-cultural', 'environments'],
    image: '/img/housing/pinewood/pinewood-bg.jpg',
    link: '/work#housing',
    overlayStyle: true,
    overlayCtaClass: 'border-neutral-dark-grey text-neutral-dark-grey bg-white/20 hover:bg-neutral-dark-grey hover:text-white',
    desktopColumn: 'right',
    heightClass: 'aspect-[10/9.4]',
  },
  products: {
    category: 'PRODUCTS',
    disciplines: 'CREATIVITY • INTERIORS',
    title: 'Carving functional sculptures as integral part of architecture',
    image: '/img/portfolio/masonry/furniture.jpg',
    link: '/work#products',
    overlayStyle: false,
    desktopColumn: 'left',
    heightClass: 'aspect-[10/6.1]',
  },
};

const slotOrder = Object.keys(gridSlots);

type HomeGridItemContent = {
  slotKey: string;
  category: string;
  title: string;
  titleLines?: string[];
  disciplines?: string | null;
  image: string;
  link: string;
  order: number;
};

function buildHomeGridItems(dbItems: HomeGridItemContent[]): PortfolioItem[] {
  const bySlot = new Map(dbItems.map((item) => [item.slotKey, item]));

  return slotOrder
    .map((slotKey, index) => {
      const layout = gridSlots[slotKey];
      const content = bySlot.get(slotKey);
      return {
        id: slotKey,
        category: content?.category || layout.category,
        title: content?.title || layout.title,
        titleLines: content?.titleLines?.length ? content.titleLines : layout.titleLines,
        disciplines: content?.disciplines || layout.disciplines,
        image: getImageUrl(content?.image || layout.image),
        link: content?.link || layout.link,
        overlayStyle: layout.overlayStyle,
        overlayCtaClass: layout.overlayCtaClass,
        desktopColumn: layout.desktopColumn,
        heightClass: layout.heightClass,
        _order: content?.order ?? index,
      };
    })
    .sort((a, b) => a._order - b._order)
    .map(({ _order, ...item }) => item);
}

export default async function Home() {
  const [homeConfig, homeGridContent] = await Promise.all([
    getHomeConfig(),
    getHomeGridItems(),
  ]);

  const homeGridItems: PortfolioItem[] = buildHomeGridItems(homeGridContent || []);

  return (
    <main className="min-h-screen bg-white">
      <HeroSlider
        slides={homeConfig?.heroSlides?.length ? homeConfig.heroSlides : defaultSlides}
        bannerText={homeConfig?.bannerText || undefined}
      />
      <PortfolioGrid items={homeGridItems} />
      <HomeBottomSection config={homeConfig} />
    </main>
  );
}
