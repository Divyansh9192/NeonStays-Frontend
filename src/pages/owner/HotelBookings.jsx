import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelBookings } from "../../api/ownerHotel";

const HotelBookings = () => {
  const { hotelId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getHotelBookings(hotelId);
        console.log(res);
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [hotelId]);

  if (loading) {
    return <div className="text-slate-400 p-10">Loading bookings...</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Bookings</h1>
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-slate-400">
          <thead className="bg-slate-900/80 text-xs uppercase font-medium text-slate-300">
            <tr>
              <th className="px-6 py-4">Guest</th>
              <th className="px-6 py-4">Dates</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-900/40">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-white">
                  {booking.guests.length > 0 ? (
                    booking.guests.map((g) => g.name).join(", ")
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Guest Not Added!
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {booking.checkInDate} — {booking.checkOutDate}
                </td>
                <td className="px-6 py-4 font-mono text-white">
                  ₹{booking.amount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      booking.bookingStatus === "CONFIRMED"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelBookings;
