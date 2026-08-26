'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/utils/image';
import { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaWhatsapp, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function ProjectDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;
  const [project, setProject] = useState<any>(null);
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFullText, setShowFullText] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }

    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const [projRes, allRes] = await Promise.all([
          fetch(`${apiUrl}/projects/slug/${slug}`),
          fetch(`${apiUrl}/projects`)
        ]);

        if (projRes.ok) {
          const projData = await projRes.json();
          // parse JSON fields
          if (typeof projData.description === 'string') projData.description = JSON.parse(projData.description);
          if (typeof projData.details === 'string') projData.details = JSON.parse(projData.details);
          if (typeof projData.gallery === 'string') projData.gallery = JSON.parse(projData.gallery);
          if (typeof projData.relatedProjects === 'string') projData.relatedProjects = JSON.parse(projData.relatedProjects);

          setProject(projData);
        }

        if (allRes.ok) {
           const allData = await allRes.json();
           const visibleProjects = allData.filter((p: any) => p.isPublished !== false).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
           setAllProjects(visibleProjects);
        }

      } catch (err) {
        console.error('Failed to fetch project details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextImage = () => {
    if(project) setLightboxIndex((prev) => (prev + 1) % (project.gallery?.length || 1));
  };

  const prevImage = () => {
    if(project) setLightboxIndex((prev) => (prev - 1 + (project.gallery?.length || 1)) % (project.gallery?.length || 1));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white animate-pulse">
        {/* Hero Section Skeleton */}
        <section className="relative mb-12 h-[60vh] w-full bg-neutral-100/50 md:h-[80vh]"></section>

        {/* Details Section Skeleton */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-wrap md:flex-nowrap">
              <div className="w-full md:w-3/4 pr-0 md:pr-12">
                  <div className="mb-8">
                      <div className="w-24 h-4 bg-neutral-100/50 mb-4"></div>
                      <div className="w-3/4 h-10 bg-neutral-100/50 mb-4"></div>
                      <div className="w-1/2 h-6 bg-neutral-100/50 mb-8"></div>
                      <div className="w-full h-32 bg-neutral-100/50 mb-8 border-l-[3px] border-neutral-200"></div>
                      <div className="space-y-4">
                        <div className="w-full h-4 bg-neutral-100/50"></div>
                        <div className="w-full h-4 bg-neutral-100/50"></div>
                        <div className="w-5/6 h-4 bg-neutral-100/50"></div>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </main>
    );
  }

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
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative mb-12 h-[60vh] w-full bg-neutral-bg md:h-[80vh]">
         {project.coverImage ? (
             <Image
                src={getImageUrl(project.coverImage)}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                quality={85}
             />
         ) : (
            <div className="w-full h-full bg-neutral-200"></div>
         )}
         <div className="absolute top-0 right-0 p-4 md:p-8 flex gap-2">
            <button
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center rounded-full transition-all"
                aria-label="Scroll to details"
            >
                <div className="flex flex-col items-center">
                    <span className="w-px h-3 bg-black mb-0.5"></span>
                    <span className="border-solid border-t-black border-t-[4px] border-x-transparent border-x-[4px] border-b-0 w-0 h-0"></span>
                </div>
            </button>
            <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center rounded-full transition-all"
                aria-label="Scroll to gallery"
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
      <section id="details" className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap md:flex-nowrap">
            {/* Main Content */}
            <div className="w-full md:w-3/4 pr-0 md:pr-12">
                <div className="mb-8">
                    <h4 className="tao-fs-highlight font-bold tracking-widest text-primary-red uppercase mb-4 font-agenda">
                        {project.category}
                    </h4>

                    <div className="flex justify-between items-start">
                        <h1 className="tao-fs-proj-main font-bold uppercase mb-4 font-agenda leading-tight">
                            {project.title}
                        </h1>

                        {/* Social Share - Mobile/Tablet only, or sticky desktop */}
                        <div className="hidden md:flex gap-2">
                            {/* Share icons */}
                        </div>
                    </div>

                    {project.subtitle && project.subtitle.trim().toLowerCase() !== (project.description?.[0] || '').trim().toLowerCase() && (
                        <h2 className="tao-fs-big-sub inline-block border-y border-primary-gold py-2 mb-8 font-agenda font-bold text-neutral-dark-grey">
                            {project.subtitle}
                        </h2>
                    )}

                    {project.details && (
                        <div className="bg-neutral-bg p-6 mb-8 border-l-[3px] border-primary-gold font-agenda tao-fs-details font-bold">
                            {project.details.location && <p className="mb-1"><span className="font-bold">Location :</span> {project.details.location}</p>}
                            {project.details.status && <p className="mb-1"><span className="font-bold">Status :</span> {project.details.status}</p>}
                            {project.details.plotArea && <p className="mb-1"><span className="font-bold">Plot Area :</span> {project.details.plotArea}</p>}
                            {project.details.builtUpArea && <p className="mb-1"><span className="font-bold">Built Up Area :</span> {project.details.builtUpArea}</p>}
                        </div>
                    )}

                    {project.description && project.description.length > 0 && (
                        <div className="prose max-w-none font-agenda tao-fs-desc font-normal text-neutral-dark-grey leading-relaxed">
                            {project.description.slice(0, showFullText ? undefined : 2).map((paragraph: string, idx: number) => (
                                <p key={idx} className="mb-6">{paragraph}</p>
                            ))}

                            {/* Hidden text for read more */}
                             {showFullText && project.description.slice(2).map((paragraph: string, idx: number) => (
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
                    )}
                </div>
            </div>

            {/* Share Sidebar */}
            <div className="mt-8 w-full md:mt-0 md:w-1/4 md:border-l md:border-neutral-border md:pl-8">
                 <div className="sticky top-32">
                    <h5 className="text-xs uppercase tracking-widest font-bold mb-4">Share</h5>
                    <div className="flex md:flex-col gap-4">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-bg hover:bg-[#3b5998] hover:text-white flex items-center justify-center rounded-full transition-all" aria-label="Share on Facebook">
                            <FaFacebookF />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-bg hover:bg-[#1da1f2] hover:text-white flex items-center justify-center rounded-full transition-all" aria-label="Share on Twitter">
                            <FaTwitter />
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-bg hover:bg-[#0077b5] hover:text-white flex items-center justify-center rounded-full transition-all" aria-label="Share on LinkedIn">
                            <FaLinkedinIn />
                        </a>
                        <a href={`https://pinterest.com/pin/create/button/?url=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-bg hover:bg-[#bd081c] hover:text-white flex items-center justify-center rounded-full transition-all" aria-label="Share on Pinterest">
                            <FaPinterestP />
                        </a>
                         <a href={`whatsapp://send?text=${currentUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-bg hover:bg-[#25d366] hover:text-white flex items-center justify-center rounded-full transition-all" aria-label="Share on WhatsApp">
                            <FaWhatsapp />
                        </a>
                    </div>
                 </div>
            </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-neutral-bg py-14">
         <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 mb-12">
                <span className="w-12 h-px bg-neutral-border"></span>
                <h3 className="text-center text-[13px] font-light uppercase tracking-[0.22em]">Image Gallery</h3>
                <span className="w-12 h-px bg-neutral-border"></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="group relative cursor-pointer"
                      onClick={() => openLightbox(idx)}
                    >
                        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
                            <Image
                                src={getImageUrl(item.url || item.src)}
                                alt={item.caption || item.title || `Gallery Image ${idx + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                quality={85}
                            />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center">
                                {item.caption && <h4 className="text-xl font-bold uppercase mb-2">{item.caption}</h4>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View More / View Less for gallery could go here if we had lots of images */}
         </div>
      </section>

      {/* Navigation & Related */}
      <section className="border-t border-neutral-border py-14">
         <div className="container mx-auto px-4">
             {/* Navigation */}
             <div className="flex justify-between items-center mb-12">
                {prevProject ? (
                    <Link href={`/projects/${prevProject.slug || prevProject.id}`} className="flex items-center gap-4 group" aria-label={`Previous project: ${prevProject.title}`}>
                        <div className="w-10 h-10 border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                            <FaChevronLeft size={12} />
                        </div>
                        <span className="uppercase font-bold text-sm tracking-wider hidden md:block">{prevProject.title}</span>
                    </Link>
                ) : <div></div>}

                <Link href="/work" className="uppercase font-bold text-sm tracking-wider border-b-2 border-black pb-1 hover:text-primary-red hover:border-primary-red transition-all">
                    All Projects
                </Link>

                {nextProject ? (
                    <Link href={`/projects/${nextProject.slug || nextProject.id}`} className="flex items-center gap-4 group" aria-label={`Next project: ${nextProject.title}`}>
                        <span className="uppercase font-bold text-sm tracking-wider hidden md:block">{nextProject.title}</span>
                        <div className="w-10 h-10 border border-black flex items-center justify-center group-hover:bg-primary-red group-hover:border-primary-red group-hover:text-white transition-all">
                            <FaChevronRight size={12} />
                        </div>
                    </Link>
                ) : <div></div>}
             </div>

             {/* Related Projects */}
             {project.relatedProjects && project.relatedProjects.length > 0 && (
                 <div>
                     <h3 className="text-center text-2xl font-light uppercase tracking-widest mb-12">Related Projects</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {project.relatedProjects.map((relatedId: string) => {
                             const related = allProjects.find(p => p.id === relatedId || p.slug === relatedId);
                             if (!related) return null;
                             return (
                                 <div key={related.id} className="group text-center">
                                     <Link href={`/projects/${related.slug || related.id}`} className="block">
                                         <div className="relative h-[250px] w-full mb-4 overflow-hidden border-t-[3px] border-primary-gold">
                                            <Image
                                                src={related.coverImage ? getImageUrl(related.coverImage) : '/img/placeholder.jpg'}
                                                alt={related.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                quality={85}
                                            />
                                         </div>
                                     </Link>
                                     <h5 className="text-sm font-bold uppercase mb-1 hover:text-primary-red transition-colors">
                                         <Link href={`/projects/${related.slug || related.id}`}>{related.title}</Link>
                                     </h5>
                                     <p className="text-xs text-neutral-dark-grey uppercase tracking-wider line-clamp-3 mt-2">
                                        {related.subtitle || related.location || (() => {
                                            if (!related.description) return null;
                                            try {
                                                const desc = typeof related.description === 'string' && related.description.startsWith('[') ? JSON.parse(related.description) : related.description;
                                                return Array.isArray(desc) ? desc[0] : desc;
                                            } catch (e) {
                                                return related.description;
                                            }
                                        })()}
                                     </p>
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
            className="absolute top-6 right-6 z-[101] text-white transition-colors hover:text-primary-red"
          >
            <FaTimes size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 z-[101] text-white transition-colors hover:text-primary-red md:left-8"
          >
            <FaChevronLeft size={32} />
          </button>

          <div className="relative w-full max-w-6xl h-[90vh] flex flex-col items-center justify-center pt-8">
            <div className="relative w-full flex-1 min-h-0 mb-6">
              {project.gallery && project.gallery[lightboxIndex] && (
                <Image
                  src={getImageUrl(project.gallery[lightboxIndex].url || project.gallery[lightboxIndex].src)}
                  alt={project.gallery[lightboxIndex].caption || project.gallery[lightboxIndex].title || ''}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  quality={85}
                />
              )}
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 z-[101] text-white transition-colors hover:text-primary-red md:right-8"
          >
            <FaChevronRight size={32} />
          </button>
        </div>
      )}

    </main>
  );
}
