import api from "./axios";

export const promoteToHost = async () => {
  const res = await api.patch("/users/promote-to-host");
  return res.data; 
};
