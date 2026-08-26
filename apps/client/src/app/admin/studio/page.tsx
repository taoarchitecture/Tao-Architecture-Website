'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import TeamMemberForm from '@/components/admin/TeamMemberForm';
import axios from 'axios';
import { TeamMember } from '@/types';
import { getImageUrl } from '@/utils/image';
import Image from 'next/image';
import { FiEdit, FiTrash, FiPlus, FiUser, FiAlignLeft } from 'react-icons/fi';

export default function AdminStudioPage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.replace('/admin/login');
      return;
    }
    fetchMembers();
  }, [router]);

  const fetchMembers = async () => {
    try {
      // Relative path — goes through this app's own proxy, which knows Express
      // nests team members under /api/studio/team. NEXT_PUBLIC_API_URL can't be
      // used directly here: in production it points at the external Express
      // server, which has no route at bare /studio.
      const { data } = await axios.get('/api/studio');
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this team member? This cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/studio/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMembers();
    } catch (error) {
      alert('Error deleting team member.');
    }
  };

  const showForm = isCreating || editingMember !== null;

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-agenda text-2xl font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">Studio Team</h1>
            <p className="mt-1 text-sm text-neutral-medium-grey">
              Manage team members shown on the Studio page — including photos, roles, and full biographies.
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => { setEditingMember(null); setIsCreating(true); }}
              className="flex items-center gap-2 bg-primary-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-dark-grey"
            >
              <FiPlus size={16} />
              Add Member
            </button>
          )}
        </div>

        {/* Create / Edit Form */}
        {showForm && (
          <div className="mb-8">
            <TeamMemberForm
              initialData={editingMember || undefined}
              onSuccess={() => {
                setEditingMember(null);
                setIsCreating(false);
                fetchMembers();
              }}
              onCancel={() => {
                setEditingMember(null);
                setIsCreating(false);
              }}
            />
          </div>
        )}

        {/* Team Members Table */}
        {members.length === 0 ? (
          <div className="border border-neutral-border bg-white p-12 text-center">
            <FiUser className="mx-auto mb-3 text-neutral-medium-grey" size={40} />
            <p className="text-sm text-neutral-medium-grey">No team members yet. Click "Add Member" to get started.</p>
          </div>
        ) : (
          <div className="overflow-hidden border border-neutral-border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b border-neutral-border bg-neutral-bg">
                <tr>
                  <th className="w-16 p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-medium-grey">Photo</th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-medium-grey">Name & Role</th>
                  <th className="w-64 p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-medium-grey">
                    <span className="flex items-center gap-1"><FiAlignLeft size={12} /> Biography Preview</span>
                  </th>
                  <th className="w-20 p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-medium-grey">Order</th>
                  <th className="w-20 p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-medium-grey">Status</th>
                  <th className="w-24 p-4 text-right text-xs font-semibold uppercase tracking-wider text-neutral-medium-grey">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-border">
                {members.map(member => {
                  const bioPreview = member.bio && member.bio.length > 0
                    ? member.bio[0].slice(0, 120) + (member.bio[0].length > 120 ? '…' : '')
                    : 'No biography added yet.';

                  const imgUrl = getImageUrl(member.image);

                  return (
                    <tr key={member.id} className="transition-colors hover:bg-neutral-bg">
                      {/* Photo */}
                      <td className="p-4">
                        <div className="relative h-14 w-12 overflow-hidden border border-neutral-border bg-neutral-bg">
                          {imgUrl ? (
                            <Image src={imgUrl} alt={member.name} fill sizes="48px" className="object-cover object-top" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FiUser className="text-neutral-medium-grey" size={20} />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Name & Role */}
                      <td className="p-4">
                        <div className="font-semibold text-neutral-dark-grey">{member.name}</div>
                        <div className="mt-0.5 text-xs text-neutral-medium-grey">{member.role}</div>
                      </td>

                      {/* Bio Preview */}
                      <td className="p-4">
                        <p className="text-xs italic leading-relaxed text-neutral-medium-grey">
                          {bioPreview}
                        </p>
                        {member.bio && member.bio.length > 1 && (
                          <span className="text-xs text-primary-red mt-1 inline-block">
                            +{member.bio.length - 1} more paragraph{member.bio.length > 2 ? 's' : ''}
                          </span>
                        )}
                      </td>

                      {/* Order */}
                      <td className="p-4 font-mono text-neutral-dark-grey">{member.order}</td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          member.active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-neutral-bg text-neutral-medium-grey'
                        }`}>
                          {member.active ? 'Visible' : 'Hidden'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => { setIsCreating(false); setEditingMember(member); }}
                            title="Edit member"
                            className="text-neutral-medium-grey transition hover:text-primary-red"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            title="Delete member"
                            className="text-neutral-medium-grey transition hover:text-primary-red"
                          >
                            <FiTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
