'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Magnetic from '@/components/ui/Magnetic';

export interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  titleLines?: string[];
  subheading?: string;
  image: string;
  link: string;
  heightClass?: string;
  overlayStyle?: boolean;
  overlayCtaClass?: string;
  disciplines?: string;
  desktopColumn?: 'left' | 'right';
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const OverlayCard = ({ item }: { item: PortfolioItem }) => {
  const lines = item.titleLines?.length ? item.titleLines : [item.title];

  return (
    <motion.article variants={cardVariants} className="group">
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 z-10 h-[6px] bg-neutral-black pointer-events-none" />
        <div className="absolute left-6 top-0 z-20 pointer-events-none md:left-7">
          <span className="portfolio-badge block !px-4 !py-[7px] !leading-none text-[10px] sm:text-[11px] shadow-none align-top">
            {item.category}
          </span>
        </div>

        <Link href={item.link} className="block focus-ring" aria-label={`View ${item.title}`}>
          <div className={`relative w-full overflow-hidden ${item.heightClass || 'aspect-[10/9.4]'}`}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover img-hover-zoom"
              sizes="(max-width: 767px) 100vw, 44vw"
              quality={85}
            />
          </div>
        </Link>

        <div className="pointer-events-none absolute left-0 top-[12%] z-10 max-w-[88%] sm:max-w-[80%]">
          <div className="flex w-max max-w-full flex-col gap-px">
            {lines.map((line, index) => (
              <div
                key={index}
                className="border-b border-[#c9d3dd] bg-white/60 px-5 py-2 shadow-[0_1px_0_rgba(0,0,0,0.03)] md:px-6"
              >
                <span className="block font-agenda text-[clamp(18px,1rem+1vw,26px)] font-normal leading-[1.15] tracking-[-0.02em] text-neutral-dark-grey">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-7 left-6 z-10 md:left-7">
          <Magnetic>
            <Link
              href={item.link}
              className={`inline-flex items-center border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:tracking-[0.22em] ${item.overlayCtaClass || 'border-white bg-white/10 text-white hover:bg-white hover:text-neutral-dark-grey'}`}
            >
              See Projects
            </Link>
          </Magnetic>
        </div>
      </div>
    </motion.article>
  );
};

const StandardCard = ({ item }: { item: PortfolioItem }) => (
  <motion.article variants={cardVariants} className="group">
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 z-10 h-[6px] bg-neutral-black pointer-events-none" />
      <div className="absolute left-6 top-[6px] z-20 pointer-events-none md:left-7">
        <span className="portfolio-badge block !px-4 !py-[7px] !leading-none text-[10px] sm:text-[11px] shadow-none align-top">
          {item.category}
        </span>
      </div>

      <Link href={item.link} className="block focus-ring" aria-label={`View ${item.title}`}>
        <div className={`relative w-full overflow-hidden bg-neutral-border ${item.heightClass || 'aspect-[10/6]'}`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover img-hover-zoom"
            sizes="(max-width: 767px) 100vw, 44vw"
            quality={85}
          />
        </div>
      </Link>
    </div>

    <div className="mt-4 max-w-[30rem]">
      {item.disciplines && (
        <p className="mb-2 font-agenda text-[10px] font-bold uppercase tracking-[0.16em] text-primary-red sm:text-[11px]">
          {item.disciplines}
        </p>
      )}
      <h3 className="mb-4 font-agenda text-[clamp(19px,1rem+0.75vw,25px)] font-normal leading-[1.45] tracking-[-0.01em] text-neutral-dark-grey">
        <Link href={item.link} className="transition-colors duration-300 hover:text-primary-red">
          {item.title}
        </Link>
      </h3>
      <Magnetic>
        <Link
          href={item.link}
          className="inline-flex items-center border border-neutral-dark-grey px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-dark-grey transition-all duration-300 hover:bg-neutral-dark-grey hover:text-white hover:tracking-[0.22em]"
        >
          See Projects
        </Link>
      </Magnetic>
    </div>
  </motion.article>
);

const renderCard = (item: PortfolioItem) => (
  item.overlayStyle ? <OverlayCard key={item.id} item={item} /> : <StandardCard key={item.id} item={item} />
);

const PortfolioGrid = ({ items }: { items: PortfolioItem[] }) => {
  if (!items || items.length === 0) {
    return (
      <section className="container mx-auto max-w-6xl bg-white px-4 py-20 text-center">
        <p className="text-sm tracking-wide text-neutral-medium-grey">No projects found.</p>
      </section>
    );
  }

  const hasExplicitColumns = items.some((item) => item.desktopColumn);
  const midPoint = Math.ceil(items.length / 2);
  const leftColumnItems = hasExplicitColumns
    ? items.filter((item) => item.desktopColumn !== 'right')
    : items.slice(0, midPoint);
  const rightColumnItems = hasExplicitColumns
    ? items.filter((item) => item.desktopColumn === 'right')
    : items.slice(midPoint);

  // Columns are curated per-item (desktopColumn), so they rarely land on equal
  // length or equal aspect-ratio totals. Once the shorter column runs out,
  // whatever's left in the taller one gets pulled out of the 2-up grid and
  // rendered full-width below — turns a dead gap beside the last card into a
  // deliberate closing banner instead.
  const pairedCount = Math.min(leftColumnItems.length, rightColumnItems.length);
  const pairedLeft = leftColumnItems.slice(0, pairedCount);
  const pairedRight = rightColumnItems.slice(0, pairedCount);
  const overflowItems = [...leftColumnItems.slice(pairedCount), ...rightColumnItems.slice(pairedCount)];

  return (
    <section className="container mx-auto max-w-6xl bg-white px-4 pb-10 pt-20 sm:px-6 md:pb-14 md:pt-24 lg:px-8 lg:pt-28">
      <motion.div
        className="space-y-14 md:hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.14 }}
      >
        {items.map(renderCard)}
      </motion.div>

      <motion.div
        className="hidden md:block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
        transition={{ staggerChildren: 0.16 }}
      >
        <div className="grid grid-cols-2 gap-x-7 lg:gap-x-10">
          <div className="space-y-12 lg:space-y-16">
            {pairedLeft.map(renderCard)}
          </div>
          <div className="space-y-12 lg:space-y-16">
            {pairedRight.map(renderCard)}
          </div>
        </div>
        {overflowItems.length > 0 && (
          <div className="mt-12 space-y-12 lg:mt-16 lg:space-y-16">
            {overflowItems.map(renderCard)}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default PortfolioGrid;
