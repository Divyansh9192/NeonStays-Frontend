import api from "./axios";
import refreshClient from "./refreshClient";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};
export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const refreshToken = async () => {
  const response = await refreshClient.post("/auth/refresh");
  return response.data;
};
export const getCurrentUser = async () => {
  const res = await api.get("/users/profile");
  return res.data;  // user profile
};

// existing exports...
export const loginWithGoogle = (idToken) => {
  return api.post("/auth/google", { idToken }); // adjust baseURL if you set axios base
};

export const updateProfile = async (data) => {
  return api.patch("/users/profile", data);

};
