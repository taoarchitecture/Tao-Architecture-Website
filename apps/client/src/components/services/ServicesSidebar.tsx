'use client';

interface ServicesSidebarProps {
  activeSection: string;
  items?: { id: string; label: string }[];
}

const DEFAULT_ITEMS = [
  { id: 'architecture-interiors', label: 'Architecture + Interiors' },
  { id: 'design-coordination', label: 'Design Coordination' },
  { id: 'procurement-assistance', label: 'Procurement Assistance' },
  { id: 'execution-coordination', label: 'Execution Coordination' },
  { id: 'custom-furniture', label: 'Custom Furniture + Art' },
  { id: 'project-management', label: 'Project Management' },
];

export default function ServicesSidebar({ activeSection, items }: ServicesSidebarProps) {
  const serviceItems = items || DEFAULT_ITEMS;

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
    // pt-[34px] matches the first service section's own top spacing exactly
    // (its border-t-2 + pt-8 = 2px + 32px), so the sidebar's first label lines
    // up pixel-for-pixel with that section's image/heading instead of the
    // ~6px drift an unrelated pt-10 produced.
    <div className="hidden md:block sticky top-24 h-[calc(100vh-100px)] overflow-y-auto pl-8 pt-[34px]">
      <div className="flex flex-col space-y-4 border-l border-neutral-light-grey pl-4">
        {serviceItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`text-left tao-fs-svc-side font-bold font-agenda uppercase tracking-wide transition-colors duration-300 ${
              activeSection === item.id 
                ? 'text-primary-red border-l-4 border-primary-red -ml-[21px] pl-4' 
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