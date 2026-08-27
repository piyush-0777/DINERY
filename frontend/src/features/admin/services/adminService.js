import request from "../../../services/api";

export const adminService = {
  getStats: () => request("/admin/stats", "GET"),
  getAllRestaurants: () => request("/admin/restaurants", "GET"),
  getAllUsers: () => request("/admin/users", "GET"),
  getPricing: () => request("/admin/pricing", "GET"),
  updatePricing: (planKey, data) => request(`/admin/pricing/${planKey}`, "PUT", data),
  createRestaurant: (data) => request("/admin/restaurants", "POST", data),
  deleteRestaurant: (restaurantId) =>
    request(`/admin/restaurants/${restaurantId}`, "DELETE"),
  grantPremium: (restaurantId, data) =>
    request(`/admin/restaurants/${restaurantId}/grant-premium`, "POST", data),
  revokePremium: (restaurantId) =>
    request(`/admin/restaurants/${restaurantId}/revoke-premium`, "POST"),
  updateUserRole: (restaurantId, role) =>
    request(`/admin/restaurants/${restaurantId}/role`, "PATCH", { role }),
};
