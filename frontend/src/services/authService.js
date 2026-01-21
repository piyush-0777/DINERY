import request from "./api";

export const authService = {
  ownerLogin: (email, password) =>
    request("/owner/login", "POST", { email, password }),

  customerLogin: (restaurantId, tableId, name, phone) =>
    request(`/customer/${restaurantId}/${tableId}/login`, "POST", { name, phone }),

  restaurantRegister: (data) =>
    request("/restaurant/registerRestaurant", "POST", data),

  logout: () =>
    request("/auth/logout", "POST"),
};
