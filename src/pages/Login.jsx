import { useEffect, useState } from "react";
import { getCurrentUser, loginUser } from "../api/auth";
import { setAccessToken } from "../auth/TokenStorage";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import api from "../api/axios"; // ⭐ Axios instance with baseURL + withCredentials

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ⭐ GOOGLE SIGN IN POPUP MODE
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (window.google?.accounts?.id) {
  //       clearInterval(interval);

  //       google.accounts.id.initialize({
  //         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  //         ux_mode: "popup",
  //         callback: handleGoogleCredentialResponse, // ⭐ popup callback
  //         auto_select: false,
  //       });

  //       google.accounts.id.renderButton(
  //         document.getElementById("googleSignInButton"),
  //         {
  //           theme: "filled_black",
  //           size: "large",
  //           shape: "rectangular",
  //           text: "continue_with",
  //         }
  //       );
  //     }
  //   }, 300);

  //   return () => clearInterval(interval);
  // }, []);

  // ⭐ GOOGLE LOGIN HANDLER USING AXIOS
  // async function handleGoogleCredentialResponse(response) {
  //   try {
  //     const idToken = response.credential;
  //     setLoading(true);
  //     setError(null);

  //     // ⭐ BACKEND CALL
  //     const res = await api.post("/auth/google/login", {
  //       credential: idToken,
  //     });

  //     const data = res.data;
  //     localStorage.removeItem("loggedOut");
  //     console.log("Google login response data:", data);
  //     if (data?.data?.accessToken) {
  //       setAccessToken(data?.data?.accessToken);

  //       const user = await getCurrentUser();
  //       dispatch(setUser(user));
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Google login error:", error);
  //     setError("Google login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // ⭐ NORMAL USERNAME + PASSWORD LOGIN
  function handleGoogleLogin() {
  window.location.href = "https://neonstays-backend.onrender.com/oauth2/authorization/google";
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await loginUser(email, password);
      const accessToken = res.data.accessToken;

      setAccessToken(accessToken);
      const user = await getCurrentUser();
      dispatch(setUser(user));
      navigate("/");
    } catch (e) {
    
      setError(e.response?.data?.error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0d0d0d] text-gray-200">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full object-cover opacity-70"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      {/* Login Card */}
      <div className="w-full flex flex-col items-center justify-center">
        <form
          id="g_id_onload"
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          {/* TITLE */}
          <h2 className="text-4xl font-medium text-gray-100">Sign in</h2>
          <p className="text-sm text-gray-400 mt-3">
            Welcome back! Please sign in to continue
          </p>

          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="group w-full h-11 flex items-center justify-center gap-3 rounded-full border border-gray-700 bg-black hover:bg-white transition mt-8"
          >
            <span className="bg-white rounded-full p-1">
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.94 0 7.19 1.65 9.34 3.04l6.9-6.9C35.98 1.9 30.36 0 24 0 14.62 0 6.51 5.29 2.56 13l8.06 6.26C12.31 13.38 17.69 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24c0-1.56-.14-3.06-.39-4.5H24v9h12.65c-.55 2.87-2.19 5.29-4.65 6.92l7.27 5.64C43.37 37.07 46.5 31 46.5 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.62 28.74A14.4 14.4 0 0 1 9.5 24c0-1.65.29-3.25.8-4.74L2.24 13A23.91 23.91 0 0 0 0 24c0 3.87.89 7.53 2.47 10.8l8.15-6.06z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.92-2.17 15.89-5.89l-7.27-5.64c-2.02 1.36-4.62 2.28-8.62 2.28-6.31 0-11.69-3.88-13.38-9.26L2.56 34.99C6.51 42.71 14.62 48 24 48z"
                />
              </svg>
            </span>

            <span className="text-gray-200 text-sm font-medium group-hover:text-black">
              Continue with Google
            </span>
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-700"></div>
            <p className="text-sm text-gray-400 text-nowrap">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-700"></div>
          </div>

          {/* EMAIL INPUT */}
          <div className="flex items-center w-full bg-transparent border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg width="16" height="11" fill="#9CA3AF" viewBox="0 0 16 11">
              <path d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" />
            </svg>

            <input
              type="email"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-gray-300 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg width="13" height="17" fill="#9CA3AF" viewBox="0 0 13 17">
              <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" />
            </svg>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-gray-300 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="w-full flex items-center justify-between mt-8 text-gray-400">
            <div className="flex items-center gap-2">
              <input
                className="h-4 w-4 rounded"
                type="checkbox"
                id="checkbox"
              />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <a
              className="text-sm underline hover:text-gray-300 transition"
              href="#"
            >
              Forgot password?
            </a>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* SIGN UP */}
          <p className="text-gray-400 text-sm mt-4">
            Don’t have an account?{" "}
            <Link
            to="/signup"
            className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
