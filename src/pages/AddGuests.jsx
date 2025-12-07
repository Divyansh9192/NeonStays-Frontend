import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

// --- Components: Icons (Inline SVGs for zero-dependency) ---

const IconPlus = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const IconTrash = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const IconCheck = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-black"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const IconLoader = () => (
  <svg
    className="animate-spin"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
);

// --- Main Component ---

const AddGuests = () => {
  // -- State --
  const {bookingId} = useParams()
  
  const [guests, setGuests] = useState([
    { internalId: Date.now(), name: "", gender: "", age: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()
  // -- Handlers --

  const addGuest = () => {
    setGuests([
      ...guests,
      { internalId: Date.now() + Math.random(), name: "", gender: "", age: "" },
    ]);
  };

  const removeGuest = (internalId) => {
    if (guests.length === 1) {
      // Optional: Clear the last card instead of removing it completely
      setGuests([{ internalId: Date.now(), name: "", gender: "", age: "" }]);
      return;
    }
    setGuests(guests.filter((g) => g.internalId !== internalId));
  };

  const updateGuest = (internalId, field, value) => {
    setGuests(
      guests.map((g) =>
        g.internalId === internalId ? { ...g, [field]: value } : g
      )
    );
  };

  // -- Validation --
  const isValid = useMemo(() => {
    return guests.every(
      (g) => g.name.trim() !== "" && g.gender !== "" && g.age > 0
    );
  }, [guests]);

  // -- API Call --
  const handleSubmit = async () => {
    if (!isValid) return;
    console.log(bookingId)
    setIsSubmitting(true);
    setError(null);

    // Map internal state to DTO structure
    const payload = guests.map((g) => ({
      name: g.name,
      gender: g.gender,
      age: Number(g.age),
    }));
    
    try {
      // Mocking API URL structure based on requirements
      const url = `/bookings/${bookingId}/addGuests`;
      console.log(bookingId);
      // Actual call (Commented out solely for demo purposes so it doesn't actually crash in a non-API env)
      // await axios.post(url, payload);
      const response = await api.post(url, payload);
      console.log("Add Guests Response:", response.data);

      setShowSuccess(true);
      // Reset form after success modal closes or immediately
      setGuests([{ internalId: Date.now(), name: "", gender: "", age: "" }]);
    } catch (err) {
      console.error(err);
      setError("Failed to add guests. Please try again.");
    } finally {
      setIsSubmitting(false);
      navigate(`/payments/${bookingId}`, { replace: true });
    }
  };

  // -- Framer Motion Variants --
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: { opacity: 0, x: -20, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen mt-[88px] w-full bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-3xl z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-10 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            Neon Stays
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
            Manage Guests
          </h1>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Add details for everyone staying at your booking. Ensure information
            matches their government ID.
          </p>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-center text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guest List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {guests.map((guest, index) => (
              <motion.div
                key={guest.internalId}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)]"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Guest Counter Badge */}
                  <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-xs font-bold text-slate-400 border border-slate-700 shrink-0">
                    {index + 1}
                  </div>

                  {/* Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 w-full">
                    {/* Name Input */}
                    <div className="sm:col-span-6">
                      <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={guest.name}
                        onChange={(e) =>
                          updateGuest(guest.internalId, "name", e.target.value)
                        }
                        placeholder="e.g. Alex Doe"
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
                      />
                    </div>

                    {/* Gender Select */}
                    <div className="sm:col-span-4">
                      <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          value={guest.gender}
                          onChange={(e) =>
                            updateGuest(
                              guest.internalId,
                              "gender",
                              e.target.value
                            )
                          }
                          className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                        {/* Custom Chevron */}
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Age Input */}
                    <div className="sm:col-span-2 relative">
                      <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
                        Age
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={guest.age}
                        onChange={(e) =>
                          updateGuest(guest.internalId, "age", e.target.value)
                        }
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 text-center"
                      />
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeGuest(guest.internalId)}
                    className="mt-6 sm:mt-0 p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors self-end sm:self-center"
                    title="Remove Guest"
                  >
                    <IconTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Button */}
        <motion.div layout className="mt-6">
          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(34, 211, 238, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={addGuest}
            className="w-full py-4 border-2 border-dashed border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-slate-400 font-medium hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 group"
          >
            <div className="bg-slate-800 p-1 rounded-md group-hover:bg-cyan-500/20 transition-colors">
              <IconPlus />
            </div>
            Add Another Guest
          </motion.button>
        </motion.div>

        {/* Submit Section */}
        <motion.div
          layout
          className="mt-10 pb-10 sticky bottom-0 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent pt-10 z-20"
        >
          <motion.button
            whileHover={
              isValid && !isSubmitting
                ? { scale: 1.02, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }
                : {}
            }
            whileTap={isValid && !isSubmitting ? { scale: 0.98 } : {}}
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit}
            type="button"
            className={`w-full py-4 rounded-2xl font-bold text-lg tracking-wide shadow-lg flex items-center justify-center gap-3 transition-all duration-300
                ${
                  isValid
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white cursor-pointer shadow-cyan-500/20"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }
              `}
          >
            {isSubmitting ? (
              <>
                <IconLoader />
                <span className="animate-pulse">Saving...</span>
              </>
            ) : (
              <span>Complete Booking</span>
            )}
          </motion.button>
          <p className="text-center text-xs text-slate-600 mt-4">
            By clicking complete, you agree to our terms of service.
          </p>
        </motion.div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl shadow-purple-500/20 relative overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/30 blur-[60px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                    <IconCheck />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Guests Added!
                  </h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Your booking has been updated successfully. We look forward
                    to hosting you.
                  </p>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors border border-slate-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddGuests;
