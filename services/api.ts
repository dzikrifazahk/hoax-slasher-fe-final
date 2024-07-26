import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const conf = useRuntimeConfig();

const api: AxiosInstance = axios.create({
  baseURL: conf.public.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Add any custom headers here, such as authorization tokens
  // Example: config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error: AxiosError) => {
  // Handle errors
  return Promise.reject(error);
});

export default api;
