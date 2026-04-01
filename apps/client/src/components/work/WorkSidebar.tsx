'use client';

import { workCategories } from '@/data/projects';
import { useRef, useEffect, useState } from 'react';

interface WorkSidebarProps {
  activeCategory: string;
}

const WorkSidebar = ({ activeCategory }: WorkSidebarProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate indicator position when active category changes
    if (listRef.current) {
      // Find the active button
      let activeBtn = listRef.current.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement;
      
      // If "all" is active and we don't have a specific category active, point to first item
      if (!activeBtn) {
        activeBtn = listRef.current.querySelector(`[data-category="all"]`) as HTMLElement;
      }
      
      if (activeBtn) {
        setIndicatorStyle({
          top: activeBtn.offsetTop,
          height: activeBtn.offsetHeight,
          opacity: 1
        });
      }
    }
  }, [activeCategory]);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust for header height
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

  return (
    <div className="hidden md:block sticky top-32 max-h-[calc(100vh-140px)] overflow-y-auto pl-2 pt-6 pb-12">
      <div 
        ref={listRef} 
        className="relative flex flex-col space-y-6 border-l border-neutral-border pl-6 before:absolute before:inset-y-0 before:-left-[1px] before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-neutral-light-grey before:to-transparent"
      >
        {/* Animated Active Indicator */}
        <div 
          className="absolute -left-[2px] w-[3px] bg-primary-gold transition-all duration-500 ease-out-expo shadow-sm"
          style={{ 
            top: indicatorStyle.top, 
            height: indicatorStyle.height,
            opacity: indicatorStyle.opacity 
          }}
        />

        <button 
          data-category="all"
          className={`text-left text-xs font-agenda uppercase tracking-[0.15em] transition-all duration-300 ease-out-expo transform hover:translate-x-1 ${activeCategory === 'all' || activeCategory === '' ? 'text-primary-gold font-bold' : 'text-neutral-dark-grey hover:text-primary-red'}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          All Projects
        </button>
        
        {workCategories.map((category) => (
          <button
            key={category.id}
            data-category={category.id}
            onClick={() => scrollToCategory(category.id)}
            className={`text-left text-xs font-agenda uppercase tracking-[0.15em] transition-all duration-300 ease-out-expo transform hover:translate-x-1 ${
              activeCategory === category.id 
                ? 'text-primary-red font-bold' 
                : 'text-neutral-dark-grey hover:text-primary-red'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkSidebar;
