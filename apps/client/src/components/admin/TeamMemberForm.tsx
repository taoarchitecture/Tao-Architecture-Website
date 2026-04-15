'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TeamMember } from '@/types';
import Image from 'next/image';
import { getImageUrl } from '@/utils/image';
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
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('role', data.role);
    formData.append('order', String(data.order));
    formData.append('active', String(data.active));

    // Serialize bio paragraphs (filter out empty ones)
    const cleanBio = bioParagraphs.filter(p => p.trim() !== '');
    formData.append('bio', JSON.stringify(cleanBio));

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append('image', file);
    }

    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };

      if (initialData?.id) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/studio/team/${initialData.id}`,
          formData,
          { headers }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/studio/team`,
          formData,
          { headers }
        );
      }
      onSuccess();
    } catch (error) {
      alert('Error saving team member. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800">
          {initialData ? 'Edit Team Member' : 'Add New Team Member'}
        </h2>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>

      {/* Top row: Name / Role / Order */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Name *</label>
          <input
            {...register('name', { required: 'Name is required' })}
            placeholder="e.g. Ar. Manish Banker"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-red/30 focus:border-primary-red transition"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Role / Designation *</label>
          <input
            {...register('role', { required: 'Role is required' })}
            placeholder="e.g. Principal Architect"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-red/30 focus:border-primary-red transition"
          />
          {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Display Order</label>
          <input
            type="number"
            {...register('order')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-red/30 focus:border-primary-red transition"
          />
        </div>
      </div>

      {/* Image Upload with Preview */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Photo</label>
        <div className="flex items-start gap-4">
          {/* Preview Box */}
          <div
            className="relative w-28 h-36 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-primary-red transition-colors group flex-shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <>
                <Image src={imagePreview} alt="Preview" fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FiUploadCloud className="text-white" size={22} />
                </div>
              </>
            ) : (
              <div className="text-center p-2">
                <FiUploadCloud className="mx-auto text-gray-400 mb-1" size={24} />
                <span className="text-xs text-gray-400">Click to upload</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              <FiUploadCloud size={14} />
              {imagePreview ? 'Change Photo' : 'Upload Photo'}
            </button>
            <p className="text-xs text-gray-400">Recommended: portrait ratio (3:4), min 400×500px. JPG or PNG.</p>
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
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Biography / Description
          </label>
          <span className="text-xs text-gray-400 italic">Each block = one paragraph on the Studio page</span>
        </div>

        <div className="space-y-3">
          {bioParagraphs.map((para, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center mt-2 font-semibold">
                {idx + 1}
              </div>
              <textarea
                rows={3}
                value={para}
                onChange={(e) => updateParagraph(idx, e.target.value)}
                placeholder={`Paragraph ${idx + 1}…`}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary-red/30 focus:border-primary-red transition"
              />
              {bioParagraphs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeParagraph(idx)}
                  className="mt-2 text-gray-400 hover:text-red-500 transition"
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
        <label htmlFor="activeToggle" className="text-sm text-gray-600 cursor-pointer">
          Show this member on the Studio page
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 text-sm bg-primary-red text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving…' : initialData ? 'Save Changes' : 'Create Member'}
        </button>
      </div>
    </form>
  );
}
