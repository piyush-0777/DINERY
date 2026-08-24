import request from "../../../services/api";

export const billService = {
  

  getBillsForOwner: (id) =>
    request(`/bill/${id}`, "GET"),
  
  cashPaymentBill: (billId , tableId , customerId) => 
     request(`/bill/cashPayment/${tableId}/${billId}`, "PUT" , {customerId}),

 
};