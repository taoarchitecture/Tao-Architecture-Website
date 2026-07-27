/**
 * Helper to generate the correct image URL based on source.
 * - Uploads: Served by Express (localhost:5000/uploads/...)
 * - Static Assets: Served by Next.js (localhost:3000/img/...)
 */
export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return '';

  if (path.startsWith('blob:') || path.startsWith('data:') || path.startsWith('http')) {
    return path; // Local preview URL or absolute URL
  }

  // Normalize path to ensure it has a leading slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (normalizedPath.startsWith('/uploads/')) {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
    return `${serverUrl}${normalizedPath}`;
  }

  // Assume it's a static asset in Next.js public folder (e.g., /img/...)
  return normalizedPath;
};
