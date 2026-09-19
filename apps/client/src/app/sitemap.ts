import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://taoarchitecture.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    '',
    '/studio',
    '/work',
    '/services',
    '/media/publications',
    '/media/news',
    '/media/awards',
    '/career',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic project pages
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    if (Array.isArray(projects)) {
      projectPages = projects
        .filter((p: any) => p.isPublished !== false && p.slug)
        .map((project: any) => ({
          url: `${baseUrl}/projects/${project.slug}`,
          lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.9,
        }));
    }
  } catch (err) {
    console.error('Failed to load dynamic project pages for sitemap:', err);
  }

  return [...staticPages, ...projectPages];
}
