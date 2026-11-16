import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const getSiteSettings = async () => {
  try {
    const res = await axios.get(`${API_BASE}/settings`);
    return res.data;
  } catch {
    return null;
  }
};

export const getPortfolio = async (category = 'all') => {
  try {
    const res = await axios.get(`${API_BASE}/portfolio?category=${category}`);
    return res.data;
  } catch {
    return [];
  }
};

export const getReels = async () => {
  try {
    const res = await axios.get(`${API_BASE}/reels`);
    return res.data;
  } catch {
    return [];
  }
};

export const getServiceBySlug = async (slug = 'cinematic-wedding-video-editing') => {
  try {
    const res = await axios.get(`${API_BASE}/services/${slug}`);
    return res.data;
  } catch {
    return null;
  }
};

export const submitInquiry = async (data) => {
  return axios.post(`${API_BASE}/inquiries`, data);
};
