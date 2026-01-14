'use client';

interface ContactSidebarProps {
  activeSection: string;
}

const ContactSidebar = ({ activeSection }: ContactSidebarProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
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
    { id: 'contact-details', label: 'Contact us' },
    { id: 'email-form', label: 'Email us' },
  ];

  return (
    <div className="hidden md:block sticky top-24 h-[calc(100vh-100px)] overflow-y-auto pl-8 pt-10">
      <div className="flex flex-col space-y-4 border-l border-neutral-light-grey pl-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`text-left text-sm font-agenda uppercase tracking-wider transition-colors duration-300 ${
              activeSection === section.id 
                ? 'text-primary-gold font-bold border-l-4 border-primary-gold -ml-[21px] pl-4' 
                : 'text-neutral-dark-grey hover:text-primary-gold'
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
