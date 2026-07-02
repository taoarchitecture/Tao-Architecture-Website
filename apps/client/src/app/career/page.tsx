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
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 border-b border-neutral-border pb-8">
          <h1 className="text-fluid-h1 font-agenda font-bold uppercase text-neutral-dark-grey">
            Career Application
          </h1>
          <p className="mt-4 max-w-2xl font-agenda tao-fs-desc text-neutral-medium-grey">
            Join the TAO Architecture team. Share your background, the role you are applying for,
            and your supporting documents using the form below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 border border-neutral-border bg-neutral-bg px-6 py-8 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-medium-grey">
                First Name
              </label>
              <input
                {...register('firstName', { required: true })}
                className="tao-fs-input w-full border-x-0 border-t-0 border-b border-neutral-medium-grey/30 bg-transparent px-0 pb-3 pt-2 font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none focus:ring-0"
              />
              {errors.firstName && <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-primary-red">Required</span>}
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-medium-grey">
                Last Name
              </label>
              <input
                {...register('lastName', { required: true })}
                className="tao-fs-input w-full border-x-0 border-t-0 border-b border-neutral-medium-grey/30 bg-transparent px-0 pb-3 pt-2 font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none focus:ring-0"
              />
              {errors.lastName && <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-primary-red">Required</span>}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-medium-grey">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="tao-fs-input w-full border-x-0 border-t-0 border-b border-neutral-medium-grey/30 bg-transparent px-0 pb-3 pt-2 font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none focus:ring-0"
            />
            {errors.email && <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-primary-red">Required</span>}
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-medium-grey">
              Position Applying For
            </label>
            <select
              {...register('positionApply', { required: true })}
              className="tao-fs-input w-full border-x-0 border-t-0 border-b border-neutral-medium-grey/30 bg-transparent px-0 pb-3 pt-2 font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none focus:ring-0"
            >
              <option value="">Select Position</option>
              <option value="Architect">Architect</option>
              <option value="Interior Designer">Interior Designer</option>
              <option value="Intern">Intern</option>
            </select>
            {errors.positionApply && <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-primary-red">Required</span>}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-medium-grey">
                Resume (PDF/DOC)
              </label>
              <input
                type="file"
                {...register('resume', { required: true })}
                className="block w-full text-sm text-neutral-medium-grey file:mr-4 file:border file:border-neutral-dark-grey file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.14em] file:text-neutral-dark-grey hover:file:bg-neutral-dark-grey hover:file:text-white"
              />
              {errors.resume && <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-primary-red">Required</span>}
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-medium-grey">
                Portfolio (Optional)
              </label>
              <input
                type="file"
                {...register('portfolio')}
                className="block w-full text-sm text-neutral-medium-grey file:mr-4 file:border file:border-neutral-dark-grey file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.14em] file:text-neutral-dark-grey hover:file:bg-neutral-dark-grey hover:file:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="btn btn-outline-red"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CareerPage;
