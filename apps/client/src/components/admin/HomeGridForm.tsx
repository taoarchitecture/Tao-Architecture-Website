'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { getImageUrl } from '@/utils/image';
import { uploadToCloudinary } from '@/utils/cloudinary';
import { FiUploadCloud } from 'react-icons/fi';

interface GridItemDraft {
  slotKey: string;
  category: string;
  title: string;
  disciplines: string;
  link: string;
  image: string; // existing Cloudinary/static URL
  file?: File; // a newly-chosen file pending upload
  previewUrl?: string; // local blob preview for a pending file
}

export default function HomeGridForm() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [items, setItems] = useState<GridItemDraft[]>([]);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetchItems();
    return () => {
      items.forEach((i) => i.previewUrl && URL.revokeObjectURL(i.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get('/api/home-grid');
      setItems(
        (data || []).map((item: any) => ({
          slotKey: item.slotKey,
          category: item.category || '',
          title: item.title || '',
          disciplines: item.disciplines || '',
          link: item.link || '',
          image: item.image || '',
        }))
      );
    } catch (error) {
      console.error('Error fetching homepage grid items:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (slotKey: string, field: 'category' | 'title' | 'disciplines' | 'link', value: string) => {
    setItems((prev) => prev.map((i) => (i.slotKey === slotKey ? { ...i, [field]: value } : i)));
  };

  const handleImageChange = (slotKey: string, file: File | undefined) => {
    if (!file) return;
    setItems((prev) =>
      prev.map((i) => {
        if (i.slotKey !== slotKey) return i;
        if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
        return { ...i, file, previewUrl: URL.createObjectURL(file) };
      })
    );
  };

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

      // Upload any newly-chosen images first, then save every slot. PUT is
      // idempotent and there are only 9 fixed slots, so saving all of them
      // together keeps this simple — no per-row "dirty" tracking needed.
      for (const item of items) {
        const image = item.file ? await uploadToCloudinary(item.file, 'home') : item.image;
        await axios.put(
          `/api/home-grid/${item.slotKey}`,
          { category: item.category, title: item.title, disciplines: item.disciplines, link: item.link, image },
          { headers }
        );
      }
      alert('Homepage grid saved!');
      fetchItems();
    } catch (error) {
      console.error(error);
      alert('Error saving homepage grid.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-xs uppercase tracking-widest text-neutral-medium-grey">Loading...</div>;
  }

  return (
    <div className="border border-neutral-border bg-white p-6 shadow-sm">
      <h3 className="mb-1 font-agenda text-lg font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Homepage Category Grid</h3>
      <p className="mb-4 text-xs text-neutral-medium-grey">
        The Corporate / Luxury Villas / Commercial etc. cards on the homepage. Card layout and sizing are fixed by design — only the image, label, title, and link for each card are editable here.
      </p>
      <div className="space-y-4">
        {items.map((item) => {
          const preview = item.previewUrl || (item.image ? getImageUrl(item.image) : null);
          return (
            <div key={item.slotKey} className="border border-neutral-border p-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div
                  className="relative h-24 w-40 flex-shrink-0 cursor-pointer overflow-hidden border-2 border-dashed border-neutral-border bg-neutral-bg transition-colors hover:border-primary-red group"
                  onClick={() => fileInputRefs.current[item.slotKey]?.click()}
                >
                  {preview ? (
                    <>
                      <Image src={preview} alt={item.title} fill sizes="200px" className="object-cover" />
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
                      fileInputRefs.current[item.slotKey] = el;
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(item.slotKey, e.target.files?.[0])}
                    className="hidden"
                  />
                </div>
                <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-neutral-medium-grey">Category Label</label>
                    <input
                      value={item.category}
                      onChange={(e) => updateField(item.slotKey, 'category', e.target.value)}
                      className="w-full border border-neutral-border p-2 text-sm font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-neutral-medium-grey">Link</label>
                    <input
                      value={item.link}
                      onChange={(e) => updateField(item.slotKey, 'link', e.target.value)}
                      className="w-full border border-neutral-border p-2 text-sm font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-neutral-medium-grey">Title</label>
                    <input
                      value={item.title}
                      onChange={(e) => updateField(item.slotKey, 'title', e.target.value)}
                      className="w-full border border-neutral-border p-2 text-sm font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-neutral-medium-grey">Disciplines (optional)</label>
                    <input
                      value={item.disciplines}
                      onChange={(e) => updateField(item.slotKey, 'disciplines', e.target.value)}
                      placeholder="e.g. ARCHITECTURE • INTERIORS • LANDSCAPE"
                      className="w-full border border-neutral-border p-2 text-sm font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting}
        className="mt-6 bg-primary-red px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-neutral-dark-grey disabled:opacity-70"
      >
        {submitting ? 'Saving...' : 'Save Homepage Grid'}
      </button>
    </div>
  );
}
