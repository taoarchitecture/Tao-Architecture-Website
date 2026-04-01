'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobilePageNav from '@/components/layout/MobilePageNav';
import WorkSidebar from '@/components/work/WorkSidebar';
import { projects, workCategories } from '@/data/projects';
import ScrollReveal from '@/components/ScrollReveal';

export default function Work() {
  const [activeCategory, setActiveCategory] = useState<string>('luxuryvillas');

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Adjust for header + mobile nav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for trigger point

      // Check which section is currently in view
      for (const category of workCategories) {
        const element = document.getElementById(category.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white pt-24 pb-20 relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/img/projects_gray.jpg"
          alt="Background Texture"
          fill
          className="object-cover opacity-[0.03]"
          priority
        />
      </div>
      
      {/* Page Header Banner */}
      <div className="relative z-10 container mx-auto px-4 mt-8 mb-4">
        <ScrollReveal variant="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-agenda uppercase tracking-wider mb-2 text-neutral-dark-grey">
            Our <span className="font-bold text-primary-gold">Work</span>
          </h1>
          <div className="w-16 h-[2px] bg-primary-red mb-8"></div>
        </ScrollReveal>
      </div>

      <div className="relative z-10">
        <MobilePageNav 
          items={[{id: 'all', label: 'All'}, ...workCategories]} 
          activeItem={activeCategory} 
          onSelect={(id) => id === 'all' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : scrollToCategory(id)} 
        />
        
        <div className="container mx-auto px-4">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 hidden md:block relative">
              <WorkSidebar activeCategory={activeCategory} />
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 pl-0 md:pl-8">
              {workCategories.map((category) => {
                const categoryProjects = projects.filter(p => p.category === category.id);
                
                return (
                  <section key={category.id} id={category.id} className="mb-24 min-h-[300px]">
                    <ScrollReveal variant="fade-in" className="section-divider mb-8">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-primary-gold uppercase px-4">{category.label}</span>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                      {categoryProjects.map((project, index) => (
                        <ScrollReveal key={project.id} variant="fade-up" delay={index * 100}>
                          <div className="group mb-8 cursor-pointer h-full flex flex-col">
                            <Link href={project.link} className="block w-full flex-grow">
                              <div className="relative w-full overflow-hidden border border-neutral-border mb-5 img-zoom shadow-sm group-hover:shadow-lift transition-shadow duration-500">
                                <div className="relative w-full aspect-[4/3]">
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.08]"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                </div>
                                <div className="absolute inset-0 bg-neutral-black/0 group-hover:bg-neutral-black/10 transition-colors duration-500 ease-out-expo"></div>
                              </div>
                              <h3 className="text-sm font-agenda uppercase tracking-wide font-bold mb-2 group-hover:text-primary-red transition-colors duration-300">
                                {project.title}
                              </h3>
                              {project.description && (
                                <p className="text-[11px] font-agenda text-neutral-light-grey uppercase tracking-[0.1em] line-clamp-2">
                                  {project.description}
                                </p>
                              )}
                            </Link>
                          </div>
                        </ScrollReveal>
                      ))}
                      
                      {categoryProjects.length === 0 && (
                        <div className="col-span-full py-10 text-neutral-light-grey italic font-agenda tracking-wider text-sm">
                          Projects coming soon...
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
