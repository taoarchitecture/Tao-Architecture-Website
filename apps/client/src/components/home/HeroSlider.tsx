'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  '/img/portfolio/b14.jpg',
  '/img/portfolio/b15.jpg',
  '/img/portfolio/b17.jpg',
  '/img/portfolio/b20.jpg',
  '/img/portfolio/b21.jpg',
  '/img/portfolio/b22.jpg',
  '/img/portfolio/b23.jpg',
  '/img/portfolio/b24.jpg',
  '/img/portfolio/b25.jpg',
  '/img/portfolio/b9.jpg',
  '/img/portfolio/b4.jpg',
  '/img/portfolio/b7.jpg',
];

const HeroSlider = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] relative bg-black">
      <Swiper
        spaceBetween={0}
        effect={'fade'}
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="w-full h-full"
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
                quality={80}
              />
              <div className="absolute inset-0 bg-black/20" /> {/* Overlay for better text contrast if needed */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
