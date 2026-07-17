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

const HeroSlider = ({ slides }: { slides: { image: string; title?: string; subtitle?: string }[] }) => {
  if (!slides || slides.length === 0) return null;

  return (
    <div className="w-full relative bg-black" style={{ height: 'clamp(480px, 72vh, 860px)' }}>
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
                priority={index <= 1}
                loading={index <= 1 ? "eager" : "lazy"}
                className="object-cover object-center"
                sizes="100vw"
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
                Touching intangible beauty of nature,{' '}
                through tangible forms of{' '}
                <span className="font-bold">Architecture</span>
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
