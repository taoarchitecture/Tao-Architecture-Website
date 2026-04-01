'use client';

import { useState, useEffect } from 'react';
import ContactSidebar from '@/components/contact/ContactSidebar';
import MobilePageNav from '@/components/layout/MobilePageNav';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { GlobalSettings } from '@/types';
import axios from 'axios';
import ScrollReveal from '@/components/ScrollReveal';

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

    window.addEventListener('scroll', handleScroll, { passive: true });
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

  let phones: string[] = [];
  try {
    phones = JSON.parse(val('phoneNumbers'));
  } catch {
    phones = [val('phoneNumbers')];
  }

  const addressLines = (val('address') || '').split('\n');

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      
      {/* Page Header Banner */}
      <div className="relative z-10 container mx-auto px-4 mt-8 mb-4">
        <ScrollReveal variant="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-agenda uppercase tracking-wider mb-2 text-neutral-dark-grey">
            Contact <span className="font-bold text-primary-gold">Us</span>
          </h1>
          <div className="w-16 h-[2px] bg-primary-red mb-8"></div>
        </ScrollReveal>
      </div>

      <MobilePageNav 
        items={[
          { id: 'contact-details', label: 'Contact details' },
          { id: 'email-form', label: 'Email us' }
        ]}
        activeItem={activeSection}
        onSelect={scrollToSection}
      />
      
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-1/4 hidden md:block relative">
             <ContactSidebar activeSection={activeSection} />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            
            <section id="contact-details" className="pt-8">
              <ScrollReveal variant="fade-up" delay={100} className="mb-12 shadow-elegant transition-shadow duration-500 hover:shadow-xl">
                <iframe 
                  src={val('googleMapsUrl')} 
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full relative z-10 filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-out-expo"
                ></iframe>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={200} className="pl-4 md:pl-8 border-l pb-2 border-primary-gold mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-[14px] uppercase font-bold tracking-[0.15em] text-primary-gold mb-4 font-agenda">Office</h4>
                    <p className="font-agenda text-[16px] md:text-[18px] text-neutral-dark-grey leading-relaxed">
                      <strong className="font-bold">TAO ARCHITECTURE PVT. LTD.</strong><br/>
                      {addressLines.map((line: string, i: number) => (
                        <span key={i} className="text-neutral-light-grey block mt-2">{line}</span>
                      ))}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[14px] uppercase font-bold tracking-[0.15em] text-primary-gold mb-4 font-agenda">Connect</h4>
                    <p className="font-agenda text-[16px] md:text-[18px] text-neutral-light-grey mb-8 flex flex-col gap-2">
                      <span className="flex items-center gap-2">
                         <strong className="font-bold text-neutral-dark-grey w-16">Call:</strong> 
                         <a href={`tel:${phones[0]}`} className="hover:text-primary-red transition-colors inline-block sliding-link text-neutral-light-grey">{phones.join(' / ')}</a>
                      </span>
                      <span className="flex items-center gap-2">
                         <strong className="font-bold text-neutral-dark-grey w-16">Email:</strong> 
                         <a href={`mailto:${val('contactEmail')}`} className="hover:text-primary-red transition-colors inline-block sliding-link text-neutral-light-grey">{val('contactEmail')}</a>
                      </span>
                    </p>

                    <div className="flex gap-4">
                      <a href={val('linkedinUrl')} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="w-[44px] h-[44px] border border-neutral-border flex items-center justify-center text-neutral-dark-grey hover:bg-neutral-dark-grey hover:border-neutral-dark-grey hover:text-white hover:-translate-y-1 transition-all duration-300 rounded-full shadow-sm hover:shadow-lg focus-ring">
                        <FaLinkedinIn size={16} />
                      </a>
                      <a href={val('facebookUrl')} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="w-[44px] h-[44px] border border-neutral-border flex items-center justify-center text-neutral-dark-grey hover:bg-neutral-dark-grey hover:border-neutral-dark-grey hover:text-white hover:-translate-y-1 transition-all duration-300 rounded-full shadow-sm hover:shadow-lg focus-ring">
                        <FaFacebookF size={16} />
                      </a>
                      <a href={val('instagramUrl')} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="w-[44px] h-[44px] border border-neutral-border flex items-center justify-center text-neutral-dark-grey hover:bg-neutral-dark-grey hover:border-neutral-dark-grey hover:text-white hover:-translate-y-1 transition-all duration-300 rounded-full shadow-sm hover:shadow-lg focus-ring">
                        <FaInstagram size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* Email Form Section */}
            <section id="email-form" className="mb-20 pt-16">
              <ScrollReveal variant="fade-up">
                <div className="bg-neutral-bg-warm p-8 md:p-12 shadow-sm border border-neutral-border">
                  <h2 className="text-3xl font-light mb-10 font-agenda uppercase text-neutral-dark-grey tracking-wider">Email us</h2>
                  
                  {submitted ? (
                    <div className="py-16 text-center animate-fadeInUp">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <p className="text-xl font-bold font-agenda text-neutral-dark-grey mb-2 uppercase tracking-wide">Thank you for your message!</p>
                      <p className="text-base text-neutral-light-grey mb-8 font-agenda">We&apos;ll get back to you as soon as possible.</p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn btn-outline"
                      >
                        SEND ANOTHER MESSAGE
                      </button>
                    </div>
                  ) : (
                    <form className="space-y-8" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative group">
                          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-transparent border-b border-neutral-border py-3 px-0 focus:border-primary-red transition-colors duration-300 outline-none font-agenda text-neutral-dark-grey placeholder-transparent peer" placeholder="First Name*" required />
                          <label htmlFor="firstName" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-neutral-light-grey transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary-red uppercase">First Name*</label>
                        </div>
                        <div className="relative group">
                          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-transparent border-b border-neutral-border py-3 px-0 focus:border-primary-red transition-colors duration-300 outline-none font-agenda text-neutral-dark-grey placeholder-transparent peer" placeholder="Last Name*" required />
                          <label htmlFor="lastName" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-neutral-light-grey transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary-red uppercase">Last Name*</label>
                        </div>
                      </div>
                      
                      <div className="relative group">
                        <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full bg-transparent border-b border-neutral-border py-3 px-0 focus:border-primary-red transition-colors duration-300 outline-none font-agenda text-neutral-dark-grey placeholder-transparent peer" placeholder="Company Name" />
                        <label htmlFor="companyName" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-neutral-light-grey transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary-red uppercase">Company Name</label>
                      </div>

                      <div className="relative group">
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-neutral-border py-3 px-0 focus:border-primary-red transition-colors duration-300 outline-none font-agenda text-neutral-dark-grey placeholder-transparent peer" placeholder="Email ID*" required />
                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-neutral-light-grey transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary-red uppercase">Email ID*</label>
                      </div>

                      <div className="relative group">
                        <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-transparent border-b border-neutral-border py-3 px-0 focus:border-primary-red transition-colors duration-300 outline-none font-agenda text-neutral-dark-grey placeholder-transparent peer" placeholder="Subject*" required />
                        <label htmlFor="subject" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-neutral-light-grey transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary-red uppercase">Subject*</label>
                      </div>
                      
                      <div className="relative group">
                        <textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-transparent border-b border-neutral-border py-3 px-0 focus:border-primary-red transition-colors duration-300 outline-none font-agenda text-neutral-dark-grey placeholder-transparent peer resize-none" placeholder="Message"></textarea>
                        <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-neutral-light-grey transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary-red uppercase">Message</label>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <button type="submit" disabled={submitting} className={`btn btn-primary min-w-[160px] ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                          {submitting ? (
                            <span className="flex items-center gap-2">
                               <div className="w-4 h-4 border-2 border-white/30 border-t-white border-solid rounded-full animate-spinSlow"></div>
                               SENDING
                            </span>
                          ) : 'SEND MESSAGE'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
