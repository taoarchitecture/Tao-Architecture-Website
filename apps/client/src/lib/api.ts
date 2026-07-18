import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';
const API_TIMEOUT_MS = 10000;

const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT_MS,
});

export const getProjects = async () => {
  try {
    const { data } = await api.get('/projects');
    return data;
  } catch (error) {
    console.error('Failed to fetch projects:', error instanceof Error ? error.message : String(error));
    return [];
  }
};

export const getProjectBySlug = async (slug: string) => {
  try {
    const { data } = await api.get(`/projects/${slug}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch project ${slug}:`, error instanceof Error ? error.message : String(error));
    return null;
  }
};

export const getHomeConfig = async () => {
  try {
    const { data } = await api.get('/home');
    return data;
  } catch (error) {
    console.error('Failed to fetch home config:', error instanceof Error ? error.message : String(error));
    return null;
  }
};

export const getTeamMembers = async () => {
  try {
    const { data } = await api.get('/studio/team');
    return data;
  } catch (error) {
    console.error('Failed to fetch team members:', error instanceof Error ? error.message : String(error));
    return [];
  }
};

export const getPublications = async () => {
  try {
    const { data } = await api.get('/media/publications');
    return data;
  } catch (error) {
    console.error('Failed to fetch publications:', error instanceof Error ? error.message : String(error));
    return [];
  }
};

export const getAwards = async () => {
  try {
    const { data } = await api.get('/media/awards');
    return data;
  } catch (error) {
    console.error('Failed to fetch awards:', error instanceof Error ? error.message : String(error));
    return [];
  }
};

export const getSettings = async () => {
  try {
    const { data } = await api.get('/settings');
    return data;
  } catch (error) {
    console.error('Failed to fetch settings:', error instanceof Error ? error.message : String(error));
    return null;
  }
};

export const getPageContent = async (slug: string) => {
  try {
    const { data } = await api.get(`/pages/${slug}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch page content for ${slug}:`, error instanceof Error ? error.message : String(error));
    return null;
  }
};

export const getServices = async () => {
  try {
    const { data } = await api.get('/services');
    return data;
  } catch (error) {
    console.error('Failed to fetch services:', error instanceof Error ? error.message : String(error));
    return [];
  }
};

export const getContactSubmissions = async () => {
  try {
    const { data } = await api.get('/contact');
    return data;
  } catch (error) {
    console.error('Failed to fetch contact submissions:', error instanceof Error ? error.message : String(error));
    return [];
  }
};

export default api;
