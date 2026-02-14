import request from "./api";

export const billService = {
  

  getBillsForOwner: (id) =>
    request(`/bill/${id}`, "GET"),
  cashPaymentBill: (billId , tableId) => 
     request(`/bill/cashPayment/${tableId}/${billId}`, "PUT"),

 
};