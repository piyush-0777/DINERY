import React from "react";
import { ReceiptText, Wallet, CircleCheckBig, CircleAlert } from "lucide-react";
import { motion } from "framer-motion";

const BillSummary = ({ bill }) => {
  const taxAmount = bill.finalAmount - bill.billAmount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow p-5"
    >
      <div className="flex items-center gap-2 mb-5">
        <ReceiptText className="text-green-600" size={22} />
        <h2 className="font-bold text-lg">Bill Summary</h2>
      </div>

      <div className="space-y-4">

        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>₹{bill.billAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-500">
          <span>Tax ({bill.tax}%)</span>
          <span>₹{taxAmount.toFixed(2)}</span>
        </div>

        <div className="border-t pt-4 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-green-600">
            ₹{bill.finalAmount.toFixed(2)}
          </span>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">

          <div className="flex items-center gap-2">

            <Wallet size={20} />

            <span className="font-medium">
              Payment
            </span>

          </div>

          {bill.paymentStatus === "paid" ? (

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm">

              <CircleCheckBig size={15} />

              Paid

            </span>

          ) : (

            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full flex items-center gap-2 text-sm">

              <CircleAlert size={15} />

              Pending

            </span>

          )}

        </div>

      </div>

    </motion.div>
  );
};

export default BillSummary;