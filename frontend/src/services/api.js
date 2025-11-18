import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:7777/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Sesi Anda telah berakhir. Silakan login kembali.');
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  loginAdmin: (credentials) => api.post('/admin/login', credentials),
  loginUser: (credentials) => api.post('/user/login', credentials),
  registerUser: (data) => api.post('/user/register', data),
  registerAdmin: (data) => api.post('/admin/register', data),
};

// Destinasi Services
export const destinasiService = {
  getAll: () => api.get('/destinasi'),
  getById: (id) => api.get(`/destinasi/${id}`),
  create: (formData) => api.post('/destinasi', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/destinasi/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/destinasi/${id}`)
};

// Materi Services
export const materiService = {
  getAll: () => api.get('/materi'),
  getPublic: () => api.get('/materi/public'),
  getByDestinasi: (destinasiId) => api.get(`/materi/destinasi/${destinasiId}`),
  getById: (id) => api.get(`/materi/${id}`),
  create: (formData) => api.post('/materi', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/materi/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/materi/${id}`)
};

// Review Services
export const reviewService = {
  getAll: () => api.get('/review'),
  getByDestinasi: (destinasiId) => api.get(`/review/destinasi/${destinasiId}`),
  create: (destinasiId, data) => api.post(`/review/destinasi/${destinasiId}`, data),
  delete: (id) => api.delete(`/review/${id}`)
};

// User Services
export const userService = {
  getAll: () => api.get('/user'),
  delete: (id) => api.delete(`/user/${id}`)
};

// Dashboard Services
export const dashboardService = {
  getStats: () => api.get('/dashboard/stats')
};

export default api;
