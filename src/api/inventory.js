// src/api/inventory.js

import api from "./axios";


/**
 * Get all inventory entries for a room
 * GET /admin/inventory/rooms/{roomId}
 */
export const getRoomInventory = async (roomId) => {
  const response = await api.get(`/admin/inventory/rooms/${roomId}`);
  return response.data; // List<InventoryDTO>
};

/**
 * Update inventory for a room
 * PATCH /admin/inventory/rooms/{roomId}
 *
 * @param {number} roomId
 * @param {object} payload - matches UpdateInventoryRequestDTO on backend
 */
export const updateRoomInventory = async (roomId, payload) => {
  await api.patch(`/admin/inventory/rooms/${roomId}`, payload);
};
