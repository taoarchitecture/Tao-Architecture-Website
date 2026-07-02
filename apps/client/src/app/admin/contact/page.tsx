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
          <div className="text-neutral-medium-grey uppercase tracking-widest text-xs">Loading messages...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="font-agenda text-3xl font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Messages</h1>
        <p className="mt-2 text-sm uppercase tracking-wide text-neutral-medium-grey">
          {submissions.length} contact {submissions.length === 1 ? 'submission' : 'submissions'}
        </p>
      </div>

      <div className="flex gap-6 h-[calc(100vh-220px)]">
        {/* Message List */}
        <div className="w-full overflow-y-auto border border-neutral-border bg-white shadow-sm md:w-2/5">
          {submissions.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-neutral-medium-grey">
              No messages yet
            </div>
          ) : (
            submissions.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`cursor-pointer border-b border-neutral-border p-5 transition-all duration-200 ${
                  selectedMessage?.id === msg.id
                    ? 'border-l-2 border-l-primary-red bg-neutral-bg'
                    : 'border-l-2 border-l-transparent hover:bg-neutral-bg'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm text-neutral-dark-grey font-agenda">
                    {msg.firstName} {msg.lastName}
                  </span>
                  <span className="text-[10px] text-neutral-medium-grey">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
                <p className="text-xs font-bold text-neutral-dark-grey uppercase tracking-wider mb-1">{msg.subject}</p>
                <p className="truncate text-xs text-neutral-medium-grey">{msg.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="hidden flex-1 overflow-y-auto border border-neutral-border bg-white p-8 shadow-sm md:block">
          {selectedMessage ? (
            <div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="mb-1 font-agenda text-xl font-bold uppercase tracking-[0.08em] text-neutral-dark-grey">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-neutral-medium-grey">
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
                    <p className="mt-1 text-xs text-neutral-medium-grey">Company: {selectedMessage.companyName}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="p-2 text-neutral-medium-grey transition-colors hover:text-primary-red"
                  title="Delete message"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="border-t border-neutral-border pt-6">
                <p className="text-sm text-neutral-dark-grey font-agenda leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="mt-8 border-t border-neutral-border pt-6">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="inline-block bg-neutral-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-red transition-all duration-300"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-medium-grey">
              Select a message to read
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
