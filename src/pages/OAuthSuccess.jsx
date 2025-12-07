import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import api from "../api/axios";
import { setAccessToken } from "../auth/TokenStorage";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../api/auth";

export default function OAuthSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getAccessToken = async () => {
      try {
       const refreshRes = await refreshToken();
        const accessToken = refreshRes.data?.accessToken;

        if (!accessToken) {
          console.error("No access token received");
          return;
        }

        setAccessToken(accessToken);
        const profileRes = await api.get("/users/profile");
        dispatch(setUser(profileRes.data));
        // Redirect user to home page
        navigate("/");
      } catch (err) {
        console.error("Failed to refresh access token:", err);
      }
    };

    getAccessToken();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen text-xl text-white">
      Finishing login… please wait.
    </div>
  );
}
