import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit3, Trash2, Eye, Calendar, BedDouble, DollarSign, Layers, Lock } from 'lucide-react';
import { deleteRoom, getRooms } from '../../api/roomAdmin';
import { getOwnerHotels } from "../../api/ownerHotel";

const RoomsList = () => {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotelActive, setHotelActive] = useState(true);

  useEffect(() => {
    fetchRooms();
    fetchHotelStatus();
  }, [hotelId]);

  const fetchHotelStatus = async () => {
    try {
      const res = await getOwnerHotels();
      console.log(res.data)
      const hotel = res?.data.find(h => String(h.id) === String(hotelId));

      setHotelActive(hotel?.active);
    } catch (err) {
      console.error("Failed to fetch hotel status", err);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await getRooms(hotelId);
      setRooms(res?.data);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoom(hotelId, roomId);
        setRooms(rooms.filter(r => r.id !== roomId));
      } catch (err) {
        alert("Failed to delete room");
      }
    }
  };

  if (loading) return <div className="p-10 text-slate-400 animate-pulse">Loading rooms...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">

      {/* ✅ INACTIVE HOTEL WARNING */}
      {!hotelActive && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 backdrop-blur-md text-center"
        >
          🚫 This hotel is inactive. Activate it to add rooms.
        </motion.div>
      )}

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Room Management</h1>
          <p className="text-slate-400">Manage availability, pricing, and details for this hotel.</p>
        </div>

        {/* ✅ ACTIVE HOTEL → Add Room Enabled */}
        {hotelActive ? (
          <Link 
            to={`/owner/hotels/${hotelId}/rooms/new`}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300"
          >
            <Plus size={20} /> Add Room
          </Link>
        ) : (
          /* ✅ INACTIVE HOTEL → Disabled Button */
          <button
            disabled
            className="flex items-center gap-2 px-6 py-3 bg-slate-800/60 text-slate-500 font-semibold rounded-xl cursor-not-allowed border border-slate-700"
            title="Hotel is inactive"
          >
            <Lock size={18} /> Add Room
          </button>
        )}
      </div>

      {/* ✅ ROOM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, index) => (
          <motion.div 
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-slate-800/50 p-2 rounded-lg text-cyan-400 group-hover:text-cyan-300">
                <BedDouble size={24} />
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20">
                {room.type}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-4">{room.type}</h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-slate-400 text-sm">
                <span className="flex items-center gap-2"><DollarSign size={16} /> Base Price</span>
                <span className="text-slate-200 font-mono">${room.basePrice}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-sm">
                <span className="flex items-center gap-2"><Layers size={16} /> Total Units</span>
                <span className="text-slate-200">{room.totalCount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-sm">
                <span className="flex items-center gap-2"><Calendar size={16} /> Capacity</span>
                <span className="text-slate-200">{room.capacity} Guests</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-800/50">
              <Link to={`/owner/hotels/${hotelId}/rooms/${room.id}`} className="col-span-1 flex justify-center p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" title="View Details">
                <Eye size={18} />
              </Link>
              <Link to={`/owner/hotels/${hotelId}/rooms/${room.id}/edit`} className="col-span-1 flex justify-center p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-indigo-400 hover:bg-indigo-900/20 transition-colors" title="Edit">
                <Edit3 size={18} />
              </Link>
              <button onClick={() => handleDelete(room.id)} className="col-span-1 flex justify-center p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-colors" title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
