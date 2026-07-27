import ProjectClient from './ProjectClient';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  // Fetch project and allProjects data on the server
  const [projRes, allRes] = await Promise.all([
    fetch(`${apiUrl}/projects/slug/${params.slug}`, { cache: 'no-store' }),
    fetch(`${apiUrl}/projects`, { cache: 'no-store' })
  ]);

  let project = null;
  if (projRes.ok) {
    project = await projRes.json();
    if (typeof project.description === 'string') project.description = JSON.parse(project.description);
    if (typeof project.details === 'string') project.details = JSON.parse(project.details);
    if (typeof project.gallery === 'string') project.gallery = JSON.parse(project.gallery);
    if (typeof project.relatedProjects === 'string') project.relatedProjects = JSON.parse(project.relatedProjects);
  }

  let allProjects = [];
  if (allRes.ok) {
    const allData = await allRes.json();
    allProjects = allData
      .filter((p: any) => p.visible !== false)
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  }

  return <ProjectClient project={project} allProjects={allProjects} />;
}
