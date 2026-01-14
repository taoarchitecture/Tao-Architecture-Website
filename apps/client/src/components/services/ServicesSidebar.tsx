'use client';

import { useEffect, useState } from 'react';

interface ServicesSidebarProps {
  activeSection: string;
}

const serviceItems = [
  { id: 'architecture-interiors', label: 'Architecture + Interiors' },
  { id: 'design-coordination', label: 'Design Coordination' },
  { id: 'procurement-assistance', label: 'Procurement Assistance' },
  { id: 'execution-coordination', label: 'Execution Coordination' },
  { id: 'custom-furniture', label: 'Custom Furniture + Art' },
  { id: 'project-management', label: 'Project Management' },
];

export default function ServicesSidebar({ activeSection }: ServicesSidebarProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="hidden md:block sticky top-24 h-[calc(100vh-100px)] overflow-y-auto pl-8 pt-10">
      <div className="flex flex-col space-y-4 border-l border-neutral-light-grey pl-4">
        {serviceItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`text-left text-sm font-agenda uppercase tracking-wider transition-colors duration-300 ${
              activeSection === item.id 
                ? 'text-primary-red font-bold border-l-4 border-primary-red -ml-[21px] pl-4' 
                : 'text-neutral-dark-grey hover:text-primary-red'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}