import React from 'react'
import { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { incresContityOfOrder , dicresContityOfOrder , deletOrder } from '../../redux/features/customer/customerSlice';
import { HiChevronLeft } from "react-icons/hi";
import {useNavigate , useParams } from 'react-router-dom'
import {CustomerPlaceOrder} from '../../redux/thunks/customerThunk'



const CustomerBill = () => {


  //use dispatch for store and chang the value of user order
  const dispatch = useDispatch()

  // use navigate for navigate other paje
  const navigate = useNavigate()

  //  use params to gat usesr table id
  const {resturantName} = useParams()


  // get customer orders 
const orders = useSelector(state => state.customer.order);
const customer = useSelector(state => state.customer.customer);


    


  // function for goto customerHome paje

  const goToCustomerHomepaje = () => {
      navigate(`/customer/customerHome/${id}`)
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

  const totalAmount = ()=>{
    let total = 0;
    orders.items.map(order=>{
      total = total + order.subtotal;
    })
    return total;
  }

  const placeOrder = () =>{
    dispatch(CustomerPlaceOrder({resturantName ,data: {orders ,customer } }))
  }

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

        <button onClick={placeOrder}  className="w-full bg-green-600 text-white py-3 rounded-xl text-base font-semibold">
          Place Order
        </button>
      </div>
    </div>
   
  )
}

export default CustomerBill
