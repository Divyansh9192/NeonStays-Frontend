import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, AlertCircle, ArrowLeft, RotateCcw, HelpCircle } from 'lucide-react';

const PaymentFailed = () => {
  // 🟢 TODO: INJECT YOUR REAL DATA HERE
  // This data usually comes from your payment processor response (Stripe/PayPal/etc)
  const data = {
    amount: "$129.00",
    errorReason: "Insufficient funds", // or "Card expired", "Bank declined"
    cardLast4: "4242",
    retryAllowed: true
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* --- BACKGROUND ANIMATIONS (Subtle Warning Tones) --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Blob 1 - Soft Red */}
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-100/50 rounded-full blur-3xl"
        />
        {/* Blob 2 - Soft Orange */}
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-100/50 rounded-full blur-3xl"
        />
      </div>

      {/* --- MAIN CARD --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-10"
      >
        {/* Failure Header Strip */}
        <div className="h-1.5 bg-gradient-to-r from-rose-400 to-red-600 w-full" />

        <div className="p-8 pt-10">
          <div className="flex flex-col items-center text-center">
            
            {/* Animated 'X' Icon with Shake Effect */}
            <div className="relative mb-6">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1, x: [0, -10, 10, -10, 10, 0] }} 
                transition={{ 
                  scale: { duration: 0.4, ease: "easeOut" },
                  x: { duration: 0.5, delay: 0.4 } // Shake after popping in
                }}
                className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center"
              >
                <X className="w-10 h-10 text-red-500 stroke-[3]" />
              </motion.div>
              
              {/* Static Ring (No pulse, creates tension) */}
              <div className="absolute inset-0 rounded-full border border-red-100" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              Payment Failed
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm mb-8 max-w-[80%]"
            >
              We couldn't process your payment for <span className="font-medium text-gray-900">{data.amount}</span>.
            </motion.p>

            {/* Error Details Box */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full bg-red-50/50 border border-red-100 rounded-xl p-4 mb-8 flex items-start gap-3 text-left"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-red-900">Transaction Declined</h3>
                <p className="text-xs text-red-700 mt-1">
                  The bank returned the error: <span className="font-medium">"{data.errorReason}"</span>. 
                  Please check your card details or try a different payment method.
                </p>
              </div>
            </motion.div>

            {/* Buttons Group */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-3 w-full"
            >
              {/* 🟢 TODO: Hook up your Retry Logic */}
              <button 
                onClick={() => console.log("Retry Payment")}
                className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>

              <div className="grid grid-cols-2 gap-3">
                {/* 🟢 TODO: Navigation Links */}
                <button 
                  onClick={() => window.history.back()}
                  className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
                
                <button 
                  onClick={() => console.log("Open Support")}
                  className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <HelpCircle className="w-4 h-4" /> Support
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 text-xs text-gray-400 text-center"
      >
        <p>Payment attempted on Visa •••• {data.cardLast4}</p>
        <p className="mt-1">Transaction ID: <span className="font-mono">TXN_FAIL_8823</span></p>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;