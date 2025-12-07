import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  activateHotel,
  createHotel,
  deactivateHotel,
  getHotelById,
  updateHotel,
} from "../../api/ownerHotel";
import { data } from "autoprefixer";

const HotelForm = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  const isEditMode = !!hotelId;

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    photos: [],
    active: true,
    amenities: [],
    hotelContactInfo: {
      address: "",
      phoneNumber: "",
      email: "",
      location: "",
    },
  });

  useEffect(() => {
    if (isEditMode) {
      getHotelById(hotelId).then((res) => {
        const data = res.data; // ✅ Correct level
        console.log(data);
        setFormData({
          name: data.name || "",
          city: data.city || "",
          photos: data.photos || [],
          amenities: data.amenities || [],
          active: data.active ?? true,
          hotelContactInfo: data.hotelContactInfo || {
            address: "",
            phoneNumber: "",
            email: "",
            location: "",
          },
        });

        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [hotelId, isEditMode]);

  const handleToggle = async () => {
    if (!formData.active) {
      // ✅ Activating
      await activateHotel(hotelId);
      setFormData({ ...formData, active: true });
    } else {
      // ✅ Deactivating
      await deactivateHotel(hotelId);
      setFormData({ ...formData, active: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateHotel(hotelId, formData);
      } else {
        await createHotel(formData);
        console.log(formData);
        setShowDialog(true);
      }
    } catch (err) {
      alert("Error saving hotel");
    }
  };

  const inputClass =
    "w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600";
  const labelClass = "block text-sm font-medium text-slate-400 mb-1.5";
  if (loading) {
    return <div className="text-slate-400 p-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        {isEditMode ? "Edit Hotel" : "Add New Hotel"}
      </h1>
      {isEditMode && (
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide
        ${
          formData.active
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-red-500/20 text-red-400 border border-red-500/30"
        }`}
          >
            {formData.active ? "Active" : "Inactive"}
          </span>

          {/* ✅ Minimal toggle */}
          <button
            type="button"
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300
          ${formData.active ? "bg-green-500" : "bg-slate-600"}
        `}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition
            ${formData.active ? "translate-x-6" : "translate-x-1"}
          `}
            />
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm"
      >
        <div>
          <label className={labelClass}>Hotel Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            placeholder="e.g. The Grand Resort"
          />
        </div>

        <div>
          <label>City</label>
          <input
            required
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={inputClass}
            placeholder="e.g. New Delhi"
          />
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <input
            type="text"
            value={formData.hotelContactInfo.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                hotelContactInfo: {
                  ...formData.hotelContactInfo,
                  address: e.target.value,
                },
              })
            }
            className={inputClass}
            placeholder="Street, Area, Landmark"
          />
        </div>

        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="text"
            value={formData.hotelContactInfo.phoneNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                hotelContactInfo: {
                  ...formData.hotelContactInfo,
                  phoneNumber: e.target.value,
                },
              })
            }
            className={inputClass}
            placeholder="9876543210"
          />
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={formData.hotelContactInfo.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                hotelContactInfo: {
                  ...formData.hotelContactInfo,
                  email: e.target.value,
                },
              })
            }
            className={inputClass}
            placeholder="contact@hotel.com"
          />
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <input
            type="text"
            value={formData.hotelContactInfo.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                hotelContactInfo: {
                  ...formData.hotelContactInfo,
                  location: e.target.value,
                },
              })
            }
            className={inputClass}
            placeholder="Coordinates / Google Maps link"
          />
        </div>

        <div>
          <label className={labelClass}>
            Photos (Comma separated URLs for demo)
          </label>
          <input
            type="text"
            value={formData.photos.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                photos: e.target.value.split(",").map((p) => p.trim()),
              })
            }
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Amenities</label>
            <input
              type="text"
              value={formData.amenities.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amenities: e.target.value.split(",").map((a) => a.trim()),
                })
              }
              className={inputClass}
              placeholder="Wifi, Pool, Gym"
            />
          </div>
          {/* Add Price/Room fields here */}
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/owner/hotels")}
            className="px-6 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95"
          >
            {isEditMode ? "Update Hotel" : "Create Hotel"}
          </button>
        </div>
      </form>
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">
              Hotel Created Successfully ✅
            </h2>

            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Your hotel has been added to your dashboard.
              <br />
              <br />
              To make it visible to guests in search results, please add at
              least{" "}
              <span className="text-indigo-400 font-medium">one room</span>.
              <br />
              <br />
              After rooms are added, pricing and availability will be
              initialized automatically. This process may take up to{" "}
              <span className="text-indigo-400 font-medium">1 hour</span> before
              your hotel appears in search results.
            </p>

            <button
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-all"
              onClick={() => navigate("/owner/hotels")}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelForm;
