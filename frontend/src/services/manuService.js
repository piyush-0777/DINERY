import request from "./api";

export const menuService = {
  getMenuByRestaurant: (restaurantId) =>
    request(`/menu/${restaurantId}`, "GET"),

  addMenuItem: (data) =>
    request("/food/create", "POST", data),

  updateMenuItem: (menuId, data) =>
    request(`/menu/${menuId}`, "PUT", data),

  deleteMenuItem: (menuId) =>
    request(`/menu/${menuId}`, "DELETE"),
};
