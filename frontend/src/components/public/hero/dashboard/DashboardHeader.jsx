// src/components/public/dashboard/DashboardHeader.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Settings,
  Activity,
  ChefHat,
  ChevronDown,
} from "lucide-react";

const DashboardHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl"
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
          <ChefHat className="h-6 w-6 text-white" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">
            Dinery Dashboard
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <motion.span
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
              className="h-2.5 w-2.5 rounded-full bg-green-400"
            />

            <span className="text-sm text-neutral-400">
              Restaurant is Live
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Activity */}
        <div className="hidden items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-2 md:flex">
          <Activity
            size={16}
            className="text-green-400"
          />

          <span className="text-sm font-medium text-green-300">
            Live
          </span>
        </div>

        {/* Notification */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
        >
          <Bell
            size={18}
            className="text-neutral-300"
          />
        </motion.button>

        {/* Settings */}
        <motion.button
          whileHover={{
            rotate: 90,
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            duration: 0.3,
          }}
          className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
        >
          <Settings
            size={18}
            className="text-neutral-300"
          />
        </motion.button>

        {/* Owner */}
        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
        >
          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-sm font-bold text-white">
            DK
          </div>

          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-white">
              Dinery Owner
            </p>

            <p className="text-xs text-neutral-400">
              Premium Plan
            </p>
          </div>

          <ChevronDown
            size={16}
            className="text-neutral-400"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;