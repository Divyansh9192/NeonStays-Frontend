import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { createRoom, getRoomById, updateRoom } from "../../api/roomAdmin";

const RoomForm = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!roomId;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    basePrice: "",
    capacity: "",
    totalCount: "",
    amenities: "", // Managed as comma-separated string for input
    photos: "", // Managed as comma-separated string for input
  });

  useEffect(() => {
    if (isEdit) {
      loadRoomData();
    }
  }, [roomId]);

  const loadRoomData = async () => {
    try {
      setLoading(true);
      const res = await getRoomById(hotelId, roomId);
      const data = res?.data;
      setFormData({
        ...data,
        amenities: data.amenities ? data.amenities.join(", ") : "",
        photos: data.photos ? data.photos.join(", ") : "",
      });
    } catch (error) {
      console.error("Failed to load room", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert comma strings back to arrays
    const payload = {
      ...formData,
      basePrice: parseFloat(formData.basePrice),
      capacity: parseInt(formData.capacity),
      totalCount: parseInt(formData.totalCount),
      amenities: formData.amenities
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      photos: formData.photos
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
    };

    try {
      if (isEdit) {
        await updateRoom(hotelId, roomId, payload);
      } else {
        await createRoom(hotelId, payload);
      }
      navigate(`/owner/hotels/${hotelId}/rooms`);
    } catch (error) {
      alert("Error saving room");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all";
  const labelClass = "block text-sm font-medium text-slate-400 mb-2";

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4">
          {isEdit ? `Edit Room: ${formData.type}` : "Create New Room"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Type */}
            <div className="col-span-2">
              <label className={labelClass}>Room Type Name</label>
              <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                placeholder="e.g. Deluxe Ocean View Suite"
                className={inputClass}
              />
            </div>

            {/* Price */}
            <div>
              <label className={labelClass}>Base Price ($)</label>
              <input
                type="number"
                step="0.01"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Total Count */}
            <div>
              <label className={labelClass}>Total Units Available</label>
              <input
                type="number"
                name="totalCount"
                value={formData.totalCount}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Capacity */}
            <div>
              <label className={labelClass}>Guest Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className={labelClass}>Amenities (comma separated)</label>
            <textarea
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              rows="3"
              placeholder="Wifi, Pool View, Mini Bar, King Size Bed"
              className={inputClass}
            />
          </div>

          {/* Photos */}
          <div>
            <label className={labelClass}>Photo URLs (comma separated)</label>
            <textarea
              name="photos"
              value={formData.photos}
              onChange={handleChange}
              rows="3"
              placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
              className={inputClass}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50 transition-all duration-300"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save size={20} />
              )}
              {isEdit ? "Update Room" : "Create Room"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RoomForm;
