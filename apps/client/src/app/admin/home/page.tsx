'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import HomeConfigForm from '@/components/admin/HomeConfigForm';
import HomeGridForm from '@/components/admin/HomeGridForm';

export default function AdminHomePage() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <h1 className="font-agenda text-2xl font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Home Page Configuration</h1>
        <HomeConfigForm />
        <HomeGridForm />
      </div>
    </AdminLayout>
  );
}
