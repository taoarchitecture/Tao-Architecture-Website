import imageCompression from 'browser-image-compression';

export async function uploadToCloudinary(file: File, folder: string = 'tao'): Promise<string> {
  // 1. Compress large images client-side before uploading!
  // Cloudinary has a strict 10MB limit on standard uploads, and big files are slow.
  let fileToUpload = file;
  if (file.type.startsWith('image/')) {
    try {
      const options = {
        maxSizeMB: 2, // Compress to max 2MB
        // Full-bleed hero/background images render up to ~2.5x viewport
        // width on mobile (object-cover zoom on a tall, narrow box) and can
        // exceed 1920px CSS width on large/high-DPI desktop screens — 1920
        // was letting Next.js upscale past the source's native resolution.
        maxWidthOrHeight: 2560,
        useWebWorker: true,
      };
      fileToUpload = await imageCompression(file, options);
    } catch (error) {
      console.warn('Image compression failed, using original file', error);
    }
  }

  // 2. Get signature from our serverless API. Admin-content folders require
  // the admin session token; the public 'careers' folder doesn't need one.
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const sigRes = await fetch('/api/upload/signature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ folder }),
  });

  if (!sigRes.ok) {
    throw new Error('Failed to get upload signature');
  }

  const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

  // 3. Upload directly to Cloudinary using FormData
  const formData = new FormData();
  formData.append('file', fileToUpload);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  if (folder) {
    formData.append('folder', folder);
  }

  // 'auto' (not 'image') lets Cloudinary detect the right resource type per
  // file — required for career-application resumes, which are commonly
  // .doc/.docx and get flatly rejected ("Unsupported ZIP file") under the
  // image endpoint. Images uploaded through this same function (project
  // photos, team photos, etc.) still resolve to resource_type "image" under
  // 'auto', so this is a no-op for every other existing caller.
  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!uploadRes.ok) {
    const err = await uploadRes.json();
    throw new Error(err.error?.message || 'Failed to upload to Cloudinary');
  }

  const data = await uploadRes.json();
  return data.secure_url;
}
