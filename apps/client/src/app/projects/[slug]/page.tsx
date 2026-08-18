import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';

async function projectExists(slug: string): Promise<boolean> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  try {
    const res = await fetch(`${apiUrl}/projects/slug/${slug}`, { cache: 'no-store' });
    return res.ok;
  } catch (err) {
    // Don't 404 a real project just because this existence check itself failed
    // (e.g. a transient network blip) — let the client component's own fetch
    // and its existing fallback UI handle that case instead.
    console.error('Failed to verify project existence:', err);
    return true;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(await projectExists(slug))) {
    notFound();
  }

  return <ProjectDetailClient />;
}
