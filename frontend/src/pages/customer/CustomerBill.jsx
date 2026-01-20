import React from 'react'
import { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { incresContityOfOrder , dicresContityOfOrder , deletOrder } from '../features/customer/customerSlice';
import { HiChevronLeft } from "react-icons/hi";
import {useNavigate , useParams } from 'react-router-dom'



const CustomerBill = () => {


  //use dispatch for store and chang the value of user order
  const dispatch = useDispatch()

  // use navigate for navigate other paje
  const navigate = useNavigate()

  //  use params to gat usesr table id
  const {id} = useParams()


  // get customer orders 
const orders = useSelector(state => state.customer.customer.order);


    


  // function for goto customerHome paje

  const goToCustomerHomepaje = () => {
      navigate(`/customer/customerHome/${id}`)
  }

  //increas the contity of any order

  const increaseQty = (f_name) => {
    dispatch(incresContityOfOrder({id: 1 ,  f_name:f_name}))
  };


  //decreas the contity of order

  const decreaseQty = (f_name) => {
    dispatch(dicresContityOfOrder({id: 1 ,  f_name:f_name}))
  };

  // delete order

  const deleteItem = (f_name) => {
    dispatch(deletOrder({id: 1 , f_name:f_name}))
    setItems(items.filter(i => i.id !== id));
  };

  // return total amount of all aorder bill

  const totalAmount = ()=>{
    let total = 0;
    orders.map(order=>{
      total = total + order.f_price*order.number_of_item;
    })
    return total;
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
        {orders.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-medium text-lg">{item?.f_name}</p>
              <p className="text-gray-600 text-sm">₹{item?.f_price}</p>
            </div>

            <div className="flex items-center space-x-2">
              {/* Decrease */}
              <button
                onClick={() => decreaseQty(item?.f_name)}
                className="px-3 py-1 bg-gray-200 rounded-lg"
              >-</button>

              <span className="font-medium">{item?.number_of_item}</span>

              {/* Increase */}
              <button
                onClick={() => increaseQty(item?.f_name)}
                className="px-3 py-1 bg-gray-200 rounded-lg"
              >+</button>

              {/* Delete */}
              <button
                onClick={() => deleteItem(item?.f_name)}
                className="ml-3 text-red-500 text-sm"
              >Delete</button>
            </div>
          </div>
        ))}
      
      </div>
      <div>
        {/* <button
  className="w-full mb-4 border border-green-600 text-green-600 py-2 rounded-xl text-base font-semibold"
  onClick={() => console.log("Navigate to menu page")}
>
  + Add More Items
</button> */}

      </div>

      {/* Bottom Fixed Checkout */}
      <div className="mt-6 bg-white p-4 shadow-xl rounded-xl">
        <div className="flex justify-between text-lg font-semibold mb-3">
          <span>Total Amount:</span>
          <span>₹{totalAmount()}</span>
        </div>

        <button className="w-full bg-green-600 text-white py-3 rounded-xl text-base font-semibold">
          Place Order
        </button>
      </div>
    </div>
   
  )
}

export default CustomerBill
