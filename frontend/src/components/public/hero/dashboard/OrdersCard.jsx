// src/components/public/dashboard/OrdersCard.jsx

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, CheckCircle2, Clock3, ChefHat } from "lucide-react";

const totalOrders = 186;
const completedOrders = 148;
const pendingOrders = 24;
const preparingOrders = 14;

const percentage = Math.round((completedOrders / totalOrders) * 100);
const circumference = 2 * Math.PI * 42;
const strokeOffset =
  circumference - (percentage / 100) * circumference;

const OrdersCard = () => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
    >
      {/* Glow */}
      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-400">
            Today's Orders
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {totalOrders}
          </h2>
        </div>

        <div className="rounded-xl bg-blue-500/15 p-3">
          <ShoppingBag
            size={24}
            className="text-blue-400"
          />
        </div>
      </div>

      {/* Progress Circle */}
      <div className="mt-6 flex items-center justify-center">
        <div className="relative h-28 w-28">
          <svg
            className="-rotate-90"
            width="112"
            height="112"
          >
            <circle
              cx="56"
              cy="56"
              r="42"
              stroke="rgba(255,255,255,.08)"
              strokeWidth="10"
              fill="none"
            />

            <motion.circle
              cx="56"
              cy="56"
              r="42"
              stroke="#60a5fa"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{
                strokeDashoffset: circumference,
              }}
              animate={{
                strokeDashoffset: strokeOffset,
              }}
              transition={{
                duration: 1.2,
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {percentage}%
            </span>

            <span className="text-xs text-neutral-400">
              Completed
            </span>
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={18}
              className="text-green-400"
            />

            <span className="text-sm text-neutral-300">
              Completed
            </span>
          </div>

          <span className="font-semibold text-white">
            {completedOrders}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <Clock3
              size={18}
              className="text-yellow-400"
            />

            <span className="text-sm text-neutral-300">
              Pending
            </span>
          </div>

          <span className="font-semibold text-white">
            {pendingOrders}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <ChefHat
              size={18}
              className="text-orange-400"
            />

            <span className="text-sm text-neutral-300">
              Preparing
            </span>
          </div>

          <span className="font-semibold text-white">
            {preparingOrders}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersCard;