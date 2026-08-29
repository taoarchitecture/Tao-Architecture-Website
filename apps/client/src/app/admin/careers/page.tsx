"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FiCheck, FiX, FiFileText, FiLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { format } from 'date-fns';
import AdminLayout from '@/components/admin/AdminLayout';

interface Application {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  landline?: string;
  positionApply: string;
  status: 'pending' | 'approved' | 'rejected' | 'trash';
  resume: string;
  portfolio?: string;
  salarySlip?: string;
  refLetter?: string;
  createdAt: string;
  whyTao?: string;
  availabilityDate?: string;
  address?: string;
  permanentAddress?: string;
  birthDate?: string;
  gender?: string;
  maritalStatus?: string;
  familyDetails?: string;
  education?: string;
  experience?: string;
  skills?: string;
  references?: string;
  expectedSalary?: string;
  commitmentPeriod?: string;
}

function safeParseJSON<T>(value?: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

type FamilyDetails = {
  parentDetailsAlso?: boolean;
  father?: { name?: string; occupation?: string };
  mother?: { name?: string; occupation?: string };
  spouse?: { name?: string; occupation?: string };
};

type EducationDetails = {
  ssc?: { percentage?: string; institute?: string };
  hsc?: { percentage?: string; institute?: string };
  graduation?: { stream?: string; percentage?: string; institute?: string; joiningYear?: string; passingYear?: string };
  postGraduation?: { stream?: string; percentage?: string; institute?: string; joiningYear?: string; passingYear?: string };
  achievements?: string;
  otherQualifications?: string;
};

type WorkExperienceEntry = { firmName?: string; profile?: string; from?: string; to?: string };
type RefereeEntry = { name?: string; designation?: string; contact?: string; email?: string };

type SkillsDetails = Record<string, string> & {
  softwareCompetency?: string;
  otherSkills?: string;
};

const SKILL_LABELS: Record<string, string> = {
  photoshop: 'Graphics/Presentation (Photoshop)',
  autocad: 'Drafting (AutoCAD)',
  sketching: 'Free hand sketching',
  threedsketchup: '3D Modelling (Sketchup)',
  threedvray: '3D Rendering (VRay)',
  msoffice: 'MS Office',
  boq: 'BOQs and Estimation',
  communication: 'Client / Team communication',
};

export default function CareersAdmin() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/career`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setLoading(false);
      router.replace('/admin/login');
      return;
    }
    fetchApplications();
  }, [router]);

  const handleStatusChange = async (id: number, action: 'approve' | 'reject') => {
    if (!window.confirm(`Are you sure you want to ${action} this application? This will send an automated email to the applicant.`)) return;
    
    setProcessingId(id);
    try {
      const token = localStorage.getItem('token');
      // Same-origin call: approve/reject only exists on this Next.js API layer today
      // (Express has no equivalent route), so this must not go through
      // NEXT_PUBLIC_API_URL, which points at the external Express server in production.
      await axios.post(`/api/career/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Application ${action}d successfully. Email sent.`);
      fetchApplications();
    } catch (error) {
      console.error(`Error ${action}ing application:`, error);
      alert(`Failed to ${action} application.`);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold uppercase tracking-widest text-neutral-dark-grey mb-8">Career Applications (ATS)</h1>
      
      {applications.length === 0 ? (
        <div className="text-neutral-medium-grey">No applications found.</div>
      ) : (
        <div className="space-y-6">
          {applications.map(app => {
            const family = safeParseJSON<FamilyDetails>(app.familyDetails);
            const education = safeParseJSON<EducationDetails>(app.education);
            const experience = safeParseJSON<WorkExperienceEntry[]>(app.experience) || [];
            const skills = safeParseJSON<SkillsDetails>(app.skills);
            const references = safeParseJSON<RefereeEntry[]>(app.references) || [];
            const isExpanded = expandedId === app.id;

            return (
            <div key={app.id} className="bg-white p-6 shadow-sm border border-neutral-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-neutral-black uppercase tracking-wider">
                    {app.firstName} {app.middleName} {app.lastName}
                  </h3>
                  <span className={`text-[10px] px-2 py-1 uppercase tracking-widest font-bold ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <p className="text-sm font-bold text-primary-red uppercase tracking-widest mb-4">Applied for: {app.positionApply}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs text-neutral-medium-grey mb-4">
                  <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Email:</strong> {app.email}</p>
                  <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Phone:</strong> {app.phone}</p>
                  <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Date:</strong> {format(new Date(app.createdAt), 'dd MMM yyyy')}</p>
                  {app.expectedSalary && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Expected Salary:</strong> {app.expectedSalary}</p>}
                </div>

                {app.whyTao && (
                  <div className="text-sm text-neutral-medium-grey border-l-2 border-primary-red pl-4 italic mb-4">
                    "{app.whyTao}"
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <a href={app.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-red hover:text-neutral-black transition-colors">
                    <FiFileText /> View Resume
                  </a>
                  {app.portfolio && (
                    <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-dark-grey hover:text-primary-red transition-colors">
                      <FiLink /> View Portfolio
                    </a>
                  )}
                  {app.salarySlip && (
                    <a href={app.salarySlip} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-dark-grey hover:text-primary-red transition-colors">
                      <FiFileText /> Salary Slip
                    </a>
                  )}
                  {app.refLetter && (
                    <a href={app.refLetter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-dark-grey hover:text-primary-red transition-colors">
                      <FiFileText /> Reference Letter
                    </a>
                  )}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : app.id)}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-neutral-medium-grey hover:text-primary-red transition-colors"
                  >
                    {isExpanded ? <FiChevronUp /> : <FiChevronDown />} {isExpanded ? 'Hide' : 'View'} Full Application
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 w-full sm:w-auto sm:min-w-[140px]">
                {app.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleStatusChange(app.id, 'approve')}
                      disabled={processingId === app.id}
                      className="px-4 py-3 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                    >
                      <FiCheck size={14} /> {processingId === app.id ? 'Sending...' : 'Approve & Email'}
                    </button>
                    <button 
                      onClick={() => handleStatusChange(app.id, 'reject')}
                      disabled={processingId === app.id}
                      className="px-4 py-3 bg-white border border-primary-red text-primary-red text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary-red hover:text-white disabled:opacity-50 transition-colors"
                    >
                      <FiX size={14} /> Reject & Email
                    </button>
                  </>
                ) : (
                  <div className="text-center px-4 py-3 bg-neutral-100 text-neutral-medium-grey text-[10px] font-bold uppercase tracking-widest">
                    Action Taken
                  </div>
                )}
              </div>

            </div>

            {isExpanded && (
              <div className="mt-6 border-t border-neutral-border pt-6 space-y-6">
                <section>
                  <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">Personal Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2 text-xs text-neutral-medium-grey">
                    {app.landline && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Landline:</strong> {app.landline}</p>}
                    {app.birthDate && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Date of Birth:</strong> {app.birthDate}</p>}
                    {app.availabilityDate && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Available From:</strong> {app.availabilityDate}</p>}
                    {app.gender && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Gender:</strong> {app.gender}</p>}
                    {app.maritalStatus && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Marital Status:</strong> {app.maritalStatus}</p>}
                    {app.commitmentPeriod && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Commitment Period:</strong> {app.commitmentPeriod}</p>}
                    {app.address && <p className="md:col-span-3"><strong className="text-neutral-dark-grey uppercase tracking-wider">Current Address:</strong> {app.address}</p>}
                    {app.permanentAddress && <p className="md:col-span-3"><strong className="text-neutral-dark-grey uppercase tracking-wider">Permanent Address:</strong> {app.permanentAddress}</p>}
                  </div>
                  {family && (family.father?.name || family.mother?.name || family.spouse?.name) && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-1 text-xs text-neutral-medium-grey">
                      {family.father?.name && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Father:</strong> {family.father.name}{family.father.occupation ? ` (${family.father.occupation})` : ''}</p>}
                      {family.mother?.name && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Mother:</strong> {family.mother.name}{family.mother.occupation ? ` (${family.mother.occupation})` : ''}</p>}
                      {family.spouse?.name && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Spouse:</strong> {family.spouse.name}{family.spouse.occupation ? ` (${family.spouse.occupation})` : ''}</p>}
                    </div>
                  )}
                </section>

                {education && (
                  <section>
                    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">Academic Performance</h4>
                    <div className="space-y-1 text-xs text-neutral-medium-grey">
                      {education.ssc?.percentage && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Class X:</strong> {education.ssc.percentage} — {education.ssc.institute}</p>}
                      {education.hsc?.percentage && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Class XII:</strong> {education.hsc.percentage} — {education.hsc.institute}</p>}
                      {education.graduation?.stream && (
                        <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Graduation:</strong> {education.graduation.stream}, {education.graduation.percentage} — {education.graduation.institute} ({education.graduation.joiningYear}–{education.graduation.passingYear})</p>
                      )}
                      {education.postGraduation?.stream && (
                        <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Post-Graduation:</strong> {education.postGraduation.stream}, {education.postGraduation.percentage} — {education.postGraduation.institute} ({education.postGraduation.joiningYear}–{education.postGraduation.passingYear})</p>
                      )}
                      {education.achievements && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Achievements:</strong> {education.achievements}</p>}
                      {education.otherQualifications && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Other Qualifications:</strong> {education.otherQualifications}</p>}
                    </div>
                  </section>
                )}

                {skills && (
                  <section>
                    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">Technical Skills</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-neutral-medium-grey">
                      {Object.entries(SKILL_LABELS).map(([key, label]) => (
                        skills[key] ? <p key={key}><strong className="text-neutral-dark-grey uppercase tracking-wider">{label}:</strong> {skills[key]}</p> : null
                      ))}
                      {skills.softwareCompetency && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Other Software:</strong> {skills.softwareCompetency}</p>}
                      {skills.otherSkills && <p><strong className="text-neutral-dark-grey uppercase tracking-wider">Other Skills:</strong> {skills.otherSkills}</p>}
                    </div>
                  </section>
                )}

                {experience.length > 0 && (
                  <section>
                    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">Employment History</h4>
                    <div className="space-y-1 text-xs text-neutral-medium-grey">
                      {experience.map((exp, i) => (
                        <p key={i}><strong className="text-neutral-dark-grey uppercase tracking-wider">{exp.firmName || 'Firm'}:</strong> {exp.profile} {exp.from ? `(${exp.from} – ${exp.to || 'present'})` : ''}</p>
                      ))}
                    </div>
                  </section>
                )}

                {references.length > 0 && (
                  <section>
                    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">References</h4>
                    <div className="space-y-1 text-xs text-neutral-medium-grey">
                      {references.map((ref, i) => (
                        <p key={i}><strong className="text-neutral-dark-grey uppercase tracking-wider">{ref.name}</strong>{ref.designation ? `, ${ref.designation}` : ''}{ref.contact ? ` — ${ref.contact}` : ''}{ref.email ? ` — ${ref.email}` : ''}</p>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}
