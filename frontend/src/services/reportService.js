import request from "./api";

export const reportService = {

  getCustomerReport: () =>
    request("/customer-report", "GET"),

  getDailySaleReport: () =>
    request("/dailySale-report", "GET"),

  getGSTReport: () =>
    request("/GST-report", "GET"),

  getMonthlyRevenueReport: () =>
    request("/monthlyRevenue-report", "GET"),

};