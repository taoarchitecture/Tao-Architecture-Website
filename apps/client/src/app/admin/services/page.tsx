'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { Service } from '@/types';
import Image from 'next/image';
import { getImageUrl } from '@/utils/image';
import { FiPlus, FiTrash2, FiEdit, FiEye, FiEyeOff, FiChevronUp, FiChevronDown } from 'react-icons/fi';

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
  const [formItems, setFormItems] = useState<string[]>([]);
  const [formOrder, setFormOrder] = useState(0);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formImage, setFormImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/admin/login'); return; }
    fetchServices();
  }, [router]);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services/all`, {
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
    setFormItems(service.items || []);
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
    setFormItems([...formItems, '']);
  };

  const handleUpdateItem = (index: number, value: string) => {
    const updated = [...formItems];
    updated[index] = value;
    setFormItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    setFormItems(formItems.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!formTitle || !formSlug) {
      alert('Title and Slug are required');
      return;
    }
    setSaving(true);
    const formData = new FormData();
    formData.append('title', formTitle);
    formData.append('slug', formSlug);
    formData.append('subtitle', formSubtitle);
    formData.append('description', formDescription);
    formData.append('items', JSON.stringify(formItems.filter(i => i.trim())));
    formData.append('order', String(formOrder));
    formData.append('isActive', String(formIsActive));
    if (formImage) formData.append('image', formImage);

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' };

      if (editingService) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/services/${editingService.id}`, formData, { headers });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/services`, formData, { headers });
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
          <div className="text-neutral-light-grey uppercase tracking-widest text-xs">Loading services...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark-grey font-agenda">SERVICES</h1>
          <p className="text-neutral-light-grey mt-2 text-sm tracking-wide uppercase">
            Manage your firm&apos;s services displayed on the website
          </p>
        </div>
        {!isCreating && (
          <button
            onClick={openCreateForm}
            className="flex items-center gap-2 bg-neutral-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300"
          >
            <FiPlus size={14} /> Add Service
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-white p-8 shadow-sm border-l-2 border-primary-red mb-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey mb-6">
            {editingService ? 'Edit Service' : 'New Service'}
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-2">Title *</label>
                <input
                  type="text" value={formTitle} onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-2">Slug *</label>
                <input
                  type="text" value={formSlug} onChange={(e) => setFormSlug(e.target.value)}
                  className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-2">Subtitle</label>
                <input
                  type="text" value={formSubtitle} onChange={(e) => setFormSubtitle(e.target.value)}
                  className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-2">Order</label>
                <input
                  type="number" value={formOrder} onChange={(e) => setFormOrder(Number(e.target.value))}
                  className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-2">Description</label>
              <textarea
                value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3}
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-2">Cover Image</label>
              <input
                type="file" accept="image/*" onChange={(e) => setFormImage(e.target.files?.[0] || null)}
                className="text-sm font-agenda"
              />
              {editingService?.image && !formImage && (
                <p className="text-xs text-neutral-light-grey mt-1">Current: {editingService.image}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-2">Service Items (Bullet Points)</label>
              <div className="space-y-2">
                {formItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text" value={item} onChange={(e) => handleUpdateItem(idx, e.target.value)}
                      placeholder={`Item ${idx + 1}`}
                      className="flex-1 border border-neutral-border-grey p-2 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                    />
                    <button onClick={() => handleRemoveItem(idx)} className="text-red-400 hover:text-red-600 px-2" type="button">
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
            <div className="flex gap-4">
              <button
                onClick={handleSave} disabled={saving}
                className="bg-neutral-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300 disabled:opacity-70"
              >
                {saving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
              </button>
              <button
                onClick={resetForm}
                className="border border-neutral-border-grey text-neutral-dark-grey px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all duration-300"
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
            className={`bg-white p-6 shadow-sm flex items-center gap-6 transition-all duration-200 ${
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
                  <span className="text-[9px] uppercase tracking-wider bg-gray-200 text-gray-500 px-2 py-0.5 font-bold">Inactive</span>
                )}
              </div>
              <p className="text-xs text-neutral-light-grey">{(service.items || []).length} items · Order: {service.order}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openEditForm(service)}
                className="p-2 text-neutral-light-grey hover:text-primary-red transition-colors"
                title="Edit"
              >
                <FiEdit size={16} />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="p-2 text-neutral-light-grey hover:text-red-500 transition-colors"
                title="Delete"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && !isCreating && (
        <div className="text-center py-20 text-neutral-light-grey">
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
