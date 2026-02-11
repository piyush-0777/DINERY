import React from "react";

const OrderDetailModal = ({ order, onClose, onCashPayment }) => {
  if (!order) return null;

  return (
    <>
      {/* Blurred Background */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-[#0f0f0f] text-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>

          {/* Header */}
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Order Details
          </h2>

          {/* Order Info */}
          <div className="space-y-2 text-sm text-gray-300">
            <p><span className="text-gray-400">Order ID:</span> {order._id}</p>
            <p><span className="text-gray-400">Status:</span>
              <span className="ml-2 px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-400">
                {order.status}
              </span>
            </p>
            <p><span className="text-gray-400">Created:</span> {new Date(order.createdAt).toLocaleString()}</p>
          </div>

          {/* Items */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Items</h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded-xl"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">₹{item.subtotal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mt-6 border-t border-gray-700 pt-4">
            <p className="text-lg">Total Amount</p>
            <p className="text-2xl font-bold text-green-400">
              ₹{order.totalAmount}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={onCashPayment}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold shadow-lg transition"
            >
              Cash Payment Bill
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailModal;
