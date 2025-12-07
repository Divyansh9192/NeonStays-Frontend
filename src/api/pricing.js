import api from "./axios";

export const getRoomDynamicPrice = async (roomId, start, end) => {
  const res = await api.get(`/hotels/search/${roomId}/price`, {
    params: { start, end },
  });
  return res.data;
};
