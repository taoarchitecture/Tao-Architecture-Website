export interface GalleryItem {
  id?: number;
  url: string;
  type?: string; // 'IMAGE' | 'VIDEO'
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  status: string;
  location: string;
  plotArea: string;
  builtUpArea: string;
  description: string[];
  seoTitle: string;
  seoDesc: string;
  isPublished: boolean;
  coverImage: string | null;
  gallery: GalleryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  slug: string;
  category: string;
  status: string;
  location: string;
  plotArea: string;
  builtUpArea: string;
  description: string[];
  seoTitle: string;
  seoDesc: string;
  isPublished: boolean;
  coverImage?: FileList;
  gallery?: FileList;
}
