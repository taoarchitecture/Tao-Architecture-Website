"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    applications: 0,
    messages: 0
  });
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      try {
        // Fetch real stats here
        const appsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/career`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const projectsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
        
        setStats({
            projects: projectsRes.data.length,
            applications: appsRes.data.length,
            messages: 0 // TODO: Add contact API
        });
      } catch (error) {
        console.error(error);
        // If 401, redirect to login
        router.push('/admin/login');
      }
    };

    fetchStats();
  }, [router]);

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-dark-grey dark:text-white font-agenda">DASHBOARD</h1>
        <p className="text-neutral-light-grey mt-2 text-sm tracking-wide uppercase">Welcome back to Tao Architecture Admin</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Stat Card 1 */}
        <div className="bg-white dark:bg-gray-800 p-8 shadow-sm border-l-2 border-primary-red">
            <h3 className="text-neutral-light-grey text-xs font-bold uppercase tracking-[0.2em] mb-4">Total Projects</h3>
            <p className="text-4xl font-bold text-neutral-black dark:text-white">{stats.projects}</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white dark:bg-gray-800 p-8 shadow-sm border-l-2 border-primary-gold">
            <h3 className="text-neutral-light-grey text-xs font-bold uppercase tracking-[0.2em] mb-4">Job Applications</h3>
            <p className="text-4xl font-bold text-neutral-black dark:text-white">{stats.applications}</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white dark:bg-gray-800 p-8 shadow-sm border-l-2 border-neutral-dark-grey">
            <h3 className="text-neutral-light-grey text-xs font-bold uppercase tracking-[0.2em] mb-4">Unread Messages</h3>
            <p className="text-4xl font-bold text-neutral-black dark:text-white">{stats.messages}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
