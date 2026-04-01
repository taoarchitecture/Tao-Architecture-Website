'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projectDetails, projects } from '@/data/projects';
import { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaWhatsapp, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = projectDetails[slug];
  const [showFullText, setShowFullText] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isLightboxOpen]);

  const [currentUrl, setCurrentUrl] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-neutral-bg-warm">
        <div className="text-center">
            <h1 className="text-5xl font-light font-agenda uppercase mb-6 text-neutral-dark-grey tracking-wider">Project Not Found</h1>
            <p className="mb-8 font-agenda text-neutral-light-grey text-lg">The project you are looking for does not exist or has not been migrated yet.</p>
            <Link href="/work" className="btn btn-outline">BACK TO WORK</Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-white pt-20">
      
      {/* Hero Section (Parallax base) */}
      <section className="relative w-full h-[70vh] md:h-[85vh] bg-neutral-black mb-16 overflow-hidden">
         {project.heroImage && (
             <Image 
                src={project.heroImage} 
                alt={project.title} 
                fill 
                className="object-cover opacity-90 img-zoom transition-transform duration-[1200ms] ease-out-expo hover:scale-[1.03]"
                priority
             />
         )}
         {/* Subtle overlay gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
         
         <div className="absolute bottom-12 left-0 w-full px-4 md:px-12 z-10 flex flex-col md:flex-row justify-between items-end">
            <div className="text-white max-w-4xl animate-fadeInUp">
                <h4 className="text-[11px] font-bold tracking-[0.25em] text-primary-gold uppercase mb-4 font-agenda">
                    {project.category}
                </h4>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-2 font-agenda leading-none tracking-[-0.02em]">
                    {project.title}
                </h1>
                {project.subtitle && (
                    <h2 className="text-xl md:text-2xl font-light font-agenda text-neutral-light-grey tracking-wide">
                        {project.subtitle}
                    </h2>
                )}
            </div>

            <div className="hidden md:flex gap-3 animate-fadeInUp delay-200">
                <button 
                    onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-12 h-12 border border-white/30 text-white hover:bg-white hover:text-black flex items-center justify-center rounded-full transition-all duration-300 group"
                    aria-label="Scroll to Details"
                >
                    <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </button>
            </div>
         </div>
      </section>

      {/* Details Section */}
      <section id="details" className="container mx-auto px-4 lg:px-12 mb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="w-full lg:w-[70%]">
                <ScrollReveal variant="fade-up">
                    <div className="bg-neutral-bg-warm p-8 md:p-12 mb-16 shadow-sm border border-neutral-border font-agenda">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {project.details.location && (
                                <div>
                                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-primary-red mb-2">Location</h5>
                                    <p className="text-[14px] text-neutral-dark-grey font-medium leading-snug">{project.details.location}</p>
                                </div>
                            )}
                            {project.details.status && (
                                <div>
                                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-primary-red mb-2">Status</h5>
                                    <p className="text-[14px] text-neutral-dark-grey font-medium leading-snug">{project.details.status}</p>
                                </div>
                            )}
                            {project.details.plotArea && (
                                <div>
                                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-primary-red mb-2">Plot Area</h5>
                                    <p className="text-[14px] text-neutral-dark-grey font-medium leading-snug">{project.details.plotArea}</p>
                                </div>
                            )}
                            {project.details.builtUpArea && (
                                <div>
                                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-primary-red mb-2">Built-up Area</h5>
                                    <p className="text-[14px] text-neutral-dark-grey font-medium leading-snug">{project.details.builtUpArea}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={100}>
                    <div className="prose max-w-none font-agenda text-[16px] md:text-[18px] text-neutral-dark-grey leading-[1.8] font-light">
                        {project.description.slice(0, showFullText ? undefined : 2).map((paragraph, idx) => (
                            <p key={idx} className="mb-8">{paragraph}</p>
                        ))}
                        
                         {showFullText && project.description.slice(2).map((paragraph, idx) => (
                            <p key={`more-${idx}`} className="mb-8 animate-fadeInUp">{paragraph}</p>
                        ))}

                        {project.description.length > 2 && (
                            <button 
                                onClick={() => setShowFullText(!showFullText)}
                                className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-red border-b border-primary-red pb-1 hover:text-black hover:border-black transition-colors duration-300 mt-4 inline-flex items-center gap-2"
                            >
                                {showFullText ? 'READ LESS' : 'READ MORE'}
                                <span className={`transform transition-transform duration-300 ${showFullText ? 'rotate-180' : ''}`}>↓</span>
                            </button>
                        )}
                    </div>
                </ScrollReveal>
            </div>

            {/* Share Sidebar */}
            <div className="w-full lg:w-[30%]">
                 <ScrollReveal variant="fade-up" delay={200} className="sticky top-32">
                    <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-neutral-light-grey before:w-8 before:h-[1px] before:bg-primary-red before:inline-block before:align-middle before:mr-3">SHARE PROJECT</h5>
                    <div className="flex lg:flex-wrap gap-3">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] border border-neutral-border hover:bg-black hover:text-white flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md text-neutral-dark-grey">
                            <FaFacebookF size={14} />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] border border-neutral-border hover:bg-[#1da1f2] hover:border-[#1da1f2] hover:text-white flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md text-neutral-dark-grey">
                            <FaTwitter size={14} />
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] border border-neutral-border hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md text-neutral-dark-grey">
                            <FaLinkedinIn size={14} />
                        </a>
                        <a href={`https://pinterest.com/pin/create/button/?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] border border-neutral-border hover:bg-[#bd081c] hover:border-[#bd081c] hover:text-white flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md text-neutral-dark-grey">
                            <FaPinterestP size={14} />
                        </a>
                         <a href={`whatsapp://send?text=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] border border-neutral-border hover:bg-[#25d366] hover:border-[#25d366] hover:text-white flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md text-neutral-dark-grey">
                            <FaWhatsapp size={14} />
                        </a>
                    </div>
                 </ScrollReveal>
            </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-neutral-bg py-24 border-t border-neutral-border">
         <div className="container mx-auto px-4 lg:px-12">
            <ScrollReveal variant="fade-up" className="mb-16">
                 <h3 className="text-3xl font-light uppercase tracking-widest font-agenda text-neutral-dark-grey flex items-center gap-6">
                    Gallery 
                    <span className="flex-grow h-[1px] bg-neutral-border max-w-xs"></span>
                 </h3>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                {project.gallery.map((item, idx) => (
                    <ScrollReveal key={idx} variant="fade-up" delay={(idx % 2) * 100}>
                        <div 
                          className="group relative cursor-pointer overflow-hidden border border-neutral-border/50 shadow-sm hover:shadow-elegant transition-all duration-500 ease-out-expo bg-white p-[2px]"
                          onClick={() => openLightbox(idx)}
                        >
                            <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden img-zoom bg-neutral-bg">
                                <Image 
                                    src={item.src} 
                                    alt={item.title || `Gallery Image ${idx + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.05]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 ease-out-expo flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full border border-white/50 bg-black/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-500 ease-out-expo">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
         </div>
      </section>

      {/* Navigation & Related */}
      <section className="py-24 bg-white border-t border-neutral-border">
         <div className="container mx-auto px-4 lg:px-12">
             
             {/* Navigation */}
             <div className="flex justify-between items-center mb-32 border-b border-neutral-border pb-8">
                {prevProject ? (
                    <Link href={prevProject.link} className="flex items-center gap-6 group flex-1">
                        <div className="w-12 h-12 rounded-full border border-neutral-border flex items-center justify-center text-neutral-light-grey group-hover:border-primary-red group-hover:text-primary-red transition-colors duration-300">
                            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
                        </div>
                        <div className="hidden md:flex flex-col">
                            <span className="text-[10px] text-neutral-light-grey uppercase font-bold tracking-widest mb-1 font-agenda">PREVIOUS</span>
                            <span className="uppercase font-bold text-[15px] tracking-wide text-neutral-dark-grey group-hover:text-primary-red transition-colors duration-300 font-agenda">{prevProject.title}</span>
                        </div>
                    </Link>
                ) : <div className="flex-1"></div>}

                <div className="flex-1 flex justify-center">
                    <Link href="/work" className="w-[50px] h-[50px] flex gap-1 flex-wrap items-center justify-center group p-2 hover:bg-neutral-bg transition-colors rounded-full">
                        <span className="w-2.5 h-2.5 bg-neutral-light-grey group-hover:bg-primary-red transition-colors"></span>
                        <span className="w-2.5 h-2.5 bg-neutral-light-grey group-hover:bg-primary-red transition-colors"></span>
                        <span className="w-2.5 h-2.5 bg-neutral-light-grey group-hover:bg-primary-red transition-colors"></span>
                        <span className="w-2.5 h-2.5 bg-neutral-light-grey group-hover:bg-primary-red transition-colors"></span>
                    </Link>
                </div>

                {nextProject ? (
                    <Link href={nextProject.link} className="flex items-center justify-end gap-6 group flex-1">
                        <div className="hidden md:flex flex-col text-right">
                            <span className="text-[10px] text-neutral-light-grey uppercase font-bold tracking-widest mb-1 font-agenda">NEXT</span>
                            <span className="uppercase font-bold text-[15px] tracking-wide text-neutral-dark-grey group-hover:text-primary-red transition-colors duration-300 font-agenda">{nextProject.title}</span>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-neutral-border flex items-center justify-center text-neutral-light-grey group-hover:border-primary-red group-hover:text-primary-red transition-colors duration-300">
                             <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </Link>
                ) : <div className="flex-1"></div>}
             </div>

             {/* Related Projects */}
             {project.relatedProjects && project.relatedProjects.length > 0 && (
                 <ScrollReveal variant="fade-up">
                     <h3 className="text-center text-[10px] font-bold uppercase tracking-[0.2em] mb-12 text-primary-gold">RELATED PROJECTS</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {project.relatedProjects.map((relatedId, rIdx) => {
                             const related = projects.find(p => p.id === relatedId);
                             if (!related) return null;
                             return (
                                 <ScrollReveal key={related.id} variant="fade-up" delay={rIdx * 100}>
                                     <div className="group text-center cursor-pointer">
                                         <div className="relative h-[250px] w-full mb-6 overflow-hidden border border-neutral-border p-1 bg-white shadow-sm group-hover:shadow-elegant transition-all duration-500 ease-out-expo img-zoom">
                                             <div className="relative w-full h-full overflow-hidden">
                                                 <Link href={related.link}>
                                                    <Image 
                                                        src={related.image} 
                                                        alt={related.title} 
                                                        fill 
                                                        className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.08]"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-neutral-black/0 group-hover:bg-neutral-black/10 transition-colors duration-500 ease-out-expo"></div>
                                                 </Link>
                                             </div>
                                         </div>
                                         <h5 className="text-[15px] font-bold uppercase mb-2 font-agenda text-neutral-dark-grey group-hover:text-primary-red transition-colors duration-300">
                                             <Link href={related.link}>{related.title}</Link>
                                         </h5>
                                         <p className="text-[11px] text-neutral-light-grey uppercase tracking-[0.1em] font-agenda">{related.description}</p>
                                     </div>
                                 </ScrollReveal>
                             );
                         })}
                     </div>
                 </ScrollReveal>
             )}
         </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="absolute top-0 right-0 p-6 flex items-center justify-end z-[101]">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
              className="text-white hover:text-primary-red uppercase text-xs font-bold tracking-widest font-agenda flex items-center gap-2 transition-colors ml-auto"
            >
              CLOSE
              <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:border-primary-red">
                <FaTimes size={14} />
              </div>
            </button>
          </div>
          
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 text-white/50 hover:text-white z-[101] transition-all duration-300 hover:-translate-x-1 p-4"
            aria-label="Previous Image"
          >
            <FaChevronLeft size={32} strokeWidth={1} />
          </button>
          
          <div 
             className="relative w-full max-w-6xl h-[80vh] animate-scaleIn"
             onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={project.gallery[lightboxIndex].src}
              alt={project.gallery[lightboxIndex].title || 'Gallery image'}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            {project.gallery[lightboxIndex].title && (
              <div className="absolute bottom-0 left-0 w-full text-center text-white p-6 bg-gradient-to-t from-black/80 to-transparent pb-8">
                 <h4 className="text-xl font-bold uppercase tracking-wide font-agenda">{project.gallery[lightboxIndex].title}</h4>
                 {project.gallery[lightboxIndex].description && <p className="text-sm mt-2 text-white/70 font-agenda font-light">{project.gallery[lightboxIndex].description}</p>}
              </div>
            )}
            
            {/* Image Counter */}
            <div className="absolute bottom-4 right-6 text-white/60 text-xs font-agenda tracking-widest">
                {lightboxIndex + 1} / {project.gallery.length}
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 text-white/50 hover:text-white z-[101] transition-all duration-300 hover:translate-x-1 p-4"
            aria-label="Next Image"
          >
            <FaChevronRight size={32} />
          </button>
        </div>
      )}

    </main>
  );
}
