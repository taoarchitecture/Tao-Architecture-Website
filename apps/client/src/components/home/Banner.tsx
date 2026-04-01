'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function Banner() {
  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden bg-[url('/img/pattern.jpg')] bg-repeat">
      <div className="container mx-auto px-4 lg:px-8 text-center bg-white/95 backdrop-blur-sm py-16 px-6 md:px-12 outline outline-1 outline-neutral-border outline-offset-[16px] md:outline-offset-[24px]">
        <ScrollReveal variant="fade-up" delay={100}>
           <h2 className="font-agenda text-neutral-dark-grey max-w-4xl mx-auto flex flex-col items-center">
             <span className="text-[32px] md:text-[52px] font-light italic text-neutral-light-grey mb-4 block">Touching,</span>
             <span className="text-[28px] md:text-[46px] font-bold leading-[1.25] tracking-tight mb-2">every life we interact with </span>
             <span className="text-[28px] md:text-[46px] font-bold leading-[1.25] tracking-tight text-primary-gold relative inline-block">
               by our <span className="text-primary-red">designs.</span>
               <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-gold to-transparent opacity-50"></div>
             </span>
           </h2>
        </ScrollReveal>
        
        <ScrollReveal variant="fade-up" delay={300} className="mt-16">
          <Link href="/studio" className="btn btn-outline text-neutral-dark-grey px-12 py-4">
            KNOW MORE
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
