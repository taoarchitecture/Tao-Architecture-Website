declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';

  export interface Options {
    // The runtime (v2.x) reaches into `.v2.uploader`, so this must be the full
    // `cloudinary` package export, not the destructured `v2` namespace.
    cloudinary: any;
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
