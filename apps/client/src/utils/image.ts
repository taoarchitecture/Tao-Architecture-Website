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

/** Reads a locally-chosen file's pixel dimensions before it's uploaded. */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image dimensions'));
    };
    img.src = url;
  });
}

function simplifyRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height) || 1;
  const w = width / divisor;
  const h = height / divisor;
  if (w <= 30 && h <= 30) return `${w}:${h}`;
  return `${(width / height).toFixed(2)}:1`;
}

/**
 * Compares an uploaded image's aspect ratio against the ratio a display slot
 * actually renders at. Returns a warning string if they diverge enough to
 * visibly crop or stretch, or null if the image is a close enough fit.
 */
export function checkAspectRatioMismatch(
  actualWidth: number,
  actualHeight: number,
  targetRatio: number,
  targetLabel: string,
  toleranceRatio: number = 0.15
): string | null {
  if (!actualWidth || !actualHeight) return null;
  const actualRatio = actualWidth / actualHeight;
  if (Math.abs(actualRatio - targetRatio) / targetRatio <= toleranceRatio) return null;
  return `This image is ${simplifyRatio(actualWidth, actualHeight)} but this slot displays at ${targetLabel} — it may appear cropped or stretched.`;
}
