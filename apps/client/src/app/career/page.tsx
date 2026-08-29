"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { uploadToCloudinary } from '@/utils/cloudinary';

const DEFAULT_INTRO = 'Join the TAO Architecture team. Share your background, the role you are applying for, and your supporting documents using the form below.';

const POSITION_OPTIONS = [
  '3D Visualizer',
  'Junior Architect (0-3 years of experience)',
  'Senior Architect (3+ years of experience)',
  'Interior Designer',
  'Architectural Intern',
  'Client Relationship Manager',
  'Draftsman',
  'Site Supervisor',
];

const SKILL_ROWS: Array<{ name: string; label: string }> = [
  { name: 'photoshop', label: 'Graphics and presentation (Photoshop)' },
  { name: 'autocad', label: 'Drafting (AutoCAD)' },
  { name: 'sketching', label: 'Free hand sketching' },
  { name: 'threedsketchup', label: '3D Modelling (Sketchup)' },
  { name: 'threedvray', label: '3D Rendering (VRay)' },
  { name: 'msoffice', label: 'MS Office' },
  { name: 'boq', label: 'BOQs and Estimation' },
  { name: 'communication', label: 'Client / Team communication' },
];
const SKILL_LEVELS = ['Excellent', 'Good', 'Average', 'Below Average', 'Not Applicable'];

const inputClass = 'tao-fs-input !text-base w-full border-x-0 border-t-0 border-b border-neutral-medium-grey/30 bg-transparent px-0 pb-3 pt-2 font-agenda text-neutral-dark-grey focus:border-primary-red focus:outline-none focus:ring-0';
const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-neutral-medium-grey';
const requiredError = <span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-primary-red">Required</span>;
const sectionHeadingClass = 'font-agenda text-xl font-bold uppercase tracking-[0.1em] text-neutral-dark-grey';
const subHeadingClass = 'font-agenda text-sm font-bold uppercase tracking-[0.12em] text-primary-red';

const CareerPage = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [introText, setIntroText] = useState(DEFAULT_INTRO);

  const maritalStatus = watch('maritalStatus');
  const addParentDetails = watch('parent_question');

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

  const uploadIfPresent = async (fileList: FileList | undefined) => {
    if (!fileList || !fileList[0]) return null;
    return uploadToCloudinary(fileList[0], 'careers');
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // 1. Resume is the only mandatory upload — everything else is optional.
      const resumeUrl = await uploadIfPresent(data.resume);
      if (!resumeUrl) {
        alert('Resume upload failed.');
        setIsSubmitting(false);
        return;
      }
      const [portfolioUrl, salarySlipUrl, refLetterUrl] = await Promise.all([
        uploadIfPresent(data.portfolio),
        uploadIfPresent(data.salarySlip),
        uploadIfPresent(data.refLetter),
      ]);

      // 2. Group the sectioned fields into the JSON blobs the backend stores
      // them as (education/experience/skills/references/familyDetails).
      const familyDetails = {
        parentDetailsAlso: Boolean(data.parent_question),
        father: { name: data.fatherName || '', occupation: data.fOccupation || '' },
        mother: { name: data.motherName || '', occupation: data.mOccupation || '' },
        spouse: { name: data.spouseName || '', occupation: data.sOccupation || '' },
      };

      const education = {
        ssc: { percentage: data.sscPercentage || '', institute: data.sscInstitute || '' },
        hsc: { percentage: data.hscPercentage || '', institute: data.hscInstitute || '' },
        graduation: {
          stream: data.graduationStream || '',
          percentage: data.graduationPercentage || '',
          institute: data.graduationInstitute || '',
          joiningYear: data.graduationJoining || '',
          passingYear: data.graduationPassing || '',
        },
        postGraduation: {
          stream: data.postGraduationStream || '',
          percentage: data.postGraduationPercentage || '',
          institute: data.postGraduationInstitute || '',
          joiningYear: data.postGraduationJoining || '',
          passingYear: data.postGraduationPassing || '',
        },
        achievements: data.educationalAchievements || '',
        otherQualifications: data.otherQualifications || '',
      };

      const experience = [
        { firmName: data.wExpOneFirmName, profile: data.wExpOneProfile, from: data.wExpOneFrom, to: data.wExpOneTo },
        { firmName: data.wExpTwoFirmName, profile: data.wExpTwoProfile, from: data.wExpTwoFrom, to: data.wExpTwoTo },
        { firmName: data.wExpThreeFirmName, profile: data.wExpThreeProfile, from: data.wExpThreeFrom, to: data.wExpThreeTo },
      ].filter((exp) => exp.firmName || exp.profile || exp.from || exp.to);

      const skills = {
        photoshop: data.photoshop || '',
        autocad: data.autocad || '',
        sketching: data.sketching || '',
        threedsketchup: data.threedsketchup || '',
        threedvray: data.threedvray || '',
        msoffice: data.msoffice || '',
        boq: data.boq || '',
        communication: data.communication || '',
        softwareCompetency: data.softwareCompetency || '',
        otherSkills: data.otherSkills || '',
      };

      const references = [
        { name: data.refOneName, designation: data.refOneDesignation, contact: data.refOneContact, email: data.refOneEmail },
        { name: data.refTwoName, designation: data.refTwoDesignation, contact: data.refTwoContact, email: data.refTwoEmail },
      ].filter((r) => r.name || r.designation || r.contact || r.email);

      const payload = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        phone: data.phone,
        landline: data.landline,
        email: data.email,
        positionApply: data.positionApply,
        availabilityDate: data.availabilityDate,
        whyTao: data.whyTao,
        address: data.address,
        permanentAddress: data.permanentAddress,
        birthDate: data.birthDate,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        familyDetails: JSON.stringify(familyDetails),
        education: JSON.stringify(education),
        experience: JSON.stringify(experience),
        skills: JSON.stringify(skills),
        references: JSON.stringify(references),
        expectedSalary: data.expectedSalary,
        commitmentPeriod: data.commitmentPeriod,
        resume: resumeUrl,
        portfolio: portfolioUrl,
        salarySlip: salarySlipUrl,
        refLetter: refLetterUrl,
      };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/career`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert('Application submitted successfully!');
      reset();
    } catch (error) {
      console.error(error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 border-b border-neutral-border pb-8">
          <h1 className="text-fluid-h1 font-agenda font-bold uppercase text-neutral-dark-grey">
            Career Application
          </h1>
          <p className="mt-4 max-w-2xl font-agenda tao-fs-desc text-neutral-medium-grey">
            {introText}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 border border-neutral-border bg-neutral-bg px-6 py-8 md:px-10">

          {/* Position / availability / motivation */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>Position Applied for</label>
              <select {...register('positionApply', { required: true })} className={inputClass} defaultValue="">
                <option value="" disabled>Select Position</option>
                {POSITION_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {errors.positionApply && requiredError}
            </div>
            <div>
              <label className={labelClass}>Date of Availability</label>
              <input type="date" {...register('availabilityDate', { required: true })} className={inputClass} />
              {errors.availabilityDate && requiredError}
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Why TAO?</label>
              <textarea rows={4} {...register('whyTao', { required: true })} className={inputClass} placeholder="Explain why TAO?" />
              {errors.whyTao && requiredError}
            </div>
          </div>

          {/* Personal Information */}
          <div className="border-t border-neutral-border pt-8">
            <h2 className={sectionHeadingClass}>Personal Information</h2>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className={labelClass}>First Name</label>
                <input {...register('firstName', { required: true })} className={inputClass} />
                {errors.firstName && requiredError}
              </div>
              <div>
                <label className={labelClass}>Middle Name</label>
                <input {...register('middleName', { required: true })} className={inputClass} />
                {errors.middleName && requiredError}
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input {...register('lastName', { required: true })} className={inputClass} />
                {errors.lastName && requiredError}
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="tel" {...register('phone', { required: true })} className={inputClass} />
                {errors.phone && requiredError}
              </div>
              <div>
                <label className={labelClass}>Landline Number</label>
                <input type="tel" {...register('landline')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Contact Email</label>
                <input type="email" {...register('email', { required: true })} className={inputClass} />
                {errors.email && requiredError}
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Current Address</label>
                <textarea rows={3} {...register('address', { required: true })} className={inputClass} />
                {errors.address && requiredError}
              </div>
              <div>
                <label className={labelClass}>Date of Birth</label>
                <input type="date" {...register('birthDate', { required: true })} className={inputClass} />
                {errors.birthDate && requiredError}
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Permanent Address</label>
                <textarea rows={3} {...register('permanentAddress')} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Gender</label>
                <select {...register('gender', { required: true })} className={inputClass} defaultValue="">
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to disclose">Prefer not to disclose</option>
                </select>
                {errors.gender && requiredError}
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Marital Status</label>
                <select {...register('maritalStatus', { required: true })} className={inputClass} defaultValue="">
                  <option value="" disabled>Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Prefer not to disclose">Prefer not to disclose</option>
                </select>
                {errors.maritalStatus && requiredError}
              </div>
            </div>

            {maritalStatus === 'Married' && (
              <div className="mt-6 grid grid-cols-1 gap-6 border-t border-neutral-border/60 pt-6 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Spouse's Name</label>
                  <input {...register('spouseName')} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Spouse's Occupation</label>
                  <input {...register('sOccupation')} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">
                    <input type="checkbox" {...register('parent_question')} className="h-4 w-4" />
                    Add Parent Details Also
                  </label>
                </div>
              </div>
            )}

            {(maritalStatus === 'Single' || (maritalStatus === 'Married' && addParentDetails)) && (
              <div className="mt-6 grid grid-cols-1 gap-6 border-t border-neutral-border/60 pt-6 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Father's Name</label>
                  <input {...register('fatherName')} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Father's Occupation</label>
                  <input {...register('fOccupation')} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Mother's Name</label>
                  <input {...register('motherName')} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Mother's Occupation</label>
                  <input {...register('mOccupation')} className={inputClass} />
                </div>
              </div>
            )}
          </div>

          {/* Academic Performance */}
          <div className="border-t border-neutral-border pt-8">
            <h2 className={`${sectionHeadingClass} text-center`}>Academic Performance</h2>

            <div className="mt-6">
              <h3 className={subHeadingClass}>High School Details</h3>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Class X Percentage</label>
                  <input {...register('sscPercentage', { required: true })} className={inputClass} />
                  {errors.sscPercentage && requiredError}
                </div>
                <div>
                  <label className={labelClass}>Institute / School / University</label>
                  <input {...register('sscInstitute', { required: true })} className={inputClass} />
                  {errors.sscInstitute && requiredError}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className={subHeadingClass}>Senior School Details</h3>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Class XII Percentage</label>
                  <input {...register('hscPercentage', { required: true })} className={inputClass} />
                  {errors.hscPercentage && requiredError}
                </div>
                <div>
                  <label className={labelClass}>Institute / School / University</label>
                  <input {...register('hscInstitute', { required: true })} className={inputClass} />
                  {errors.hscInstitute && requiredError}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className={subHeadingClass}>Graduation Details</h3>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-5">
                <div>
                  <label className={labelClass}>Stream</label>
                  <input {...register('graduationStream', { required: true })} className={inputClass} />
                  {errors.graduationStream && requiredError}
                </div>
                <div>
                  <label className={labelClass}>Percentage</label>
                  <input {...register('graduationPercentage', { required: true })} className={inputClass} />
                  {errors.graduationPercentage && requiredError}
                </div>
                <div>
                  <label className={labelClass}>Institute / School / University</label>
                  <input {...register('graduationInstitute', { required: true })} className={inputClass} />
                  {errors.graduationInstitute && requiredError}
                </div>
                <div>
                  <label className={labelClass}>Joining Year</label>
                  <input {...register('graduationJoining', { required: true })} className={inputClass} />
                  {errors.graduationJoining && requiredError}
                </div>
                <div>
                  <label className={labelClass}>Passing Year</label>
                  <input {...register('graduationPassing', { required: true })} className={inputClass} />
                  {errors.graduationPassing && requiredError}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className={subHeadingClass}>Post-Graduation Details</h3>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-5">
                <div>
                  <label className={labelClass}>Stream</label>
                  <input {...register('postGraduationStream')} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Percentage</label>
                  <input {...register('postGraduationPercentage')} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Institute / School / University</label>
                  <input {...register('postGraduationInstitute')} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Joining Year</label>
                  <input {...register('postGraduationJoining')} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Passing Year</label>
                  <input {...register('postGraduationPassing')} className={inputClass} />
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={labelClass}>Educational Achievements</label>
                <textarea rows={4} {...register('educationalAchievements')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Other Qualifications</label>
                <textarea rows={4} {...register('otherQualifications')} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="border-t border-neutral-border pt-8">
            <h2 className={`${sectionHeadingClass} text-center`}>Technical Skills</h2>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-border">
                    <th className="py-2 text-left text-[10px] font-bold uppercase tracking-wider text-neutral-medium-grey"></th>
                    {SKILL_LEVELS.map((level) => (
                      <th key={level} className="px-2 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-neutral-medium-grey">
                        {level}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SKILL_ROWS.map((row) => (
                    <tr key={row.name} className="border-b border-neutral-border/60">
                      <td className="py-3 pr-4 font-agenda text-neutral-dark-grey">{row.label}</td>
                      {SKILL_LEVELS.map((level) => (
                        <td key={level} className="px-2 py-3 text-center">
                          <input type="radio" value={level} {...register(row.name, { required: true })} className="h-4 w-4" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {SKILL_ROWS.some((row) => (errors as any)[row.name]) && (
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-red">Please rate every skill above.</p>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={labelClass}>Other Software Competency</label>
                <input {...register('softwareCompetency')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Other Skills</label>
                <input {...register('otherSkills')} className={inputClass} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={labelClass}>Resume</label>
                <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg" {...register('resume', { required: true })}
                  className="block w-full text-sm text-neutral-medium-grey file:mr-4 file:border file:border-neutral-dark-grey file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.14em] file:text-neutral-dark-grey hover:file:bg-neutral-dark-grey hover:file:text-white" />
                <p className="mt-2 text-[11px] text-neutral-medium-grey">Upload file size limit 3MB. File type must be .pdf, .doc, .docx, .jpg</p>
                {errors.resume && requiredError}
              </div>
              <div>
                <label className={labelClass}>Portfolio</label>
                <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg" {...register('portfolio')}
                  className="block w-full text-sm text-neutral-medium-grey file:mr-4 file:border file:border-neutral-dark-grey file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.14em] file:text-neutral-dark-grey hover:file:bg-neutral-dark-grey hover:file:text-white" />
                <p className="mt-2 text-[11px] text-neutral-medium-grey">Upload file size limit 10MB. File type must be .pdf, .doc, .docx, .jpg</p>
              </div>
            </div>
          </div>

          {/* Employment History */}
          <div className="border-t border-neutral-border pt-8">
            <h2 className={`${sectionHeadingClass} text-center`}>Employment History</h2>

            {[1, 2, 3].map((n) => {
              const prefix = n === 1 ? 'wExpOne' : n === 2 ? 'wExpTwo' : 'wExpThree';
              return (
                <div key={n} className="mt-6">
                  <h3 className={subHeadingClass}>Work Experience {n}</h3>
                  <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div>
                      <label className={labelClass}>Name of Firm</label>
                      <input {...register(`${prefix}FirmName`)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Work Profile</label>
                      <input {...register(`${prefix}Profile`)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>From</label>
                      <input type="date" {...register(`${prefix}From`)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>To</label>
                      <input type="date" {...register(`${prefix}To`)} className={inputClass} />
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={labelClass}>Recent Salary Slip</label>
                <input type="file" accept=".pdf,.doc,.docx" {...register('salarySlip')}
                  className="block w-full text-sm text-neutral-medium-grey file:mr-4 file:border file:border-neutral-dark-grey file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.14em] file:text-neutral-dark-grey hover:file:bg-neutral-dark-grey hover:file:text-white" />
                <p className="mt-2 text-[11px] text-neutral-medium-grey">Upload file size limit 3MB. File type must be .pdf, .doc, .docx</p>
              </div>
            </div>
          </div>

          {/* Employment Terms */}
          <div className="border-t border-neutral-border pt-8">
            <h2 className={`${sectionHeadingClass} text-center`}>Employment Terms</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={labelClass}>Expected Salary</label>
                <input {...register('expectedSalary', { required: true })} className={inputClass} />
                {errors.expectedSalary && requiredError}
              </div>
              <div>
                <label className={labelClass}>Period of Commitment to work at TAO Studio</label>
                <input {...register('commitmentPeriod', { required: true })} className={inputClass} />
                {errors.commitmentPeriod && requiredError}
              </div>
            </div>
          </div>

          {/* References */}
          <div className="border-t border-neutral-border pt-8">
            <h2 className={`${sectionHeadingClass} text-center`}>References</h2>

            {[1, 2].map((n) => {
              const prefix = n === 1 ? 'refOne' : 'refTwo';
              return (
                <div key={n} className="mt-6">
                  <h3 className={subHeadingClass}>Referee #{n}</h3>
                  <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input {...register(`${prefix}Name`)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Designation</label>
                      <input {...register(`${prefix}Designation`)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Contact Number</label>
                      <input type="tel" {...register(`${prefix}Contact`)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input type="email" {...register(`${prefix}Email`)} className={inputClass} />
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className={labelClass}>Reference Letter</label>
                <p className="mb-2 text-[11px] text-neutral-medium-grey">(Kindly attach reference letter if applicable)</p>
                <input type="file" accept=".pdf,.doc,.docx" {...register('refLetter')}
                  className="block w-full text-sm text-neutral-medium-grey file:mr-4 file:border file:border-neutral-dark-grey file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.14em] file:text-neutral-dark-grey hover:file:bg-neutral-dark-grey hover:file:text-white" />
                <p className="mt-2 text-[11px] text-neutral-medium-grey">Upload file size limit 3MB. File type must be .pdf, .doc, .docx</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-neutral-border pt-8">
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
