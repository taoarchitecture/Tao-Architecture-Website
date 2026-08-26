'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { HomeConfig } from '@/types';
import Image from 'next/image';
import { getImageUrl, getImageDimensions, checkAspectRatioMismatch } from '@/utils/image';
import { uploadToCloudinary } from '@/utils/cloudinary';
import { FiTrash, FiPlus, FiUploadCloud, FiAlertTriangle } from 'react-icons/fi';

// Full-bleed hero background — see the `h-screen` slide in src/app/page.tsx.
const SLIDE_TARGET_RATIO = 1920 / 1080;
const SLIDE_TARGET_LABEL = '16:9';

interface SlideDraft {
  image: string; // existing Cloudinary URL, '' if none yet
  title: string;
  subtitle: string;
  file?: File; // a newly-chosen file pending upload, if any
  previewUrl?: string; // local blob preview for a pending file
  aspectWarning?: string | null;
}

type BannerFields = Pick<HomeConfig, 'bannerText' | 'bottomCtaTitle' | 'bottomCtaText' | 'bottomCtaLink'>;

export default function HomeConfigForm() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [slides, setSlides] = useState<SlideDraft[]>([]);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const { register, handleSubmit, reset } = useForm<BannerFields>();

  useEffect(() => {
    fetchConfig();
    // Revoke any local preview URLs on unmount to avoid leaking blob memory.
    return () => {
      slides.forEach((s) => s.previewUrl && URL.revokeObjectURL(s.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchConfig = async () => {
    try {
      // Relative path — goes through this app's own proxy to Express, which
      // is the source of truth for this data in every environment.
      const { data } = await axios.get('/api/home');
      reset({
        bannerText: data?.bannerText || '',
        bottomCtaTitle: data?.bottomCtaTitle || '',
        bottomCtaText: data?.bottomCtaText || '',
        bottomCtaLink: data?.bottomCtaLink || '',
      });
      setSlides(
        (data?.heroSlides || []).map((s: { image?: string; title?: string; subtitle?: string }) => ({
          image: s.image || '',
          title: s.title || '',
          subtitle: s.subtitle || '',
        }))
      );
    } catch (error) {
      console.error('Error fetching home config:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSlide = () => {
    setSlides((prev) => [...prev, { image: '', title: '', subtitle: '' }]);
  };

  const removeSlide = (idx: number) => {
    setSlides((prev) => {
      const removed = prev[idx];
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const updateSlideField = (idx: number, field: 'title' | 'subtitle', value: string) => {
    setSlides((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  };

  const handleSlideImageChange = (idx: number, file: File | undefined) => {
    if (!file) return;
    setSlides((prev) =>
      prev.map((s, i) => {
        if (i !== idx) return s;
        if (s.previewUrl) URL.revokeObjectURL(s.previewUrl);
        return { ...s, file, previewUrl: URL.createObjectURL(file), aspectWarning: null };
      })
    );
    getImageDimensions(file)
      .then(({ width, height }) => {
        const warning = checkAspectRatioMismatch(width, height, SLIDE_TARGET_RATIO, SLIDE_TARGET_LABEL);
        setSlides((prev) => prev.map((s, i) => (i === idx && s.file === file ? { ...s, aspectWarning: warning } : s)));
      })
      .catch(() => {});
  };

  const onSubmit = async (data: BannerFields) => {
    setSubmitting(true);
    try {
      // Upload any newly-chosen slide images to Cloudinary first, same
      // pattern as ProjectForm/TeamMemberForm.
      const resolvedSlides = await Promise.all(
        slides.map(async (s) => ({
          image: s.file ? await uploadToCloudinary(s.file, 'home') : s.image,
          title: s.title,
          subtitle: s.subtitle,
        }))
      );

      const token = localStorage.getItem('token');
      await axios.put(
        '/api/home',
        {
          bannerText: data.bannerText || '',
          bottomCtaTitle: data.bottomCtaTitle || '',
          bottomCtaText: data.bottomCtaText || '',
          bottomCtaLink: data.bottomCtaLink || '',
          heroSlides: resolvedSlides,
        },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      alert('Home config saved!');
      fetchConfig();
    } catch (error) {
      console.error(error);
      alert('Error saving');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-xs uppercase tracking-widest text-neutral-medium-grey">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      <div className="border border-neutral-border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-agenda text-lg font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Hero Slides</h3>
        <div className="space-y-4">
          {slides.map((slide, index) => {
            const preview = slide.previewUrl || (slide.image ? getImageUrl(slide.image) : null);
            return (
              <div key={index} className="relative border border-neutral-border p-4">
                <button
                  type="button"
                  onClick={() => removeSlide(index)}
                  className="absolute right-2 top-2 text-neutral-medium-grey transition-colors hover:text-primary-red"
                  title="Remove slide"
                >
                  <FiTrash />
                </button>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-shrink-0">
                    <div
                      className="relative h-24 w-40 cursor-pointer overflow-hidden border-2 border-dashed border-neutral-border bg-neutral-bg transition-colors hover:border-primary-red group"
                      onClick={() => fileInputRefs.current[index]?.click()}
                    >
                      {preview ? (
                        <>
                          <Image src={preview} alt={`Slide ${index + 1}`} fill sizes="200px" className="object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <FiUploadCloud className="text-white" size={20} />
                          </div>
                        </>
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center text-neutral-medium-grey">
                          <FiUploadCloud size={20} />
                          <span className="mt-1 text-center text-[10px] uppercase tracking-wider">Click to upload</span>
                        </div>
                      )}
                      <input
                        ref={(el) => {
                          fileInputRefs.current[index] = el;
                        }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSlideImageChange(index, e.target.files?.[0])}
                        className="hidden"
                      />
                    </div>
                    <p className="mt-1 w-40 text-[11px] leading-snug text-neutral-medium-grey">
                      Recommended: 1920 × 1080px, landscape. Full-bleed background — auto-compressed to ≤1920px / 2MB. JPG or WebP.
                    </p>
                    {slide.aspectWarning && (
                      <p className="mt-1 flex w-40 items-start gap-1 text-[11px] leading-snug text-amber-600">
                        <FiAlertTriangle className="mt-0.5 flex-shrink-0" size={11} />
                        <span>{slide.aspectWarning}</span>
                      </p>
                    )}
                  </div>
                  <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-neutral-medium-grey">Title</label>
                      <input
                        value={slide.title}
                        onChange={(e) => updateSlideField(index, 'title', e.target.value)}
                        className="w-full border border-neutral-border p-2 text-sm font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-neutral-medium-grey">Subtitle</label>
                      <input
                        value={slide.subtitle}
                        onChange={(e) => updateSlideField(index, 'subtitle', e.target.value)}
                        className="w-full border border-neutral-border p-2 text-sm font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            type="button"
            onClick={addSlide}
            className="flex items-center text-xs font-bold uppercase tracking-wider text-primary-red"
          >
            <FiPlus className="mr-1" /> Add Slide
          </button>
        </div>
      </div>

      <div className="border border-neutral-border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-agenda text-lg font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Banner Section</h3>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-neutral-medium-grey">Banner Text</label>
          <textarea {...register('bannerText')} className="w-full border border-neutral-border p-2 text-sm font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none" rows={3} />
        </div>
      </div>

      <div className="border border-neutral-border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-agenda text-lg font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Bottom CTA</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-neutral-medium-grey">Title</label>
            <input {...register('bottomCtaTitle')} className="w-full border border-neutral-border p-2 text-sm font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-neutral-medium-grey">Link</label>
            <input {...register('bottomCtaLink')} className="w-full border border-neutral-border p-2 text-sm font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none" />
          </div>
          <div className="col-span-2">
            <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-neutral-medium-grey">Text</label>
            <textarea {...register('bottomCtaText')} className="w-full border border-neutral-border p-2 text-sm font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none" rows={2} />
          </div>
        </div>
      </div>

      <button disabled={submitting} className="bg-primary-red px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-neutral-dark-grey disabled:opacity-70">
        {submitting ? 'Saving...' : 'Save Configuration'}
      </button>
    </form>
  );
}
