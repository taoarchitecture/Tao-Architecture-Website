'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactSidebar from '@/components/contact/ContactSidebar';
import MobilePageNav from '@/components/layout/MobilePageNav';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { GlobalSettings } from '@/types';
import axios from 'axios';

// Hardcoded defaults – used when API fails or settings not configured yet
const DEFAULTS = {
  contactEmail: 'admin@taoarchitecture.com',
  phoneNumbers: '["+91-744-771-9343 / 44"]',
  address: 'A/2 , Friends Enclave Society, West Block,\nOpp Sai Hira Complex, Mundhwa,\nPune 411036 India',
  googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.7520911131955!2d73.89636821535252!3d18.540101787397706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c10126443907%3A0xc8701cf41af4250e!2sTAO+ARCHITECTURE+PVT.+LTD.!5e0!3m2!1sen!2sin!4v1528098796192',
  facebookUrl: 'https://www.facebook.com/taoarchitect/',
  instagramUrl: 'https://www.instagram.com/tao_architecture/?hl=en',
  linkedinUrl: 'https://www.linkedin.com/company/tao-architecture-design/',
};

export default function Contact() {
  const [activeSection, setActiveSection] = useState<string>('contact-details');
  const [settings, setSettings] = useState<GlobalSettings | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/settings`);
        if (res.ok) setSettings(await res.json());
      } catch { /* use defaults */ }
    };
    fetchSettings();
  }, []);

  const val = (key: keyof typeof DEFAULTS) => (settings as any)?.[key] || DEFAULTS[key];

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
      const sections = ['contact-details', 'email-form', 'careers-cta'];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        firstName, lastName, companyName, email, subject, message
      });
      setSubmitted(true);
      setFirstName(''); setLastName(''); setCompanyName('');
      setEmail(''); setSubject(''); setMessage('');
    } catch (error) {
      console.error(error);
      alert('Error sending message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Parse phone numbers
  let phones: string[] = [];
  try {
    phones = JSON.parse(val('phoneNumbers'));
  } catch {
    phones = [val('phoneNumbers')];
  }

  // Parse address lines
  const addressLines = (val('address') || '').split('\n');

  return (
    <main className="min-h-screen bg-white pb-20">
      <MobilePageNav 
        items={[
          { id: 'contact-details', label: 'Contact us' },
          { id: 'email-form', label: 'Email us' },
          { id: 'careers-cta', label: 'Careers' }
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
            <section id="contact-details" className="mb-10 pt-8">
              <div className="border-t-[3px] border-primary-gold mb-8">
                <iframe 
                  src={val('googleMapsUrl')} 
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
                <p className="font-agenda tao-fs-addr mb-6">
                  <strong className="font-bold">TAO ARCHITECTURE PVT LTD</strong>,<br/>
                  {addressLines.map((line: string, i: number) => (
                    <span key={i}>{line}<br/></span>
                  ))}
                </p>

                <p className="font-agenda tao-fs-addr mb-8">
                  <strong className="font-bold">Call</strong> {phones.join(' / ')}<br/>
                  <strong className="font-bold">Email</strong> {val('contactEmail')}
                </p>

                <div className="flex gap-3">
                  <a href={val('linkedinUrl')} target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] border border-neutral-border flex items-center justify-center text-neutral-dark-grey hover:bg-primary-gold hover:border-primary-gold hover:text-neutral-black transition-all duration-300 rounded-sm">
                    <FaLinkedinIn size={14} />
                  </a>
                  <a href={val('facebookUrl')} target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] border border-neutral-border flex items-center justify-center text-neutral-dark-grey hover:bg-primary-gold hover:border-primary-gold hover:text-neutral-black transition-all duration-300 rounded-sm">
                    <FaFacebookF size={14} />
                  </a>
                  <a href={val('instagramUrl')} target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] border border-neutral-border flex items-center justify-center text-neutral-dark-grey hover:bg-primary-gold hover:border-primary-gold hover:text-neutral-black transition-all duration-300 rounded-sm">
                    <FaInstagram size={14} />
                  </a>
                </div>
              </div>
            </section>

            {/* Email Form Section */}
            <section id="email-form" className="mb-10 border-t-[3px] border-primary-gold pt-8 px-8 bg-neutral-bg">
              <h2 className="tao-fs-form-h font-normal mb-8 font-agenda">Email us</h2>
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="py-12 text-center"
                  >
                    <p className="text-lg font-agenda text-neutral-dark-grey mb-4">Thank you for your message!</p>
                    <p className="text-sm text-neutral-medium-grey mb-6">We&apos;ll get back to you as soon as possible.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn btn-outline-red"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input type="text" placeholder="First Name*" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-border p-3 focus:outline-none focus:ring-0 focus:border-primary-gold transition-colors font-agenda tao-fs-input !text-base" required />
                      <input type="text" placeholder="Last Name*" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-border p-3 focus:outline-none focus:ring-0 focus:border-primary-gold transition-colors font-agenda tao-fs-input !text-base" required />
                    </div>

                    <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-border p-3 focus:outline-none focus:ring-0 focus:border-primary-gold transition-colors font-agenda tao-fs-input !text-base" />
                    <input type="email" placeholder="Email ID*" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-border p-3 focus:outline-none focus:ring-0 focus:border-primary-gold transition-colors font-agenda tao-fs-input !text-base" required />
                    <input type="text" placeholder="Subject*" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-border p-3 focus:outline-none focus:ring-0 focus:border-primary-gold transition-colors font-agenda tao-fs-input !text-base" required />

                    <textarea rows={5} placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-transparent border-t-0 border-x-0 border-b border-neutral-border p-3 focus:outline-none focus:ring-0 focus:border-primary-gold transition-colors font-agenda tao-fs-input !text-base"></textarea>

                    <div className="flex justify-end">
                      <button type="submit" disabled={submitting} className="btn btn-outline-red disabled:opacity-50">
                        {submitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </section>

            {/* Career CTA Section */}
            <section id="careers-cta" className="mb-10 border-t-[3px] border-primary-gold pt-8 px-8 bg-neutral-bg">
              <h2 className="tao-fs-form-h font-normal mb-6 font-agenda">Careers</h2>
              <p className="text-neutral-dark-grey font-agenda mb-6 text-lg leading-relaxed max-w-2xl">
                Interested in joining the TAO Architecture team? We are always looking for talented architects, interior designers, and interns to join our studio.
              </p>
              <a href="/career" className="btn btn-outline-red inline-block px-8 py-3">
                View Openings & Apply
              </a>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
