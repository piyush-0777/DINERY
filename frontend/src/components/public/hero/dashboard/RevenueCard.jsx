// src/components/public/dashboard/RevenueCard.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  IndianRupee,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { value: 20 },
  { value: 28 },
  { value: 25 },
  { value: 42 },
  { value: 38 },
  { value: 56 },
  { value: 63 },
];

const RevenueCard = () => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
    >
      {/* Background Glow */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-500/20 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-400">
            Today's Revenue
          </p>

          <div className="mt-2 flex items-center">
            <IndianRupee
              size={24}
              className="text-orange-400"
            />

            <h2 className="text-3xl font-bold text-white">
              18,520
            </h2>
          </div>
        </div>

        <div className="rounded-xl bg-orange-500/15 p-3">
          <TrendingUp className="text-orange-400" />
        </div>
      </div>

      {/* Growth */}
      <div className="mt-5 flex items-center gap-2">
        <span className="rounded-full bg-green-500/15 px-2 py-1 text-xs font-semibold text-green-400">
          +18.2%
        </span>

        <span className="text-xs text-neutral-400">
          Compared to yesterday
        </span>
      </div>

      {/* Mini Chart */}
      <div className="mt-5 h-20">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#fb923c"
                  stopOpacity={0.7}
                />

                <stop
                  offset="100%"
                  stopColor="#fb923c"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="value"
              stroke="#fb923c"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <p className="text-xs text-neutral-500">
            Transactions
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            142
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-neutral-500">
            Avg. Order
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            ₹420
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueCard;