import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const OrderItems = ({ items }) => {
  return (
    <div className="bg-white rounded-3xl shadow p-5">

      <div className="flex items-center gap-2 mb-5">

        <ShoppingBag
          size={20}
          className="text-green-600"
        />

        <h2 className="font-bold text-lg">
          Your Items
        </h2>

      </div>

      <div className="space-y-4">

        {items.map((item, index) => (

          <motion.div

            key={item._id}

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: index * 0.1,
            }}

            whileTap={{
              scale: .98,
            }}

            className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
          >

            <div className="flex justify-between">

              <div>

                <h3 className="font-semibold text-[16px]">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  ₹{item.price} each
                </p>

              </div>

              <div className="text-right">

                <div className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                  x{item.quantity}
                </div>

                <p className="font-bold text-lg mt-2">
                  ₹{item.subtotal}
                </p>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
};

export default OrderItems;