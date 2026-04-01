'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomeBottomSection() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed w-full h-full transform scale-[1.02]"
        style={{ backgroundImage: "url('/img/landing_back.jpg')" }}
      >
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-0 bg-neutral-black/40 mix-blend-multiply"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-black/80 via-transparent to-neutral-black/80"></div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal variant="fade-up" delay={200}>
          <div className="max-w-4xl mx-auto text-center border-y border-white/20 py-20 md:py-28 backdrop-blur-[4px] bg-black/10 shadow-elegant">
            <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-light font-agenda leading-tight mb-12 tracking-tight">
              Creating Spaces that <br className="hidden md:block"/>
              <span className="font-bold text-primary-gold relative inline-block">
                Inspire & Endure
                <div className="absolute -bottom-2 left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary-gold to-transparent opacity-60"></div>
              </span>
            </h2>
            <Link href="/contact" className="btn btn-red-outline text-white hover:text-white mt-4">
              START A PROJECT
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
