"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiArrowRight } from 'react-icons/fi';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    applications: 0,
    messages: 0,
    services: 0,
    teamMembers: 0,
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
        const headers = { Authorization: `Bearer ${token}` };
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const [projectsRes, appsRes, contactRes, servicesRes, teamRes] = await Promise.all([
          axios.get(`${apiUrl}/projects`),
          axios.get(`${apiUrl}/career`, { headers }),
          axios.get(`${apiUrl}/contact`, { headers }).catch(() => ({ data: [] })),
          axios.get(`${apiUrl}/services`).catch(() => ({ data: [] })),
          axios.get(`${apiUrl}/studio`).catch(() => ({ data: [] })),
        ]);
        
        setStats({
          projects: projectsRes.data.length,
          applications: appsRes.data.length,
          messages: contactRes.data.length,
          services: servicesRes.data.length,
          teamMembers: teamRes.data.length,
        });
      } catch (error) {
        console.error(error);
        router.push('/admin/login');
      }
    };

    fetchStats();
  }, [router]);

  const statCards = [
    { label: 'Total Projects', value: stats.projects, href: '/admin/projects', color: 'border-primary-red' },
    { label: 'Job Applications', value: stats.applications, href: '/admin/career', color: 'border-primary-gold' },
    { label: 'Messages', value: stats.messages, href: '/admin/contact', color: 'border-neutral-dark-grey' },
    { label: 'Services', value: stats.services, href: '/admin/services', color: 'border-primary-red' },
    { label: 'Team Members', value: stats.teamMembers, href: '/admin/studio', color: 'border-primary-gold' },
  ];

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="font-agenda text-2xl md:text-3xl font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Dashboard</h1>
        <p className="mt-2 text-sm uppercase tracking-wide text-neutral-medium-grey">Welcome back to Tao Architecture Admin</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="group">
            <div className={`bg-white p-6 shadow-sm border-l-2 ${card.color} transition-all duration-300 group-hover:shadow-md group-hover:translate-y-[-2px]`}>
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">{card.label}</h3>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-neutral-black">{card.value}</p>
                <FiArrowRight className="text-neutral-medium-grey transition-colors group-hover:text-primary-red" size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Add New Project', href: '/admin/projects/new' },
            { label: 'Manage Services', href: '/admin/services' },
            { label: 'Edit Page Content', href: '/admin/pages' },
            { label: 'Observability Overview', href: '/admin/observability' },
            { label: 'Update Settings', href: '/admin/settings' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="block bg-white p-5 shadow-sm text-center text-xs font-bold uppercase tracking-widest text-neutral-dark-grey hover:bg-neutral-black hover:text-white transition-all duration-300"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
