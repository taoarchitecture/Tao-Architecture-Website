'use client';

import { useRef, useEffect, useState } from 'react';

interface ContactSidebarProps {
  activeSection: string;
}

const ContactSidebar = ({ activeSection }: ContactSidebarProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const activeBtn = listRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
      if (activeBtn) {
        setIndicatorStyle({
          top: activeBtn.offsetTop,
          height: activeBtn.offsetHeight,
          opacity: 1
        });
      }
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
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

  const sections = [
    { id: 'contact-details', label: 'Contact Details' },
    { id: 'email-form', label: 'Email Us' },
  ];

  return (
    <div className="sticky top-32 max-h-[calc(100vh-140px)] overflow-y-auto pl-2 pt-6 pb-12">
      <div 
        ref={listRef} 
        className="relative flex flex-col space-y-6 border-l border-neutral-border pl-6 before:absolute before:inset-y-0 before:-left-[1px] before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-neutral-light-grey before:to-transparent"
      >
        <div 
          className="absolute -left-[2px] w-[3px] bg-primary-gold transition-all duration-500 ease-out-expo shadow-sm"
          style={{ 
            top: indicatorStyle.top, 
            height: indicatorStyle.height,
            opacity: indicatorStyle.opacity 
          }}
        />

        {sections.map((section) => (
          <button
            key={section.id}
            data-section={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`text-left text-xs font-agenda uppercase tracking-[0.15em] transition-all duration-300 ease-out-expo transform hover:translate-x-1 ${
              activeSection === section.id 
                ? 'text-primary-red font-bold' 
                : 'text-neutral-dark-grey hover:text-primary-red'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContactSidebar;
