'use client';

import { useState, useEffect } from 'react';

export interface UseActiveSectionOptions {
  offset?: number;
  defaultSection?: string;
}

export function useActiveSection(
  sectionIds: string[],
  options: UseActiveSectionOptions = {}
): [string, (id: string) => void] {
  const { offset = 200, defaultSection = sectionIds[0] || '' } = options;
  const [activeSection, setActiveSection] = useState<string>(defaultSection);

  useEffect(() => {
    if (!sectionIds.length || typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial section
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return [activeSection, setActiveSection];
}
