'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import HomeConfigForm from '@/components/admin/HomeConfigForm';

export default function AdminHomePage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Home Page Configuration</h1>
        <HomeConfigForm />
      </div>
    </AdminLayout>
  );
}
