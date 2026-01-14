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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto pb-10">
      
      {/* Section 1: Essentials */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2 dark:text-white">Essentials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input {...register('title', { required: true })} className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white" />
            {errors.title && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
            <input {...register('slug', { required: true })} className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-600 dark:text-gray-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select {...register('category')} className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white">
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select {...register('status')} className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white">
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Details */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2 dark:text-white">Project Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
            <input {...register('location')} className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plot Area</label>
            <input {...register('plotArea')} className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Built-up Area</label>
            <input {...register('builtUpArea')} className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
      </div>

      {/* Section 3: Content Builder */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-lg font-semibold dark:text-white">Content Builder</h3>
            <button type="button" onClick={() => appendDesc({ value: '' })} className="text-sm text-primary-red hover:text-red-700 flex items-center">
                <FiPlus className="mr-1" /> Add Paragraph
            </button>
        </div>
        <div className="space-y-4">
            {descFields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                    <textarea 
                        {...register(`description.${index}.value` as const)} 
                        rows={3}
                        className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter paragraph text..."
                    />
                    <button type="button" onClick={() => removeDesc(index)} className="text-red-500 mt-2 hover:text-red-700">
                        <FiTrash />
                    </button>
                </div>
            ))}
            {descFields.length === 0 && <p className="text-gray-400 italic text-sm">No content added yet.</p>}
        </div>
      </div>

      {/* Section 4: Media */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2 dark:text-white">Media Manager</h3>
        
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image</label>
            <div className="flex items-center space-x-4">
                <div className="relative w-32 h-20 bg-gray-100 rounded overflow-hidden border">
                    {coverPreview ? (
                        <Image src={coverPreview} alt="Cover" fill className="object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
                    )}
                </div>
                <input type="file" id="coverImage" accept="image/*" onChange={handleCoverChange} className="text-sm" />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gallery Images</label>
            <input type="file" id="gallery" accept="image/*" multiple className="mb-4 text-sm" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {galleryPreviews.map((img, idx) => (
                    <div key={idx} className="relative group aspect-square bg-gray-100 rounded overflow-hidden">
                        <Image src={getImageUrl(img.url)} alt="" fill className="object-cover" />
                        <button 
                            type="button" 
                            onClick={() => {
                                const newGallery = [...galleryPreviews];
                                newGallery.splice(idx, 1);
                                setGalleryPreviews(newGallery);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <FiX size={12} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button 
            type="button" 
            onClick={() => router.back()}
            className="px-6 py-2 border rounded text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
        >
            Cancel
        </button>
        <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2 bg-primary-red text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
            {isSubmitting ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}
