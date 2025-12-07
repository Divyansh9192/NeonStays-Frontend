import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Check, ArrowRight, Download, Copy, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- INTERNAL HELPER HOOK (So you don't need external libs) ---
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // Call immediately
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

const PaymentSuccess = () => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // 🟢 TODO: INJECT YOUR REAL DATA HERE
  // In a real app, you might get this via `useLocation().state` or a context/API call
  const data = {
    amount: "$129.00",
    orderId: "ORD-8859-XJ2",
    email: "alice@example.com",
    date: "Nov 24, 2025",
    last4: "4242"
  };

  // Stop confetti after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(data.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleHome = () =>{
    navigate("/")
  }

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* --- BACKGROUND ANIMATIONS (Soothing Blobs) --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Blob 1 */}
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-100/50 rounded-full blur-3xl"
        />
        {/* Blob 2 */}
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"
        />
      </div>

      {/* --- CONFETTI --- */}
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

      {/* --- MAIN CARD --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-10"
      >
        {/* Success Header Strip */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 w-full" />

        <div className="p-8 pt-10">
          <div className="flex flex-col items-center text-center">
            
            {/* Animated Checkmark */}
            <div className="relative mb-6">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-emerald-600 stroke-[3]" />
              </motion.div>
              {/* Pulsing Ring */}
              <motion.div 
                animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-emerald-200"
              />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              Payment Successful!
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm mb-8"
            >
              The confirmation email has been sent to <br/>
              <span className="font-medium text-gray-900">{data.email}</span>
            </motion.p>

            {/* Receipt Details Container */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full bg-gray-50/80 border border-gray-100 rounded-xl p-5 mb-8 space-y-3"
            >
              {/* Order ID Row */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</span>
                <div className="flex items-center gap-2 group cursor-pointer" onClick={handleCopyId}>
                  <span className="text-sm font-mono font-medium text-gray-700">{data.orderId}</span>
                  {copied ? (
                    <span className="text-[10px] text-emerald-600 font-bold">COPIED</span>
                  ) : (
                    <Copy className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  )}
                </div>
              </div>

              {/* Date Row */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Date</span>
                <span className="text-sm font-medium text-gray-700">{data.date}</span>
              </div>

              {/* Method Row */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Method</span>
                <span className="text-sm font-medium text-gray-700">Visa •••• {data.last4}</span>
              </div>

              <div className="h-px bg-gray-200 my-1" />

              {/* Amount Row */}
              <div className="flex justify-between items-center pt-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Paid</span>
                <span className="text-lg font-bold text-emerald-600">{data.amount}</span>
              </div>
            </motion.div>

            {/* Buttons Group */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-3 w-full"
            >
              {/* 🟢 TODO: Add your onClick handlers here */}
              <button onClick={handleHome} className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20">
                Go to Home <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                  <Download className="w-4 h-4" /> Receipt
                </button>
                <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                  <Home className="w-4 h-4" /> Home
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 text-xs text-gray-400"
      >
        Need help? <a href="#" className="underline hover:text-gray-600">Contact Support</a>
      </motion.p>
    </div>
  );
};

export default PaymentSuccess;