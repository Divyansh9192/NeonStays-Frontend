import api from "./axios";

export const getRooms = (hotelId) =>
  api.get(`/admin/hotels/${hotelId}/rooms`).then(res => res.data);

export const getRoomById = (hotelId, roomId) =>
  api.get(`/admin/hotels/${hotelId}/rooms/${roomId}`).then(res => res.data);

export const createRoom = (hotelId, data) =>
  api.post(`/admin/hotels/${hotelId}/rooms`, data).then(res => res.data);

export const updateRoom = (hotelId, roomId, data) =>
  api.put(`/admin/hotels/${hotelId}/rooms/${roomId}`, data).then(res => res.data);

export const deleteRoom = (hotelId, roomId) =>
  api.delete(`/admin/hotels/${hotelId}/rooms/${roomId}`);