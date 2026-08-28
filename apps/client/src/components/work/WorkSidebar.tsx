'use client';

import { motion } from 'framer-motion';
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
        <div className="relative">
          <button
            className={`text-left tao-fs-sidebar font-bold font-agenda uppercase tracking-wide transition-colors duration-300 ${activeCategory === 'all' ? 'text-primary-red' : 'text-neutral-dark-grey hover:text-primary-red'}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            All
          </button>
        </div>
        {workCategories.map((category) => (
          <div key={category.id} className="relative">
            {activeCategory === category.id && (
              <motion.span
                layoutId="work-sidebar-indicator"
                className="absolute -left-[21px] top-0 h-full w-1 bg-primary-red"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <button
              onClick={() => scrollToCategory(category.id)}
              className={`text-left tao-fs-sidebar font-bold font-agenda uppercase tracking-wide transition-colors duration-300 ${
                activeCategory === category.id
                  ? 'text-primary-red pl-4'
                  : 'text-neutral-dark-grey hover:text-primary-red'
              }`}
            >
              {category.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSidebar;
