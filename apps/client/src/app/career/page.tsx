"use client";

import { useForm } from 'react-hook-form';
import axios from 'axios';

const CareerPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    // Append simple fields
    for (const key in data) {
      if (key !== 'resume' && key !== 'portfolio') {
        formData.append(key, data[key]);
      }
    }
    // Append files
    if (data.resume && data.resume[0]) formData.append('resume', data.resume[0]);
    if (data.portfolio && data.portfolio[0]) formData.append('portfolio', data.portfolio[0]);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/career/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Application submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error submitting application');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Career Application</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              {...register('firstName', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border p-2"
            />
            {errors.firstName && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              {...register('lastName', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border p-2"
            />
            {errors.lastName && <span className="text-red-500 text-sm">Required</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border p-2"
          />
          {errors.email && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Position Applying For</label>
            <select
                {...register('positionApply', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border p-2"
            >
                <option value="">Select Position</option>
                <option value="Architect">Architect</option>
                <option value="Interior Designer">Interior Designer</option>
                <option value="Intern">Intern</option>
            </select>
            {errors.positionApply && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Resume (PDF/Doc)</label>
          <input
            type="file"
            {...register('resume', { required: true })}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {errors.resume && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Portfolio (PDF/Images)</label>
          <input
            type="file"
            {...register('portfolio')}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default CareerPage;
