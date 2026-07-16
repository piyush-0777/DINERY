import request from "./api";

export const customerService = {
  getCustomerProfile: () =>
    request("/customer/profile", "GET"),
  
  customerLogin:(restaurantName , data)=>
    request(`/customer/${restaurantName}/login` , "POST" , data),

  getCustomerDashbord: (restaurantName , token)=>
    request(`/customer/${restaurantName}/loadCustomerDashbord` , 'GET', ) ,

  placeCustomerOrder:(restaurantName , data) =>
    request(`/customer/${restaurantName}/placeOrder` , 'POST' , data)
};
