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
    <div className="w-full relative bg-black overflow-hidden" style={{ height: 'clamp(480px, 72vh, 860px)' }}>
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
        className="w-full h-full"
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

      {/* White text-box overlay — bottom-left, sits on top of slider */}
      <div className="absolute bottom-0 left-0 z-20 pointer-events-none" style={{ maxWidth: 'clamp(280px, 42%, 500px)' }}>
        <div className="bg-white px-6 py-5 md:px-8 md:py-6 shadow-premium-lg pointer-events-auto">
          <h1 className="tao-fs-banner font-bold leading-tight font-agenda text-neutral-dark-grey mb-4">
            Touching intangible beauty of nature,{' '}
            through tangible forms of{' '}
            <span className="font-bold">Architecture</span>
          </h1>
          <Magnetic>
            <Link
              href="/studio"
              className="btn btn-outline text-[11px] px-4 py-2 tracking-[0.18em]"
              style={{ minHeight: '36px' }}
            >
              Know About Us
            </Link>
          </Magnetic>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
