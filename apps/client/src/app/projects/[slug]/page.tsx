'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projectDetails, projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaWhatsapp, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

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

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="mb-8">The project you are looking for does not exist or has not been migrated yet.</p>
            <Link href="/work" className="text-primary-red hover:underline">Back to Work</Link>
        </div>
      </div>
    );
  }

  // Find next/prev projects
  // We use the 'projects' array to find the order
  // Note: projects array uses 'link' which contains the slug, or 'id' which matches the slug
  const currentIndex = projects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <main className="min-h-screen bg-white pt-20">
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-gray-100 mb-12">
         {project.heroImage && (
             <Image 
                src={project.heroImage} 
                alt={project.title} 
                fill 
                className="object-cover"
                priority
             />
         )}
         <div className="absolute top-0 right-0 p-4 md:p-8 flex gap-2">
            <button 
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center rounded-full transition-all"
            >
                <span className="transform rotate-180">¶</span>
            </button>
            <button 
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center rounded-full transition-all"
            >
                <span className="grid grid-cols-2 gap-0.5 w-4 h-4">
                    <span className="bg-black w-1.5 h-1.5"></span>
                    <span className="bg-black w-1.5 h-1.5"></span>
                    <span className="bg-black w-1.5 h-1.5"></span>
                    <span className="bg-black w-1.5 h-1.5"></span>
                </span>
            </button>
         </div>
      </section>

      {/* Details Section */}
      <section id="details" className="container mx-auto px-4 mb-20">
        <div className="flex flex-wrap md:flex-nowrap">
            {/* Main Content */}
            <div className="w-full md:w-3/4 pr-0 md:pr-12">
                <div className="mb-8">
                    <h4 className="text-sm font-bold tracking-widest text-primary-red uppercase mb-4 font-agenda">
                        {project.category}
                    </h4>
                    
                    <div className="flex justify-between items-start">
                        <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4 font-agenda leading-tight">
                            {project.title}
                        </h1>
                        
                        {/* Social Share - Mobile/Tablet only, or sticky desktop */}
                        <div className="hidden md:flex gap-2">
                            {/* Share icons */}
                        </div>
                    </div>

                    {project.subtitle && (
                        <h2 className="text-2xl md:text-3xl font-light uppercase mb-8 font-agenda text-neutral-dark-grey">
                            {project.subtitle}
                        </h2>
                    )}

                    <div className="bg-gray-50 p-6 mb-8 border-l-4 border-black font-agenda">
                        {project.details.location && <p className="mb-1"><span className="font-bold">Location :</span> {project.details.location}</p>}
                        {project.details.status && <p className="mb-1"><span className="font-bold">Status :</span> {project.details.status}</p>}
                        {project.details.plotArea && <p className="mb-1"><span className="font-bold">Plot Area :</span> {project.details.plotArea}</p>}
                        {project.details.builtUpArea && <p className="mb-1"><span className="font-bold">Built Up Area :</span> {project.details.builtUpArea}</p>}
                    </div>

                    <div className="prose max-w-none font-agenda text-lg text-neutral-dark-grey leading-relaxed">
                        {project.description.slice(0, showFullText ? undefined : 2).map((paragraph, idx) => (
                            <p key={idx} className="mb-6">{paragraph}</p>
                        ))}
                        
                        {/* Hidden text for read more */}
                         {showFullText && project.description.slice(2).map((paragraph, idx) => (
                            <p key={`more-${idx}`} className="mb-6 animate-fadeIn">{paragraph}</p>
                        ))}

                        {project.description.length > 2 && (
                            <button 
                                onClick={() => setShowFullText(!showFullText)}
                                className="btn btn-stroke mt-4"
                            >
                                {showFullText ? 'Read Less' : 'Read More'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Share Sidebar */}
            <div className="w-full md:w-1/4 mt-8 md:mt-0 md:border-l md:border-gray-100 md:pl-8">
                 <div className="sticky top-32">
                    <h5 className="text-xs uppercase tracking-widest font-bold mb-4">Share</h5>
                    <div className="flex md:flex-col gap-4">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-[#3b5998] hover:text-white flex items-center justify-center rounded-full transition-all">
                            <FaFacebookF />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-[#1da1f2] hover:text-white flex items-center justify-center rounded-full transition-all">
                            <FaTwitter />
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-[#0077b5] hover:text-white flex items-center justify-center rounded-full transition-all">
                            <FaLinkedinIn />
                        </a>
                        <a href={`https://pinterest.com/pin/create/button/?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-[#bd081c] hover:text-white flex items-center justify-center rounded-full transition-all">
                            <FaPinterestP />
                        </a>
                         <a href={`whatsapp://send?text=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 hover:bg-[#25d366] hover:text-white flex items-center justify-center rounded-full transition-all">
                            <FaWhatsapp />
                        </a>
                    </div>
                 </div>
            </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-gray-50 py-20">
         <div className="container mx-auto px-4">
            <h3 className="text-center text-2xl font-light uppercase tracking-widest mb-12">- Image Gallery -</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="group relative cursor-pointer"
                      onClick={() => openLightbox(idx)}
                    >
                        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
                            <Image 
                                src={item.src} 
                                alt={item.title || `Gallery Image ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center">
                                <div className="w-12 h-12 rounded-full border border-primary-red text-primary-red flex items-center justify-center mb-4">
                                    <span className="text-2xl">+</span>
                                </div>
                                {item.title && <h4 className="text-xl font-bold uppercase mb-2">{item.title}</h4>}
                                {item.description && <p className="text-sm font-light">{item.description}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* View More / View Less for gallery could go here if we had lots of images */}
         </div>
      </section>

      {/* Navigation & Related */}
      <section className="py-20 border-t border-gray-200">
         <div className="container mx-auto px-4">
             {/* Navigation */}
             <div className="flex justify-between items-center mb-20">
                {prevProject ? (
                    <Link href={prevProject.link} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                            &lt;
                        </div>
                        <span className="uppercase font-bold text-sm tracking-wider hidden md:block">{prevProject.title}</span>
                    </Link>
                ) : <div></div>}

                <Link href="/work" className="uppercase font-bold text-sm tracking-wider border-b-2 border-black pb-1 hover:text-primary-red hover:border-primary-red transition-all">
                    All Projects
                </Link>

                {nextProject ? (
                    <Link href={nextProject.link} className="flex items-center gap-4 group">
                        <span className="uppercase font-bold text-sm tracking-wider hidden md:block">{nextProject.title}</span>
                        <div className="w-10 h-10 border border-black flex items-center justify-center group-hover:bg-primary-red group-hover:border-primary-red group-hover:text-white transition-all">
                            &gt;
                        </div>
                    </Link>
                ) : <div></div>}
             </div>

             {/* Related Projects */}
             {project.relatedProjects && project.relatedProjects.length > 0 && (
                 <div>
                     <h3 className="text-center text-2xl font-light uppercase tracking-widest mb-12">Related Projects</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {project.relatedProjects.map(relatedId => {
                             const related = projects.find(p => p.id === relatedId);
                             if (!related) return null;
                             return (
                                 <div key={related.id} className="group text-center">
                                     <div className="relative h-[250px] w-full mb-4 overflow-hidden border-t-2 border-black">
                                         <Link href={related.link}>
                                            <Image 
                                                src={related.image} 
                                                alt={related.title} 
                                                fill 
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                         </Link>
                                     </div>
                                     <h5 className="text-sm font-bold uppercase mb-1 hover:text-primary-red transition-colors">
                                         <Link href={related.link}>{related.title}</Link>
                                     </h5>
                                     <p className="text-xs text-neutral-dark-grey uppercase tracking-wider">{related.description}</p>
                                 </div>
                             );
                         })}
                     </div>
                 </div>
             )}
         </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-primary-gold z-[101] transition-colors"
          >
            <FaTimes size={24} />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 text-white hover:text-primary-gold z-[101] transition-colors"
          >
            <FaChevronLeft size={32} />
          </button>
          
          <div className="relative w-full max-w-6xl h-[80vh]">
            <Image
              src={project.gallery[lightboxIndex].src}
              alt={project.gallery[lightboxIndex].title || ''}
              fill
              className="object-contain"
            />
            {project.gallery[lightboxIndex].title && (
              <div className="absolute bottom-4 left-0 w-full text-center text-white bg-black/50 p-2">
                 <h4 className="text-lg font-bold uppercase">{project.gallery[lightboxIndex].title}</h4>
                 {project.gallery[lightboxIndex].description && <p className="text-sm">{project.gallery[lightboxIndex].description}</p>}
              </div>
            )}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 text-white hover:text-primary-gold z-[101] transition-colors"
          >
            <FaChevronRight size={32} />
          </button>
        </div>
      )}

    </main>
  );
}
