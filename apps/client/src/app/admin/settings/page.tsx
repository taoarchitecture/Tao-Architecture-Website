'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { GlobalSettings } from '@/types';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<GlobalSettings | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      router.replace('/admin/login');
      return;
    }

    const fetchSettings = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/settings`);
        setSettings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [router]);

  const handleChange = (field: keyof GlobalSettings, value: string) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }
    if (newPassword.length < 8) {
      alert('New password must be at least 8 characters.');
      return;
    }
    setChangingPassword(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Error changing password');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-neutral-medium-grey uppercase tracking-widest text-xs">Loading settings...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="font-agenda text-3xl font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Global Settings</h1>
        <p className="mt-2 text-sm tracking-wide uppercase text-neutral-medium-grey">
          Manage site-wide information visible across the website
        </p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Firm Info */}
        <div className="bg-white p-5 md:p-8 shadow-sm border-l-2 border-primary-red">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey mb-6">Firm Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">Site / Firm Name</label>
              <input
                type="text"
                value={settings?.siteName || ''}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">Contact Email</label>
              <input
                type="email"
                value={settings?.contactEmail || ''}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">Phone Numbers (JSON Array)</label>
              <input
                type="text"
                value={settings?.phoneNumbers || ''}
                onChange={(e) => handleChange('phoneNumbers', e.target.value)}
                placeholder='["+91-XXXXXXX", "+91-XXXXXXX"]'
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">Google Maps Embed URL</label>
              <input
                type="text"
                value={settings?.googleMapsUrl || ''}
                onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">Office Address</label>
              <textarea
                value={settings?.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={3}
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white p-5 md:p-8 shadow-sm border-l-2 border-primary-red">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey mb-6">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
          </div>
          <button
            onClick={handleChangePassword}
            disabled={changingPassword || !currentPassword || !newPassword}
            className="mt-6 bg-neutral-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {changingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </div>

        {/* Social Links */}
        <div className="bg-white p-5 md:p-8 shadow-sm border-l-2 border-primary-red">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey mb-6">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">Facebook URL</label>
              <input
                type="url"
                value={settings?.facebookUrl || ''}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">Instagram URL</label>
              <input
                type="url"
                value={settings?.instagramUrl || ''}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={settings?.linkedinUrl || ''}
                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">YouTube URL</label>
              <input
                type="url"
                value={settings?.youtubeUrl || ''}
                onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white p-5 md:p-8 shadow-sm border-l-2 border-neutral-dark-grey">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey mb-6">Footer</h3>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-medium-grey mb-2">Footer Tagline</label>
            <textarea
              value={settings?.footerTagline || ''}
              onChange={(e) => handleChange('footerTagline', e.target.value)}
              rows={2}
              className="w-full border border-neutral-border-grey p-3 text-sm font-agenda focus:outline-none focus:border-primary-red transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-neutral-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </AdminLayout>
  );
}
