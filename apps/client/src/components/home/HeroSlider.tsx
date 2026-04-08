'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = ({ slides }: { slides: { image: string; title?: string; subtitle?: string }[] }) => {
  if (!slides || slides.length === 0) return null;
  
  return (
    <div className="w-full h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] relative bg-black">
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
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title || `Slide ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
                quality={80}
              />
              <div className="absolute inset-0 bg-black/20" /> 
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
