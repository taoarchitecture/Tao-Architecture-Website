"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { GlobalSettings } from '@/types';

// Hardcoded defaults — used when API fails or settings not configured
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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
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

  // Handle click count and reset
  useEffect(() => {
    if (clickCount === 0) return;
    
    if (clickCount >= 5) {
      router.push('/admin/login');
      setClickCount(0);
      return;
    }

    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  }, [clickCount, router]);

  const handleAdminTrigger = () => {
    setClickCount(prev => prev + 1);
  };

  // Helper to get value with fallback
  const val = (key: keyof typeof DEFAULTS) => {
    return (settings as any)?.[key] || DEFAULTS[key];
  };

  const socialLinks = [
    { icon: FaFacebookF, href: val('facebookUrl'), label: 'Facebook' },
    { icon: FaInstagram, href: val('instagramUrl'), label: 'Instagram' },
    { icon: FaLinkedinIn, href: val('linkedinUrl'), label: 'LinkedIn' },
    { icon: FaYoutube, href: val('youtubeUrl'), label: 'YouTube' },
  ];

  // Parse phone for display
  let displayPhone = '+91 98220 44555';
  try {
    const phones = JSON.parse(val('phoneNumbers'));
    if (Array.isArray(phones) && phones.length > 0) {
      displayPhone = phones[0];
    }
  } catch { /* use default */ }

  return (
    <footer className="bg-neutral-off-black text-white relative overflow-hidden">
      {/* Gold accent line at top */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary-gold to-transparent opacity-80" />

      <div className="container mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="block w-[190px] hover:opacity-85 transition-opacity duration-200">
              <Image
                src="/img/tao-logo.png"
                alt="TAO Studio Logo"
                width={190}
                height={48}
                className="brightness-0 invert"
                style={{ width: '100%', height: 'auto' }}
              />
            </Link>
            <p className="text-neutral-light-grey text-[13px] leading-relaxed max-w-[240px]">
              {val('footerTagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white mb-6 border-b border-neutral-medium-grey pb-2.5 w-fit tracking-[0.15em]">
              Quick Links
            </h2>
            <ul className="space-y-3.5">
              {[
                { label: 'Work', href: '/work' },
                { label: 'Studio', href: '/studio' },
                { label: 'Publications', href: '/media/publications' },
                { label: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-light-grey text-[13px] font-medium flex items-center gap-0 group hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-primary-gold text-sm leading-none">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-white mb-6 border-b border-neutral-medium-grey pb-2.5 w-fit tracking-[0.15em]">
              Contact Us
            </h2>
            <div className="space-y-3.5 text-[13px] text-neutral-light-grey">
              <p className="leading-relaxed">
                <strong className="block text-white mb-1 font-semibold">Pune Office:</strong>
                {val('address').split('\n').map((line: string, i: number) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
              <a
                href={`tel:${displayPhone.replace(/\s/g, '')}`}
                className="block hover:text-white transition-colors duration-200"
              >
                {displayPhone}
              </a>
              <a
                href={`mailto:${val('contactEmail')}`}
                className="block hover:text-white transition-colors duration-200"
              >
                {val('contactEmail')}
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-white mb-6 border-b border-neutral-medium-grey pb-2.5 w-fit tracking-[0.15em]">
              Follow Us
            </h2>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 border border-neutral-medium-grey flex items-center justify-center text-neutral-light-grey hover:bg-primary-gold hover:border-primary-gold hover:text-neutral-black transition-all duration-300"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-medium-grey flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-neutral-light-grey tracking-[0.08em]">
          <p
            onClick={handleAdminTrigger}
            className="cursor-pointer hover:text-white transition-colors duration-200 select-none"
          >
            © {new Date().getFullYear()} {val('siteName')}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
