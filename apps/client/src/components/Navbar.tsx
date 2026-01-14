'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const navLinks = [
    { name: 'WORK', href: '/work' },
    { name: 'SERVICES', href: '/services' },
    { name: 'STUDIO', href: '/studio' },
    { 
      name: 'MEDIA & AWARDS', 
      href: '#',
      dropdown: [
        { name: 'VIDEOS', href: '/media/videos' },
        { name: 'PUBLICATIONS', href: '/media/publications' },
        { name: 'AWARDS', href: '/media/awards' },
        { name: 'TAO DOTS', href: '/media/tao-dots' },
      ]
    },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 py-4'}`}>
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative h-[45px] w-[180px]">
             <Image 
                src="/img/tao-logo.png" 
                alt="Tao Architecture" 
                fill
                className="object-contain object-left"
                priority
             />
          </div>
        </Link>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-dark-grey rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="font-agenda text-[13px] font-bold tracking-widest flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent items-center">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group w-full md:w-auto text-center md:text-left">
                {link.dropdown ? (
                  <>
                    <button 
                      onClick={() => toggleDropdown(link.name)}
                      className={`block w-full py-3 px-3 rounded md:bg-transparent md:p-0 hover:text-primary-red transition-colors duration-200 flex items-center justify-center md:justify-start gap-1`}
                    >
                      {link.name}
                      <span className="md:hidden text-[10px]">{openDropdown === link.name ? '▲' : '▼'}</span>
                    </button>
                    
                    {/* Desktop Dropdown */}
                    <div className="hidden md:group-hover:block absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-sm overflow-hidden pt-2 z-50">
                       <div className="bg-white border-t-2 border-primary-gold">
                        {link.dropdown.map((sublink) => (
                          <Link 
                            key={sublink.name}
                            href={sublink.href}
                            className="block px-4 py-3 text-xs text-neutral-medium-grey hover:bg-gray-50 hover:text-primary-gold border-b border-gray-100 last:border-0 text-left"
                          >
                            {sublink.name}
                          </Link>
                        ))}
                       </div>
                    </div>

                    {/* Mobile Accordion */}
                    <div className={`${openDropdown === link.name ? 'block' : 'hidden'} md:hidden w-full bg-gray-50 mt-2 rounded`}>
                        {link.dropdown.map((sublink) => (
                          <Link 
                            key={sublink.name}
                            href={sublink.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 text-xs text-neutral-medium-grey hover:text-primary-gold border-b border-gray-100 last:border-0"
                          >
                            {sublink.name}
                          </Link>
                        ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-3 rounded md:bg-transparent md:p-0 transition-colors duration-200 ${pathname === link.href ? 'text-primary-red' : 'text-neutral-medium-grey'} hover:text-primary-red`}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
            <li className="hidden md:block pl-4 border-l border-gray-300">
               <button className="text-neutral-dark-grey hover:text-primary-red transition-colors">
                 <FaSearch size={14} />
               </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
