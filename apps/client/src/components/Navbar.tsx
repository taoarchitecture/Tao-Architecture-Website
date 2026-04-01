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
       // Slightly earlier detection for smoother transition
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount in case already scrolled
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => { document.body.classList.remove('no-scroll'); };
  }, [isOpen]);

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
      name: 'MEDIA', 
      href: '#',
      dropdown: [
        { name: 'VIDEOS', href: '/video' },
        { name: 'PUBLICATIONS', href: '/media/publications' },
        { name: 'AWARDS', href: '/media/awards' },
        { name: 'NEWS', href: '/media/news' },
      ]
    },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-[60] top-0 left-0 transition-all duration-500 ease-out-expo ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
            : 'bg-white/95 backdrop-blur-sm py-5'
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center focus-ring rounded-sm z-[70] transition-transform duration-300 hover:scale-[1.02]" onClick={() => setIsOpen(false)}>
            <div className={`relative transition-all duration-500 ease-out-expo ${isScrolled ? 'h-[30px] w-[120px]' : 'h-[40px] w-[160px]'}`}>
               <Image 
                  src="/img/tao-logo.png" 
                  alt="Tao Architecture - Home" 
                  fill
                  className="object-contain object-left"
                  priority
               />
            </div>
          </Link>
          
          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="md:hidden relative z-[70] w-10 h-10 flex flex-col justify-center items-center group focus-ring rounded-sm bg-transparent"
          >
            <span className={`block w-6 h-[2px] bg-neutral-black transition-all duration-300 ease-out-expo ${isOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-1'}`}></span>
            <span className={`block w-6 h-[2px] bg-neutral-black transition-all duration-300 ease-out-expo ${isOpen ? 'opacity-0 translate-x-3' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-[2px] bg-neutral-black transition-all duration-300 ease-out-expo ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <ul className="font-agenda text-[12px] font-bold tracking-[0.15em] flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  {link.dropdown ? (
                    <>
                      <button 
                        onClick={() => toggleDropdown(link.name)}
                        aria-haspopup="true"
                        aria-expanded={openDropdown === link.name}
                        className={`py-2 flex items-center gap-1 focus-ring rounded-sm transition-colors duration-300 ${openDropdown === link.name || link.dropdown.some(d => pathname === d.href) ? 'text-primary-red' : 'text-neutral-dark-grey hover:text-primary-red'}`}
                      >
                        <span className="sliding-link">{link.name}</span>
                      </button>
                      
                      {/* Desktop Dropdown */}
                      <div 
                        className="absolute left-0 top-[100%] mt-4 w-52 bg-white/95 backdrop-blur-md shadow-elegant border-t-2 border-primary-gold opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-400 ease-out-expo z-50 before:absolute before:-top-4 before:left-0 before:w-full before:h-4"
                        role="menu"
                      >
                         <div className="py-2">
                          {link.dropdown.map((sublink, idx) => {
                            const isActive = pathname === sublink.href;
                            return (
                              <Link 
                                key={sublink.name}
                                href={sublink.href}
                                role="menuitem"
                                className={`block px-5 py-3 text-xs tracking-widest ${isActive ? 'text-primary-gold font-bold bg-neutral-bg-warm' : 'text-neutral-medium-grey'} hover:bg-neutral-bg hover:text-primary-red transition-all duration-300 flex items-center group/item`}
                              >
                                <span className="transform transition-transform duration-300 group-hover/item:translate-x-1">{sublink.name}</span>
                              </Link>
                            );
                          })}
                         </div>
                      </div>
                    </>
                  ) : (
                    <Link 
                      href={link.href} 
                      className={`relative py-2 transition-colors duration-300 ${pathname === link.href ? 'text-primary-red' : 'text-neutral-dark-grey'} hover:text-primary-red sliding-link`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
              <li className="pl-6 border-l border-neutral-border flex items-center h-[20px]">
                 <button className="text-neutral-dark-grey hover:text-primary-red transition-colors duration-300 focus-ring rounded-full p-1" aria-label="Search">
                   <FaSearch size={14} />
                 </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white/98 backdrop-blur-lg z-[50] transition-all duration-500 ease-out-expo md:hidden flex flex-col justify-center ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        aria-hidden={!isOpen}
      >
        <div className="container mx-auto px-6 max-h-[100dvh] overflow-y-auto pt-24 pb-12">
          <ul className="flex flex-col space-y-6 font-agenda text-[18px] font-bold tracking-[0.2em]">
            {navLinks.map((link, index) => (
              <li 
                key={link.name} 
                className={`transition-all duration-500 ease-out-expo ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${isOpen ? 100 + index * 60 : 0}ms` }}
              >
                {link.dropdown ? (
                  <div className="border-b border-neutral-border pb-4">
                    <button 
                      onClick={() => toggleDropdown(link.name)}
                      className="w-full flex justify-between items-center text-left py-2 text-neutral-dark-grey focus:outline-none"
                    >
                      <span className={link.dropdown.some(d => pathname === d.href) ? 'text-primary-red' : ''}>{link.name}</span>
                      <span className={`text-[12px] transition-transform duration-400 ease-out-expo ${openDropdown === link.name ? 'rotate-180 text-primary-red' : ''}`}>▼</span>
                    </button>
                    
                    {/* Mobile Dropdown */}
                    <div className={`overflow-hidden transition-all duration-500 ease-out-expo ${openDropdown === link.name ? 'max-h-[350px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="flex flex-col space-y-4 pl-4 border-l-2 border-primary-gold pt-2 pb-2">
                        {link.dropdown.map((sublink) => (
                          <Link 
                            key={sublink.name}
                            href={sublink.href}
                            onClick={() => setIsOpen(false)}
                            className={`text-[14px] tracking-widest ${pathname === sublink.href ? 'text-primary-red' : 'text-neutral-light-grey active:text-primary-red'}`}
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-b border-neutral-border pb-4">
                    <Link 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 ${pathname === link.href ? 'text-primary-red' : 'text-neutral-dark-grey active:text-primary-red'}`}
                    >
                      {link.name}
                    </Link>
                  </div>
                )}
              </li>
            ))}
            <li 
               className={`pt-6 transition-all duration-500 ease-out-expo ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
               style={{ transitionDelay: `${isOpen ? 100 + navLinks.length * 60 : 0}ms` }}
            >
               <button className="flex items-center gap-3 text-neutral-dark-grey hover:text-primary-red transition-colors text-sm w-full py-2">
                 <FaSearch size={16} /> SEARCH
               </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
