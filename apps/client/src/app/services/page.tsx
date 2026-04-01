'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ServicesSidebar from '@/components/services/ServicesSidebar';
import MobilePageNav from '@/components/layout/MobilePageNav';
import { Service } from '@/types';
import { getImageUrl } from '@/utils/image';
import ScrollReveal from '@/components/ScrollReveal';

// Hardcoded fallback services
const FALLBACK_SERVICES = [
  {
    id: 'architecture-interiors', slug: 'architecture-interiors',
    title: 'Architecture + Interior Design', image: '/img/services/architecture-interiordesign.jpg',
    items: ['Design Brief Preparation', 'Conceptualization of Design', 'Engineering Integration & Coordination', 'Design Finalization', 'Tender Documentation', 'Construction Documentation', 'Onsite Design Verification', 'Onsite design assistance', 'Certification of Bills', 'Project Closure Documentation']
  },
  {
    id: 'design-coordination', slug: 'design-coordination',
    title: 'Design Coordination', image: '/img/services/design-coordination.jpg',
    items: ['Design Brief Preparation', 'Project Mapping', 'Selection of Suitable Stakeholders', 'Monitoring Design Outputs', 'Engineering and services integration', 'Structural integration', 'Material and Methodology', 'Finalization of Design', 'Verifying Engineering Integration', 'Certification & Tender Documents', 'Onsite Design Assistance', 'Certifying Project Closure Documents']
  },
  {
    id: 'procurement-assistance', slug: 'procurement-assistance',
    title: 'Procurement Assistance', image: '/img/services/procurement-assistance.jpg',
    items: ['Optional presentation of product samples as per specifications', 'Quantification of products', 'Visit to showrooms/factories for material selection', 'Onsite mockup approval']
  },
  {
    id: 'execution-coordination', slug: 'execution-coordination',
    title: 'Execution Coordination', image: '/img/services/execution-coordination.jpg',
    items: ['Project Mapping', 'Sequential scheduling of project', 'Selection of Suitable Stakeholders', 'Cross checking products and work orders', 'Onsite design assistance', 'Verifying translation of drawings onsite', 'Ensuring quality of work']
  },
  {
    id: 'custom-furniture', slug: 'custom-furniture',
    title: 'Custom Furniture + Art', image: '/img/services/customfurniture-art.jpg',
    items: ['Design Brief and Ideology Preparation', 'Conceptualization', 'Selection of Artists/Skilled Resources', 'Preparation of Technical Documents', 'Approval of Mock-Up and Finishes', 'Installation Schedule and Program', 'Onsite Assistance', 'Quality Certification', 'Final Documentation']
  },
  {
    id: 'project-management', slug: 'project-management',
    title: 'Project Management : To Be Outsourced', image: '/img/services/project-management.jpg',
    subtitle: '*At TAO, we work towards design and execution assistance whereas the below services are outsourced:',
    items: ['Project Management', 'Regular onsite supervision', 'Onsite safety and sanitation', 'Placement of orders for commercial transactions', 'Management of agencies']
  },
];

// Default intro text
const DEFAULT_INTRO = {
  title: 'Tao Architecture',
  content: [
    'TAO is a spiritual journey that justifies the essence of man, nature and its built form to engage the Spirit of Space in tangible forms. This timelessness is encapsulated by TAO. Imbibing this spiritual approach to Spatial designs as a means of connecting man with himself & his environment... TAOStudiO was conceptualized in 1994!!',
    'TAOStudiO intends to dissolve the barrier between the inside and outside to create free spirited and complimentary environment for its end users. Our attempt has always been to create tangible forms of architecture as stepping stones and also cater to the emotional and spiritual needs of the end users. Allowing them to find a co-existential bond with nature as an organic entity through intangible spaces as an experiential element of architecture. TAOStudiO stands out, for the holistic design approach in creating a spatial Climate for our clients.',
  ]
};

export default function Services() {
  const [activeSection, setActiveSection] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [introTitle, setIntroTitle] = useState(DEFAULT_INTRO.title);
  const [introContent, setIntroContent] = useState<string[]>(DEFAULT_INTRO.content);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

        const [servicesRes, introRes] = await Promise.all([
          fetch(`${apiUrl}/services`).then(r => r.ok ? r.json() : []),
          fetch(`${apiUrl}/pages/services-intro`).then(r => r.ok ? r.json() : null),
        ]);

        if (servicesRes && servicesRes.length > 0) {
          setServices(servicesRes);
          setActiveSection(servicesRes[0].slug);
        } else {
          setServices(FALLBACK_SERVICES);
          setActiveSection(FALLBACK_SERVICES[0].slug);
        }

        if (introRes && introRes.content) {
          setIntroTitle(introRes.title || DEFAULT_INTRO.title);
          setIntroContent(introRes.content.split('\n\n').filter((p: string) => p.trim()));
        }
      } catch {
        setServices(FALLBACK_SERVICES);
        setActiveSection(FALLBACK_SERVICES[0].slug);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const serviceItems = services.map(s => ({
    id: s.slug,
    label: s.title,
  }));

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
    if (services.length === 0) return;

    const handleScroll = () => {
      const slugs = services.map(s => s.slug);
      let found = false;
      for (const slug of slugs) {
        const element = document.getElementById(slug);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) {
            setActiveSection(slug);
            found = true;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [services]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-20 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-16 h-16 border-t-2 border-primary-red border-solid rounded-full animate-spinSlow"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      
      {/* Page Header Banner */}
      <div className="relative z-10 container mx-auto px-4 mt-8 mb-4">
        <ScrollReveal variant="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-agenda uppercase tracking-wider mb-2 text-neutral-dark-grey">
            Our <span className="font-bold text-primary-gold">Services</span>
          </h1>
          <div className="w-16 h-[2px] bg-primary-red mb-8"></div>
        </ScrollReveal>
      </div>

      <MobilePageNav 
        items={serviceItems} 
        activeItem={activeSection} 
        onSelect={scrollToSection} 
      />

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 relative overflow-hidden">
        <ScrollReveal variant="fade-up" delay={100} className="max-w-4xl relative z-10">
          <h2 className="text-2xl md:text-3xl font-light uppercase mb-8 font-agenda tracking-widest text-primary-gold">
            {introTitle}
          </h2>
          <div className="text-base md:text-lg font-agenda text-neutral-dark-grey space-y-8 leading-relaxed font-light">
            {introContent.map((para, idx) => (
              <p key={idx} className="relative pl-6">
                 {/* Decorative quote lines */}
                 {idx === 0 && <span className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-primary-red to-transparent opacity-50"></span>}
                 {para}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 pb-20 mt-12">
        <div className="flex flex-col md:flex-row gap-0 md:gap-8">
          {/* Sidebar */}
          <div className="hidden md:block w-1/4 relative">
            <ServicesSidebar activeSection={activeSection} items={serviceItems} />
          </div>

          {/* Content */}
          <div className="w-full md:w-3/4">
            {services.map((service, index) => (
              <section key={service.slug || service.id} id={service.slug} className="mb-32 relative">
                
                <ScrollReveal variant="fade-in" className="section-divider mb-12">
                   <span className="text-[10px] font-bold tracking-[0.2em] text-primary-gold uppercase px-4">{service.title}</span>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                  <ScrollReveal variant="fade-up" delay={100} className="relative">
                    <div className="img-zoom relative w-full aspect-[4/3] shadow-elegant overflow-hidden group">
                      <Image
                        src={service.image ? getImageUrl(service.image) : '/img/placeholder.jpg'}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.08]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-neutral-black/0 group-hover:bg-neutral-black/10 transition-colors duration-500 ease-out-expo"></div>
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal variant="fade-up" delay={200}>
                    <h3 className="text-2xl lg:text-3xl font-bold uppercase mb-4 font-agenda text-neutral-dark-grey tracking-[-0.02em] leading-tight flex items-center gap-4">
                      {service.title}
                    </h3>
                    {service.subtitle && (
                      <p className="text-[13px] italic mb-6 font-agenda text-primary-gold tracking-wide">{service.subtitle}</p>
                    )}
                    {service.description && (
                      <p className="text-[15px] mb-8 font-agenda text-neutral-light-grey leading-relaxed">{service.description}</p>
                    )}
                    <ul className="space-y-4 font-agenda text-neutral-dark-grey">
                      {(service.items || []).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-4 group">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-gold flex-shrink-0 group-hover:scale-150 transition-transform duration-300 group-hover:bg-primary-red"></span>
                          <span className="text-[15px] group-hover:text-neutral-black transition-colors duration-300 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}