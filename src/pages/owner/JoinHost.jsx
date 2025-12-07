import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { promoteToHost } from "../../api/hostUpgrade";
import { setUser } from "../../store/authSlice";
import LightRays from "../../components/Effects/LightRays";

export default function JoinHost() {
  const user = useSelector((state) => state.auth.user?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.roles?.includes("HOTEL_MANAGER")) {
      navigate("/owner/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      const updatedUser = await promoteToHost();
      dispatch(setUser(updatedUser));
      navigate("/owner/dashboard");
    } catch (e) {
      console.error("Upgrade failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen bg-gradient-to-b from-[#0a0f18] to-[#050507] text-white relative overflow-hidden">
    
    {/* ✅ LightRays FULL SCREEN */}
    <div className="absolute top-0 left-0 w-screen h-screen -z-10 pointer-events-none">
      <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={3}
        lightSpread={0.2}
        rayLength={3}
        noiseAmount={0.3}
        distortion={0.2}
      />
    </div>

    {/* ✅ Main Content */}
    <div className="flex items-center justify-center min-h-screen px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl"
      >
        <h1 className="text-5xl font-bold mb-4">Become a Host</h1>

        <p className="text-gray-400 text-lg leading-relaxed mb-10">
          Share your space, earn money, and welcome guests from around the world.
          Hosting on NeonStays is simple, secure, and rewarding.
        </p>

        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white font-medium transition-all disabled:opacity-50"
        >
          {loading ? "Upgrading..." : "Upgrade to Host"}
        </button>

        <p
          onClick={() => navigate("/")}
          className="mt-6 text-sm text-gray-500 hover:text-white cursor-pointer"
        >
          Back to Home
        </p>
      </motion.div>
    </div>
  </div>
  );
}
