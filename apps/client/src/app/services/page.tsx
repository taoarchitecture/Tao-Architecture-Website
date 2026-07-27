'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ServicesSidebar from '@/components/services/ServicesSidebar';
import MobilePageNav from '@/components/layout/MobilePageNav';
import { Service } from '@/types';
import { getImageUrl } from '@/utils/image';

// Hardcoded fallback services — used when no services exist in the DB
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

const FETCH_TIMEOUT_MS = 10000;

async function fetchJsonWithTimeout<T>(url: string, fallback: T) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  } finally {
    clearTimeout(timeoutId);
  }
}

export default function Services() {
  const [activeSection, setActiveSection] = useState(FALLBACK_SERVICES[0].slug);
  const [services, setServices] = useState<any[]>(FALLBACK_SERVICES);
  const [introTitle, setIntroTitle] = useState(DEFAULT_INTRO.title);
  const [introContent, setIntroContent] = useState<string[]>(DEFAULT_INTRO.content);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

        // Fetch services and intro content in parallel
        const [servicesRes, introRes] = await Promise.all([
          fetchJsonWithTimeout<any[]>(`${apiUrl}/services`, []),
          fetchJsonWithTimeout<{ title?: string; content?: string } | null>(`${apiUrl}/pages/services-intro`, null),
        ]);

        // Use dynamic services if available, otherwise fall back
        if (servicesRes && servicesRes.length > 0) {
          setServices(servicesRes);
          setActiveSection(servicesRes[0].slug);
        } else {
          setServices(FALLBACK_SERVICES);
          setActiveSection(FALLBACK_SERVICES[0].slug);
        }

        // Use dynamic intro if available
        if (introRes && introRes.content) {
          setIntroTitle(introRes.title || DEFAULT_INTRO.title);
          // Split content by double newlines for paragraphs
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

      for (const slug of slugs) {
        const element = document.getElementById(slug);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(slug);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [services]);



  return (
    <main className="min-h-screen bg-white pt-20">
      <MobilePageNav
        items={serviceItems}
        activeItem={activeSection}
        onSelect={scrollToSection}
      />

      {/* ── Intro Section ── */}
      <section className="container mx-auto px-4 py-10 md:py-20">
        <div className="max-w-4xl">
          <h1 className="tao-fs-svc-h font-bold uppercase mb-6 font-agenda">{introTitle}</h1>
          <div className="tao-fs-desc font-agenda text-neutral-dark-grey space-y-5 leading-relaxed">
            {introContent.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content with Sidebar ── */}
      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar — desktop only (hidden on mobile, MobilePageNav used instead) */}
          <div className="md:w-1/4 hidden md:block">
            <ServicesSidebar activeSection={activeSection} items={serviceItems} />
          </div>

          {/* Service cards */}
          <div className="w-full md:w-3/4">
            {services.map((service, index) => (
              <section
                key={service.slug || service.id}
                id={service.slug}
                className="mb-16 pt-8 border-t-2 border-neutral-dark-grey scroll-mt-32"
              >
                {/* Desktop: Grid / Mobile: Stack */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image — responsive, no overflow on mobile */}
                  <div className="relative w-full mb-4 md:mb-0 overflow-hidden rounded-sm">
                    <div className="relative w-full h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                      <Image
                        src={service.image ? getImageUrl(service.image) : '/img/placeholder.jpg'}
                        alt={service.title}
                        fill
                        priority={index === 0}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={85}
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-5">
                    <h2 className="tao-fs-svc-rh font-bold uppercase font-agenda text-primary-red leading-snug">
                      {service.title}
                    </h2>

                    {service.subtitle && (
                      <p className="tao-fs-input italic font-agenda text-neutral-medium-grey">
                        {service.subtitle}
                      </p>
                    )}

                    {service.description && (
                      <p className="tao-fs-desc font-agenda text-neutral-dark-grey">{service.description}</p>
                    )}

                    <ul className="list-disc pl-5 space-y-2 font-agenda tao-fs-desc text-neutral-dark-grey marker:text-primary-red">
                      {(service.items || []).map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
