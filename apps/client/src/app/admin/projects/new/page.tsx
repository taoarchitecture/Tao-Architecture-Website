"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add New Project</h1>
      <ProjectForm />
    </AdminLayout>
  );
}
