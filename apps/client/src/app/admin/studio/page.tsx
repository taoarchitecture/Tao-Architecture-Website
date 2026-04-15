'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import TeamMemberForm from '@/components/admin/TeamMemberForm';
import axios from 'axios';
import { TeamMember } from '@/types';
import { getImageUrl } from '@/utils/image';
import Image from 'next/image';
import { FiEdit, FiTrash, FiPlus, FiUser, FiAlignLeft } from 'react-icons/fi';

export default function AdminStudioPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/studio/team`);
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this team member? This cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/studio/team/${id}`, {
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
            <h1 className="text-2xl font-bold text-gray-900">Studio Team</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage team members shown on the Studio page — including photos, roles, and full biographies.
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => { setEditingMember(null); setIsCreating(true); }}
              className="flex items-center gap-2 bg-primary-red text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
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
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FiUser className="mx-auto text-gray-300 mb-3" size={40} />
            <p className="text-gray-500 text-sm">No team members yet. Click "Add Member" to get started.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">Photo</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name & Role</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-64">
                    <span className="flex items-center gap-1"><FiAlignLeft size={12} /> Biography Preview</span>
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">Order</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">Status</th>
                  <th className="p-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map(member => {
                  const bioPreview = member.bio && member.bio.length > 0
                    ? member.bio[0].slice(0, 120) + (member.bio[0].length > 120 ? '…' : '')
                    : 'No biography added yet.';

                  const imgUrl = getImageUrl(member.image);

                  return (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      {/* Photo */}
                      <td className="p-4">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          {imgUrl ? (
                            <Image src={imgUrl} alt={member.name} fill className="object-cover object-top" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FiUser className="text-gray-300" size={20} />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Name & Role */}
                      <td className="p-4">
                        <div className="font-semibold text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{member.role}</div>
                      </td>

                      {/* Bio Preview */}
                      <td className="p-4">
                        <p className="text-xs text-gray-500 leading-relaxed italic">
                          {bioPreview}
                        </p>
                        {member.bio && member.bio.length > 1 && (
                          <span className="text-xs text-primary-red mt-1 inline-block">
                            +{member.bio.length - 1} more paragraph{member.bio.length > 2 ? 's' : ''}
                          </span>
                        )}
                      </td>

                      {/* Order */}
                      <td className="p-4 text-gray-700 font-mono">{member.order}</td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          member.active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
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
                            className="text-blue-500 hover:text-blue-700 transition"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            title="Delete member"
                            className="text-red-400 hover:text-red-600 transition"
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
