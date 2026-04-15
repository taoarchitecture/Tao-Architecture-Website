declare module 'multer-storage-cloudinary' {
  import { v2 as cloudinary } from 'cloudinary';
  import { StorageEngine } from 'multer';

  export interface Options {
    cloudinary: typeof cloudinary;
    params?: {
      folder?: string;
      allowed_formats?: string[];
      transformation?: any[];
      public_id?: (req: any, file: any) => string;
      [key: string]: any;
    };
  }

  interface CloudinaryStorageConstructor {
    new (options: Options): StorageEngine;
    (options: Options): StorageEngine;
  }

  const CloudinaryStorage: CloudinaryStorageConstructor;
  export default CloudinaryStorage;
}
