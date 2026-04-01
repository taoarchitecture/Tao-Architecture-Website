'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StudioSidebar from '@/components/studio/StudioSidebar';
import MobilePageNav from '@/components/layout/MobilePageNav';
import { getTeamMembers } from '@/lib/api';
import { TeamMember } from '@/types';
import ScrollReveal from '@/components/ScrollReveal';

const DEFAULT_INTRO = "Led by Principal Architect Manish Banker, TAO Architecture Pvt. Ltd. comprises a team of driven professionals passionately working to enrich the lives of clients through user centric sustainable design solutions. Keeping to its name, the studio leads 'The Way' to a greener future, incorporating and promoting organic design principles.";

export default function Studio() {
  const [activeSection, setActiveSection] = useState('team');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [introText, setIntroText] = useState(DEFAULT_INTRO);

  const fetchTeam = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTeamMembers();
      setTeamMembers(data);
    } catch (err) {
      console.error('Failed to fetch team members:', err);
      setError('Failed to load team members. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
    const fetchIntro = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/pages/studio-intro`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.content) setIntroText(data.content);
        }
      } catch { /* use default */ }
    };
    fetchIntro();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-20 flex justify-center items-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-16 h-16 border-t-2 border-primary-red border-solid rounded-full animate-spinSlow"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-20 flex flex-col justify-center items-center">
        <div className="text-primary-red uppercase tracking-widest text-xs mb-6 font-bold font-agenda">{error}</div>
        <button 
          onClick={fetchTeam}
          className="btn btn-outline"
        >
          RETRY
        </button>
      </main>
    );
  }

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

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      
      {/* Page Header Banner */}
      <div className="relative z-10 container mx-auto px-4 mt-8 mb-4">
        <ScrollReveal variant="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-agenda uppercase tracking-wider mb-2 text-neutral-dark-grey">
            The <span className="font-bold text-primary-gold">Studio</span>
          </h1>
          <div className="w-16 h-[2px] bg-primary-red mb-8"></div>
        </ScrollReveal>
      </div>

      <MobilePageNav 
        items={[{ id: 'team', label: 'Team' }]}
        activeItem={activeSection}
        onSelect={scrollToSection}
      />
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-1/4 hidden md:block relative">
             <StudioSidebar activeSection={activeSection} />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            
            <section id="team" className="mb-24 pt-8">
              <ScrollReveal variant="fade-up" delay={100} className="mb-16">
                <p className="font-agenda text-lg lg:text-xl leading-relaxed text-neutral-dark-grey font-light">
                  {introText}
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fade-in" className="section-divider mb-16">
                 <span className="text-[10px] font-bold tracking-[0.2em] text-primary-gold uppercase px-4">Our Team</span>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {teamMembers.map((member, idx) => (
                  <ScrollReveal key={member.id} variant="fade-up" delay={idx * 100}>
                    <div className="group flex flex-col h-full bg-white shadow-sm hover:shadow-elegant border border-neutral-border hover:border-transparent transition-all duration-500 ease-out-expo overflow-hidden cursor-pointer">
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-bg">
                            <Image 
                                src={member.image} 
                                alt={member.name} 
                                fill 
                                className="object-cover object-top img-grayscale transform transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.05]"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            {/* Overlay Gradient for readability on hover bio */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-black/90 via-neutral-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out-expo"></div>
                            
                            {/* Hover Reveal Content (Bio) */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out-expo z-10 pointer-events-none">
                              <div className="space-y-3 font-agenda text-neutral-border text-[11px] uppercase tracking-widest leading-relaxed line-clamp-6">
                                  {member.bio.map((paragraph, bIdx) => (
                                      <p key={bIdx}>{paragraph}</p>
                                  ))}
                              </div>
                            </div>
                        </div>
                        <div className="p-6 relative z-10 bg-white transform transition-transform duration-500 ease-out-expo group-hover:-translate-y-4">
                            <h5 className="text-[17px] uppercase font-bold mb-1 font-agenda tracking-[-0.01em] text-neutral-dark-grey group-hover:text-primary-red transition-colors">{member.name}</h5>
                            <p className="text-primary-gold font-agenda italic text-[13px] tracking-wide">{member.role}</p>
                        </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
