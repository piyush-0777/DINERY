// src/components/public/dashboard/HeroDashboard.jsx

import React from "react";
import { motion } from "framer-motion";

import DashboardHeader from "./DashboardHeader";
import RevenueCard from "./RevenueCard";
import OrdersCard from "./OrdersCard";
import TablesCard from "./TablesCard";
import RevenueChart from "./RevenueChart";
import RecentOrders from "./RecentOrders";

const HeroDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      {/* Glow */}
      <div className="absolute -inset-8 rounded-[40px] bg-orange-500/20 blur-3xl" />

      {/* Dashboard */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">

        <DashboardHeader />

        <div className="mt-6 grid gap-4">

          {/* Top Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <RevenueCard />
            <OrdersCard />
            <TablesCard />
          </div>

          {/* Revenue Chart */}
          <RevenueChart />

          {/* Recent Orders */}
          <RecentOrders />

        </div>
      </div>
    </motion.div>
  );
};

export default HeroDashboard;