'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface MobilePageNavProps {
  items: NavItem[];
  activeItem: string;
  onSelect: (id: string) => void;
}

const MobilePageNav = ({ items, activeItem, onSelect }: MobilePageNavProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollMore, setCanScrollMore] = useState(false);

  const updateFade = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft;
    setCanScrollMore(remaining > 4);
  }, []);

  useEffect(() => {
    updateFade();
    window.addEventListener('resize', updateFade);
    return () => window.removeEventListener('resize', updateFade);
  }, [updateFade, items]);

  return (
    <div className="md:hidden sticky top-[62px] z-40 bg-white border-b border-neutral-border shadow-premium-sm relative">
      {/* Scrollable row — scrollbar hidden */}
      <div
        ref={scrollRef}
        onScroll={updateFade}
        className="flex px-4 py-0 space-x-5 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`font-agenda font-bold uppercase whitespace-nowrap transition-all duration-200 shrink-0 py-3.5 border-b-2 tao-fs-input ${
              activeItem === item.id
                ? 'text-primary-red border-primary-red'
                : 'text-neutral-medium-grey border-transparent hover:text-primary-red'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {/* Fade hint — only shown when there's more to scroll to */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white to-transparent transition-opacity duration-200 ${
          canScrollMore ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default MobilePageNav;