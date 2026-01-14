'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobilePageNav from '@/components/layout/MobilePageNav';
import WorkSidebar from '@/components/work/WorkSidebar';
import { projects, workCategories } from '@/data/projects';

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white pt-24 pb-20 relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/img/projects_gray.jpg"
          alt="Background Texture"
          fill
          className="object-cover opacity-5"
          priority
        />
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
              
              // If no projects in this category, render placeholder or skip (Legacy showed empty sections sometimes)
              // We'll render a min-height section to allow scrolling
              
              return (
                <section key={category.id} id={category.id} className="mb-20 min-h-[300px] border-t-2 border-neutral-dark-grey pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categoryProjects.map((project) => (
                      <div key={project.id} className="group mb-8">
                        <div className="relative w-full overflow-hidden border-t-2 border-black mb-4">
                          <Link href={project.link} className="block w-full">
                            <div className="relative w-full h-[250px]">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                              />
                            </div>
                          </Link>
                        </div>
                        <h3 className="text-sm font-agenda uppercase tracking-wide font-bold mb-1 group-hover:text-primary-red transition-colors">
                          <Link href={project.link}>{project.title}</Link>
                        </h3>
                        {project.description && (
                          <p className="text-xs font-agenda text-neutral-light-grey uppercase tracking-wider">
                            {project.description}
                          </p>
                        )}
                      </div>
                    ))}
                    {/* If no projects, maybe show a "Coming Soon" or just empty space to maintain layout structure */}
                    {categoryProjects.length === 0 && (
                      <div className="col-span-3 py-10 text-neutral-light-grey italic">
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
