import request from "./api";

export const authService = {
  ownerLogin: (data) =>
    request("/restaurant/login", "POST", data),

  customerLogin: (restaurantId, tableId, name, phone) =>
    request(`/customer/${restaurantId}/${tableId}/login`, "POST", { name, phone }),

  restaurantRegister: (data) =>
    request("/restaurant/registerRestaurant", "POST", data),


  sendOTP: ( restaurantName, ownerEmail) =>
    request("/restaurant/otp", "POST", { restaurantName , ownerEmail }),

  // Verify OTP
  verifyOTP: (ownerEmail, otp) =>
    request("/restaurant/verifyOTP", "POST", { ownerEmail, otp }),

  logout: () =>
    request("/auth/logout", "POST"),
};
