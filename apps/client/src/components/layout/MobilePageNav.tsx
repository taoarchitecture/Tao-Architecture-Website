'use client';

import { useEffect, useRef, useState } from 'react';

interface MobilePageNavProps {
  items: { id: string; label: string }[];
  activeItem: string;
  onSelect: (id: string) => void;
}

export default function MobilePageNav({ items, activeItem, onSelect }: MobilePageNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Update animated indicator position
  useEffect(() => {
    if (scrollContainerRef.current && activeItem) {
      const activeBtn = scrollContainerRef.current.querySelector(
        `[data-nav-item="${activeItem}"]`
      ) as HTMLElement;

      if (activeBtn) {
        setIndicatorStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          opacity: 1
        });
        
        // Ensure active item is visible in scrolling container
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeItem, items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="md:hidden sticky top-[80px] z-40 bg-white/90 backdrop-blur-md border-b border-neutral-border shadow-sm pt-2">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto hide-scrollbar px-4 relative pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Animated Sliding Indicator */}
        <div 
          className="absolute bottom-0 h-[2px] bg-primary-red transition-all duration-400 ease-out-expo shadow-[0_0_8px_rgba(238,28,37,0.5)]"
          style={{ 
            left: indicatorStyle.left, 
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity
          }}
        />

        {items.map((item) => (
          <button
            key={item.id}
            data-nav-item={item.id}
            onClick={() => onSelect(item.id)}
            className={`whitespace-nowrap px-4 py-3 text-[11px] font-agenda uppercase tracking-widest transition-colors duration-300 ${
              activeItem === item.id 
                ? 'text-primary-red font-bold' 
                : 'text-neutral-light-grey hover:text-neutral-dark-grey'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      {/* Hide scrollbar injected style */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}