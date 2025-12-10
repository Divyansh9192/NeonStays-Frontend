import api from "./axios";

export const getPaymentInfo = async (sessionId) => {
    const response = await api.get(`/payment/session/${sessionId}`);
    return response.data;
  }