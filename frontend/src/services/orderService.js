import request from "./api";

export const orderService = {
  placeOrder: (restaurantId, tableId, items) =>
    request(`/order/${restaurantId}/${tableId}`, "POST", { items }),

  getCustomerOrders: (restaurantId, tableId) =>
    request(`/order/${restaurantId}/${tableId}`, "GET"),

  getLiveOrdersForOwner: () =>
    request("/order/live", "GET"),

  updateOrderStatus: (orderId, status) =>
    request(`/order/${orderId}/status`, "PUT", { status }),
};
