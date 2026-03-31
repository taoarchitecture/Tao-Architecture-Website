'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { PageContent } from '@/types';
import { FiPlus, FiTrash2, FiEdit, FiSave } from 'react-icons/fi';

// Known page sections that can be edited
const KNOWN_PAGES = [
  { slug: 'services-intro', label: 'Services Page – Intro Section', description: 'The introductory paragraph at the top of the Services page' },
  { slug: 'studio-intro', label: 'Studio Page – Intro Section', description: 'The "Tao Team" introductory paragraph on the Studio page' },
  { slug: 'career-intro', label: 'Career Page – Intro Section', description: 'Introductory text on the Career/Applications page' },
];

export default function AdminPagesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<PageContent[]>([]);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);

  // Custom page form
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customSlug, setCustomSlug] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customContent, setCustomContent] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/admin/login'); return; }
    fetchPages();
  }, [router]);

  const fetchPages = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages`);
      setPages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPageContent = (slug: string): PageContent | undefined => {
    return pages.find(p => p.pageSlug === slug);
  };

  const startEditing = (slug: string) => {
    const existing = getPageContent(slug);
    setEditingSlug(slug);
    setEditTitle(existing?.title || '');
    setEditContent(existing?.content || '');
  };

  const handleSave = async (slug: string) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/pages`,
        { pageSlug: slug, title: editTitle, content: editContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingSlug(null);
      fetchPages();
    } catch (error) {
      console.error(error);
      alert('Error saving');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCustom = async () => {
    if (!customSlug.trim()) {
      alert('Slug is required');
      return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/pages`,
        { pageSlug: customSlug, title: customTitle, content: customContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowCustomForm(false);
      setCustomSlug('');
      setCustomTitle('');
      setCustomContent('');
      fetchPages();
    } catch (error) {
      console.error(error);
      alert('Error saving');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure? This will revert the page section to its default hardcoded text.')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/pages/${slug}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPages();
    } catch (error) {
      console.error(error);
      alert('Error deleting');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-neutral-light-grey uppercase tracking-widest text-xs">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark-grey font-agenda">PAGE CONTENT</h1>
          <p className="text-neutral-light-grey mt-2 text-sm tracking-wide uppercase">
            Edit static text sections across the website
          </p>
        </div>
        <button
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="flex items-center gap-2 bg-neutral-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300"
        >
          <FiPlus size={14} /> Custom Section
        </button>
      </div>

      {/* Custom Section Form */}
      {showCustomForm && (
        <div className="bg-white p-8 shadow-sm border-l-2 border-primary-gold mb-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey mb-6">Add Custom Page Section</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-2">Slug (unique identifier) *</label>
                <input
                  type="text" value={customSlug} onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="e.g. about-intro"
                  className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-2">Title</label>
                <input
                  type="text" value={customTitle} onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-2">Content</label>
              <textarea
                value={customContent} onChange={(e) => setCustomContent(e.target.value)} rows={5}
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div className="flex gap-4">
              <button onClick={handleSaveCustom} disabled={saving}
                className="bg-neutral-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300 disabled:opacity-70">
                {saving ? 'Saving...' : 'Save Section'}
              </button>
              <button onClick={() => setShowCustomForm(false)}
                className="border border-neutral-border-grey text-neutral-dark-grey px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all duration-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Known Page Sections */}
      <div className="space-y-4">
        {KNOWN_PAGES.map((page) => {
          const content = getPageContent(page.slug);
          const isEditing = editingSlug === page.slug;

          return (
            <div key={page.slug} className="bg-white shadow-sm border-l-2 border-primary-red">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-neutral-dark-grey font-agenda uppercase tracking-wider">{page.label}</h3>
                    <p className="text-xs text-neutral-light-grey mt-1">{page.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {content && (
                      <span className="text-[10px] uppercase tracking-wider bg-green-100 text-green-700 px-2 py-0.5 font-bold">Customized</span>
                    )}
                    {!content && (
                      <span className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 font-bold">Default</span>
                    )}
                  </div>
                </div>

                {content && !isEditing && (
                  <div className="mt-4 p-4 bg-gray-50 text-sm text-neutral-dark-grey font-agenda leading-relaxed">
                    <p className="line-clamp-3">{content.content}</p>
                    <p className="text-[10px] text-neutral-light-grey mt-2">Last updated: {formatDate(content.updatedAt)}</p>
                  </div>
                )}

                {isEditing && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-1">Title (optional)</label>
                      <input
                        type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full border border-neutral-border-grey p-2 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light-grey mb-1">Content</label>
                      <textarea
                        value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={6}
                        className="w-full border border-neutral-border-grey p-2 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  {isEditing ? (
                    <>
                      <button onClick={() => handleSave(page.slug)} disabled={saving}
                        className="flex items-center gap-1 bg-neutral-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300 disabled:opacity-70">
                        <FiSave size={12} /> {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setEditingSlug(null)}
                        className="border border-neutral-border-grey text-neutral-dark-grey px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all duration-300">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(page.slug)}
                        className="flex items-center gap-1 text-neutral-light-grey hover:text-primary-red transition-colors text-xs font-bold uppercase tracking-widest">
                        <FiEdit size={12} /> Edit
                      </button>
                      {content && (
                        <button onClick={() => handleDelete(page.slug)}
                          className="flex items-center gap-1 text-neutral-light-grey hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest ml-4">
                          <FiTrash2 size={12} /> Reset to Default
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional custom page content beyond known pages */}
      {pages.filter(p => !KNOWN_PAGES.find(k => k.slug === p.pageSlug)).length > 0 && (
        <div className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey mb-4">Custom Sections</h2>
          <div className="space-y-3">
            {pages
              .filter(p => !KNOWN_PAGES.find(k => k.slug === p.pageSlug))
              .map((page) => (
                <div key={page.id} className="bg-white p-6 shadow-sm border-l-2 border-primary-gold flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm text-neutral-dark-grey font-agenda">{page.pageSlug}</h3>
                    <p className="text-xs text-neutral-light-grey mt-1 line-clamp-1">{page.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditing(page.pageSlug)}
                      className="p-2 text-neutral-light-grey hover:text-primary-red transition-colors">
                      <FiEdit size={16} />
                    </button>
                    <button onClick={() => handleDelete(page.pageSlug)}
                      className="p-2 text-neutral-light-grey hover:text-red-500 transition-colors">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
