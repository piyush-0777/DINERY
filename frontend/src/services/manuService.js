import request from "./api";

export const menuService = {
  getMenuByRestaurant: (restaurantId) =>
    request(`/menu/${restaurantId}`, "GET"),

  addMenuItem: (data) =>
    request("/food/create", "POST", data, true),   // true for form data 

  updateMenuItem: (menuId, data) =>
    request(`/menu/${menuId}`, "PUT", data),

  deleteMenuItem: (menuId) =>
    request(`/food/deletfood/${menuId}`, "DELETE"),

  addCategory: (data) =>
    request('/category/addcategory' , 'POST' , data , true),   // return thsi
  
};
