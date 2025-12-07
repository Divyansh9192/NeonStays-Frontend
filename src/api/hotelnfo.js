import api from "./axios";

export const getHotelInfoboi =  async (hotelId) => {
    const response = await api.get(`/hotels/search/${hotelId}/info`);

    return response.data;
};