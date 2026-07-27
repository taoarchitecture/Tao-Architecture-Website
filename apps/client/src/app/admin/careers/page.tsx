"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCheck, FiX, FiFileText, FiLink } from 'react-icons/fi';
import { format } from 'date-fns';
import AdminLayout from '@/components/admin/AdminLayout';

interface Application {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  positionApply: string;
  status: 'pending' | 'approved' | 'rejected' | 'trash';
  resume: string;
  portfolio?: string;
  createdAt: string;
  whyTao?: string;
  expectedSalary?: string;
}

export default function CareersAdmin() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/career`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id: number, action: 'approve' | 'reject') => {
    if (!window.confirm(`Are you sure you want to ${action} this application? This will send an automated email to the applicant.`)) return;
    
    setProcessingId(id);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/career/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Application ${action}d successfully. Email sent.`);
      fetchApplications();
    } catch (error) {
      console.error(`Error ${action}ing application:`, error);
      alert(`Failed to ${action} application.`);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold uppercase tracking-widest text-neutral-dark-grey mb-8">Career Applications (ATS)</h1>
      
      {applications.length === 0 ? (
        <div className="text-neutral-medium-grey">No applications found.</div>
      ) : (
        <div className="space-y-6">
          {applications.map(app => (
            <div key={app.id} className="bg-white p-6 shadow-sm border border-neutral-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-neutral-black uppercase tracking-wider">{app.firstName} {app.lastName}</h3>
                  <span className={`text-[10px] px-2 py-1 uppercase tracking-widest font-bold ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
                
                <p className="text-sm font-bold text-primary-red uppercase tracking-widest mb-4">Applied for: {app.positionApply}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs text-neutral-medium-grey mb-4">
                  <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Email:</strong> {app.email}</p>
                  <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Phone:</strong> {app.phone}</p>
                  <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Date:</strong> {format(new Date(app.createdAt), 'dd MMM yyyy')}</p>
                  {app.expectedSalary && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Expected Salary:</strong> {app.expectedSalary}</p>}
                </div>

                {app.whyTao && (
                  <div className="text-sm text-neutral-medium-grey border-l-2 border-primary-red pl-4 italic mb-4">
                    "{app.whyTao}"
                  </div>
                )}

                <div className="flex gap-4">
                  <a href={app.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-red hover:text-neutral-black transition-colors">
                    <FiFileText /> View Resume
                  </a>
                  {app.portfolio && (
                    <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-dark-grey hover:text-primary-red transition-colors">
                      <FiLink /> View Portfolio
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 w-full sm:w-auto sm:min-w-[140px]">
                {app.status === 'pending' ? (
                  <>
                    <button 
                      onClick={() => handleStatusChange(app.id, 'approve')}
                      disabled={processingId === app.id}
                      className="px-4 py-3 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                    >
                      <FiCheck size={14} /> {processingId === app.id ? 'Sending...' : 'Approve & Email'}
                    </button>
                    <button 
                      onClick={() => handleStatusChange(app.id, 'reject')}
                      disabled={processingId === app.id}
                      className="px-4 py-3 bg-white border border-primary-red text-primary-red text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary-red hover:text-white disabled:opacity-50 transition-colors"
                    >
                      <FiX size={14} /> Reject & Email
                    </button>
                  </>
                ) : (
                  <div className="text-center px-4 py-3 bg-neutral-100 text-neutral-medium-grey text-[10px] font-bold uppercase tracking-widest">
                    Action Taken
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
