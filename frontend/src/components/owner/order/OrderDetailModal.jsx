import React from "react";

const OrderDetailModal = ({ order, bill, onClose, onCashPayment }) => {
  if (!order) return null;
  console.log(bill , 'bill')

  const customer = order.customer;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-[#0f0f0f] text-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative animate-fadeIn">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition text-xl"
          >
            ✕
          </button>

          {/* Header */}
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Order Details
          </h2>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
            <p>
              <span className="text-gray-400">Order ID:</span><br />
              {order._id}
            </p>

            <p>
              <span className="text-gray-400">Status:</span><br />
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs
                ${order.status === "completed"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-yellow-600/20 text-yellow-400"}`}
              >
                {order.status}
              </span>
            </p>

            <p>
              <span className="text-gray-400">Created:</span><br />
              {new Date(order.createdAt).toLocaleString()}
            </p>

            {customer && (
              <p>
                <span className="text-gray-400">Customer:</span><br />
                {customer.name} <br />
                <span className="text-gray-400 text-xs">{customer.phone}</span>
              </p>
            )}
          </div>

          {/* Items */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Items</h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded-xl
                             hover:bg-[#222] transition"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-green-400">
                    ₹{item.subtotal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bill Summary */}
          {bill && (
            <div className="mt-6 border-t border-gray-700 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Bill Amount</span>
                <span>₹{bill.billAmount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Tax ({bill.tax}%)</span>
                <span>₹{bill.finalAmount - bill.billAmount}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-green-400">
                <span>Total</span>
                <span>₹{bill.finalAmount}</span>
              </div>
            </div>
          )}

          {/* Action */}
          {order.status === "completed" && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={()=>onCashPayment(bill._id , order.table._id)}
                className="bg-green-600 hover:bg-green-700
                           hover:scale-105 px-6 py-3 rounded-xl font-semibold
                           shadow-lg transition-all duration-200"
              >
                Cash Payment Bill
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default OrderDetailModal;
