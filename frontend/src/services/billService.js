import request from "./api";

export const billService = {
  

  getBillsForOwner: (id) =>
    request(`/bill/${id}`, "GET"),
  cashPaymentBill: (id) => 
     request(`/bill/cashPayment/${id}`, "PUT"),

 
};