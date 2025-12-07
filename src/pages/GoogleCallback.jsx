import { useEffect } from "react";
import { loginWithGoogle, getCurrentUser } from "../api/auth";
import { setAccessToken } from "../auth/TokenStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleGoogleRedirect() {
      /* global google */
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            const res = await loginWithGoogle(response.credential);
            const token = res.data.token || res.data.accessToken;
            setAccessToken(token);

            const user = await getCurrentUser();
            dispatch(setUser(user));
            navigate("/");
          } catch (err) {
            console.error("Google redirect login failed", err);
            navigate("/login");
          }
        },
      });

      google.accounts.id.prompt(); // triggers extraction of token from URL
    }

    handleGoogleRedirect();
  }, []);

  return <div className="text-white p-10">Logging you in with Google...</div>;
}
