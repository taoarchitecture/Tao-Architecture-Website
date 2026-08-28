'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { getImageUrl, getImageDimensions, checkAspectRatioMismatch } from '@/utils/image';
import { uploadToCloudinary } from '@/utils/cloudinary';
import { FiUploadCloud, FiAlertTriangle } from 'react-icons/fi';

interface GridItemDraft {
  slotKey: string;
  category: string;
  title: string;
  disciplines: string;
  link: string;
  image: string; // existing Cloudinary/static URL
  file?: File; // a newly-chosen file pending upload
  previewUrl?: string; // local blob preview for a pending file
  aspectWarning?: string | null;
}

// Card height/aspect ratio per slot is fixed by design — kept in sync with
// the `heightClass` values in src/app/page.tsx's gridSlots. Recommended
// pixel sizes use a 1200px-wide baseline: larger than this grid ever
// actually renders (max column width ~524px on desktop, ~767px full-bleed
// on mobile before the 2-column breakpoint), so uploads stay sharp on
// retina screens.
const SLOT_ASPECT: Record<string, { ratio: number; label: string; width: number; height: number }> = {
  corporate: { ratio: 10 / 9.4, label: '10:9.4', width: 1200, height: 1128 },
  'luxury-villas': { ratio: 10 / 5.9, label: '10:5.9', width: 1200, height: 708 },
  commercial: { ratio: 10 / 6.1, label: '10:6.1', width: 1200, height: 732 },
  'cozy-homes': { ratio: 10 / 6.1, label: '10:6.1', width: 1200, height: 732 },
  institutional: { ratio: 10 / 6.1, label: '10:6.1', width: 1200, height: 732 },
  'luxury-apartments': { ratio: 10 / 6.1, label: '10:6.1', width: 1200, height: 732 },
  'tao-the-way': { ratio: 10 / 6.1, label: '10:6.1', width: 1200, height: 732 },
  housing: { ratio: 10 / 9.4, label: '10:9.4', width: 1200, height: 1128 },
  products: { ratio: 10 / 6.1, label: '10:6.1', width: 1200, height: 732 },
};

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
        return { ...i, file, previewUrl: URL.createObjectURL(file), aspectWarning: null };
      })
    );
    const target = SLOT_ASPECT[slotKey];
    if (target) {
      getImageDimensions(file)
        .then(({ width, height }) => {
          const warning = checkAspectRatioMismatch(width, height, target.ratio, target.label);
          setItems((prev) => prev.map((i) => (i.slotKey === slotKey && i.file === file ? { ...i, aspectWarning: warning } : i)));
        })
        .catch(() => {});
    }
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
          const target = SLOT_ASPECT[item.slotKey];
          return (
            <div key={item.slotKey} className="border border-neutral-border p-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-shrink-0">
                  <div
                    className="relative h-24 w-40 cursor-pointer overflow-hidden border-2 border-dashed border-neutral-border bg-neutral-bg transition-colors hover:border-primary-red group"
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
                  {target && (
                    <p className="mt-1 w-40 text-[11px] leading-snug text-neutral-medium-grey">
                      Recommended: {target.width} × {target.height}px ({target.label}). JPG or WebP.
                    </p>
                  )}
                  {item.aspectWarning && (
                    <p className="mt-1 flex w-40 items-start gap-1 text-[11px] leading-snug text-amber-600">
                      <FiAlertTriangle className="mt-0.5 flex-shrink-0" size={11} />
                      <span>{item.aspectWarning}</span>
                    </p>
                  )}
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
