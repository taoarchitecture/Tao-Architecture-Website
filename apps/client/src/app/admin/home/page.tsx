'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import HomeConfigForm from '@/components/admin/HomeConfigForm';

export default function AdminHomePage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-6 font-agenda text-2xl font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Home Page Configuration</h1>
        <HomeConfigForm />
      </div>
    </AdminLayout>
  );
}
