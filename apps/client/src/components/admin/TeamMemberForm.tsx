'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TeamMember } from '@/types';
import Image from 'next/image';
import { getImageUrl } from '@/utils/image';
import { uploadToCloudinary } from '@/utils/cloudinary';
import { FiPlus, FiTrash2, FiUploadCloud, FiX } from 'react-icons/fi';

interface Props {
  initialData?: TeamMember;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TeamMemberForm({ initialData, onSuccess, onCancel }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image ? getImageUrl(initialData.image) : null
  );
  const [bioParagraphs, setBioParagraphs] = useState<string[]>(
    initialData?.bio && initialData.bio.length > 0 ? initialData.bio : ['']
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<Omit<TeamMember, 'bio'>>({
    defaultValues: initialData
      ? { ...initialData }
      : { active: true, order: 0 },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addParagraph = () => {
    setBioParagraphs(prev => [...prev, '']);
  };

  const removeParagraph = (idx: number) => {
    setBioParagraphs(prev => prev.filter((_, i) => i !== idx));
  };

  const updateParagraph = (idx: number, value: string) => {
    setBioParagraphs(prev => prev.map((p, i) => (i === idx ? value : p)));
  };

  const onSubmit = async (data: Omit<TeamMember, 'bio'>) => {
    setSubmitting(true);
    try {
      let imageUrl = initialData?.image || '';
      const file = fileInputRef.current?.files?.[0];
      
      if (file) {
        imageUrl = await uploadToCloudinary(file, 'studio');
      }

      const cleanBio = bioParagraphs.filter(p => p.trim() !== '');

      const payload = {
        name: data.name,
        role: data.role,
        order: Number(data.order || 0),
        active: data.active,
        bio: cleanBio,
        image: imageUrl,
      };

      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      if (initialData?.id) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/studio/${initialData.id}`,
          payload,
          { headers }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/studio`,
          payload,
          { headers }
        );
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Error saving team member. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border border-neutral-border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-agenda text-lg font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">
          {initialData ? 'Edit Team Member' : 'Add New Team Member'}
        </h2>
        <button type="button" onClick={onCancel} className="text-neutral-medium-grey transition-colors hover:text-neutral-dark-grey">
          <FiX size={20} />
        </button>
      </div>

      {/* Top row: Name / Role / Order */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-medium-grey">Name *</label>
          <input
            {...register('name', { required: 'Name is required' })}
            placeholder="e.g. Ar. Manish Banker"
            className="w-full border border-neutral-border px-3 py-2 text-sm text-neutral-dark-grey transition focus:border-primary-red focus:outline-none focus:ring-2 focus:ring-primary-red/20"
          />
          {errors.name && <p className="mt-1 text-xs text-primary-red">{errors.name.message}</p>}
        </div>

        <div className="md:col-span-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-medium-grey">Role / Designation *</label>
          <input
            {...register('role', { required: 'Role is required' })}
            placeholder="e.g. Principal Architect"
            className="w-full border border-neutral-border px-3 py-2 text-sm text-neutral-dark-grey transition focus:border-primary-red focus:outline-none focus:ring-2 focus:ring-primary-red/20"
          />
          {errors.role && <p className="mt-1 text-xs text-primary-red">{errors.role.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-medium-grey">Display Order</label>
          <input
            type="number"
            {...register('order')}
            className="w-full border border-neutral-border px-3 py-2 text-sm text-neutral-dark-grey transition focus:border-primary-red focus:outline-none focus:ring-2 focus:ring-primary-red/20"
          />
        </div>
      </div>

      {/* Image Upload with Preview */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-medium-grey">Photo</label>
        <div className="flex items-start gap-4">
          {/* Preview Box */}
          <div
            className="relative flex h-36 w-28 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden border-2 border-dashed border-neutral-border bg-neutral-bg transition-colors hover:border-primary-red group"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <>
                <Image src={imagePreview} alt="Preview" fill sizes="200px" className="object-cover object-top" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FiUploadCloud className="text-white" size={22} />
                </div>
              </>
            ) : (
              <div className="text-center p-2">
                <FiUploadCloud className="mx-auto mb-1 text-neutral-medium-grey" size={24} />
                <span className="text-xs text-neutral-medium-grey">Click to upload</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 border border-neutral-border px-4 py-2 text-sm text-neutral-medium-grey transition hover:bg-neutral-bg"
            >
              <FiUploadCloud size={14} />
              {imagePreview ? 'Change Photo' : 'Upload Photo'}
            </button>
            <p className="text-xs text-neutral-medium-grey">Recommended: portrait ratio (3:4), min 400x500px. JPG or PNG.</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Bio / Description Paragraphs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-medium-grey">
            Biography / Description
          </label>
          <span className="text-xs italic text-neutral-medium-grey">Each block = one paragraph on the Studio page</span>
        </div>

        <div className="space-y-3">
          {bioParagraphs.map((para, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="mt-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-bg text-xs font-semibold text-neutral-medium-grey">
                {idx + 1}
              </div>
              <textarea
                rows={3}
                value={para}
                onChange={(e) => updateParagraph(idx, e.target.value)}
                placeholder={`Paragraph ${idx + 1}…`}
                className="flex-1 resize-y border border-neutral-border px-3 py-2 text-sm text-neutral-dark-grey transition focus:border-primary-red focus:outline-none focus:ring-2 focus:ring-primary-red/20"
              />
              {bioParagraphs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeParagraph(idx)}
                  className="mt-2 text-neutral-medium-grey transition hover:text-primary-red"
                  title="Remove paragraph"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addParagraph}
          className="mt-3 flex items-center gap-2 text-sm text-primary-red hover:text-primary-red/80 font-medium transition"
        >
          <FiPlus size={16} />
          Add Paragraph
        </button>
      </div>

      {/* Active Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="activeToggle"
          {...register('active')}
          className="w-4 h-4 accent-primary-red rounded cursor-pointer"
        />
        <label htmlFor="activeToggle" className="cursor-pointer text-sm text-neutral-medium-grey">
          Show this member on the Studio page
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-neutral-border pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="border border-neutral-border px-5 py-2 text-sm text-neutral-medium-grey transition hover:bg-neutral-bg"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary-red px-6 py-2 text-sm font-semibold text-white transition hover:bg-neutral-dark-grey disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving…' : initialData ? 'Save Changes' : 'Create Member'}
        </button>
      </div>
    </form>
  );
}
