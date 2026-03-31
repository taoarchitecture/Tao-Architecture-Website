'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StudioSidebar from '@/components/studio/StudioSidebar';
import MobilePageNav from '@/components/layout/MobilePageNav';
import { getTeamMembers } from '@/lib/api';
import { TeamMember } from '@/types';

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
    // Fetch dynamic intro text
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
        <div className="text-neutral-light-grey uppercase tracking-widest text-xs">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-20 flex flex-col justify-center items-center">
        <div className="text-red-600 uppercase tracking-widest text-xs mb-4">{error}</div>
        <button 
          onClick={fetchTeam}
          className="px-6 py-2 border border-neutral-dark-grey text-xs font-bold uppercase tracking-widest hover:bg-neutral-dark-grey hover:text-white transition-colors"
        >
          Retry
        </button>
      </main>
    );
  }

  const scrollToSection = (id: string) => {
    // For now only team section exists, but future-proof
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
      // Simple check since we only have one section now
      setActiveSection('team');
    };
    // No scroll listener needed really if only one section, but keeping structure for safety
  }, []);

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <MobilePageNav 
        items={[{ id: 'team', label: 'Team' }]}
        activeItem={activeSection}
        onSelect={scrollToSection}
      />
      <div className="container mx-auto px-4">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 hidden md:block relative">
             <StudioSidebar activeSection={activeSection} />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 pl-0 md:pl-8">
            
            {/* Team Section */}
            <section id="team" className="mb-20 pt-8">
              <div className="mb-12">
                <h5 className="text-fluid-h1 uppercase font-bold mb-8 font-agenda">Tao Team</h5>
                <p className="font-agenda text-lg leading-relaxed text-neutral-dark-grey">
                  {introText}
                </p>
              </div>

              <div className="space-y-16">
                {teamMembers.map((member) => (
                    <div key={member.id} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-4 relative">
                            <div className="relative w-full aspect-[3/4] overflow-hidden">
                                <Image 
                                    src={member.image} 
                                    alt={member.name} 
                                    fill 
                                    className="object-cover object-top"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-8">
                            <h5 className="text-xl uppercase font-bold mb-2 font-agenda">{member.name}</h5>
                            <p className="text-primary-red mb-6 font-agenda italic">{member.role}</p>
                            <div className="space-y-4">
                                {member.bio.map((paragraph, idx) => (
                                    <p key={idx} className="font-agenda text-neutral-dark-grey leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
