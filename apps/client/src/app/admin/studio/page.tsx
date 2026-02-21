'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import TeamMemberForm from '@/components/admin/TeamMemberForm';
import axios from 'axios';
import { TeamMember } from '@/types';
import { getImageUrl } from '@/utils/image';
import Image from 'next/image';
import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi';

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
    if (!confirm('Are you sure?')) return;
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/studio/team/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchMembers();
    } catch (error) {
        alert('Error deleting');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Studio Team</h1>
            <button onClick={() => setIsCreating(true)} className="flex items-center bg-primary-red text-white px-4 py-2 rounded">
                <FiPlus className="mr-2" /> Add Member
            </button>
        </div>

        {(isCreating || editingMember) && (
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

        <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 text-left">Image</th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Role</th>
                        <th className="p-4 text-left">Order</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.id} className="border-t">
                            <td className="p-4">
                                <div className="relative w-10 h-10 rounded overflow-hidden">
                                    <Image src={getImageUrl(member.image)} alt="" fill className="object-cover" />
                                </div>
                            </td>
                            <td className="p-4 font-medium">{member.name}</td>
                            <td className="p-4 text-gray-500">{member.role}</td>
                            <td className="p-4">{member.order}</td>
                            <td className="p-4 text-right space-x-2">
                                <button onClick={() => setEditingMember(member)} className="text-blue-500 hover:text-blue-700"><FiEdit /></button>
                                <button onClick={() => handleDelete(member.id)} className="text-red-500 hover:text-red-700"><FiTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </AdminLayout>
  );
}
