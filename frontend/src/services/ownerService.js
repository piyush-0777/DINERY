import request from "./api";

export const ownerService = {
  getProfile: () =>
    request("/owner/profile", "GET"),

  updateProfile: (data) =>
    request("/owner/profile", "PUT", data),

  getRestaurantDashboard: () =>
    request("/restaurant/dashboard", "GET"),

  uploadRestaurantImage: (formData) =>
    request("/owner/upload", "POST", formData, true),
  
};
