"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { getImageUrl } from '@/utils/image';
import { Project } from '@/types';

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setIsLoading(false);
      router.replace('/admin/login');
      return;
    }
    fetchProjects();
  }, [router]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-dark-grey font-agenda uppercase tracking-wider">Projects</h1>
        <Link 
          href="/admin/projects/new"
          className="bg-neutral-black hover:bg-primary-red/90 text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-300 w-full sm:w-auto"
        >
          <FiPlus className="mr-2" /> Add Project
        </Link>
      </div>

      <div className="mb-8 relative">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-medium-grey" />
        <input
          type="text"
          placeholder="SEARCH PROJECTS..."
          className="w-full pl-12 pr-4 py-4 border border-neutral-border placeholder-neutral-light-grey text-neutral-dark-grey focus:outline-none focus:border-primary-red font-agenda text-sm tracking-wide"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-xs uppercase tracking-widest text-neutral-medium-grey">Loading...</div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="bg-white border border-neutral-border shadow-sm hidden md:block">
            <table className="min-w-full divide-y divide-neutral-border">
              <thead className="bg-neutral-bg-light">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-medium-grey uppercase tracking-[0.15em]">Project</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-medium-grey uppercase tracking-[0.15em]">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-neutral-medium-grey uppercase tracking-[0.15em]">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-neutral-medium-grey uppercase tracking-[0.15em]">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-border">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-neutral-bg-light transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-16 relative">
                          {project.coverImage ? (
                            <img className="h-full w-full object-cover" src={getImageUrl(project.coverImage)} alt="" />
                          ) : (
                            <div className="h-full w-full bg-neutral-border"></div>
                          )}
                        </div>
                        <div className="ml-6">
                          <div className="text-sm font-bold text-neutral-dark-grey uppercase tracking-wide">{project.title}</div>
                          <div className="mt-1 text-xs text-neutral-medium-grey">{project.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-medium border border-neutral-border text-neutral-dark-grey uppercase tracking-wider">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold uppercase tracking-wider ${
                        project.status === 'Completed' 
                          ? 'text-success' 
                          : 'text-primary-red'
                      }`}>
                        {project.status || 'Ongoing'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/projects/edit/${project.id}`} className="text-neutral-dark-grey hover:text-primary-red mr-6 transition-colors inline-block">
                        <FiEdit2 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(project.id)} className="text-neutral-medium-grey hover:text-primary-red transition-colors" aria-label="Delete project">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white border border-neutral-border p-4 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-16 w-20 relative">
                    {project.coverImage ? (
                      <img className="h-full w-full object-cover" src={getImageUrl(project.coverImage)} alt="" />
                    ) : (
                      <div className="h-full w-full bg-neutral-border"></div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-dark-grey uppercase tracking-wide">{project.title}</div>
                    <div className="mt-1 text-xs text-neutral-medium-grey">{project.location}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="px-3 py-1 text-[10px] font-medium border border-neutral-border text-neutral-dark-grey uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    project.status === 'Completed' ? 'text-success' : 'text-primary-red'
                  }`}>
                    {project.status || 'Ongoing'}
                  </span>
                </div>
                <div className="flex justify-end gap-4 border-t border-neutral-border pt-4 mt-2">
                  <Link href={`/admin/projects/edit/${project.id}`} className="text-neutral-dark-grey hover:text-primary-red transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                    <FiEdit2 className="w-3 h-3" /> Edit
                  </Link>
                  <button onClick={() => handleDelete(project.id)} className="text-neutral-medium-grey hover:text-primary-red transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-widest" aria-label="Delete project">
                    <FiTrash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </AdminLayout>
  );
}
