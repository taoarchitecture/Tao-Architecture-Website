'use client';

import ScrollReveal from '@/components/ScrollReveal';

export default function News() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      
      {/* Page Header Banner */}
      <div className="relative z-10 container mx-auto px-4 mt-8 mb-16 text-center">
        <ScrollReveal variant="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-agenda uppercase tracking-wider mb-6 text-neutral-dark-grey">
            Latest <span className="font-bold text-primary-gold">News</span>
          </h1>
          <div className="w-16 h-[2px] bg-primary-red mx-auto mb-8"></div>
        </ScrollReveal>
      </div>

      <div className="container mx-auto px-4">
        <ScrollReveal variant="fade-up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-neutral-bg-warm p-16 text-center border border-neutral-border shadow-sm">
                  <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-neutral-border text-primary-gold text-xl">
                      !
                  </span>
                  <p className="font-agenda tracking-widest text-[13px] uppercase font-bold text-neutral-light-grey">Updates coming soon</p>
              </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}