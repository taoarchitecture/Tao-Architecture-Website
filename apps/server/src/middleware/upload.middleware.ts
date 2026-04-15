import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import CloudinaryStorage from 'multer-storage-cloudinary';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const useCloudinary = !!process.env.CLOUDINARY_CLOUD_NAME && !!process.env.CLOUDINARY_API_KEY;

let storage;

if (useCloudinary) {
  // Use Cloudinary whenever keys are present (both dev & production)
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'tao-architecture',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      public_id: (req: Request, file: Express.Multer.File) =>
        `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
    } as any,
  });
} else {
  // Fallback to local disk storage
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });
}

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPG, PNG, and WebP are allowed.'), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter,
});

// Helper to delete a file from Cloudinary or local disk
export const deleteUploadedFile = async (filePath: string): Promise<void> => {
  if (!filePath) return;

  // Check if it's a Cloudinary URL
  if (filePath.includes('cloudinary.com') || filePath.includes('res.cloudinary')) {
    try {
      // Extract public_id from the Cloudinary URL
      // URL format: https://res.cloudinary.com/<cloud>/image/upload/v123/<folder>/<public_id>.<ext>
      const urlParts = filePath.split('/');
      const uploadIndex = urlParts.findIndex(p => p === 'upload');
      if (uploadIndex !== -1) {
        // Everything after 'upload/v...' is the public_id (with folder prefix)
        const pathAfterUpload = urlParts.slice(uploadIndex + 2).join('/');
        const publicId = pathAfterUpload.replace(/\.[^/.]+$/, ''); // Remove extension
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (err) {
      console.error('Failed to delete from Cloudinary:', err);
    }
  } else {
    // Local disk deletion
    const fullPath = path.join(process.cwd(), 'uploads', path.basename(filePath));
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};
