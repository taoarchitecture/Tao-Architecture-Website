'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

const CareerPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
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
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      
      {/* Page Header Banner */}
      <div className="relative z-10 container mx-auto px-4 mt-8 mb-16">
        <ScrollReveal variant="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-agenda uppercase tracking-wider mb-2 text-neutral-dark-grey">
            Join Our <span className="font-bold text-primary-gold">Team</span>
          </h1>
          <div className="w-16 h-[2px] bg-primary-red mb-8"></div>
        </ScrollReveal>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="bg-neutral-bg-warm p-8 md:p-12 shadow-elegant border border-neutral-border">
              <h2 className="text-2xl font-light font-agenda uppercase text-neutral-dark-grey tracking-wider mb-8">Application Form</h2>
              
              {submitStatus === 'success' ? (
                <div className="py-16 text-center animate-fadeInUp">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-xl font-bold font-agenda text-neutral-dark-grey mb-2 uppercase tracking-wide">Application Submitted!</p>
                  <p className="text-base text-neutral-light-grey mb-8 font-agenda">We will review your profile and get back to you.</p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="btn btn-outline"
                  >
                    SUBMIT ANOTHER
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 text-primary-red p-4 text-sm font-agenda uppercase tracking-widest text-center border border-red-100">
                      Failed to submit application. Please try again.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="text"
                        id="firstName"
                        {...register('firstName', { required: true })}
                        placeholder="First Name*"
                        className="w-full bg-transparent border-b border-neutral-border py-3 px-0 focus:border-primary-red transition-colors duration-300 outline-none font-agenda text-neutral-dark-grey placeholder-transparent peer"
                      />
                      <label htmlFor="firstName" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-neutral-light-grey transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary-red uppercase">First Name*</label>
                      {errors.firstName && <span className="absolute right-0 bottom-3 text-primary-red text-[10px] uppercase font-bold tracking-widest">Required</span>}
                    </div>
                    
                    <div className="relative group">
                      <input
                        type="text"
                        id="lastName"
                        {...register('lastName', { required: true })}
                        placeholder="Last Name*"
                        className="w-full bg-transparent border-b border-neutral-border py-3 px-0 focus:border-primary-red transition-colors duration-300 outline-none font-agenda text-neutral-dark-grey placeholder-transparent peer"
                      />
                      <label htmlFor="lastName" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-neutral-light-grey transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary-red uppercase">Last Name*</label>
                      {errors.lastName && <span className="absolute right-0 bottom-3 text-primary-red text-[10px] uppercase font-bold tracking-widest">Required</span>}
                    </div>
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      {...register('email', { required: true })}
                      placeholder="Email ID*"
                      className="w-full bg-transparent border-b border-neutral-border py-3 px-0 focus:border-primary-red transition-colors duration-300 outline-none font-agenda text-neutral-dark-grey placeholder-transparent peer"
                    />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-neutral-light-grey transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary-red uppercase">Email ID*</label>
                    {errors.email && <span className="absolute right-0 bottom-3 text-primary-red text-[10px] uppercase font-bold tracking-widest">Required</span>}
                  </div>

                  <div className="relative">
                    <select
                      id="positionApply"
                      {...register('positionApply', { required: true })}
                      className="w-full bg-transparent border-b border-neutral-border py-3 px-0 focus:border-primary-red transition-colors duration-300 outline-none font-agenda text-neutral-dark-grey appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>Select Position*</option>
                      <option value="Architect">Architect</option>
                      <option value="Interior Designer">Interior Designer</option>
                      <option value="Intern">Intern</option>
                    </select>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-neutral-light-grey">▼</span>
                    {errors.positionApply && <span className="absolute right-6 bottom-3 text-primary-red text-[10px] uppercase font-bold tracking-widest">Required</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div>
                      <p className="text-xs font-bold tracking-widest text-neutral-dark-grey uppercase mb-2">Resume / CV (PDF)*</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        {...register('resume', { required: true })}
                        className="w-full focus-ring"
                      />
                      {errors.resume && <span className="text-primary-red text-[10px] uppercase font-bold tracking-widest mt-1 block">Required</span>}
                    </div>

                    <div>
                      <p className="text-xs font-bold tracking-widest text-neutral-dark-grey uppercase mb-2">Portfolio (PDF/Images)</p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        {...register('portfolio')}
                        className="w-full focus-ring"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-primary min-w-[180px] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white border-solid rounded-full animate-spinSlow"></div>
                           SUBMITTING
                        </span>
                      ) : 'SUBMIT APPLICATION'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
};

export default CareerPage;
