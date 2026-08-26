'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { FaSearch, FaTimes } from 'react-icons/fa';
import TaoLogoMark from '@/components/ui/TaoLogoMark';
import { getImageUrl } from '@/utils/image';
import { Project } from '@/types';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const hasFetchedProjects = useRef(false);

  // Close mobile menu and search on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Fetch the live project list once, the first time search is opened, and
  // cache it — reopening search re-filters in memory rather than refetching.
  useEffect(() => {
    if (!isSearchOpen || hasFetchedProjects.current) return;
    hasFetchedProjects.current = true;
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setDbProjects(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [isSearchOpen]);

  // Autocomplete matching
  const searchResults = searchQuery.trim() !== ''
      ? dbProjects.filter(p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (Array.isArray(p.description) && p.description.join(' ').toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => prev === name ? null : name);
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
      ]
    },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav
      className={`sticky w-full z-50 top-0 left-0 transition-all duration-300 ${
        isScrolled ? 'navbar-scrolled py-2' : 'navbar-glass py-4'
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center rounded-sm flex-shrink-0" aria-label="Tao Architecture - Home">
          <TaoLogoMark
            aria-hidden="true"
            className={`text-[#818285] transition-all duration-300 ${
              isScrolled ? 'h-[32px] w-[130px]' : 'h-[40px] w-[160px] md:h-[44px] md:w-[180px]'
            }`}
          />
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex items-center justify-center w-10 h-10 text-neutral-dark-grey rounded-sm md:hidden hover:bg-black/5 transition-colors duration-200"
        >
          <span className="sr-only">Toggle menu</span>
          <span className="relative w-5 h-4 flex flex-col justify-between overflow-hidden">
            <span className={`block h-[1.5px] bg-current rounded-full transform transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-y-[0px] translate-x-[2px]' : ''}`} />
            <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-200 ${isOpen ? 'opacity-0 translate-x-2' : ''}`} />
            <span className={`block h-[1.5px] bg-current rounded-full transform transition-all duration-300 origin-left ${isOpen ? '-rotate-45 -translate-y-[0px] translate-x-[2px]' : ''}`} />
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center">
          <ul className="font-agenda tao-fs-menu font-bold tracking-[0.05em] flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                {link.dropdown ? (
                  <>
                    <button
                      aria-haspopup="true"
                      aria-expanded={false}
                      className={`flex items-center gap-1 py-2 transition-colors duration-200 hover:text-primary-red ${
                        link.dropdown.some(d => pathname === d.href) ? 'text-primary-red' : 'text-neutral-medium-grey'
                      }`}
                    >
                      {link.name}
                      <svg className="w-2.5 h-2.5 mt-[1px] transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Desktop Dropdown */}
                    <div
                      className="nav-dropdown absolute left-0 top-full w-52 bg-white border-t-[3px] border-primary-gold shadow-premium-lg z-50 mt-0"
                      role="menu"
                      aria-label={`${link.name} submenu`}
                    >
                      {link.dropdown.map((sublink) => (
                        <Link
                          key={sublink.name}
                          href={sublink.href}
                          role="menuitem"
                          className={`block px-5 py-3 text-[10.5px] tracking-[0.11em] border-b border-neutral-border last:border-0 transition-all duration-200 hover:bg-neutral-bg hover:text-primary-red hover:pl-7 ${
                            pathname === sublink.href ? 'text-primary-red bg-neutral-bg' : 'text-neutral-medium-grey'
                          }`}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`block py-2 transition-colors duration-200 hover:text-primary-red relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-primary-red after:transition-all after:duration-300 before:absolute before:-bottom-1.5 before:left-1/2 before:-translate-x-1/2 before:w-[3px] before:h-[3px] before:rounded-full before:bg-primary-gold before:transition-all before:duration-300 ${
                      pathname === link.href
                        ? 'text-primary-red after:w-full before:opacity-100 before:translate-y-0'
                        : 'text-neutral-medium-grey after:w-0 hover:after:w-full before:opacity-0 before:translate-y-1'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}

              {/* Search icon */}
            <li className="pl-5 !ml-5 border-l border-neutral-border">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-neutral-medium-grey hover:text-primary-red transition-colors duration-200 p-1"
                aria-label="Search"
              >
                <FaSearch size={13} aria-hidden="true" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`mobile-menu md:hidden ${isOpen ? 'open' : ''}`}
      >
        <div className="bg-white border-t border-neutral-border/80 px-4 py-3 pb-8">
          {/* Mobile Search Button */}
          <button 
             onClick={() => setIsSearchOpen(true)}
             className="w-full flex items-center justify-between py-3.5 mb-2 border-b border-neutral-border text-neutral-medium-grey hover:text-primary-red transition-colors"
          >
             <span className="font-agenda font-bold tracking-[0.05em]">SEARCH</span>
             <FaSearch size={14} aria-hidden="true" />
          </button>

          <ul className="font-agenda tao-fs-menu font-bold tracking-[0.05em] space-y-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      aria-haspopup="true"
                      aria-expanded={openDropdown === link.name}
                      className="flex items-center justify-between w-full py-3.5 border-b border-neutral-border text-neutral-medium-grey hover:text-primary-red transition-colors"
                    >
                      <span>{link.name}</span>
                      <svg
                        className={`w-3 h-3 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Mobile Sub-menu */}
                    <div
                      className="overflow-hidden transition-all duration-400 ease-in-out"
                      style={{ maxHeight: openDropdown === link.name ? '300px' : '0px', opacity: openDropdown === link.name ? 1 : 0, transition: 'max-height 0.35s cubic-bezier(0.85,0,0.15,1), opacity 0.25s ease' }}
                    >
                      <div className="bg-neutral-bg pl-4">
                        {link.dropdown.map((sublink) => (
                          <Link
                            key={sublink.name}
                            href={sublink.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-3 text-[11px] text-neutral-medium-grey hover:text-primary-red border-b border-neutral-border last:border-0 transition-colors"
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3.5 border-b border-neutral-border transition-colors ${
                      pathname === link.href ? 'text-primary-red' : 'text-neutral-medium-grey hover:text-primary-red'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fullscreen Search Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[100] transition-all duration-300 flex flex-col ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="container mx-auto px-4 py-8 max-w-5xl flex-1 flex flex-col mt-4 md:mt-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl md:text-2xl font-agenda font-bold tracking-widest text-primary-red uppercase">Search Projects</h2>
            <button 
                onClick={() => setIsSearchOpen(false)}
                className="rounded-full bg-neutral-bg p-2 text-neutral-medium-grey transition-colors hover:text-primary-red"
                aria-label="Close search"
            >
                <FaTimes size={20} aria-hidden="true" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative mb-8">
             <input
                ref={searchInputRef}
                type="search"
                id="search-input"
                aria-label="Search projects"
                placeholder="Type to search projects, sectors, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xl md:text-3xl border-x-0 border-t-0 border-b-2 border-neutral-medium-grey/30 px-0 pb-4 pr-12 focus:ring-0 ring-0 focus:outline-none focus-visible:outline-none focus:shadow-none focus:border-primary-red transition-colors bg-transparent font-light text-neutral-dark-grey"
             />
             <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-medium-grey/50 hover:text-primary-red transition-colors cursor-pointer" size={24} aria-hidden="true" />
          </div>

          {/* Autocomplete Results */}
          <div className="flex-1 overflow-y-auto pb-8 custom-scrollbar">
            {searchQuery.trim() !== '' && searchResults.length === 0 && (
                <div className="text-center mt-16 text-neutral-medium-grey">
                    <FaSearch className="mx-auto mb-4 opacity-20" size={40} aria-hidden="true" />
                    <p className="text-lg">No projects found for "{searchQuery}"</p>
                </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {searchResults.slice(0, 12).map(project => (
                   <Link
                        key={project.id}
                        href={`/projects/${project.slug || project.id}`}
                        className="group flex flex-col"
                   >
                        <div className="relative mb-3 w-full aspect-[4/3] overflow-hidden rounded-sm bg-neutral-bg">
                           <Image
                               src={project.coverImage ? getImageUrl(project.coverImage) : '/img/projects_gray.jpg'}
                               alt={project.title}
                               fill
                               sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                               className="object-cover transition-transform duration-700 group-hover:scale-105" 
                           />
                        </div>
                        <h4 className="font-bold text-sm tracking-widest uppercase text-neutral-dark-grey group-hover:text-primary-red transition-colors font-agenda">{project.title}</h4>
                        <p className="text-[10px] text-neutral-medium-grey/80 tracking-widest uppercase mt-1">{project.category}</p>
                   </Link>
               ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
