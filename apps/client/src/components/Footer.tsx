"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { GlobalSettings } from '@/types';

const DEFAULTS = {
  siteName: 'TAO Architecture Pvt. Ltd.',
  contactEmail: 'info@taoarchitecture.com',
  footerTagline: 'Touching intangible beauty of nature, through tangible forms of Architecture.',
  facebookUrl: 'https://www.facebook.com/taoarchitecture',
  instagramUrl: 'https://www.instagram.com/taoarchitecture',
  linkedinUrl: 'https://www.linkedin.com/company/tao-architecture-pvt-ltd',
  youtubeUrl: 'https://www.youtube.com/@TAOSTUDIO_0',
  phoneNumbers: '["+91 98220 44555"]',
  address: 'A/2, Friends Enclave,\nWest Block, Opp Sai Hira Complex,\nMundhwa, Pune - 411036',
};

const Footer = () => {
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);
  const [settings, setSettings] = useState<GlobalSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/settings`);
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch {
        // Silently fail — use defaults
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleAdminTrigger = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        router.push('/admin/login');
        return 0;
      }
      return newCount;
    });
  };

  const val = (key: keyof typeof DEFAULTS) => {
    return (settings as any)?.[key] || DEFAULTS[key];
  };

  const socialLinks = [
    { icon: FaFacebookF, href: val('facebookUrl'), label: 'Facebook' },
    { icon: FaInstagram, href: val('instagramUrl'), label: 'Instagram' },
    { icon: FaLinkedinIn, href: val('linkedinUrl'), label: 'LinkedIn' },
    { icon: FaYoutube, href: val('youtubeUrl'), label: 'YouTube' },
  ];

  let displayPhone = '+91 98220 44555';
  try {
    const phones = JSON.parse(val('phoneNumbers'));
    if (Array.isArray(phones) && phones.length > 0) {
      displayPhone = phones[0];
    }
  } catch { /* use default */ }

  return (
    <footer className="bg-neutral-black text-white pt-20 pb-8 relative border-t border-neutral-border/20 z-10 font-agenda">
      
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-red to-transparent opacity-30"></div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-12">
            <Link href="/" className="block w-[180px] hover:opacity-90 transition-opacity mb-8">
              <Image 
                src="/img/tao-logo-white.png" 
                alt="TAO Architecture" 
                width={180} 
                height={45}
                className="w-full h-auto"
              />
            </Link>
            <p className="text-neutral-light-grey text-[15px] leading-[1.8] font-light max-w-sm">
              {val('footerTagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-8 text-white relative inline-block before:absolute before:-bottom-3 before:left-0 before:w-8 before:h-[2px] before:bg-primary-red">
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Our Work', href: '/work' },
                { label: 'The Studio', href: '/studio' },
                { label: 'Publications', href: '/media/publications' },
                { label: 'Careers', href: '/career' },
                { label: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-neutral-light-grey hover:text-primary-gold transition-colors duration-300 text-[15px] font-light flex items-center group relative w-max"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2 text-primary-gold -ml-3 group-hover:ml-0 opacity-0 group-hover:opacity-100">→</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-8 text-white relative inline-block before:absolute before:-bottom-3 before:left-0 before:w-8 before:h-[2px] before:bg-primary-red">
              Reach Us
            </h4>
            <div className="space-y-6 text-[15px] text-neutral-light-grey font-light">
              <p className="leading-[1.8]">
                {val('address').split('\n').map((line: string, i: number) => (
                  <span key={i}>{line}<br/></span>
                ))}
              </p>
              <div className="flex flex-col gap-2">
                <a href={`tel:${displayPhone.replace(/\s/g, '')}`} className="hover:text-primary-gold transition-colors duration-300 sliding-link inline-block w-max">
                  <span className="font-bold text-white tracking-widest mr-2 uppercase text-[10px]">T</span> {displayPhone}
                </a>
                <a href={`mailto:${val('contactEmail')}`} className="hover:text-primary-gold transition-colors duration-300 sliding-link inline-block w-max">
                   <span className="font-bold text-white tracking-widest mr-2 uppercase text-[10px]">M</span> {val('contactEmail')}
                </a>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-8 text-white relative inline-block before:absolute before:-bottom-3 before:left-0 before:w-8 before:h-[2px] before:bg-primary-red">
              Social
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-neutral-light-grey/30 flex items-center justify-center text-neutral-light-grey hover:bg-primary-gold hover:border-primary-gold hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm focus-ring"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-border/20 flex flex-col md:flex-row justify-between items-center text-[12px] tracking-wider text-neutral-light-grey/70 uppercase">
          <p 
            onClick={handleAdminTrigger} 
            className="cursor-pointer hover:text-white transition-colors mb-4 md:mb-0 select-none"
          >
            © {new Date().getFullYear()} {val('siteName')}. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-primary-gold transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary-gold transition-colors duration-300">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
