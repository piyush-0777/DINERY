import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incresContityOfOrder, dicresContityOfOrder, deletOrder } from '../../redux/features/customer/customerSlice';
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate, useParams } from 'react-router-dom'
import { CustomerPlaceOrder } from '../../redux/thunks/customerThunk'
import  { useEffect } from "react";
import { toast } from "react-toastify";
import { resetloadCustomerState } from "../../redux/features/customer/loadCustomerSlice";


const CustomerBill = () => {

  const loadCustomer = useSelector(state => state.loadcustomer)
  console.log(loadCustomer)

  //use dispatch for store and chang the value of user order
  const dispatch = useDispatch()

  // use navigate for navigate other paje
  const navigate = useNavigate()

  //  use params to gat usesr table id
  const {  restaurantName } = useParams();



  // get customer orders 
  const orders = useSelector(state => state.customer.order);
  const customer = useSelector(state => state.customer.customer);
  const { token } = useSelector(state => state.customer)
  const { reqtype, loading, success, error } = useSelector(state => state.loadcustomer)
  //reqType = "placeOrder"
  const isPlacingOrder = reqtype === "placeOrder" && loading;




  // function for goto customerHome paje

  const goToCustomerHomepaje = () => {
    navigate(`/customer/${restaurantName}/customerHome`)
  }

  //increas the contity of any order

  const increaseQty = (food) => {
    dispatch(incresContityOfOrder(food))
  };


  //decreas the contity of order

  const decreaseQty = (food) => {
    dispatch(dicresContityOfOrder(food))
  };

  // delete order

  const deleteItem = (food) => {
    dispatch(deletOrder(food))
    setItems(orders.items.filter(i => i.id !== id));
  };

  // return total amount of all aorder bill

  const totalAmount = () => {
    let total = 0;
    orders.items.map(order => {
      total = total + order.subtotal;
    })
    return total;
  }


  useEffect(() => {
    if (reqtype !== "placeOrder") return;

    if (success) {
      toast.success("Order placed successfully.");

      dispatch(resetloadCustomerState());

      navigate(
        `/customer/${restaurantName}/CustomerOrderDeteal`
      );
    }

    if (error) {
      toast.error(
        error?.message || error || "Failed to place order."
      );

      dispatch(resetloadCustomerState());
    }
  }, [
    reqtype,
    success,
    error,
    dispatch,
    navigate,
    restaurantName,
  ]);

  const placeOrder = () => {
    if (isPlacingOrder) return;

    dispatch(
      CustomerPlaceOrder({
        restaurantName,
        data: { orders, customer, token },
      })
    );
  };

  return (

    <div className="min-h-screen bg-gray-100 p-3 max-w-md mx-auto flex flex-col justify-between    ">
      {/* Header */}
      <div className='mb-8 sticky top-0 bg-gray-100 p-1 pb-3 pt-2'>
        <div className="flex  gap-3 items-center   ">

          <HiChevronLeft onClick={goToCustomerHomepaje} className="text-green-600 text-4xl border-1 border-green-600 rounded-full" />
          <span className="text-xl font-semibold">Your Order</span>

        </div>
      </div>


      {/* Items List */}
      <div className="space-y-4">
        {orders.items.map((item) => (
          <div key={item._id} className="bg-white p-3 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-medium text-lg">{item?.name}</p>
              <p className="text-gray-600 text-sm">₹{item?.price}</p>
            </div>

            <div className="flex items-center space-x-2">
              {/* Decrease */}
              <button
                onClick={() => decreaseQty(item?.food)}
                className="px-3 py-1 bg-gray-200 rounded-lg"
              >-</button>

              <span className="font-medium">{item?.quantity}</span>

              {/* Increase */}
              <button
                onClick={() => increaseQty(item?.food)}
                className="px-3 py-1 bg-gray-200 rounded-lg"
              >+</button>

              {/* Delete */}
              <button
                onClick={() => deleteItem(item?.food)}
                className="ml-3 text-red-500 text-sm"
              >Delete</button>
            </div>
          </div>
        ))}

      </div>
      <div>


      </div>

      {/* Bottom Fixed Checkout */}
      <div className="mt-6 bg-white p-4 shadow-xl rounded-xl">
        <div className="flex justify-between text-lg font-semibold mb-3">
          <span>Total Amount:</span>
          <span>₹{totalAmount()}</span>
        </div>

        <button
          onClick={placeOrder}
          disabled={isPlacingOrder}
          className={`w-full py-3 rounded-xl text-base font-semibold text-white
    ${isPlacingOrder
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>

  )
}

export default CustomerBill
