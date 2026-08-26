'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { FiUpload, FiX, FiPlus, FiTrash, FiImage, FiCloud, FiCheck } from 'react-icons/fi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getImageUrl } from '@/utils/image';
import { uploadToCloudinary } from '@/utils/cloudinary';
import { Project } from '@/types';

interface ProjectFormValues extends Omit<Project, 'description' | 'gallery'> {
  description: { value: string }[];
  gallery: GalleryItemForm[];
  coverImageFile?: FileList;
  galleryFiles?: FileList;
}

interface GalleryItemForm {
  id?: number;
  url?: string;
  file?: File;
}

interface ProjectFormProps {
  initialData?: Partial<Project>;
  isEditing?: boolean;
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialData?.coverImage ? getImageUrl(initialData.coverImage) : null
  );
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<any[]>(
    initialData?.gallery || []
  );
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const coverDropRef = useRef<HTMLDivElement>(null);
  const galleryDropRef = useRef<HTMLDivElement>(null);

  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectFormValues>({
    defaultValues: {
      title: initialData?.title || '',
      subtitle: initialData?.subtitle || '',
      slug: initialData?.slug || '',
      category: initialData?.category || 'luxuryvillas',
      status: initialData?.status || 'Ongoing',
      location: initialData?.location || '',
      plotArea: initialData?.plotArea || '',
      builtUpArea: initialData?.builtUpArea || '',
      description: initialData?.description?.map(d => ({ value: d })) || [],
      seoTitle: initialData?.seoTitle || '',
      seoDesc: initialData?.seoDesc || '',
      isPublished: initialData?.isPublished ?? true,
    }
  });

  const { fields: descFields, append: appendDesc, remove: removeDesc } = useFieldArray({
    control,
    name: "description"
  });

  // Auto-generate slug from title
  const title = watch('title');
  useEffect(() => {
    if (!isEditing && title) {
      setValue('slug', title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title, isEditing, setValue]);

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingCover(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingGallery(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    addGalleryFiles(files);
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addGalleryFiles(files);
  };

  const addGalleryFiles = (files: File[]) => {
    const newPreviews = files.map(f => ({ url: URL.createObjectURL(f), isNew: true }));
    setGalleryPreviews(prev => [...prev, ...newPreviews]);
    setNewGalleryFiles(prev => [...prev, ...files]);
  };

  const removeGalleryItem = (idx: number) => {
    const updated = [...galleryPreviews];
    const removed = updated.splice(idx, 1)[0];
    setGalleryPreviews(updated);
    if (removed.isNew) {
      // Find the corresponding new file and remove it
      const newIdx = galleryPreviews.slice(0, idx).filter(p => p.isNew).length;
      setNewGalleryFiles(prev => prev.filter((_, i) => i !== newIdx));
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    setUploadStatus('uploading');

    try {
      // 1. Upload Cover Image to Cloudinary directly if changed
      let coverImageUrl = isEditing && initialData?.coverImage ? initialData.coverImage : undefined;
      if (coverFile) {
        coverImageUrl = await uploadToCloudinary(coverFile, 'projects');
      }

      // 2. Upload new Gallery Images to Cloudinary
      const uploadedGalleryUrls = await Promise.all(
        newGalleryFiles.map(file => uploadToCloudinary(file, 'projects'))
      );

      // 3. Construct JSON Payload
      const existingGalleryItems = isEditing ? galleryPreviews.filter(p => !p.isNew).map(p => ({ url: p.url || p.src, caption: p.caption || p.title || '', order: 0 })) : [];
      const newGalleryItems = uploadedGalleryUrls.map((url, i) => ({ url, caption: '', order: existingGalleryItems.length + i }));
      
      const payload = {
        title: data.title,
        subtitle: data.subtitle,
        slug: data.slug,
        category: data.category,
        status: data.status,
        location: data.location,
        plotArea: data.plotArea,
        builtUpArea: data.builtUpArea,
        description: JSON.stringify(data.description.map(d => d.value)),
        seoTitle: data.seoTitle,
        seoDesc: data.seoDesc,
        isPublished: data.isPublished,
        isFeatured: data.isFeatured,
        order: Number(data.order || 0),
        coverImage: coverImageUrl,
        gallery: JSON.stringify([...existingGalleryItems, ...newGalleryItems]),
      };

      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } };

      if (isEditing && initialData?.id) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/projects/${initialData.id}`, payload, config);
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projects`, payload, config);
      }

      setUploadStatus('success');
      setTimeout(() => router.push('/admin/projects'), 800);
    } catch (error) {
      console.error('Error saving project:', error);
      setUploadStatus('error');

      let message = 'Failed to save project. Please try again.';
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data;
        const fieldErrors = data.details?.fieldErrors as Record<string, string[]> | undefined;
        if (fieldErrors) {
          const lines = Object.entries(fieldErrors)
            .filter(([, msgs]) => msgs && msgs.length > 0)
            .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`);
          if (lines.length > 0) {
            message = `Validation failed:\n${lines.join('\n')}`;
          }
        } else if (data.message) {
          message = data.message;
        }
      }
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 max-w-5xl pb-20">

      {/* Section 1: Essentials */}
      <div className="bg-white p-8 shadow-sm border border-neutral-border">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-8 border-b border-neutral-border pb-4 text-neutral-dark-grey">Essentials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-bold text-neutral-medium-grey uppercase tracking-wider mb-2">Title</label>
            <input {...register('title', { required: true })} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors" />
            {errors.title && <span className="text-primary-red text-xs mt-1 block">Required</span>}
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-medium-grey uppercase tracking-wider mb-2">Slug</label>
            <input {...register('slug', { required: true })} className="w-full border border-neutral-border p-3 bg-neutral-bg text-neutral-medium-grey focus:outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-neutral-medium-grey uppercase tracking-wider mb-2">Subtitle / Tagline</label>
            <input
              {...register('subtitle')}
              placeholder="e.g. Seamlessly blending tradition and modernity"
              className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors"
            />
            <p className="mt-1 text-xs text-neutral-medium-grey">Short line shown under the title on the project page and work listing. Optional.</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-medium-grey uppercase tracking-wider mb-2">Category</label>
            <select {...register('category')} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors appearance-none bg-white">
              <option value="luxuryvillas">Luxury Villas</option>
              <option value="hospitality">Hospitality</option>
              <option value="corporate">Corporate</option>
              <option value="cozyhomes">Cozy Homes</option>
              <option value="apartments">Luxury Apartments</option>
              <option value="commercial">Commercial</option>
              <option value="housing">Housing</option>
              <option value="institutional">Institutional</option>
              <option value="products">Products</option>
              <option value="installations">Installations</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-medium-grey uppercase tracking-wider mb-2">Status</label>
            <select {...register('status')} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors appearance-none bg-white">
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-medium-grey uppercase tracking-wider mb-2">Order</label>
            <input type="number" {...register('order')} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors" />
          </div>
          <div className="flex items-center mt-8">
            <input type="checkbox" {...register('isFeatured')} id="isFeatured" className="w-5 h-5 text-primary-red border-neutral-border focus:ring-primary-red rounded-none" />
            <label htmlFor="isFeatured" className="ml-3 text-xs font-bold text-neutral-dark-grey uppercase tracking-wider cursor-pointer select-none">Feature on Home Page</label>
          </div>
          <div className="flex items-center mt-8">
            <input type="checkbox" {...register('isPublished')} id="isPublished" className="w-5 h-5 text-primary-red border-neutral-border focus:ring-primary-red rounded-none" />
            <label htmlFor="isPublished" className="ml-3 text-xs font-bold text-neutral-dark-grey uppercase tracking-wider cursor-pointer select-none">Published (visible on the public site)</label>
          </div>
        </div>
      </div>

      {/* Section 2: Details */}
      <div className="bg-white p-8 shadow-sm border border-neutral-border">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-8 border-b border-neutral-border pb-4 text-neutral-dark-grey">Project Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className="block text-xs font-bold text-neutral-medium-grey uppercase tracking-wider mb-2">Location</label>
            <input {...register('location')} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-medium-grey uppercase tracking-wider mb-2">Plot Area</label>
            <input {...register('plotArea')} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-medium-grey uppercase tracking-wider mb-2">Built-up Area</label>
            <input {...register('builtUpArea')} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors" />
          </div>
        </div>
      </div>

      {/* Section 3: Content Builder */}
      <div className="bg-white p-8 shadow-sm border border-neutral-border">
        <div className="flex justify-between items-center mb-8 border-b border-neutral-border pb-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-dark-grey">Content Builder</h3>
          <button type="button" onClick={() => appendDesc({ value: '' })} className="text-xs font-bold uppercase tracking-widest text-primary-red hover:text-neutral-black transition-colors flex items-center">
            <FiPlus className="mr-1" /> Add Paragraph
          </button>
        </div>
        <div className="space-y-6">
          {descFields.map((field, index) => (
            <div key={field.id} className="relative">
              <textarea
                {...register(`description.${index}.value` as const)}
                rows={4}
                className="w-full border border-neutral-border p-4 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors resize-y"
                placeholder="Enter paragraph text..."
              />
              <button type="button" onClick={() => removeDesc(index)} className="absolute top-2 right-2 text-neutral-medium-grey hover:text-primary-red transition-colors p-2">
                <FiTrash size={14} />
              </button>
            </div>
          ))}
          {descFields.length === 0 && <p className="text-neutral-medium-grey italic text-sm border border-dashed border-neutral-border p-8 text-center">No content added yet. Click "Add Paragraph" to start.</p>}
        </div>
      </div>

      {/* Section 4: Media Manager with Cloudinary */}
      <div className="bg-white p-8 shadow-sm border border-neutral-border">
        <div className="flex justify-between items-center mb-8 border-b border-neutral-border pb-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-dark-grey">Media Manager</h3>
          <div className="flex items-center gap-2 text-xs text-primary-red font-bold uppercase tracking-wider">
            <FiCloud size={14} />
            <span>Cloudinary CDN</span>
          </div>
        </div>

        {/* Cover Image Drop Zone */}
        <div className="mb-10">
          <label className="block text-xs font-bold text-neutral-medium-grey uppercase tracking-wider mb-4">Cover Image</label>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Drop zone */}
            <div
              ref={coverDropRef}
              className={`relative flex-shrink-0 w-full max-w-[14rem] sm:max-w-none sm:w-56 h-36 border-2 border-dashed overflow-hidden transition-all duration-200 cursor-pointer ${isDraggingCover ? 'border-primary-red bg-primary-red/5 scale-[1.02]' : coverPreview ? 'border-neutral-border' : 'border-neutral-border hover:border-neutral-black'}`}
              onDragOver={(e) => { e.preventDefault(); setIsDraggingCover(true); }}
              onDragLeave={() => setIsDraggingCover(false)}
              onDrop={handleCoverDrop}
              onClick={() => document.getElementById('coverImage')?.click()}
            >
              {coverPreview ? (
                <>
                  <Image src={coverPreview} alt="Cover" fill sizes="200px" className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Change</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-neutral-medium-grey gap-2">
                  <FiImage size={24} />
                  <span className="text-xs uppercase tracking-wider text-center px-2">{isDraggingCover ? 'Drop it!' : 'Drag & Drop or Click'}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 pt-2 w-full md:w-auto text-center md:text-left">
              <input type="file" id="coverImage" accept="image/*" onChange={handleCoverChange} className="hidden" />
              <label htmlFor="coverImage" className="cursor-pointer inline-flex items-center px-6 py-3 border border-neutral-black text-neutral-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-black hover:text-white transition-all duration-300">
                <FiUpload className="mr-2" /> Upload Cover
              </label>
              <p className="text-xs text-neutral-medium-grey">Drag & drop or click to upload.</p>
              <p className="text-xs text-neutral-medium-grey">
                Recommended: 2560 × 1440px, landscape. Used as both a full-bleed hero and a cropped thumbnail, so no single fixed ratio — auto-compressed to ≤2560px / 2MB. JPG or WebP.
              </p>
              {coverFile && <p className="flex items-center gap-1 text-xs font-bold text-primary-red"><FiCheck size={12}/> {coverFile.name} ready</p>}
            </div>
          </div>
        </div>

        {/* Gallery Drop Zone */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-xs font-bold text-neutral-medium-grey uppercase tracking-wider">
              Gallery ({galleryPreviews.length} image{galleryPreviews.length !== 1 ? 's' : ''})
            </label>
            <div>
              <input type="file" id="gallery" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
              <label htmlFor="gallery" className="cursor-pointer inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-red hover:text-neutral-black transition-colors">
                <FiPlus className="mr-1" /> Add Images
              </label>
            </div>
          </div>
          <p className="mb-4 -mt-2 text-xs text-neutral-medium-grey">
            Recommended: 1600 × 1000px minimum, landscape. Shown in a fixed-height grid (crops to fit) and a full-image lightbox — auto-compressed to ≤2560px / 2MB. JPG or WebP.
          </p>

          {/* Drag & drop zone for gallery */}
          <div
            ref={galleryDropRef}
            className={`border-2 border-dashed p-4 transition-all duration-200 mb-4 ${isDraggingGallery ? 'border-primary-red bg-primary-red/5' : 'border-neutral-border hover:border-neutral-medium-grey/40'}`}
            onDragOver={(e) => { e.preventDefault(); setIsDraggingGallery(true); }}
            onDragLeave={() => setIsDraggingGallery(false)}
            onDrop={handleGalleryDrop}
          >
            {galleryPreviews.length === 0 ? (
              <div className="py-8 text-center text-neutral-medium-grey">
                <FiImage size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm italic">{isDraggingGallery ? 'Drop images here!' : 'Drag & drop multiple images here, or click "Add Images" above.'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {galleryPreviews.map((img, idx) => (
                  <div key={idx} className={`relative group aspect-square overflow-hidden border ${img.isNew ? 'border-primary-red/40' : 'border-neutral-border'}`}>
                    <Image src={getImageUrl(img.url || img.src)} alt="" fill sizes="200px" className="object-cover" />
                    {img.isNew && (
                      <div className="absolute top-1 left-1 bg-primary-red text-white text-[9px] font-bold px-1 py-0.5 uppercase tracking-wider">New</div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeGalleryItem(idx)}
                        className="text-white hover:text-primary-red transition-colors"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 sm:gap-4 sm:space-x-4 pt-4 border-t border-neutral-border">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-4 border border-transparent text-neutral-medium-grey text-xs font-bold uppercase tracking-widest hover:text-neutral-black transition-colors w-full sm:w-auto text-center"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-10 py-4 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 w-full sm:w-auto ${
            uploadStatus === 'success' ? 'bg-emerald-600' :
            uploadStatus === 'error' ? 'bg-primary-red' :
            'bg-neutral-black hover:bg-primary-red'
          }`}
        >
          {uploadStatus === 'uploading' && (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {uploadStatus === 'success' && <FiCheck size={14} />}
          {uploadStatus === 'uploading' ? 'UPLOADING TO CLOUD...' :
           uploadStatus === 'success' ? 'SAVED!' :
           uploadStatus === 'error' ? 'TRY AGAIN' :
           isEditing ? 'UPDATE PROJECT' : 'SAVE PROJECT'}
        </button>
      </div>
    </form>
  );
}
