import api from "./axios";

export const initBooking = async (
  hotelId,
  roomId,
  checkInDate,
  checkOutDate,
  roomsCount
) => {
  try {
    const response = await api.post("/bookings/init", {
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
      roomsCount,
    });
    return response.data;
  } catch (error) {
  const backendError = error?.response?.data?.error?.message;

  throw backendError;
}

};
