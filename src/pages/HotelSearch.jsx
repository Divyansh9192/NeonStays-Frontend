import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// --- Icons (Inline SVGs) ---

const Icons = {
  Star: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.760-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  ),
  MapPin: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  ),
  Filter: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      />
    </svg>
  ),
  ChevronRight: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  ),
};

// --- Helpers ---

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 15 },
  },
};

// --- Skeleton Loader ---

const SkeletonCard = () => (
  <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden h-[420px] flex flex-col">
    <div className="h-56 bg-neutral-800 animate-pulse" />
    <div className="p-5 flex flex-col gap-3 flex-1">
      <div className="h-6 bg-neutral-800 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-neutral-800 rounded w-1/2 animate-pulse" />
      <div className="flex gap-2 mt-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-6 w-16 bg-neutral-800 rounded-full animate-pulse"
          />
        ))}
      </div>
      <div className="mt-auto flex justify-between items-center pt-4 border-t border-neutral-800">
        <div className="h-6 w-24 bg-neutral-800 rounded animate-pulse" />
        <div className="h-10 w-28 bg-neutral-800 rounded-lg animate-pulse" />
      </div>
    </div>
  </div>
);

// --- Empty State ---

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="col-span-full flex flex-col items-center justify-center py-20 text-neutral-400"
  >
    <svg
      width="120"
      height="120"
      fill="none"
      className="mb-6 opacity-50 text-indigo-500"
    >
      <path
        d="M3 21H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 21V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V21"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 9H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="17"
        cy="7"
        r="9"
        className="fill-neutral-950 stroke-indigo-400 stroke-2"
      />
    </svg>
    <h3 className="text-xl font-semibold text-neutral-200 mb-2">
      No rooms found
    </h3>
    <p className="max-w-md text-center text-neutral-500">
      Try adjusting your filters or dates.
    </p>
  </motion.div>
);

// --- Hotel Card ---

const HotelCard = memo(({ data, onSelect }) => {
  const { hotel, price } = data;
  const fallback =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";
  const img = hotel.photos?.length ? hotel.photos[0] : fallback;

  const amenities = hotel.amenities?.slice(0, 3) || [];
  const navigate = useNavigate(); 
  const handleHotelInfo = (hotelId) => {
    
    navigate(`/hotelinfo/${hotelId}`);
  }

  return (
    <motion.div
      variants={cardVariants}
      layout
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      tabIndex={0}
      role="listitem"
      onKeyDown={(e) => e.key === "Enter" && onSelect(hotel.id)}
      onClick={() => onSelect(hotel.id)}
      className="group relative flex flex-col h-full bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-lg cursor-pointer"
    >
      <div className="relative h-60 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
          variants={{ hover: { scale: 1.1 } }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/10 to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 bg-neutral-950/60 rounded-lg text-xs text-yellow-400">
          <Icons.Star className="w-3 h-3" />
          <span className="text-white">
            {hotel.rating?.toFixed(1) || "New"}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 -mt-4">
        <h3 className="text-xl font-bold text-white">{hotel.name}</h3>

        <div className="flex items-center text-neutral-400 text-sm mb-4">
          <Icons.MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{hotel.address}</span>
          <span className="mx-2 text-neutral-600">•</span>
          <span className="text-xs text-neutral-500">
            {hotel.distanceFromCenterKm
              ? `${hotel.distanceFromCenterKm} km from center`
              : "— km from center"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {amenities.map((a, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs text-neutral-400 bg-neutral-800/50 rounded-md border border-neutral-700/50"
            >
              {a}
            </span>
          ))}
          {hotel.amenities?.length > 3 && (
            <span className="px-2 py-1 text-xs text-neutral-500">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-neutral-800 flex justify-between items-center">
          <div>
            <p className="text-xs text-neutral-500 uppercase">Start from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-white">
                {formatCurrency(price)}
              </span>
              <span className="text-xs text-neutral-500">/ night</span>
            </div>
          </div>

          <motion.button
            whileHover="hover"
            onClick={() => handleHotelInfo(hotel.id)}
            whileTap={{ scale: 0.96 }}
            variants={{
              hover: { scale: 1.03 },
            }}
            className="
    relative overflow-hidden
    flex items-center justify-center
    gap-2
    bg-indigo-600 hover:bg-indigo-500
    text-white
    px-5 py-2.5
    rounded-xl
    text-sm font-semibold
    shadow-md shadow-indigo-500/20
    transition-all
  "
          >
            <span className="relative z-10">View</span>

            {/* Arrow animation */}
            <motion.span
              className="relative z-10"
              initial={{ x: -6, opacity: 0 }}
              variants={{
                hover: { x: 0, opacity: 1 },
              }}
            >
              <Icons.ChevronRight className="w-4 h-4" />
            </motion.span>

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0"
              variants={{
                hover: { opacity: 0.2, x: "100%" },
              }}
              initial={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.button>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500"
        initial={{ scaleX: 0, opacity: 0 }}
        variants={{ hover: { scaleX: 1, opacity: 1 } }}
      />
    </motion.div>
  );
});

// --- Header ---

const Header = ({ activeFilter, setActiveFilter, dates }) => {
  const filters = ["Recommended", "Price: Low to High", "Top Rated", "Nearest"];

  return (
    <div className="sticky top-0 bg-neutral-900/80 backdrop-blur-xl border-b border-white/5 pb-4 pt-6 z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white"
            >
              Available Rooms
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-neutral-400 text-sm mt-1"
            >
              {dates.checkIn} — {dates.checkOut}
            </motion.p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
              <Icons.Filter className="w-5 h-5" />
            </div>

            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap 
                    ${
                      isActive
                        ? "text-white"
                        : "text-neutral-400 hover:text-neutral-200"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeChip"
                      className="absolute inset-0 bg-neutral-800 rounded-full"
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function HotelSearch({
// Replace the page wrapper with this:
  hotels = [],
  checkIn,
  checkOut,
  onViewRooms,
  isLoading = false,
}) {
  const [activeFilter, setActiveFilter] = useState("Recommended");


  const processedHotels = useMemo(() => {
    let sorted = [...hotels];
    switch (activeFilter) {
      case "Price: Low to High":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Top Rated":
        sorted.sort((a, b) => b.hotel.rating - a.hotel.rating);
        break;
      case "Nearest":
        sorted.sort(
          (a, b) => a.hotel.distanceFromCenterKm - b.hotel.distanceFromCenterKm
        );
        break;
      default:
        break;
    }
    return sorted;
  }, [hotels, activeFilter]);
  
  

  return (
    <div
      className="
        min-h-screen 
        bg-neutral-900 
        text-neutral-200 
        pt-[88px] 
      "
    >
      {/* Header (NOT sticky now, to avoid navbar interference) */}
      <div className="mb-6">
        <Header
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          dates={{ checkIn, checkOut }}
        />
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="sr-only" role="status" aria-live="polite">
          {isLoading
            ? "Loading hotels..."
            : `Found ${processedHotels.length} hotels.`}
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <SkeletonCard key={n} />
              ))}
            </motion.div>
          ) : processedHotels.length > 0 ? (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {processedHotels.map((item) => (
                <HotelCard
                  key={item.hotel.id}
                  data={item}
                  onSelect={onViewRooms}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState key="empty" />
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 mt-12 py-8 text-center text-neutral-600 text-xs">
        © 2025 HotelGrid. Prices may vary.
      </footer>
    </div>
  );
}
