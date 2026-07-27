'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StudioSidebar from '@/components/studio/StudioSidebar';
import MobilePageNav from '@/components/layout/MobilePageNav';
import { getImageUrl } from '@/utils/image';
import { TeamMember } from '@/types';

const DEFAULT_INTRO = "Led by Principal Architect Manish Banker, TAO Architecture Pvt. Ltd. comprises a team of driven professionals passionately working to enrich the lives of clients through user centric sustainable design solutions. Keeping to its name, the studio leads 'The Way' to a greener future, incorporating and promoting organic design principles.";

export default function Studio() {
  const [activeSection, setActiveSection] = useState('team');
  const [introText, setIntroText] = useState(DEFAULT_INTRO);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Fetch dynamic intro text
    const fetchIntro = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const res = await fetch(`${apiUrl}/pages/studio-intro`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.content) setIntroText(data.content);
        }
      } catch { /* use default */ }
    };

    // Fetch team members
    const fetchTeam = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const res = await fetch(`${apiUrl}/studio`);
        if (res.ok) {
          const data = await res.json();
          // Filter out inactive members
          const activeMembers = data.filter((m: TeamMember) => m.active);
          if (activeMembers.length > 0) {
            setTeamMembers(activeMembers);
          }
        }
      } catch (err) {
        console.error('Failed to fetch team members', err);
      }
    };

    fetchIntro();
    fetchTeam();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Simple check since we only have one section now
      setActiveSection('team');
    };
    // No scroll listener needed really if only one section, but keeping structure for safety
  }, []);

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

  const resolveMemberImage = (image: string | null | undefined): string | null => {
    const src = getImageUrl(image);
    return src.trim() ? src : null;
  };

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
                {/* Lead Member */}
                {teamMembers.length > 0 && (() => {
                  const lead = teamMembers[0];
                  const memberImageSrc = resolveMemberImage(lead.image);
                  return (
                    <div key={lead.id} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-4 relative">
                            <div className="relative w-full aspect-[3/4] overflow-hidden">
                                {memberImageSrc ? (
                                  <Image
                                      src={memberImageSrc}
                                      alt={lead.name}
                                      fill
                                      priority
                                      className="object-cover object-top"
                                      sizes="(max-width: 768px) 100vw, 33vw"
                                      quality={85}
                                  />
                                ) : (
                                  <div className="h-full w-full bg-neutral-100" aria-hidden="true" />
                                )}
                            </div>
                        </div>
                        <div className="md:col-span-8">
                            <h5 className="text-xl uppercase font-bold mb-2 font-agenda">{lead.name}</h5>
                            <p className="text-primary-red mb-6 font-agenda italic">{lead.role}</p>
                            <div className="space-y-4">
                                {lead.bio.map((paragraph, idx) => (
                                    <p key={idx} className="font-agenda text-neutral-dark-grey leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                  );
                })()}

                {/* Rest of the team */}
                {teamMembers.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
                    {teamMembers.slice(1).map((member) => {
                      const memberImageSrc = resolveMemberImage(member.image);
                      const isHovered = hoveredId === member.id;
                      return (
                        <div 
                          key={member.id} 
                          className="group flex flex-col cursor-pointer"
                          onMouseEnter={() => setHoveredId(member.id)}
                          onMouseLeave={() => setHoveredId(null)}
                        >
                          <div className="relative w-full aspect-[3/4] overflow-hidden mb-4">
                              {memberImageSrc ? (
                                <Image
                                    src={memberImageSrc}
                                    alt={member.name}
                                    fill
                                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    quality={85}
                                />
                              ) : (
                                <div className="h-full w-full bg-neutral-100" aria-hidden="true" />
                              )}
                          </div>
                          <h5 className="text-lg uppercase font-bold font-agenda text-center">{member.name}</h5>
                          <div 
                            className={`text-center mt-1 transition-all duration-300 ease-in-out ${
                              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                            }`}
                          >
                            <p className="text-primary-red font-agenda italic text-sm">{member.role}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
