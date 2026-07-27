import WorkClient from './WorkClient';

export default async function WorkPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  let projects = [];
  try {
    const res = await fetch(`${apiUrl}/projects`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      projects = data
        .filter((p: any) => p.visible !== false)
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    }
  } catch (err) {
    console.error('Failed to fetch projects', err);
  }

  return <WorkClient initialProjects={projects} />;
}
