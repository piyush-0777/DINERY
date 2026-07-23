// src/components/public/dashboard/RevenueChart.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  Wallet,
  ShoppingCart,
} from "lucide-react";

const revenueData = [
  { day: "Mon", revenue: 8400, orders: 62 },
  { day: "Tue", revenue: 12100, orders: 81 },
  { day: "Wed", revenue: 9800, orders: 73 },
  { day: "Thu", revenue: 15400, orders: 102 },
  { day: "Fri", revenue: 17600, orders: 118 },
  { day: "Sat", revenue: 22400, orders: 148 },
  { day: "Sun", revenue: 19600, orders: 134 },
];

const SummaryCard = ({ icon: Icon, title, value, color }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-neutral-400">
          {title}
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">
          {value}
        </h3>
      </div>

      <div
        className={`rounded-lg p-3 ${color}`}
      >
        <Icon
          size={20}
          className="text-white"
        />
      </div>
    </div>
  </div>
);

const RevenueChart = () => {
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
      }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Weekly Analytics
          </h2>

          <p className="mt-1 text-sm text-neutral-400">
            Revenue growth over the last 7 days
          </p>
        </div>

        <div className="rounded-xl bg-orange-500/15 p-3">
          <TrendingUp className="text-orange-400" />
        </div>
      </div>

      {/* Summary */}

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <SummaryCard
          icon={Wallet}
          title="Revenue"
          value="₹1.05L"
          color="bg-orange-500"
        />

        <SummaryCard
          icon={ShoppingCart}
          title="Orders"
          value="718"
          color="bg-blue-500"
        />

        <SummaryCard
          icon={TrendingUp}
          title="Growth"
          value="+18.6%"
          color="bg-green-500"
        />

      </div>

      {/* Chart */}

      <div className="mt-8 h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={revenueData}
          >

            <defs>

              <linearGradient
                id="gradientRevenue"
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

            <CartesianGrid
              stroke="rgba(255,255,255,.08)"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
              }}
              tickFormatter={(v) =>
                `₹${v / 1000}k`
              }
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#171717",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "12px",
                color: "white",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#fb923c"
              strokeWidth={3}
              fill="url(#gradientRevenue)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">

        <div>
          <p className="text-xs text-neutral-500">
            Best Day
          </p>

          <h3 className="mt-1 font-semibold text-white">
            Saturday
          </h3>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            Highest Revenue
          </p>

          <h3 className="mt-1 font-semibold text-green-400">
            ₹22,400
          </h3>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            Avg / Day
          </p>

          <h3 className="mt-1 font-semibold text-white">
            ₹15,042
          </h3>
        </div>

      </div>
    </motion.div>
  );
};

export default RevenueChart;