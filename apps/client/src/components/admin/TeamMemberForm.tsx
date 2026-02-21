import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TeamMember } from '@/types';
import Image from 'next/image';
import { getImageUrl } from '@/utils/image';

interface Props {
  initialData?: TeamMember;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TeamMemberForm({ initialData, onSuccess, onCancel }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<TeamMember>({
    defaultValues: initialData || { active: true, order: 0 }
  });

  const onSubmit = async (data: TeamMember) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('role', data.role);
    formData.append('bio', JSON.stringify(data.bio || [])); // Simplified
    formData.append('order', String(data.order));
    formData.append('active', String(data.active));

    const fileInput = document.getElementById('memberImage') as HTMLInputElement;
    if (fileInput.files?.[0]) {
        formData.append('image', fileInput.files[0]);
    }

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' };
      
      if (initialData?.id) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/studio/team/${initialData.id}`, formData, { headers });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/studio/team`, formData, { headers });
      }
      onSuccess();
    } catch (error) {
      alert('Error saving team member');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 p-4 rounded">
      <div className="grid grid-cols-2 gap-4">
        <div>
            <label className="block text-xs mb-1">Name</label>
            <input {...register('name', { required: true })} className="w-full border p-2 rounded" />
        </div>
        <div>
            <label className="block text-xs mb-1">Role</label>
            <input {...register('role', { required: true })} className="w-full border p-2 rounded" />
        </div>
      </div>
      <div>
        <label className="block text-xs mb-1">Order</label>
        <input type="number" {...register('order')} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-xs mb-1">Image</label>
        <input type="file" id="memberImage" className="w-full" />
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-3 py-1 text-gray-500">Cancel</button>
        <button disabled={submitting} className="px-3 py-1 bg-primary-red text-white rounded">Save</button>
      </div>
    </form>
  );
}
