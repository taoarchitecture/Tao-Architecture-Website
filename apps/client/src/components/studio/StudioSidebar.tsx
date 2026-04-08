'use client';

import React from 'react';

interface StudioSidebarProps {
  activeSection: string;
}

const StudioSidebar: React.FC<StudioSidebarProps> = ({ activeSection }) => {
  const menuItems = [
    { id: 'team', label: 'Team' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-24 left-0 h-[calc(100vh-6rem)] border-r border-gray-100 hidden md:flex flex-col items-end pr-8 pt-12">
      <ul className="text-right space-y-4 font-agenda">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`text-sm uppercase tracking-widest transition-all duration-300 hover:text-primary-red ${
                activeSection === item.id 
                  ? 'text-primary-red font-bold border-r-2 border-primary-red pr-4' 
                  : 'text-neutral-dark-grey pr-4 border-r-2 border-transparent'
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudioSidebar;
