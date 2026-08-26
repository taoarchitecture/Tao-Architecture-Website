'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import Magnetic from '@/components/ui/Magnetic';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const DEFAULT_BANNER_TEXT = (
  <>
    Touching intangible beauty of nature,{' '}
    through tangible forms of{' '}
    <span className="font-bold">Architecture</span>
  </>
);

const HeroSlider = ({
  slides,
  bannerText,
}: {
  slides: { image: string; title?: string; subtitle?: string }[];
  bannerText?: string;
}) => {
  if (!slides || slides.length === 0) return null;

  return (
    // mb-* clears the caption card below, which intentionally bleeds past this
    // container's own bottom edge via translate-y — sized to the card's actual
    // measured overlap per breakpoint (~95-140px) plus a small buffer, so the
    // next section's own top padding stays independent, ordinary section rhythm.
    <div className="w-full relative bg-black h-[58vh] mb-[120px] sm:mb-[144px] md:mb-[164px] lg:mb-[156px] md:h-[clamp(480px,72vh,860px)]">
      <Swiper
        spaceBetween={0}
        effect="fade"
        speed={1200}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="w-full h-full overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title || `Tao Architecture Project ${index + 1}`}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                className="object-cover object-center"
                // On mobile this box is taller (relative to width) than the
                // landscape source, so object-cover zooms in well past 100%
                // to cover it — sizes has to reflect that effective render
                // width or Next fetches a source too small to stay sharp.
                sizes="(max-width: 767px) 250vw, 100vw"
                quality={85}
              />

              {/* Subtle dark overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* White text-box overlay — bottom-left, overlapping the slider edge */}
      <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none translate-y-[34%] sm:translate-y-[40%] md:translate-y-[44%] lg:translate-y-[46%]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="pointer-events-auto w-full" style={{ maxWidth: 'clamp(320px, 45%, 550px)' }}>
            <div className="bg-white border-t-[12px] border-neutral-black px-6 py-8 md:px-10 md:py-10 shadow-premium-lg">
              <h1 className="tao-fs-banner font-bold leading-tight tracking-tight font-agenda text-neutral-dark-grey mb-6">
                {bannerText || DEFAULT_BANNER_TEXT}
              </h1>
              <Magnetic>
                <Link
                  href="/studio"
                  className="btn btn-outline text-[11px] px-6 py-2.5 tracking-[0.18em] uppercase"
                  style={{ minHeight: '36px' }}
                >
                  KNOW ABOUT US
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
