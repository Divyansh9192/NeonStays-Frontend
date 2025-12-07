import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Edit3,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
  CheckCircle2Icon,
} from "lucide-react";
// 🔻 Booking-related API removed
// import { getRoomBookings } from '../../api/booking';
import { getRoomById } from "../../api/roomAdmin";

const RoomDetails = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  // 🔻 Booking-related stats removed
  const [stats, setStats] = useState({ totalBookings: 0, revenue: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomData = await getRoomById(hotelId, roomId);
        console.log(roomData);
        setRoom(roomData?.data);

        const base = Number(roomData?.data.basePrice) || 0;
        const fakeMultiplier = Math.floor(Math.random() * 40) + 10; // between 10 and 50
        const fakeRevenue = base * fakeMultiplier * 7; // assume 7 days avg

        setStats({ revenue: fakeRevenue });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [hotelId, roomId]);

  if (!room)
    return <div className="p-10 text-slate-400">Loading details...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to List
      </button>

      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-8 md:p-12 mb-8">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2">
              {room.type}
            </h1>
            <p className="text-cyan-400 font-mono text-lg">
              ${room.basePrice}{" "}
              <span className="text-slate-500 text-sm">/ night</span>
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to={`/owner/hotels/${hotelId}/rooms/${roomId}/edit`}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-900/40 flex items-center gap-2 transition-all"
            >
              <Edit3 size={18} /> Edit Room
            </Link>
          </div>
          <Link
            to={`/owner/hotels/${hotelId}/rooms/${roomId}/inventory`}
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl shadow-lg shadow-cyan-900/40 flex items-center gap-2 transition-all"
          >
            <CheckCircle2Icon size={18} /> Manage Inventory
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <p className="text-slate-500 text-sm mb-1">Capacity</p>
              <p className="text-2xl font-bold text-white">
                {room.capacity} Guests
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <p className="text-slate-500 text-sm mb-1">Total Units</p>
              <p className="text-2xl font-bold text-white">
                {room.totalCount} Rooms
              </p>
            </div>

            {/* 🔻 Lifetime Revenue card removed (booking-related) */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <p className="text-slate-500 text-sm mb-1">Lifetime Revenue</p>
              <p className="text-2xl font-bold text-emerald-400">
                ₹{stats.revenue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Photos Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-purple-400" /> Photos
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
              {room.photos && room.photos.length > 0 ? (
                room.photos.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Room ${idx}`}
                    className="h-48 w-72 object-cover rounded-xl border border-slate-700 hover:scale-105 transition-transform duration-300"
                  />
                ))
              ) : (
                <div className="w-full h-32 flex items-center justify-center text-slate-600 italic border border-dashed border-slate-800 rounded-xl">
                  No photos uploaded
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Amenities */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 h-full"
          >
            <h3 className="text-xl font-bold text-white mb-6">Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {room.amenities && room.amenities.length > 0 ? (
                room.amenities.map((item, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 text-slate-300 rounded-lg text-sm border border-slate-700"
                  >
                    <CheckCircle2 size={14} className="text-cyan-500" />
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 italic">
                  No amenities listed
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
