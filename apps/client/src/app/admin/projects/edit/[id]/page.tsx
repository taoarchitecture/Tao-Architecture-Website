"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectForm from '@/components/admin/ProjectForm';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      router.replace('/admin/login');
      return;
    }

    const fetchProject = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-64 text-center text-xs uppercase tracking-widest text-neutral-medium-grey">
          Loading project...
        </div>
      </AdminLayout>
    );
  }

  if (!project) {
    return (
      <AdminLayout>
        <div className="h-64 text-center text-xs uppercase tracking-widest text-neutral-medium-grey">
          Project not found
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="mb-6 font-agenda text-2xl font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Edit Project</h1>
      <ProjectForm initialData={project} isEditing={true} />
    </AdminLayout>
  );
}
