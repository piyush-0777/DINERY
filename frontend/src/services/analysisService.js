import request from "./api";

export const analysisService = {

  getOrders: (query) =>{
    console.log(query)
    return request("/analytics/orders", "GET" , null, false, query)},

  getRevenue: (query) =>
    request("/analytics/revenue", "GET", null, false, query),

  getPeakHours: () =>
    request("/analytics/peak-hours", "GET"),

  getTopItems: (query) =>
    request("/analytics/top-items", "GET", null, false, query),

  getOrderType: () =>
    request("/analytics/order-type", "GET"),

  compareRevenue: () =>
    request("/analytics/compare", "GET"),

};