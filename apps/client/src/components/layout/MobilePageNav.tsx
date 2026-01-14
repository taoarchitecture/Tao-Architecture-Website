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
    <div className="md:hidden sticky top-[72px] z-40 bg-white border-b border-gray-100 shadow-sm overflow-x-auto">
      <div className="flex px-4 py-4 space-x-6 min-w-max">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`text-xs font-agenda uppercase tracking-widest whitespace-nowrap transition-colors duration-300 min-h-[44px] flex items-center ${
              activeItem === item.id 
                ? 'text-primary-gold font-bold border-b-2 border-primary-gold pb-1' 
                : 'text-neutral-dark-grey hover:text-primary-gold'
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