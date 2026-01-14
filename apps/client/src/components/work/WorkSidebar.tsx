'use client';

import { useEffect, useState } from 'react';
import { workCategories } from '@/data/projects';

interface WorkSidebarProps {
  activeCategory: string;
}

const WorkSidebar = ({ activeCategory }: WorkSidebarProps) => {
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
    <div className="hidden md:block sticky top-24 h-[calc(100vh-100px)] overflow-y-auto pl-8 pt-10">
      <div className="flex flex-col space-y-4 border-l border-neutral-light-grey pl-4">
        <button 
          className={`text-left text-sm font-agenda uppercase tracking-wider transition-colors duration-300 ${activeCategory === 'all' ? 'text-primary-red font-bold' : 'text-neutral-dark-grey hover:text-primary-red'}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          All
        </button>
        {workCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className={`text-left text-sm font-agenda uppercase tracking-wider transition-colors duration-300 ${
              activeCategory === category.id 
                ? 'text-primary-red font-bold border-l-4 border-primary-red -ml-[21px] pl-4' 
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
