import api from "./axios";

export const searchHotels = async ({ city, startDate, endDate, roomsCount }) => {
  const response = await api.post("/hotels/search", {
    city,
    startDate,
    endDate,
    roomsCount,
  });
  return response.data;
};
