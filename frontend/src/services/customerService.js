import request from "./api";

export const customerService = {
  getCustomerProfile: () =>
    request("/customer/profile", "GET"),

  updateCustomerProfile: (data) =>
    request("/customer/profile", "PUT", data),

  getTableInfo: (restaurantId, tableId) =>
    request(`/customer/${restaurantId}/${tableId}`, "GET"),
};
