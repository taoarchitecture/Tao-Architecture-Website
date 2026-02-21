import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { FiUpload, FiX, FiPlus, FiTrash } from 'react-icons/fi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getImageUrl } from '@/utils/image';
import { Project } from '@/types';

interface ProjectFormValues extends Omit<Project, 'description' | 'gallery'> {
  description: { value: string }[];
  gallery: GalleryItemForm[];
  // For file inputs which are not part of Project data directly
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

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialData?.coverImage ? getImageUrl(initialData.coverImage) : null
  );
  const [galleryPreviews, setGalleryPreviews] = useState<any[]>(
    initialData?.gallery || []
  );

  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectFormValues>({
    defaultValues: {
      title: initialData?.title || '',
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

  // Dynamic Description Paragraphs
  const { fields: descFields, append: appendDesc, remove: removeDesc } = useFieldArray({
    control,
    name: "description"
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();
    
    // Basic fields
    const descriptionArray = data.description.map(d => d.value);
    formData.append('description', JSON.stringify(descriptionArray));

    (Object.keys(data) as Array<keyof ProjectFormValues>).forEach(key => {
      if (key === 'description' || key === 'coverImageFile' || key === 'galleryFiles' || key === 'gallery') {
        return;
      }
      const value = data[key];
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // File fields
    const coverFile = (document.getElementById('coverImage') as HTMLInputElement)?.files?.[0];
    if (coverFile) {
      formData.append('coverImage', coverFile);
    }

    const galleryFiles = (document.getElementById('gallery') as HTMLInputElement)?.files;
    if (galleryFiles) {
      for (let i = 0; i < galleryFiles.length; i++) {
        formData.append('gallery', galleryFiles[i]);
      }
    }

    // Existing gallery for updates
    if (isEditing) {
      formData.append('existingGallery', JSON.stringify(galleryPreviews.filter(p => !p.file)));
    }

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
      
      if (isEditing && initialData?.id) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/projects/${initialData.id}`, formData, config);
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/projects`, formData, config);
      }
      
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // Auto-generate slug from title
  const title = watch('title');
  useEffect(() => {
    if (!isEditing && title) {
      setValue('slug', title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title, isEditing, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 max-w-5xl pb-20">
      
      {/* Section 1: Essentials */}
      <div className="bg-white p-8 shadow-sm border border-neutral-border">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-8 border-b border-neutral-border pb-4 text-neutral-dark-grey">Essentials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-bold text-neutral-light-grey uppercase tracking-wider mb-2">Title</label>
            <input {...register('title', { required: true })} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors" />
            {errors.title && <span className="text-primary-red text-xs mt-1 block">Required</span>}
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-light-grey uppercase tracking-wider mb-2">Slug</label>
            <input {...register('slug', { required: true })} className="w-full border border-neutral-border p-3 bg-neutral-bg text-neutral-medium-grey focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-light-grey uppercase tracking-wider mb-2">Category</label>
            <select {...register('category')} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors appearance-none bg-white">
              <option value="luxuryvillas">Luxury Villas</option>
              <option value="corporate">Corporate</option>
              <option value="cozyhomes">Cozy Homes</option>
              <option value="apartments">Apartments</option>
              <option value="commercial">Commercial</option>
              <option value="institutional">Institutional</option>
              <option value="hospitality">Hospitality</option>
              <option value="products">Products</option>
              <option value="installations">Installations</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-light-grey uppercase tracking-wider mb-2">Status</label>
            <select {...register('status')} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors appearance-none bg-white">
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
             <label className="block text-xs font-bold text-neutral-light-grey uppercase tracking-wider mb-2">Order</label>
             <input type="number" {...register('order')} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors" />
          </div>
          <div className="flex items-center mt-8">
             <input type="checkbox" {...register('isFeatured')} id="isFeatured" className="w-5 h-5 text-primary-red border-neutral-border focus:ring-primary-red rounded-none" />
             <label htmlFor="isFeatured" className="ml-3 text-xs font-bold text-neutral-dark-grey uppercase tracking-wider cursor-pointer select-none">Feature on Home Page</label>
          </div>
        </div>
      </div>

      {/* Section 2: Details */}
      <div className="bg-white p-8 shadow-sm border border-neutral-border">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-8 border-b border-neutral-border pb-4 text-neutral-dark-grey">Project Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className="block text-xs font-bold text-neutral-light-grey uppercase tracking-wider mb-2">Location</label>
            <input {...register('location')} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-light-grey uppercase tracking-wider mb-2">Plot Area</label>
            <input {...register('plotArea')} className="w-full border border-neutral-border p-3 text-neutral-dark-grey focus:border-primary-red focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-light-grey uppercase tracking-wider mb-2">Built-up Area</label>
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
                    <button type="button" onClick={() => removeDesc(index)} className="absolute top-2 right-2 text-neutral-light-grey hover:text-primary-red transition-colors p-2">
                        <FiTrash size={14} />
                    </button>
                </div>
            ))}
            {descFields.length === 0 && <p className="text-neutral-light-grey italic text-sm border border-dashed border-neutral-border p-8 text-center">No content added yet. Click "Add Paragraph" to start.</p>}
        </div>
      </div>

      {/* Section 4: Media */}
      <div className="bg-white p-8 shadow-sm border border-neutral-border">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-8 border-b border-neutral-border pb-4 text-neutral-dark-grey">Media Manager</h3>
        
        <div className="mb-10">
            <label className="block text-xs font-bold text-neutral-light-grey uppercase tracking-wider mb-4">Cover Image</label>
            <div className="flex items-start space-x-6">
                <div className="relative w-48 h-32 bg-neutral-bg border border-neutral-border overflow-hidden">
                    {coverPreview ? (
                        <Image src={coverPreview} alt="Cover" fill className="object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-neutral-light-grey text-xs uppercase tracking-wider">No Image</div>
                    )}
                </div>
                <div>
                  <input type="file" id="coverImage" accept="image/*" onChange={handleCoverChange} className="hidden" />
                  <label htmlFor="coverImage" className="cursor-pointer inline-flex items-center px-6 py-3 border border-neutral-black text-neutral-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-black hover:text-white transition-all duration-300">
                    <FiUpload className="mr-2" /> Upload Cover
                  </label>
                  <p className="text-xs text-neutral-light-grey mt-2">Recommended size: 1920x1080px</p>
                </div>
            </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-xs font-bold text-neutral-light-grey uppercase tracking-wider">Gallery Images</label>
              <div>
                <input type="file" id="gallery" accept="image/*" multiple className="hidden" />
                <label htmlFor="gallery" className="cursor-pointer inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-red hover:text-neutral-black transition-colors">
                  <FiPlus className="mr-1" /> Add Images
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {galleryPreviews.map((img, idx) => (
                    <div key={idx} className="relative group aspect-square bg-neutral-bg border border-neutral-border overflow-hidden">
                        <Image src={getImageUrl(img.url)} alt="" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                              type="button" 
                              onClick={() => {
                                  const newGallery = [...galleryPreviews];
                                  newGallery.splice(idx, 1);
                                  setGalleryPreviews(newGallery);
                              }}
                              className="text-white hover:text-primary-red transition-colors"
                          >
                              <FiX size={24} />
                          </button>
                        </div>
                    </div>
                ))}
                {galleryPreviews.length === 0 && (
                  <div className="col-span-full border border-dashed border-neutral-border p-12 text-center text-neutral-light-grey text-sm italic">
                    No gallery images added.
                  </div>
                )}
            </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-neutral-border">
        <button 
            type="button" 
            onClick={() => router.back()}
            className="px-8 py-4 border border-transparent text-neutral-light-grey text-xs font-bold uppercase tracking-widest hover:text-neutral-black transition-colors"
        >
            Cancel
        </button>
        <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-10 py-4 bg-neutral-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary-red transition-all duration-300 disabled:opacity-50"
        >
            {isSubmitting ? 'SAVING...' : 'SAVE PROJECT'}
        </button>
      </div>
    </form>
  );
}
