// src/api/ownerHotels.js
import api from "./axios";

export const getOwnerHotels = async () => {
  const res = await api.get("/admin/hotels");
  return res.data;
};

export const getHotelById = async (hotelId) => {
  const res = await api.get(`/admin/hotels/${hotelId}`);
  return res.data;
};

export const createHotel = async (payload) => {
  const res = await api.post("/admin/hotels", payload);
  return res.data;
};

export const updateHotel = async (hotelId, payload) => {
  const res = await api.put(`/admin/hotels/${hotelId}`, payload);
  return res.data;
};

export const deleteHotel = async (hotelId) => {
  await api.delete(`/admin/hotels/${hotelId}`);
  
};
export const activateHotel = async (hotelId) => {
  await api.patch(`/admin/hotels/${hotelId}/activate`);
};
export const deactivateHotel = async (hotelId) => {
  await api.patch(`/admin/hotels/${hotelId}/deactivate`);
};

export const getHotelBookings = async (hotelId) => {
  const res = await api.get(`/admin/hotels/${hotelId}/bookings`);
  return res.data;
};

export const getHotelReport = async (hotelId, { startDate, endDate }) => {
  const res = await api.get(`/admin/hotels/${hotelId}/reports`, {
    params: { startDate, endDate },
  });
  return res.data;
};
