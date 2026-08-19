"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { uploadToCloudinary } from '@/utils/cloudinary';

const DEFAULT_INTRO = 'Join the TAO Architecture team. Share your background, the role you are applying for, and your supporting documents using the form below.';

const CareerPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [introText, setIntroText] = useState(DEFAULT_INTRO);

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        const res = await fetch(`${apiUrl}/pages/career-intro`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.content) setIntroText(data.content);
        }
      } catch { /* use default */ }
    };
    fetchIntro();
  }, []);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // 1. Upload files directly to Cloudinary
      let resumeUrl = null;
      let portfolioUrl = null;

      if (data.resume && data.resume[0]) {
        resumeUrl = await uploadToCloudinary(data.resume[0], 'careers');
      }
      if (data.portfolio && data.portfolio[0]) {
        portfolioUrl = await uploadToCloudinary(data.portfolio[0], 'careers');
      }

      if (!resumeUrl) {
        alert('Resume upload failed.');
        setIsSubmitting(false);
        return;
      }

      // 2. Build JSON payload
      const payload = { ...data, resume: resumeUrl, portfolio: portfolioUrl };
      delete payload.resume; // Ensure FileList objects are removed
      delete payload.portfolio;
      payload.resume = resumeUrl;
      payload.portfolio = portfolioUrl;

      // 3. Submit data to API
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/career`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      alert('Application submitted successfully!');
      reset(); // clear form
    } catch (error) {
      console.error(error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 border-b border-neutral-border pb-8">
          <h1 className="text-fluid-h1 font-agenda font-bold uppercase text-neutral-dark-grey">
            Career Application
          </h1>
          <p className="mt-4 max-w-2xl font-agenda tao-fs-desc text-neutral-medium-grey">
            {introText}
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                Phone Number
              </label>
              <input
                type="tel"
                {...register('phone', { required: true })}
                className="tao-fs-input w-full border-x-0 border-t-0 border-b border-neutral-medium-grey/30 bg-transparent px-0 pb-3 pt-2 font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none focus:ring-0"
              />
              {errors.phone && <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-primary-red">Required</span>}
            </div>
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
                disabled={isSubmitting}
                className="btn btn-outline-red disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting && <span className="inline-block w-4 h-4 border-2 border-primary-red border-t-transparent rounded-full animate-spin" />}
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CareerPage;
