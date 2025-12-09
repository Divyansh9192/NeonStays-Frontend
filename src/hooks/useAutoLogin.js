import React, { useEffect, useState } from "react";
import { refreshToken } from "../api/auth";
import { setAccessToken } from "../auth/TokenStorage";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import api from "../api/axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function autoLogin() {
      try {
        if (window.location.pathname === "/oauth/success") {
          setLoading(false);
          return;
        }

        const refreshRes = await refreshToken();
        const newAccessToken = refreshRes?.data?.accessToken;

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          const profileRes = await api.get("/users/profile", {
            withCredentials: true,
          });

          dispatch(setUser(profileRes.data));
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false); // IMPORTANT
      }
    }

    autoLogin();
  }, []);

  return loading; // IMPORTANT
};

export default useAutoLogin;
