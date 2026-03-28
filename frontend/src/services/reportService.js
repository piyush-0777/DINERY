import request from "./api";

export const reportService = {

  getCustomerReport: () =>
    request("/report/customer-report", "GET"),

  getDailySaleReport: () =>
    request("/report/dailySale-report", "GET"),

  getGSTReport: () =>
    request("/report/GST-report", "GET"),

  getMonthlyRevenueReport: () =>
    request("/report/monthlyRevenue-report", "GET"),

};