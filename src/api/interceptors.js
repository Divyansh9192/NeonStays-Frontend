import api from "./axios";
import { refreshToken } from "./auth";
import { setAccessToken } from "../auth/TokenStorage";

export const setupInterceptors = () => {
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config;

      // ✅ CHANGE: guard against missing config
      if (!original) return Promise.reject(error); // ✅

      // only retry once
      if (
        error.response?.status === 401 &&
        !original._retry &&
        original.url !== "/auth/login" &&
        original.url !== "/auth/refresh"
      ) {
        original._retry = true;

        try {
          const data = await refreshToken();

          // ✅ CHANGE: correct token extraction
          const newAccessToken = data?.data?.accessToken; 

          // ✅ CHANGE: ensure token exists
          if (!newAccessToken) {                     // ✅
            throw new Error("No access token found"); // ✅
          }

          // Save new access token
          setAccessToken(newAccessToken);

          // ✅ CHANGE: ensure headers object exists
          original.headers = original.headers || {}; // ✅

          // add token to original request
          original.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // ✅ CHANGE: recommended Axios retry call
          return api.request(original); // ✅ (was api(original))
        } catch (err) {
          alert("Session expired. Please log in again.");

          // ✅ CHANGE: replace instead of href (prevents back-navigation into protected pages)
          window.location.replace("/login"); // ✅

          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};
