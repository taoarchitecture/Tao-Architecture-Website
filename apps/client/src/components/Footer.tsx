"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Footer = () => {
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);

  // Reset click count after 2 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleAdminTrigger = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) { // Trigger on 5th click
        router.push('/admin/login');
        return 0;
      }
      return newCount;
    });
  };

  return (
    <footer className="bg-neutral-off-black text-white pt-16 pb-8 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="block w-[180px] hover:opacity-90 transition-opacity">
              <Image 
                src="/img/tao-logo-white.png" 
                alt="TAO Architecture" 
                width={180} 
                height={45}
                className="w-full h-auto"
              />
            </Link>
            <p className="text-neutral-light-grey text-sm leading-relaxed max-w-xs">
              Touching intangible beauty of nature, through tangible forms of Architecture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white border-b border-neutral-medium-grey pb-2 w-fit">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'Work', href: '/work' },
                { label: 'Studio', href: '/studio' },
                { label: 'Publications', href: '/media/publications' },
                { label: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-neutral-light-grey hover:text-primary-red transition-colors text-sm font-medium flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2 text-primary-red">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white border-b border-neutral-medium-grey pb-2 w-fit">Contact Us</h4>
            <div className="space-y-4 text-sm text-neutral-light-grey">
              <p className="leading-relaxed">
                <strong className="block text-white mb-1">Pune Office:</strong>
                A/2, Friends Enclave,<br/>
                West Block, Opp Sai Hira Complex,<br/>
                Mundhwa, Pune - 411036
              </p>
              <a href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE || '+919822044555'}`} className="block hover:text-primary-red transition-colors">
                {process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 98220 44555'}
              </a>
              <a href="mailto:info@taoarchitecture.com" className="block hover:text-primary-red transition-colors">
                info@taoarchitecture.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white border-b border-neutral-medium-grey pb-2 w-fit">Follow Us</h4>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, href: 'https://www.facebook.com/taoarchitecture', label: 'Facebook' },
                { icon: FaInstagram, href: 'https://www.instagram.com/taoarchitecture', label: 'Instagram' },
                { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/tao-architecture-pvt-ltd', label: 'LinkedIn' },
                { icon: FaYoutube, href: 'https://www.youtube.com/@TAOSTUDIO_0', label: 'YouTube' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-neutral-medium-grey flex items-center justify-center text-white hover:bg-primary-red hover:border-primary-red transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-medium-grey flex flex-col md:flex-row justify-between items-center text-xs text-neutral-light-grey">
          <p 
            onClick={handleAdminTrigger} 
            className="cursor-pointer hover:text-white transition-colors mb-4 md:mb-0 select-none"
          >
            © {new Date().getFullYear()} Tao Architecture Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
