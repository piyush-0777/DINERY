import React from 'react'

const CartBar = ({order, deletAllOrder}) => {
  return (
    <div 
    className="fixed bottom-4 left-4 right-4 bg-white shadow-md rounded-2xl flex items-center justify-between p-3">
      {/* Left Section */}
      <div className="flex items-center gap-3">
       
        {/* Text */}
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
           {order?.length} item added<span className="text-green-600 font-bold">›</span>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <button className="bg-green-600 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-sm">
        View Cart
       
      </button>

      {/* Close Button */}
      <button onClick={deletAllOrder} className="ml-2 text-gray-500 hover:text-gray-700">
        ✕
      </button>
    </div>
  )
}

export default CartBar
