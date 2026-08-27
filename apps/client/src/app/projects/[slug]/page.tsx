import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';
import { getProjectBySlug, getProjects } from '@/lib/api';

// Same rationale as the homepage: ISR keeps the hero image/gallery servable
// from cache (avoids the client-side fetch waterfall that was regressing LCP
// and CLS) while still picking up admin edits within a minute.
export const revalidate = 60;

function safeParseArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [projectData, allProjectsData] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!projectData) {
    notFound();
  }

  const project = {
    ...projectData,
    description: safeParseArray(projectData.description),
    gallery: safeParseArray(projectData.gallery),
    relatedProjects: safeParseArray(projectData.relatedProjects),
  };

  const allProjects = (allProjectsData || [])
    .filter((p: any) => p.isPublished !== false)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  return <ProjectDetailClient project={project} allProjects={allProjects} />;
}
