import React from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";

const PayNowCard = ({ bill, onPay }) => {

  if (bill.paymentStatus === "paid") {
    return (

      <motion.div

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}

        className="bg-green-50 rounded-3xl p-5 shadow"

      >

        <div className="flex gap-3 items-center">

          <BadgeCheck
            size={40}
            className="text-green-600"
          />

          <div>

            <h2 className="font-bold text-green-700">
              Payment Successful
            </h2>

            <p className="text-sm text-green-600">
              Thank you for dining with us.
            </p>

          </div>

        </div>

      </motion.div>
    );
  }

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: .4,
      }}

      className="rounded-3xl overflow-hidden shadow-lg"

    >

      <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="font-bold text-xl">
              Ready to Pay?
            </h2>

            <p className="text-green-100 text-sm mt-1">
              Complete your payment to finish your order.
            </p>

          </div>

          <CreditCard size={34} />

        </div>

        <button

          onClick={onPay}

          className="mt-6 bg-white text-green-700 w-full rounded-2xl py-3 font-semibold flex items-center justify-center gap-2 active:scale-95 transition"

        >

          Pay ₹{bill.finalAmount.toFixed(2)}

          <ChevronRight size={18} />

        </button>

      </div>

    </motion.div>
  );
};

export default PayNowCard;