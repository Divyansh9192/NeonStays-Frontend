import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Check, ArrowRight, Download, Copy, Home } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// internal window-size hook
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [data, setData] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);

  // Confetti timer
  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Fetch real data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sessionId) {
          setError("Missing session ID.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/session/${sessionId}`,
          { credentials: "include" }
        );

        if (!res.ok) {
          throw new Error("Failed to load payment details");
        }

        const json = await res.json();
        setData(json);

      } catch (err) {
        console.error(err);
        setError("Could not load your payment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  // Copy order ID
  const handleCopyId = () => {
    if (!data?.orderId) return;
    navigator.clipboard.writeText(data.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Navigate home btn
  const handleHome = () => navigate("/");

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading payment details…
      </div>
    );
  }

  // Error UI
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center">
        <p className="text-red-500 font-medium">{error || "Something went wrong."}</p>
        <button onClick={handleHome} className="underline text-blue-600">
          Go Home
        </button>
      </div>
    );
  }

  // MAIN UI (with real data)
  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden font-sans">

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          gravity={0.15}
          recycle={false}
          colors={['#10B981', '#3B82F6', '#F59E0B', '#EF4444']}
        />
      )}

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10"
      >
        <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 w-full" />

        <div className="p-8 pt-10 text-center">

          {/* Checkmark */}
          <div className="flex justify-center mb-6">
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center"
            >
              <Check className="w-10 h-10 text-emerald-600 stroke-[3]" />
            </motion.div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>

          <p className="text-gray-500 text-sm mb-8">
            The confirmation email has been sent to <br />
            <span className="font-medium text-gray-900">{data.email}</span>
          </p>

          {/* RECEIPT DETAILS */}
          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 space-y-3">

            {/* Order ID */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-400">Order ID</span>
              <div className="flex items-center gap-2 cursor-pointer" onClick={handleCopyId}>
                <span className="text-sm font-mono font-medium text-gray-700">{data.orderId}</span>

                {copied ? (
                  <span className="text-[10px] text-emerald-600 font-bold">COPIED</span>
                ) : (
                  <Copy className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                )}
              </div>
            </div>

            {/* Date */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-400">Date</span>
              <span className="text-sm font-medium text-gray-700">{data.date}</span>
            </div>

            {/* Card */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-400">Method</span>
              <span className="text-sm font-medium text-gray-700">
                Visa •••• {data.last4}
              </span>
            </div>

            <div className="h-px bg-gray-200 my-1" />

            {/* Amount */}
            <div className="flex justify-between items-center pt-1">
              <span className="text-xs font-bold text-gray-500 uppercase">Total Paid</span>
              <span className="text-lg font-bold text-emerald-600">{data.amount}</span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3">
            <button 
              className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
              onClick={handleHome}
            >
              Go to Home <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
                <Download className="w-4 h-4" /> Receipt
              </button>
              <button onClick={handleHome} className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
                <Home className="w-4 h-4" /> Home
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
