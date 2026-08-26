"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.replace('/admin/login');
    }
  }, [router]);

  return (
    <AdminLayout>
      <h1 className="mb-6 font-agenda text-2xl font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Add New Project</h1>
      <ProjectForm />
    </AdminLayout>
  );
}
