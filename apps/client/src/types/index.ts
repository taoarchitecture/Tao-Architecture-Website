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
  isFeatured: boolean;
  order: number;
  relatedProjects: string; // JSON array
  coverImage: string | null;
  gallery: GalleryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface HomeConfig {
  id: number;
  heroSlides: { image: string; title: string; subtitle: string }[];
  bannerText: string;
  bottomCtaTitle: string;
  bottomCtaText: string;
  bottomCtaLink: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string[];
  image: string;
  order: number;
  active: boolean;
}

export interface Publication {
  id: number;
  title: string;
  category: string;
  image: string;
  link?: string;
  order: number;
}

export interface Award {
  id: number;
  title: string;
  image: string;
  year?: string;
  description?: string;
  order: number;
}

export interface Video {
  id: number;
  videoId: string;
  title: string;
  description?: string | null;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount?: number | null;
  isShort: boolean;
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

export interface GlobalSettings {
  id: number | null;
  siteName: string;
  contactEmail: string;
  phoneNumbers: string; // JSON array string
  address: string;
  googleMapsUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  footerTagline: string;
}

export interface PageContent {
  id: number;
  pageSlug: string;
  title: string | null;
  content: string | null;
  updatedAt: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  items: string[]; // parsed from JSON
  image: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactSubmission {
  id: number;
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
