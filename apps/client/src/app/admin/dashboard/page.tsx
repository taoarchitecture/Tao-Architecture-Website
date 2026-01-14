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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back to Tao Architecture Admin</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 border-primary-red">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Projects</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.projects}</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 border-primary-gold">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Job Applications</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.applications}</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 border-gray-500">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Unread Messages</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.messages}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
