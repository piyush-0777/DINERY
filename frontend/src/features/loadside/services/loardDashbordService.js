import request from "../../../services/api";

export const LoardDashbordService = {
  getRestaurantDashboard: () =>
    request("/restaurant/dashboard", "GET"),
  
};
