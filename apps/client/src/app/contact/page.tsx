'use client';

import { useState, useEffect } from 'react';
import ContactSidebar from '@/components/contact/ContactSidebar';
import MobilePageNav from '@/components/layout/MobilePageNav';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Contact() {
  const [activeSection, setActiveSection] = useState<string>('contact-details');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const offset = 120;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = ['contact-details', 'email-form'];

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <MobilePageNav 
        items={[
          { id: 'contact-details', label: 'Contact us' },
          { id: 'email-form', label: 'Email us' }
        ]}
        activeItem={activeSection}
        onSelect={scrollToSection}
      />
      <div className="container mx-auto px-4">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 hidden md:block relative">
             <ContactSidebar activeSection={activeSection} />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 pl-0 md:pl-8">
            
            {/* Contact Details Section */}
            <section id="contact-details" className="mb-20 pt-8">
              <div className="border-t-[10px] border-neutral-dark-grey mb-8">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.7520911131955!2d73.89636821535252!3d18.540101787397706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c10126443907%3A0xc8701cf41af4250e!2sTAO+ARCHITECTURE+PVT.+LTD.!5e0!3m2!1sen!2sin!4v1528098796192" 
                  width="100%" 
                  height="310" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>

              <div className="pl-4">
                <p className="font-agenda text-lg mb-6">
                  <strong className="font-bold">TAO ARCHITECTURE PVT LTD</strong>,<br/>
                  A/2 , Friends Enclave Society, West Block,<br/>
                  Opp Sai Hira Complex, Mundhwa,<br/>
                  Pune 411036 India
                </p>

                <p className="font-agenda text-lg mb-8">
                  <strong className="font-bold">Call</strong> +91-744-771-9343 / 44<br/>
                  <strong className="font-bold">Email</strong> admin@taoarchitecture.com
                </p>

                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/company/tao-architecture-design/" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px] bg-neutral-light-grey flex items-center justify-center text-neutral-dark-grey hover:bg-primary-gold hover:text-white transition-all duration-300 rounded-full">
                    <FaLinkedinIn size={14} />
                  </a>
                  <a href="https://www.facebook.com/taoarchitect/" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px] bg-neutral-light-grey flex items-center justify-center text-neutral-dark-grey hover:bg-primary-gold hover:text-white transition-all duration-300 rounded-full">
                    <FaFacebookF size={14} />
                  </a>
                  <a href="https://www.instagram.com/tao_architecture/?hl=en" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px] bg-neutral-light-grey flex items-center justify-center text-neutral-dark-grey hover:bg-primary-gold hover:text-white transition-all duration-300 rounded-full">
                    <FaInstagram size={14} />
                  </a>
                </div>
              </div>
            </section>

            {/* Email Form Section */}
            <section id="email-form" className="mb-20 border-t-[10px] border-neutral-dark-grey pt-10 px-8 bg-white">
              <h2 className="text-fluid-h1 font-light mb-8 font-agenda">Email us</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name*" className="w-full bg-gray-100 p-3 focus:outline-none focus:ring-1 focus:ring-primary-red font-agenda" required />
                  <input type="text" placeholder="Last Name*" className="w-full bg-gray-100 p-3 focus:outline-none focus:ring-1 focus:ring-primary-red font-agenda" required />
                </div>
                
                <input type="text" placeholder="Company Name" className="w-full bg-gray-100 p-3 focus:outline-none focus:ring-1 focus:ring-primary-red font-agenda" />
                <input type="email" placeholder="Email ID*" className="w-full bg-gray-100 p-3 focus:outline-none focus:ring-1 focus:ring-primary-red font-agenda" required />
                <input type="text" placeholder="Subject*" className="w-full bg-gray-100 p-3 focus:outline-none focus:ring-1 focus:ring-primary-red font-agenda" required />
                
                <textarea rows={5} placeholder="Message" className="w-full bg-gray-100 p-3 focus:outline-none focus:ring-1 focus:ring-primary-red font-agenda"></textarea>
                
                <div className="flex justify-end">
                  <button type="submit" className="btn border-2 border-primary-red text-primary-red hover:bg-primary-red hover:text-white">
                    Send
                  </button>
                </div>
              </form>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
