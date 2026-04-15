'use client';

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
  return (
    <div className="md:hidden sticky top-[62px] z-40 bg-white border-b border-neutral-border shadow-premium-sm">
      {/* Scrollable row — scrollbar hidden */}
      <div
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
    </div>
  );
};

export default MobilePageNav;