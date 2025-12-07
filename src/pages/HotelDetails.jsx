import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  MapPin,
  Star,
  Users,
  Wifi,
  Tv,
  ArrowRight,
  Image as ImageIcon,
  Coffee,
  Shield,
  Wind,
  Utensils,
  Droplets,
  Dumbbell,
  Flower2,
  Quote,
  Facebook,
  Twitter,
  Instagram,
  Mail,
} from "lucide-react";
import { getHotelInfoboi } from "../api/hotelnfo";
import { initBooking } from "../api/bookingInit";
import { useSelector } from "react-redux";
import { getRoomDynamicPrice } from "../api/pricing";

// --- Mock API & Utils ---
// const getHotelInfo = async (id) => {
//   await new Promise((r) => setTimeout(r, 800));
//   return {
//     data: {
//       hotel: {
//         id: id || "hotel_123",
//         name: "The Azure Sanctuary",
//         rating: 4.9,
//         reviewsCount: 128,
//         description:
//           "Experience the pinnacle of luxury in our oceanfront suites. Where modern architecture meets the soothing rhythm of the waves. Every detail, from the ambient lighting to the personalized concierge service, is designed to elevate your stay from a vacation to a transcendental journey.",
//         hotelContactInfo: {
//           address: "108 Ocean Dr, Maldives",
//           email: "concierge@azure.com",
//           phone: "+960 123 4567",
//         },
//         type: "Luxury Resort",
//         amenities: [
//           {
//             icon: "pool",
//             title: "Infinity Horizon Pool",
//             desc: "Merge with the ocean in our temperature-controlled infinity pool. Open 24/7.",
//           },
//           {
//             icon: "spa",
//             title: "Zenith Spa",
//             desc: "Holistic treatments inspired by ancient island traditions, including hydrotherapy.",
//           },
//           {
//             icon: "dining",
//             title: "Michelin Star Dining",
//             desc: "Culinary masterpieces crafted from local, sustainable ingredients by Chef Rémy.",
//           },
//           {
//             icon: "gym",
//             title: "Oceanview Fitness",
//             desc: "State-of-the-art Technogym equipment with panoramic sunset views. Personal trainers available.",
//           },
//           {
//             icon: "service",
//             title: "24/7 Private Butler",
//             desc: "Dedicated service to fulfill your every request, any time, discreetly.",
//           },
//           {
//             icon: "wifi",
//             title: "High-Speed Starlink",
//             desc: "Stay connected with the world, even in paradise, with guaranteed high bandwidth.",
//           },
//         ],
//         reviews: [
//           {
//             id: 1,
//             user: "Sarah Jenkins",
//             rating: 5,
//             text: "The most breathtaking sunrise I have ever witnessed. The service is impeccable. Everything was flawless.",
//             date: "Oct 2023",
//           },
//           {
//             id: 2,
//             user: "Marcus Chen",
//             rating: 5,
//             text: "A masterpiece of design. The Royal Sky Villa is worth every penny. Pure escapism and luxury redefined.",
//             date: "Sep 2023",
//           },
//           {
//             id: 3,
//             user: "Elena Rodriguez",
//             rating: 4.8,
//             text: "Truly a sanctuary. I felt my stress melt away the moment I stepped off the boat. Will definitely return.",
//             date: "Aug 2023",
//           },
//         ],
//       },
//       rooms: [
//         {
//           id: 1,
//           roomType: "Ocean Panorama Suite",
//           basePrice: 12500,
//           capacity: 2,
//           amenities: [
//             "Ocean View",
//             "King Bed",
//             "Jacuzzi",
//             "Smart Butler",
//             "Minibar",
//           ],
//           photos: [
//             "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
//           ],
//         },
//         {
//           id: 2,
//           roomType: "Royal Sky Villa",
//           basePrice: 25000,
//           capacity: 4,
//           amenities: [
//             "Private Pool",
//             "2 King Beds",
//             "Kitchen",
//             "Cinema",
//             "Terrace",
//           ],
//           photos: [
//             "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
//           ],
//         },
//         {
//           id: 3,
//           roomType: "Garden Zen Room",
//           basePrice: 8500,
//           capacity: 2,
//           amenities: [
//             "Garden View",
//             "Queen Bed",
//             "Meditation Area",
//             "Coffee Maker",
//           ],
//           photos: [
//             "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=80",
//           ],
//         },
//       ],
//       photos: [
//         "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
//         "https://images.unsplash.com/photo-1571896349842-6e53ce41be03?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
//       ],
//     },
//   };
// };

// --- Atmospheric Background Component ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a] pointer-events-none">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [-100, 100, -100],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.4, 0.2],
        y: [50, -50, 50],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
      className="absolute top-[40%] -right-[20%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px]"
    />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
  </div>
);
const formatHeaderDate = (date) => {
  if (!date) return null;

  try {
    const d = new Date(date);
    return d.toDateString(); // Example: "Sat Nov 29 2025"
  } catch {
    return date.toString().split("GMT")[0].trim(); // fallback
  }
};

// --- Hero Section Component ---
const HeroSection = ({ hotel, photos }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-end pb-12 overflow-hidden">
      {/* Background Parallax Image */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10" />
        <img
          src={photos[0]}
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs font-medium text-blue-300 uppercase tracking-widest">
              {hotel.type || "Luxury Resort"}
            </span>
            <div className="flex items-center text-amber-400">
              <Star size={14} fill="currentColor" />
              <span className="ml-1 text-sm font-bold text-white">
                {hotel.rating}
              </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            {hotel.name}
          </h1>
          <div className="flex items-center text-gray-300 backdrop-blur-sm bg-black/30 w-fit px-4 py-2 rounded-xl border border-white/5 hover:bg-black/50 transition-colors cursor-pointer">
            <MapPin size={18} className="text-blue-500 mr-2" />
            <span className="text-sm md:text-base font-light">
              {hotel?.hotelContactInfo?.address}
            </span>
          </div>
        </motion.div>

        {/* Floating Glass Gallery Preview */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex justify-end"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl w-[380px] shadow-2xl shadow-black/50">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {photos.slice(1, 3).map((pic, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="h-32 rounded-2xl overflow-hidden relative group cursor-pointer"
                >
                  <img
                    src={pic}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors" />
                </motion.div>
              ))}
            </div>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/5 rounded-xl text-white text-sm font-medium transition-all flex items-center justify-center group">
              <ImageIcon
                size={16}
                className="mr-2 group-hover:rotate-12 transition-transform"
              />
              View All Photos
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Smart Sticky Header ---
const StickyHeader = ({ hotel, isScrolled, checkIn, checkOut }) => (
  <AnimatePresence>
    {isScrolled && (
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center justify-between px-6 py-3">
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg">{hotel.name}</span>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span className="text-blue-400 font-medium">Available</span>
              <span>•</span>
              <span>
                <span>
                  {checkIn ? formatHeaderDate(checkIn) : "Select Dates"}
                </span>
              </span>
              <span>→</span>
              <span>
                {checkOut ? formatHeaderDate(checkOut) : "Select Dates"}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("rooms-grid");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105 active:scale-95"
          >
            Reserve Now
          </button>
        </div>
      </motion.header>
    )}
  </AnimatePresence>
);

// --- Premium Room Card ---
const RoomCard = ({
  room,
  hotelId,
  checkIn,
  checkOut,
  roomsCount,
  onError,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicPrice, setDynamicPrice] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);

  const getIcon = (amenity) => {
    const lower = amenity.toLowerCase();
    if (lower.includes("wifi"))
      return <Wifi size={14} className="text-emerald-400" />;
    if (lower.includes("pool"))
      return <Droplets size={14} className="text-cyan-400" />;
    if (lower.includes("coffee") || lower.includes("kitchen"))
      return <Coffee size={14} className="text-amber-400" />;
    if (lower.includes("view") || lower.includes("terrace"))
      return <MapPin size={14} className="text-purple-400" />;
    if (lower.includes("tv") || lower.includes("cinema"))
      return <Tv size={14} className="text-pink-400" />;
    return <Shield size={14} className="text-blue-400" />;
  };
  // useEffect(() => {
  //   const fetchPrice = async () => {
  //     if (!checkIn || !checkOut) return;

  //     try {
  //       setPriceLoading(true);
  //       const res = await getRoomDynamicPrice(room.id, checkIn, checkOut);
  //       console.log(res)
  //       setDynamicPrice(res.totalPrice);
  //     } catch (err) {
  //       console.error("Dynamic price error:", err);
  //     } finally {
  //       setPriceLoading(false);
  //     }
  //   };

  //   fetchPrice();
  // }, [checkIn, checkOut, room.id]);

  useEffect(() => {
    const fetchPrice = async () => {
      // Defensive: log inputs
      console.log("[price] fetch start", {
        roomId: room.id,
        checkIn,
        checkOut,
      });

      if (!checkIn || !checkOut) {
        console.log("[price] no dates selected, skipping fetch");
        return;
      }
      try {
        setPriceLoading(true);

        // call API
        const toLocalDate = (value) => {
          if (!value) return null;

          // If already a string like "2025-11-28"
          if (typeof value === "string") {
            // Case 1: ISO format with time → cut it
            if (value.includes("T")) return value.split("T")[0];

            // Case 2: Already correct → return as is
            return value;
          }

          // If value is a JS Date object
          if (value instanceof Date) {
            return value.toISOString().split("T")[0];
          }

          // If value is a number (timestamp)
          if (typeof value === "number") {
            return new Date(value).toISOString().split("T")[0];
          }

          // If it's a moment/dayjs object → call .toISOString
          if (value.toISOString) {
            return value.toISOString().split("T")[0];
          }

          console.warn("Unknown date format received:", value);
          return null;
        };

        const res = await getRoomDynamicPrice(
          room.id,
          toLocalDate(checkIn),
          toLocalDate(checkOut)
        );

        // log the raw response so we can see structure
        console.log("[price] raw response:", res);

        // support both patterns: axios-res.data or already returned data
        const payload = res?.data ?? res;

        // try plausible fields
        const totalPrice =
          payload?.totalPrice ?? payload?.total_price ?? payload?.total ?? null;

        if (totalPrice == null) {
          console.warn(
            "[price] no totalPrice found in response, payload:",
            payload
          );
          setDynamicPrice(null);
        } else {
          setDynamicPrice(totalPrice);
        }
      } catch (err) {
        console.error("[price] Dynamic price error:", err);
        // surface error as friendly message
        if (onError) onError("Unable to fetch dynamic price.");
      } finally {
        setPriceLoading(false);
      }
    };

    fetchPrice();
  }, [checkIn, checkOut, room.id]);

  const handleBook = async () => {
    setIsLoading(true);
    try {
      // Placeholder: In a real app, you'd navigate to the guest details page
      const res = await initBooking(
        hotelId,
        room.id,
        checkIn,
        checkOut,
        roomsCount
      );
      // In this demo, we'll just show a success message and log the ID
      console.log("Booking initialized successfully:", res.data.id);

      // NOTE: navigate(`/addguests/${res.data.id}`); is commented out for this demo
      // if (onError) onError(`Booking Success! ID: ${res.data.id}`);
      navigate(`/addguests/${res.data.id}`);
    } catch (err) {
      console.error(err);
      if (onError) onError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative bg-[#18181b] rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-lg hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]"
    >
      <div className="h-64 overflow-hidden relative">
        <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10 flex items-center">
          <Users size={12} className="mr-1.5 text-blue-400" /> {room.capacity}{" "}
          Guests
        </div>
        <motion.img
          src={
            room.photos?.[0] ||
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80"
          }
          alt={room.roomType}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.7 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent opacity-90" />
      </div>

      <div className="p-6 relative -mt-12 z-10">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {room.roomType}
        </h3>

        <div className="flex flex-wrap gap-2 mb-8">
          {(room.amenities || ["Free Wifi", "Ocean View", "King Bed"])
            .slice(0, 5)
            .map((am, i) => (
              <div
                key={i}
                className="flex items-center bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm"
              >
                {getIcon(am)}
                <span className="ml-2 text-xs text-gray-300 font-medium">
                  {am}
                </span>
              </div>
            ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
              Total Price
            </div>
            <div className="flex items-baseline gap-1">
              {priceLoading ? (
                <span className="text-sm text-gray-400">Calculating…</span>
              ) : dynamicPrice !== null ? (
                <span className="text-2xl font-bold text-white">
                  ₹{dynamicPrice.toLocaleString()}
                </span>
              ) : (
                <span className="text-2xl font-bold text-white">
                  ₹{room.basePrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleBook}
            disabled={isLoading}
            className={`
                            relative overflow-hidden px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300
                            ${
                              isLoading
                                ? "bg-gray-700 cursor-wait"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-blue-500/25"
                            }
                        `}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                Processing
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Book Now <ArrowRight size={14} />
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Amenities Section ---
const AmenitiesSection = ({ amenities }) => {
  const getIcon = (type) => {
    switch (type) {
      case "pool":
        return <Droplets className="w-6 h-6 text-cyan-400" />;
      case "spa":
        return <Flower2 className="w-6 h-6 text-pink-400" />;
      case "dining":
        return <Utensils className="w-6 h-6 text-orange-400" />;
      case "gym":
        return <Dumbbell className="w-6 h-6 text-green-400" />;
      case "service":
        return <Shield className="w-6 h-6 text-purple-400" />;
      default:
        return <Wifi className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section className="py-24 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Experience
          </h3>
          <p className="text-gray-400 max-w-2xl">
            Beyond your suite, a world of curated indulgences awaits. Designed
            for the discerning traveler.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#18181b] p-8 rounded-3xl border border-white/5 hover:border-white/10 hover:bg-[#202024] transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {getIcon(item.icon)}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Reviews Section ---
const ReviewsSection = ({ reviews }) => (
  <section className="py-24 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex items-center justify-between mb-16">
        <h3 className="text-3xl md:text-4xl font-bold text-white">
          Guest Stories
        </h3>
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 cursor-pointer">
            ←
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 cursor-pointer">
            →
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-[#18181b] to-[#121212] p-8 rounded-3xl border border-white/5 relative shadow-xl hover:shadow-blue-500/10 transition-shadow"
          >
            <Quote className="absolute top-8 right-8 text-white/5 w-12 h-12" />
            <div className="flex items-center gap-1 text-amber-400 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(review.rating) ? "currentColor" : "none"}
                  className={
                    i >= Math.floor(review.rating) ? "text-gray-700" : ""
                  }
                />
              ))}
            </div>
            <p className="text-gray-300 text-lg italic mb-8 relative z-10 leading-relaxed">
              "{review.text}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white/10">
                {review.user.charAt(0)}
              </div>
              <div>
                <div className="text-white font-bold text-sm">
                  {review.user}
                </div>
                <div className="text-gray-500 text-xs">{review.date}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Footer Component ---
const Footer = () => (
  <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-2xl font-bold text-white mb-6">
            The Azure Sanctuary
          </h4>
          <p className="text-gray-400 max-w-sm mb-8">
            Where the horizon meets luxury. Join us for an unforgettable escape
            into the sublime.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-white font-bold mb-6">Explore</h5>
          <ul className="space-y-4 text-gray-400 text-sm">
            {[
              "Villas & Suites",
              "Dining",
              "Wellness & Spa",
              "Experiences",
              "Events",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold mb-6">Newsletter</h5>
          <p className="text-gray-500 text-xs mb-4">
            Subscribe for exclusive offers and island news.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="bg-white/5 border-none rounded-l-lg px-4 py-2 text-white text-sm w-full focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-lg text-white text-sm font-bold hover:bg-blue-500 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>&copy; 2024 Azure Hospitality Group. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400">
            Cookie Settings
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Skeleton Loader ---
const ModernSkeleton = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 mt-20">
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Hero Skeleton */}
      <div className="h-[60vh] bg-white/5 rounded-3xl animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-shimmer" />
      </div>
      {/* Room Card Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 bg-white/5 rounded-3xl animate-pulse" />
        ))}
      </div>
      {/* Amenities Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-white/5 rounded-3xl animate-pulse" />
        ))}
      </div>
      {/* Footer Placeholder */}
      <div className="h-20 bg-white/5 rounded-xl animate-pulse" />
    </div>
  </div>
);

// --- Simple Alert/Error Message Box ---
const AlertBox = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] p-4 rounded-xl shadow-2xl bg-red-600/90 backdrop-blur-md text-white border border-white/10"
    >
      <div className="flex items-center space-x-3">
        <Shield size={20} />
        <span className="font-medium text-sm">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 p-1 rounded-full hover:bg-red-700 transition-colors"
        >
          &times;
        </button>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---
const HotelDetails = () => {
  const { hotelId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const checkInDate = useSelector((state) => state.booking.checkInDate);
  const checkOutDate = useSelector((state) => state.booking.checkOutDate);
  const roomsCount = useSelector((state) => state.booking.roomsCount);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);

    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getHotelInfoboi(hotelId);
        setData({
          ...res.data,
          hotel: {
            ...res.data.hotel,
            amenities: [
              {
                icon: "pool",
                title: "Infinity Horizon Pool",
                desc: "Merge with the ocean in our temperature-controlled infinity pool. Open 24/7.",
              },
              {
                icon: "spa",
                title: "Zenith Spa",
                desc: "Holistic treatments inspired by ancient island traditions, including hydrotherapy.",
              },
              {
                icon: "dining",
                title: "Michelin Star Dining",
                desc: "Culinary masterpieces crafted from local, sustainable ingredients by Chef Rémy.",
              },
              {
                icon: "gym",
                title: "Oceanview Fitness",
                desc: "State-of-the-art Technogym equipment with panoramic sunset views. Personal trainers available.",
              },
              {
                icon: "service",
                title: "24/7 Private Butler",
                desc: "Dedicated service to fulfill your every request, any time, discreetly.",
              },
              {
                icon: "wifi",
                title: "High-Speed Starlink",
                desc: "Stay connected with the world, even in paradise, with guaranteed high bandwidth.",
              },
            ],
            reviews: res.data.hotel.reviews || [
              {
                id: 1,
                user: "Sarah Jenkins",
                rating: 5,
                text: "The most breathtaking sunrise I have ever witnessed. The service is impeccable.",
                date: "Oct 2023",
              },
              {
                id: 2,
                user: "Marcus Chen",
                rating: 5,
                text: "A masterpiece of design. Pure escapism and luxury redefined.",
                date: "Sep 2023",
              },
              {
                id: 3,
                user: "Elena Rodriguez",
                rating: 4.8,
                text: "Truly a sanctuary. Stress melted the moment I arrived.",
                date: "Aug 2023",
              },
            ],
          },
        });
      } catch (e) {
        setError("Unable to load the sanctuary details.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hotelId]);

  if (loading) return <ModernSkeleton />;
  if (!data)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-400 mb-4">
            <Shield size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Connection Interrupted</h2>
          <p className="text-gray-400">
            No data received. Please check your connection.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-blue-400 hover:text-blue-300 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <AmbientBackground />

      <StickyHeader
        hotel={data.hotel}
        isScrolled={isScrolled}
        checkIn={checkInDate}
        checkOut={checkOutDate}
      />

      <main className="relative z-10">
        <HeroSection hotel={data.hotel} photos={data.photos} />

        <div className="max-w-7xl mx-auto px-6 mt-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-24"
          >
            <h2 className="text-2xl md:text-3xl font-light leading-relaxed text-gray-200">
              {
                "Experience the pinnacle of luxury in our oceanfront suites. Where modern architecture meets the soothing rhythm of the waves. Every detail, from the ambient lighting to the personalized concierge service, is designed to elevate your stay from a vacation to a transcendental journey."
              }
            </h2>
          </motion.div>

          <div id="rooms-grid" className="scroll-mt-32">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Sanctuaries
                </h3>
                <p className="text-gray-400">Select your perfect retreat.</p>
              </div>
              <div className="hidden md:flex gap-4">
                <span className="text-sm text-gray-500">Sorted by Luxury</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  hotelId={data.hotel.id}
                  checkIn={checkInDate}
                  checkOut={checkOutDate}
                  roomsCount={roomsCount}
                  onError={setError}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Main Content Sections */}
        <AmenitiesSection amenities={data.hotel.amenities || []} />
        <ReviewsSection reviews={data.hotel.reviews || []} />
      </main>

      <Footer />

      <AnimatePresence>
        {error && console.log(error)}
        {error && (
          <AlertBox message={error} onClose={() => setError(error.message)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelDetails;
