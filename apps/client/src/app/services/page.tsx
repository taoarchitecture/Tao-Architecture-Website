'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ServicesSidebar from '@/components/services/ServicesSidebar';
import MobilePageNav from '@/components/layout/MobilePageNav';

export default function Services() {
  const [activeSection, setActiveSection] = useState('architecture-interiors');

  const serviceItems = [
    { id: 'architecture-interiors', label: 'Architecture + Interiors' },
    { id: 'design-coordination', label: 'Design Coordination' },
    { id: 'procurement-assistance', label: 'Procurement Assistance' },
    { id: 'execution-coordination', label: 'Execution Coordination' },
    { id: 'custom-furniture', label: 'Custom Furniture + Art' },
    { id: 'project-management', label: 'Project Management' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'architecture-interiors',
        'design-coordination',
        'procurement-assistance',
        'execution-coordination',
        'custom-furniture',
        'project-management'
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white pt-20">
      <MobilePageNav 
        items={serviceItems} 
        activeItem={activeSection} 
        onSelect={scrollToSection} 
      />
      {/* Intro Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl">
          <h1 className="text-fluid-h1 font-bold uppercase mb-8 font-agenda">Tao Architecture</h1>
          <div className="text-lg font-agenda text-neutral-dark-grey space-y-6 leading-relaxed">
            <p>
              TAO is a spiritual journey that justifies the essence of man, nature and its built form to engage the Spirit of Space in tangible forms. This timelessness is encapsulated by TAO. Imbibing this spiritual approach to Spatial designs as a means of connecting man with himself & his environment... TAOStudiO was conceptualized in 1994!!
            </p>
            <p>
              TAOStudiO intends to dissolve the barrier between the inside and outside to create free spirited and complimentary environment for its end users. Our attempt has always been to create tangible forms of architecture as stepping stones and also cater to the emotional and spiritual needs of the end users. Allowing them to find a co-existential bond with nature as an organic entity through intangible spaces as an experiential element of architecture. TAOStudiO stands out, for the holistic design approach in creating a spatial Climate for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <ServicesSidebar activeSection={activeSection} />
          </div>

          {/* Content */}
          <div className="md:w-3/4">
            
            {/* Architecture + Interiors */}
            <section id="architecture-interiors" className="mb-20 pt-8 border-t-2 border-neutral-dark-grey">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/img/services/architecture-interiordesign.jpg"
                    alt="Architecture + Interior Design"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold uppercase mb-4 font-agenda text-primary-red">Architecture + Interior Design</h2>
                  <ul className="list-disc pl-5 space-y-2 font-agenda text-neutral-dark-grey marker:text-primary-red">
                    <li>Design Brief Preparation</li>
                    <li>Conceptualization of Design</li>
                    <li>Engineering Integration & Coordination</li>
                    <li>Design Finalization</li>
                    <li>Tender Documentation</li>
                    <li>Construction Documentation</li>
                    <li>Onsite Design Verification</li>
                    <li>Onsite design assistance</li>
                    <li>Certification of Bills</li>
                    <li>Project Closure Documentation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Design Coordination */}
            <section id="design-coordination" className="mb-20 pt-8 border-t-2 border-neutral-dark-grey">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/img/services/design-coordination.jpg"
                    alt="Design Coordination"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold uppercase mb-4 font-agenda text-primary-red">Design Coordination</h2>
                  <ul className="list-disc pl-5 space-y-2 font-agenda text-neutral-dark-grey marker:text-primary-red">
                    <li>Design Brief Preparation</li>
                    <li>Project Mapping</li>
                    <li>Selection of Suitable Stakeholders</li>
                    <li>Monitoring Design Outputs</li>
                    <li>Engineering and services integration</li>
                    <li>Structural integration</li>
                    <li>Material and Methodology</li>
                    <li>Finalization of Design</li>
                    <li>Verifying Engineering Integration</li>
                    <li>Certification & Tender Documents</li>
                    <li>Onsite Design Assistance</li>
                    <li>Certifying Project Closure Documents</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Procurement Assistance */}
            <section id="procurement-assistance" className="mb-20 pt-8 border-t-2 border-neutral-dark-grey">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/img/services/procurement-assistance.jpg"
                    alt="Procurement Assistance"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold uppercase mb-4 font-agenda text-primary-red">Procurement Assistance</h2>
                  <ul className="list-disc pl-5 space-y-2 font-agenda text-neutral-dark-grey marker:text-primary-red">
                    <li>Optional presentation of product samples as per specifications</li>
                    <li>Quantification of products</li>
                    <li>Visit to showrooms/factories for material selection</li>
                    <li>Onsite mockup approval</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Execution Coordination */}
            <section id="execution-coordination" className="mb-20 pt-8 border-t-2 border-neutral-dark-grey">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/img/services/execution-coordination.jpg"
                    alt="Execution Coordination"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold uppercase mb-4 font-agenda text-primary-red">Execution Coordination</h2>
                  <ul className="list-disc pl-5 space-y-2 font-agenda text-neutral-dark-grey marker:text-primary-red">
                    <li>Project Mapping</li>
                    <li>Sequential scheduling of project</li>
                    <li>Selection of Suitable Stakeholders</li>
                    <li>Cross checking products and work orders</li>
                    <li>Onsite design assistance</li>
                    <li>Verifying translation of drawings onsite</li>
                    <li>Ensuring quality of work</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Custom Furniture + Art */}
            <section id="custom-furniture" className="mb-20 pt-8 border-t-2 border-neutral-dark-grey">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/img/services/customfurniture-art.jpg"
                    alt="Custom Furniture + Art"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold uppercase mb-4 font-agenda text-primary-red">Custom Furniture + Art</h2>
                  <ul className="list-disc pl-5 space-y-2 font-agenda text-neutral-dark-grey marker:text-primary-red">
                    <li>Design Brief and Ideology Preparation</li>
                    <li>Conceptualization</li>
                    <li>Selection of Artists/Skilled Resources</li>
                    <li>Preparation of Technical Documents</li>
                    <li>Approval of Mock-Up and Finishes</li>
                    <li>Installation Schedule and Program</li>
                    <li>Onsite Assistance</li>
                    <li>Quality Certification</li>
                    <li>Final Documentation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Project Management */}
            <section id="project-management" className="mb-20 pt-8 border-t-2 border-neutral-dark-grey">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/img/services/project-management.jpg"
                    alt="Project Management"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold uppercase mb-2 font-agenda text-primary-red">Project Management : To Be Outsourced</h2>
                  <p className="text-sm italic mb-4 font-agenda">*At TAO, we work towards design and execution assistance whereas the below services are outsourced:</p>
                  <ul className="list-disc pl-5 space-y-2 font-agenda text-neutral-dark-grey marker:text-primary-red">
                    <li>Project Management</li>
                    <li>Regular onsite supervision</li>
                    <li>Onsite safety and sanitation</li>
                    <li>Placement of orders for commercial transactions</li>
                    <li>Management of agencies</li>
                  </ul>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}