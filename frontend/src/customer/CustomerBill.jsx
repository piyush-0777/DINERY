import React from 'react'
import { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { incresContityOfOrder , dicresContityOfOrder , deletOrder } from '../features/customer/customerSlice';

const CustomerBill = () => {

  const dispatch = useDispatch()

const orders = useSelector(state => state.customer.customer.order);
console.log(orders);

    const [items, setItems] = useState([
    { id: 1, name: "Margherita Pizza", price: 173, qty: 1 },
    { id: 2, name: "Indiana Veg Pizza", price: 173, qty: 1 },
    { id: 3, name: "Italiano Pasta", price: 345, qty: 2 },
    { id: 4, name: "Golden Corn Pizza", price: 121, qty: 1 },
  ]);

  const increaseQty = (f_name) => {
    dispatch(incresContityOfOrder({id: 1 ,  f_name:f_name}))
  };

  const decreaseQty = (f_name) => {
    dispatch(dicresContityOfOrder({id: 1 ,  f_name:f_name}))
  };

  const deleteItem = (f_name) => {
    dispatch(deletOrder({id: 1 , f_name:f_name}))
    setItems(items.filter(i => i.id !== id));
  };

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
      <h1 className="text-xl font-semibold mb-4">Your Order</h1>

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
