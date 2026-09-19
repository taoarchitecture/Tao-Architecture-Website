'use client';

import { scrollToSection } from '@/utils/scroll';

interface ContactSidebarProps {
  activeSection: string;
}

const ContactSidebar = ({ activeSection }: ContactSidebarProps) => {

  const sections = [
    { id: 'contact-details', label: 'Contact us' },
    { id: 'email-form', label: 'Email us' },
    { id: 'careers-cta', label: 'Careers' },
  ];

  return (
    <div className="hidden md:block sticky top-24 h-[calc(100vh-100px)] overflow-y-auto pl-8 pt-10">
      <div className="flex flex-col space-y-4 border-l border-neutral-light-grey pl-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`text-left tao-fs-sidebar font-bold font-agenda uppercase tracking-wide transition-colors duration-300 ${
              activeSection === section.id 
                ? 'text-primary-red border-l-4 border-primary-red -ml-[21px] pl-4' 
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
