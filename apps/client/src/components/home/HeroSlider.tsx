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
    // sm:mb-* clears the caption card below, which intentionally bleeds past
    // this container's own bottom edge via translate-y at sm: and up — sized
    // to the card's actual measured overlap per breakpoint (~95-140px) plus a
    // small buffer. Below sm:, the caption isn't overlaid at all (see its own
    // comment), so no clearance margin is needed here.
    // aspect-video (not a vh-based height) on mobile: a tall viewport-height
    // box is portrait-ish, the opposite shape of a landscape photo, which is
    // why object-contain left huge top/bottom bars there. Sizing the box by
    // a landscape aspect ratio instead makes it naturally match the photo,
    // closing most of that gap without any extra cropping.
    <div className="w-full relative aspect-video sm:mb-[144px] md:mb-[164px] lg:mb-[156px] md:aspect-auto md:h-[clamp(480px,72vh,860px)]">
      {/* Capped + centered so ultra-wide monitors don't stretch the mat into
          huge pillarbox bars — the box's aspect ratio stays reasonably close
          to the photo's even when the viewport itself is far wider than that. */}
      <div className="mx-auto h-full max-w-[1800px] bg-neutral-bg">
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
            {/* bg-neutral-bg here too, not just on the shared wrapper above —
                effect="fade" stacks every slide on top of each other and
                toggles opacity; object-contain leaves this slide's own
                letterbox area transparent, so without its own opaque
                background, whichever slide is stacked underneath (its
                opacity handling notwithstanding) can show through in that
                gap. Painting each slide's own mat blocks that regardless. */}
            <div className="relative w-full h-full overflow-hidden bg-neutral-bg">
              <Image
                src={slide.image}
                alt={slide.title || `Tao Architecture Project ${index + 1}`}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                // object-contain shows the full photo with the wrapper's
                // bg-neutral-bg as a mat where the box and photo proportions
                // don't match. scale-105 trims a small (~5%, top/bottom on
                // most photos) sliver off the fitted image to close the
                // remaining gap further — an accepted, bounded trade-off,
                // not an unbounded crop like object-cover would apply.
                className="scale-105 object-contain object-center"
                sizes="100vw"
                quality={85}
              />

              {/* Subtle dark overlay for contrast, over the photo only */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      {/* Caption: below sm:, no amount of shrinking the card's own padding/
          font solves "the card covers the hero" — an overlay on a short
          aspect-video mobile hero will always dominate it. So below sm: this
          renders in normal document flow right after the image (relative,
          not absolute — no overlap at all) with comfortable, non-cramped
          sizing; sm: and up restore the exact original overlapping design,
          unchanged (absolute, translated down to bleed past the image edge). */}
      <div className="relative mt-6 sm:absolute sm:bottom-0 sm:left-0 sm:mt-0 sm:w-full sm:z-30 sm:pointer-events-none sm:translate-y-[40%] md:translate-y-[44%] lg:translate-y-[46%]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="w-full sm:pointer-events-auto sm:max-w-[320px] md:max-w-[45%] lg:max-w-[550px]">
            <div className="bg-white border-t-[8px] px-5 py-6 shadow-premium-lg sm:border-t-[12px] sm:px-6 sm:py-8 md:px-10 md:py-10 border-neutral-black">
              <h1 className="tao-fs-banner font-bold leading-tight tracking-tight font-agenda text-neutral-dark-grey mb-4 sm:mb-6">
                {bannerText || DEFAULT_BANNER_TEXT}
              </h1>
              <Magnetic>
                <Link
                  href="/studio"
                  // .btn's own plain-CSS rule (padding: 13px 34px, min-height:
                  // 44px, font-size via its own clamp()) sits later in the
                  // compiled stylesheet than Tailwind's utilities, so it wins
                  // ties on equal specificity — plain classes here (without
                  // !) are silently no-ops confirmed via computed style, not
                  // just appearance. The ! modifier is required to actually
                  // override it. sm: values restore this button's original
                  // 36px/11px/0.18em (verified against pre-existing markup).
                  className="btn btn-outline !min-h-[32px] !px-5 !py-2 !text-[11px] !tracking-[0.16em] uppercase sm:!min-h-[36px] sm:!px-6 sm:!py-2.5 sm:!tracking-[0.18em]"
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
