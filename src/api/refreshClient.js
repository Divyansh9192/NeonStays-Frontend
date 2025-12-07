// refreshClient.js
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default refreshClient;
