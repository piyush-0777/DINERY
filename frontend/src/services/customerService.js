import request from "./api";

export const customerService = {
  getCustomerProfile: () =>
    request("/customer/profile", "GET"),
  
  customerLogin:(restaurantName , data)=>
    request(`/customer/${restaurantName}/login` , "POST" , data),

  updateCustomerProfile: (data) =>
    request("/customer/profile", "PUT", data),

  getTableInfo: (restaurantId, tableId) =>
    request(`/customer/${restaurantId}/${tableId}`, "GET"),
};
