import request from "../../../services/api";

export const premiumService = {
  getPlans: () => request("/subscription/plans", "GET"),
  getStatus: () => request("/subscription/status", "GET"),
  createOrder: (data) => request("/subscription/create-order", "POST", data),
  verifyPayment: (data) => request("/subscription/verify-payment", "POST", data),
  activateSubscription: (data) => request("/subscription/activate", "POST", data),
};
