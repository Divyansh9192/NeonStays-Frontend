import axios from 'axios';
import { getAccessToken } from "../auth/TokenStorage";

const BASE_URL = import.meta.env.VITE_BASE_URL;


const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;