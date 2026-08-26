'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import Image from 'next/image';
import { getImageUrl } from '@/utils/image';
import { uploadToCloudinary } from '@/utils/cloudinary';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import { Service } from '@/types';

export default function AdminServicesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formItems, setFormItems] = useState<{ id: string; value: string }[]>([]);
  const [formOrder, setFormOrder] = useState(0);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formImage, setFormImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      router.replace('/admin/login');
      return;
    }
    fetchServices();
  }, [router]);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormTitle('');
    setFormSlug('');
    setFormSubtitle('');
    setFormDescription('');
    setFormItems([]);
    setFormOrder(0);
    setFormIsActive(true);
    setFormImage(null);
    setEditingService(null);
    setIsCreating(false);
  };

  const openCreateForm = () => {
    resetForm();
    setFormOrder(services.length);
    setIsCreating(true);
  };

  const openEditForm = (service: Service) => {
    setFormTitle(service.title);
    setFormSlug(service.slug);
    setFormSubtitle(service.subtitle || '');
    setFormDescription(service.description || '');
    setFormItems((service.items || []).map((value) => ({ id: crypto.randomUUID(), value })));
    setFormOrder(service.order);
    setFormIsActive(service.isActive);
    setFormImage(null);
    setEditingService(service);
    setIsCreating(true);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormTitle(value);
    // Auto-generate slug only when creating new
    if (!editingService) {
      setFormSlug(generateSlug(value));
    }
  };

  const handleAddItem = () => {
    setFormItems([...formItems, { id: crypto.randomUUID(), value: '' }]);
  };

  const handleUpdateItem = (id: string, value: string) => {
    setFormItems(formItems.map((item) => (item.id === id ? { ...item, value } : item)));
  };

  const handleRemoveItem = (id: string) => {
    setFormItems(formItems.filter((item) => item.id !== id));
  };

  const handleSave = async () => {
    if (!formTitle || !formSlug) {
      alert('Title and Slug are required');
      return;
    }
    setSaving(true);
    
    try {
      let imageUrl = editingService?.image || null;
      if (formImage) {
        imageUrl = await uploadToCloudinary(formImage, 'services');
      }

      const payload = {
        title: formTitle,
        slug: formSlug,
        subtitle: formSubtitle,
        description: formDescription,
        items: formItems.map((i) => i.value).filter((v) => v.trim()),
        order: Number(formOrder),
        isActive: formIsActive,
        image: imageUrl,
      };

      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

      if (editingService) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/services/${editingService.id}`, payload, { headers });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/services`, payload, { headers });
      }
      resetForm();
      fetchServices();
    } catch (error) {
      console.error(error);
      alert('Error saving service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (error) {
      console.error(error);
      alert('Error deleting service');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-neutral-medium-grey uppercase tracking-widest text-xs">Loading services...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <h1 className="font-agenda text-3xl font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Services</h1>
          <p className="mt-2 text-sm uppercase tracking-wide text-neutral-medium-grey">
            Manage your firm&apos;s services displayed on the website
          </p>
        </div>
        {!isCreating && (
          <button
            onClick={openCreateForm}
            className="flex items-center justify-center gap-2 bg-neutral-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300 w-full sm:w-auto"
          >
            <FiPlus size={14} /> Add Service
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="mb-8 border-l-2 border-primary-red bg-white p-8 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey mb-6">
            {editingService ? 'Edit Service' : 'New Service'}
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey">Title *</label>
                <input
                  type="text" value={formTitle} onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey">Slug *</label>
                <input
                  type="text" value={formSlug} onChange={(e) => setFormSlug(e.target.value)}
                  className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey">Subtitle</label>
                <input
                  type="text" value={formSubtitle} onChange={(e) => setFormSubtitle(e.target.value)}
                  className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey">Order</label>
                <input
                  type="number" value={formOrder} onChange={(e) => setFormOrder(Number(e.target.value))}
                  className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey">Description</label>
              <textarea
                value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3}
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey">Cover Image</label>
              <input
                type="file" accept="image/*" onChange={(e) => setFormImage(e.target.files?.[0] || null)}
                className="text-sm font-agenda text-neutral-medium-grey file:mr-4 file:border file:border-neutral-dark-grey file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.14em] file:text-neutral-dark-grey hover:file:bg-neutral-dark-grey hover:file:text-white"
              />
              <p className="mt-1 text-xs text-neutral-medium-grey">
                Recommended: 1600 × 900px minimum, landscape. Renders at a fixed height (240–400px depending on screen size) with fluid width — auto-compressed to ≤2560px / 2MB. JPG or WebP.
              </p>
              {editingService?.image && !formImage && (
                <p className="mt-1 text-xs text-neutral-medium-grey">Current: {editingService.image}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey">Service Items (Bullet Points)</label>
              <div className="space-y-2">
                {formItems.map((item, idx) => (
                  <div key={item.id} className="flex gap-2">
                    <input
                      type="text" value={item.value} onChange={(e) => handleUpdateItem(item.id, e.target.value)}
                      placeholder={`Item ${idx + 1}`}
                      className="flex-1 border border-neutral-border-grey p-2 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                    />
                    <button onClick={() => handleRemoveItem(item.id)} className="px-2 text-neutral-medium-grey transition-colors hover:text-primary-red" type="button">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddItem} type="button"
                  className="flex items-center gap-1 text-primary-red text-xs font-bold uppercase tracking-wider hover:opacity-80"
                >
                  <FiPlus size={12} /> Add Item
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox" id="isActive" checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="isActive" className="text-sm font-agenda text-neutral-dark-grey">Active (visible on website)</label>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSave} disabled={saving}
                className="bg-neutral-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300 disabled:opacity-70 w-full sm:w-auto"
              >
                {saving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
              </button>
              <button
                onClick={resetForm}
                className="border border-neutral-border-grey text-neutral-dark-grey px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-bg transition-all duration-300 w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className={`flex items-center gap-6 bg-white p-6 shadow-sm transition-all duration-200 ${
              !service.isActive ? 'opacity-60' : ''
            }`}
          >
            {service.image && (
              <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden">
                <Image src={getImageUrl(service.image)} alt={service.title} fill className="object-cover" sizes="80px" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-sm text-neutral-dark-grey font-agenda uppercase tracking-wider">{service.title}</h3>
                {!service.isActive && (
                  <span className="bg-neutral-bg px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-medium-grey">Inactive</span>
                )}
              </div>
              <p className="text-xs text-neutral-medium-grey">{(service.items || []).length} items · Order: {service.order}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openEditForm(service)}
                className="p-2 text-neutral-medium-grey hover:text-primary-red transition-colors"
                title="Edit"
              >
                <FiEdit size={16} />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="p-2 text-neutral-medium-grey transition-colors hover:text-primary-red"
                title="Delete"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && !isCreating && (
        <div className="py-20 text-center text-neutral-medium-grey">
          <p className="text-sm mb-4">No services configured yet</p>
          <button
            onClick={openCreateForm}
            className="bg-neutral-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300"
          >
            Add Your First Service
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
