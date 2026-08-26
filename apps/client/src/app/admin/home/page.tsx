'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import HomeConfigForm from '@/components/admin/HomeConfigForm';
import HomeGridForm from '@/components/admin/HomeGridForm';

export default function AdminHomePage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.replace('/admin/login');
      return;
    }
    setChecked(true);
  }, [router]);

  if (!checked) {
    return (
      <AdminLayout>
        <div className="p-6 text-xs uppercase tracking-widest text-neutral-medium-grey">Loading...</div>
      </AdminLayout>
    );
  }

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
