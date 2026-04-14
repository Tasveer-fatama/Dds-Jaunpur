import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const studentAPI = {
  create: (formData) => api.post('/api/student/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: (params) => api.get('/api/student/all', { params }),
  getById: (id) => api.get(`/api/student/${id}`),
  search: (params) => api.get('/api/student/search', { params }),
  update: (id, formData) => api.put(`/api/student/update/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/api/student/delete/${id}`),
  regeneratePDF: (id) => api.post(`/api/student/regenerate-pdf/${id}`),
};

export const verifyAPI = {
  verify: (regNo) => api.get(`/verify/${regNo}`),
};

export const SERVER_URL = API_BASE;

export default api;
