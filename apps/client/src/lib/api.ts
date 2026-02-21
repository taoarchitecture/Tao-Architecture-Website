import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getProjects = async () => {
  try {
    const { data } = await api.get('/projects');
    return data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
};

export const getProjectBySlug = async (slug: string) => {
  try {
    const { data } = await api.get(`/projects/${slug}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch project ${slug}:`, error);
    return null;
  }
};

export const getHomeConfig = async () => {
  try {
    const { data } = await api.get('/home');
    return data;
  } catch (error) {
    console.error('Failed to fetch home config:', error);
    return null;
  }
};

export const getTeamMembers = async () => {
  try {
    const { data } = await api.get('/studio/team');
    return data;
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    return [];
  }
};

export const getPublications = async () => {
  try {
    const { data } = await api.get('/media/publications');
    return data;
  } catch (error) {
    console.error('Failed to fetch publications:', error);
    return [];
  }
};

export const getAwards = async () => {
  try {
    const { data } = await api.get('/media/awards');
    return data;
  } catch (error) {
    console.error('Failed to fetch awards:', error);
    return [];
  }
};

export default api;
