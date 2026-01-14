"use client";

import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
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
    <footer className="bg-neutral-off-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          
          {/* Left Column: Contact Info */}
          <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <div className="mb-6">
              <h5 className="font-agenda font-bold text-white mb-4 uppercase tracking-wider text-sm">TAO ARCHITECTURE PVT LTD</h5>
              <address className="not-italic text-neutral-light-grey leading-relaxed mb-4 font-agenda text-[14px]">
                <p>A/2 , Friends Enclave Society, West Block,</p>
                <p>Opp Sai Hira Complex, Mundhwa,</p>
                <p>Pune 411036 India</p>
              </address>
              <p className="text-[14px] mb-1 font-agenda">
                <span className="text-neutral-light-grey">Call</span> <span className="ml-1 text-white">+91-744-771-9343 / 44</span>
              </p>
              <p className="text-[14px] mb-1 font-agenda">
                <span className="text-neutral-light-grey">Email</span> <a href="mailto:admin@taoarchitecture.com" className="ml-1 text-white hover:text-primary-gold transition-colors border-b border-transparent hover:border-primary-gold">admin@taoarchitecture.com</a>
              </p>
              <p className="text-[14px] font-agenda">
                <span className="text-neutral-light-grey">Website</span> <a href="http://www.taoarchitecture.com/" className="ml-1 text-white hover:text-primary-gold transition-colors border-b border-transparent hover:border-primary-gold">www.taoarchitecture.com</a>
              </p>
            </div>
          </div>

          {/* Right Column: Links & Socials */}
          <div className="md:w-1/2 flex flex-col items-center md:items-end">
             {/* Quick Links */}
             <ul className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 mb-8 font-agenda text-[13px] uppercase tracking-widest font-bold">
               <li><Link href="/" className="hover:text-primary-red transition-colors">Home</Link></li>
               <li><Link href="/work" className="hover:text-primary-red transition-colors">Work</Link></li>
               <li><Link href="/services" className="hover:text-primary-red transition-colors">Services</Link></li>
               <li><Link href="/studio" className="hover:text-primary-red transition-colors">Studio</Link></li>
               <li><Link href="/contact" className="hover:text-primary-red transition-colors">Contact</Link></li>
             </ul>

             {/* Social Icons */}
             <div className="flex gap-2">
               <a href="https://www.facebook.com/taoarchitect/" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] bg-[#333] rounded-md flex items-center justify-center text-white hover:bg-primary-red hover:text-white transition-all duration-300">
                 <FaFacebookF size={14} />
               </a>
               <a href="#" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] bg-[#333] rounded-md flex items-center justify-center text-white hover:bg-primary-red hover:text-white transition-all duration-300">
                 <FaTwitter size={14} />
               </a>
               <a href="https://www.linkedin.com/company/tao-architecture-design/" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] bg-[#333] rounded-md flex items-center justify-center text-white hover:bg-primary-red hover:text-white transition-all duration-300">
                 <FaLinkedinIn size={14} />
               </a>
               <a href="https://www.instagram.com/tao_architecture/?hl=en" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] bg-[#333] rounded-md flex items-center justify-center text-white hover:bg-primary-red hover:text-white transition-all duration-300">
                 <FaInstagram size={14} />
               </a>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#333] pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-neutral-light-grey uppercase tracking-widest font-agenda">
          <p 
            onClick={handleAdminTrigger}
            className="cursor-default select-none hover:text-neutral-light-grey transition-colors"
            title="© TAO Architecture"
          >
            © TAO Architecture Private Limited, {new Date().getFullYear()}
          </p>
          <div className="mt-2 md:mt-0">
             <span>Website by VertoDesignss</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
