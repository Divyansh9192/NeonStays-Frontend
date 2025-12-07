import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, BarChart, Eye, Plus, BedDouble, Bed, Trash2 } from "lucide-react";
import { deleteHotel, getOwnerHotels } from "../../api/ownerHotel";

const MyHotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await getOwnerHotels();
        console.log(res.data);
        setHotels(
          res.data || [
            {
              _id: "1",
              name: "Grand Budapest",
              address: "Republic of Zubrowka",
              photo:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
              status: "Active",
            },
            {
              _id: "2",
              name: "Overlook Hotel",
              address: "Colorado Mountains",
              photo:
                "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
              status: "Draft",
            },
          ]
        ); // ✅ Update state from API
      } catch (err) {
        console.log(err);
      }
    };

    fetchHotels();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        await deleteHotel(id);
        setHotels((prev) => prev.filter((h) => h._id !== id && h.id !== id));
      } catch (err) {
        alert("Failed to delete hotel");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Hotels</h1>
        <Link
          to="/owner/hotels/new"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/25 font-medium"
        >
          <Plus size={18} /> Add New Hotel
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/10"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={hotel.photos[0]}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
      ${
        hotel.active ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"
      }`}
              >
                {hotel.active ? "Active" : "Inactive"}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-white mb-1">
                {hotel.name}
              </h3>
              <p className="text-slate-400 text-sm truncate mb-4">
                {hotel.address}
              </p>

              <div className="flex gap-2 pt-4 border-t border-slate-800">
                <Link
                  to={`/owner/hotels/${hotel.id}/edit`}
                  className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-center flex justify-center items-center gap-2 text-sm transition-colors"
                >
                  <Edit size={14} /> Edit
                </Link>
                <Link
                  to={`/owner/hotels/${hotel.id}/bookings`}
                  className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-indigo-900/30 hover:text-indigo-400 text-center flex justify-center items-center gap-2 text-sm transition-colors"
                >
                  <Eye size={14} /> Bookings
                </Link>
                <Link
                  to={`/owner/hotels/${hotel.id}/rooms`}
                  className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-indigo-900/30 hover:text-indigo-400 text-center flex justify-center items-center gap-2 text-sm transition-colors"
                >
                  <BedDouble size={14} /> Rooms
                </Link>
                <button
                  onClick={() => handleDelete(hotel.id)}
                  className="col-span-1 flex justify-center p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>

                <Link
                  to={`/owner/hotels/${hotel.id}/reports`}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-purple-400 transition-colors"
                >
                  <BarChart size={18} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
