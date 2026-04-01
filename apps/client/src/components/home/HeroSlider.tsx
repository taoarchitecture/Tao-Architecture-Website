'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Fallback data
const mockSlides = [
  {
    id: '1',
    title: 'Solhavn Unit E',
    category: 'HOUSING',
    imageUrl: '/img/Solhavn-Unit-E_3200px.png',
    link: '/work',
  },
  {
    id: '2',
    title: 'Suzlon One Earth',
    category: 'COMMERCIAL',
    imageUrl: '/img/suzlononeearth.jpg',
    link: '/work',
  },
  {
    id: '3',
    title: 'House in the Hills',
    category: 'RESIDENTIAL',
    imageUrl: '/img/tao_back.jpg',
    link: '/work',
  }
];

export default function HeroSlider({ slides = mockSlides }: { slides?: any[] }) {
  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-neutral-black">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1500}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || index} className="relative h-full w-full overflow-hidden group">
            {/* Ken Burns Effect Image container */}
            <div className="absolute inset-0 w-full h-full transform-gpu transition-transform duration-[12000ms] ease-out-quart group-[.swiper-slide-active]:scale-[1.08] scale-100">
              <Image
                src={slide.imageUrl}
                alt={slide.title || 'Tao Architecture Project'}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
            
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-black/90 via-transparent to-neutral-black/40 pointer-events-none"></div>

            {/* Slide Content */}
            <div className="absolute inset-0 flex flex-col justify-end pb-32 z-10">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-3xl transform transition-all duration-[1200ms] ease-out-expo translate-y-8 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 delay-300">
                  {slide.category && (
                    <span className="block text-primary-gold text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 opacity-90 transform transition-transform duration-700 delay-500 translate-y-4 group-[.swiper-slide-active]:translate-y-0">
                      {slide.category}
                    </span>
                  )}
                  {slide.title && (
                    <h2 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold font-agenda tracking-[-0.02em] leading-tight mb-8 shadow-sm">
                      {slide.title}
                    </h2>
                  )}
                  {slide.link && (
                    <Link 
                      href={slide.link}
                      className="inline-flex items-center gap-4 text-white hover:text-primary-gold transition-colors duration-300 group/link transform transition-transform duration-700 delay-700 translate-y-4 group-[.swiper-slide-active]:translate-y-0 opacity-0 group-[.swiper-slide-active]:opacity-100"
                    >
                      <span className="text-xs font-bold tracking-[0.2em] uppercase">View Project</span>
                      <span className="w-8 h-[1px] bg-white group-hover/link:bg-primary-gold group-hover/link:w-16 transition-all duration-500 ease-out-expo block"></span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
