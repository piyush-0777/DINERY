import React from 'react'
import { useState } from 'react';

const CustomerBill = () => {
    const [items, setItems] = useState([
    { id: 1, name: "Margherita Pizza", price: 173, qty: 1 },
    { id: 2, name: "Indiana Veg Pizza", price: 173, qty: 1 },
    { id: 3, name: "Italiano Pasta", price: 345, qty: 2 },
    { id: 4, name: "Golden Corn Pizza", price: 121, qty: 1 },
  ]);

  const increaseQty = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  };

  const decreaseQty = (id) => {
    setItems(items.map(i => 
      i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const totalAmount = items.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    
       <div className="min-h-screen bg-gray-100 p-3 max-w-md mx-auto flex flex-col justify-between    ">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-4">Your Order</h1>

      {/* Items List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-medium text-lg">{item.name}</p>
              <p className="text-gray-600 text-sm">₹{item.price}</p>
            </div>

            <div className="flex items-center space-x-2">
              {/* Decrease */}
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-3 py-1 bg-gray-200 rounded-lg"
              >-</button>

              <span className="font-medium">{item.qty}</span>

              {/* Increase */}
              <button
                onClick={() => increaseQty(item.id)}
                className="px-3 py-1 bg-gray-200 rounded-lg"
              >+</button>

              {/* Delete */}
              <button
                onClick={() => deleteItem(item.id)}
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
          <span>₹{totalAmount}</span>
        </div>

        <button className="w-full bg-green-600 text-white py-3 rounded-xl text-base font-semibold">
          Place Order
        </button>
      </div>
    </div>
   
  )
}

export default CustomerBill
