'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { ContactSubmission } from '@/types';
import { FiTrash2, FiMail, FiUser, FiClock } from 'react-icons/fi';

export default function AdminContactPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/admin/login'); return; }
    fetchSubmissions();
  }, [router]);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(prev => prev.filter(s => s.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error) {
      console.error(error);
      alert('Error deleting message');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-neutral-light-grey uppercase tracking-widest text-xs">Loading messages...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-dark-grey font-agenda">MESSAGES</h1>
        <p className="text-neutral-light-grey mt-2 text-sm tracking-wide uppercase">
          {submissions.length} contact {submissions.length === 1 ? 'submission' : 'submissions'}
        </p>
      </div>

      <div className="flex gap-6 h-[calc(100vh-220px)]">
        {/* Message List */}
        <div className="w-full md:w-2/5 bg-white shadow-sm overflow-y-auto">
          {submissions.length === 0 ? (
            <div className="flex items-center justify-center h-full text-neutral-light-grey text-sm">
              No messages yet
            </div>
          ) : (
            submissions.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-5 border-b border-gray-100 cursor-pointer transition-all duration-200 ${
                  selectedMessage?.id === msg.id
                    ? 'bg-gray-50 border-l-2 border-l-primary-red'
                    : 'hover:bg-gray-50 border-l-2 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm text-neutral-dark-grey font-agenda">
                    {msg.firstName} {msg.lastName}
                  </span>
                  <span className="text-[10px] text-neutral-light-grey">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
                <p className="text-xs font-bold text-neutral-dark-grey uppercase tracking-wider mb-1">{msg.subject}</p>
                <p className="text-xs text-neutral-light-grey truncate">{msg.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="hidden md:block flex-1 bg-white shadow-sm p-8 overflow-y-auto">
          {selectedMessage ? (
            <div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-bold text-neutral-dark-grey font-agenda mb-1">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-neutral-light-grey">
                    <span className="flex items-center gap-1">
                      <FiUser size={12} /> {selectedMessage.firstName} {selectedMessage.lastName}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMail size={12} /> {selectedMessage.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock size={12} /> {formatDate(selectedMessage.createdAt)}
                    </span>
                  </div>
                  {selectedMessage.companyName && (
                    <p className="text-xs text-neutral-light-grey mt-1">Company: {selectedMessage.companyName}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="text-neutral-light-grey hover:text-red-500 transition-colors p-2"
                  title="Delete message"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <p className="text-sm text-neutral-dark-grey font-agenda leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="inline-block bg-neutral-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-light-grey text-sm">
              Select a message to read
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
