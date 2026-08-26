'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobilePageNav from '@/components/layout/MobilePageNav';
import WorkSidebar from '@/components/work/WorkSidebar';
import { workCategories } from '@/data/projects';
import { getImageUrl } from '@/utils/image';

export default function Work() {
  const [activeCategory, setActiveCategory] = useState<string>('luxuryvillas');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        const res = await fetch(`${apiUrl}/projects`);
        if (res.ok) {
          const data = await res.json();
          // Filter to only published projects and sort by order
          const visibleProjects = data
            .filter((p: any) => p.isPublished !== false)
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
          
          if (visibleProjects.length > 0) {
            setProjects(visibleProjects);
          } else {
            // fallback if empty db
            setProjects([]); 
          }
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <main className="min-h-screen bg-white pb-20 relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/img/projects_gray.jpg"
          alt="Background Texture"
          fill
          className="object-cover opacity-5"
          priority
          sizes="100vw"
          quality={85}
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
              // We'll render a min-height section to allow scrolling
              
              return (
                <section key={category.id} id={category.id} className="mb-10 min-h-[300px] border-t-[1px] border-neutral-border pt-8 relative">
                  <div className="absolute top-0 right-0 bg-primary-gold text-neutral-dark-grey text-[10px] tracking-[0.15em] font-bold uppercase px-3 py-1">
                    {category.label}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {categoryProjects.map((project, index) => (
                      <div key={project.id} className="group mb-8">
                        <div className="relative w-full overflow-hidden border-t-[2px] border-primary-gold mb-4 group/img">
                          <Link href={`/projects/${project.slug || project.id}`} className="block w-full">
                            <div className="relative w-full h-[250px]">
                              <Image
                                src={project.coverImage ? getImageUrl(project.coverImage) : '/img/projects_gray.jpg'}
                                alt={project.title}
                                fill
                                priority={index < 4}
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                quality={75}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 pointer-events-none" />
                            </div>
                          </Link>
                        </div>
                        <h3 className="tao-fs-proj-h font-bold font-agenda uppercase tracking-wide mb-1 group-hover:text-primary-red transition-colors">
                          <Link href={`/projects/${project.slug || project.id}`}>{project.title}</Link>
                        </h3>
                        {(project.subtitle || project.location) && (
                          <p className="tao-fs-proj-sub font-bold font-agenda text-neutral-medium-grey uppercase tracking-wider">
                            {project.subtitle || project.location}
                          </p>
                        )}
                      </div>
                    ))}
                    {/* If loading, show skeletons to prevent CLS */}
                    {loading && categoryProjects.length === 0 && (
                      <>
                        {[1, 2, 3, 4].map((i) => (
                          <div key={`skeleton-${i}`} className="group mb-8 w-full animate-pulse">
                            <div className="w-full h-[250px] bg-neutral-100/50 mb-4 border-t-[2px] border-neutral-border"></div>
                            <div className="w-3/4 h-5 bg-neutral-100/50 mb-2"></div>
                            <div className="w-1/2 h-4 bg-neutral-100/50"></div>
                          </div>
                        ))}
                      </>
                    )}
                    {/* If no projects after loading, show empty state */}
                    {!loading && categoryProjects.length === 0 && (
                      <div className="col-span-3 py-10 text-neutral-medium-grey italic">
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
