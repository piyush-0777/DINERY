// src/components/public/dashboard/RecentOrders.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  CheckCircle2,
  ChefHat,
  ArrowUpRight,
} from "lucide-react";

const orders = [
  {
    id: "#2048",
    customer: "Rahul",
    item: "Cheese Burger",
    amount: "₹420",
    table: "T-04",
    status: "Preparing",
    time: "2 min ago",
  },
  {
    id: "#2047",
    customer: "Priya",
    item: "Margherita Pizza",
    amount: "₹690",
    table: "T-08",
    status: "Served",
    time: "5 min ago",
  },
  {
    id: "#2046",
    customer: "Amit",
    item: "Cold Coffee",
    amount: "₹180",
    table: "T-02",
    status: "Completed",
    time: "8 min ago",
  },
  {
    id: "#2045",
    customer: "Neha",
    item: "Paneer Tikka",
    amount: "₹520",
    table: "T-06",
    status: "Preparing",
    time: "11 min ago",
  },
];

const badgeStyle = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-500/15 text-green-400";

    case "Preparing":
      return "bg-orange-500/15 text-orange-400";

    case "Served":
      return "bg-blue-500/15 text-blue-400";

    default:
      return "bg-white/10 text-white";
  }
};

const avatarColor = [
  "from-orange-500 to-red-500",
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
];

const RecentOrders = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        delay: 0.2,
      }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
              className="h-2.5 w-2.5 rounded-full bg-green-400"
            />

            <h2 className="text-xl font-bold text-white">
              Live Orders
            </h2>
          </div>

          <p className="mt-1 text-sm text-neutral-400">
            Orders coming from your restaurant
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
          View All

          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Orders */}

      <div className="mt-6 space-y-4">

        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.12,
            }}
            whileHover={{
              scale: 1.015,
            }}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition"
          >
            {/* Left */}

            <div className="flex items-center gap-4">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${
                  avatarColor[index]
                } font-bold text-white`}
              >
                {order.customer[0]}
              </div>

              <div>

                <div className="flex items-center gap-2">

                  <p className="font-semibold text-white">
                    {order.customer}
                  </p>

                  <span className="text-xs text-neutral-500">
                    {order.id}
                  </span>

                </div>

                <div className="mt-1 flex items-center gap-2 text-sm text-neutral-400">

                  <ChefHat
                    size={15}
                    className="text-orange-400"
                  />

                  {order.item}

                  <span>•</span>

                  {order.table}

                </div>

              </div>

            </div>

            {/* Right */}

            <div className="text-right">

              <h3 className="font-bold text-white">
                {order.amount}
              </h3>

              <div className="mt-2 flex items-center justify-end gap-2">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

              </div>

              <div className="mt-2 flex items-center justify-end gap-1 text-xs text-neutral-500">

                <Clock3 size={13} />

                {order.time}

              </div>

            </div>
          </motion.div>
        ))}

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">

        <div className="flex items-center gap-2 text-green-400">

          <CheckCircle2 size={18} />

          <span className="text-sm font-medium">
            Kitchen running smoothly
          </span>

        </div>

        <span className="text-sm text-neutral-400">
          186 Orders Today
        </span>

      </div>
    </motion.div>
  );
};

export default RecentOrders;