// src/components/public/dashboard/TablesCard.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  CheckCircle2,
  Timer,
  Users,
} from "lucide-react";

const tables = [
  { id: 1, status: "available" },
  { id: 2, status: "occupied" },
  { id: 3, status: "available" },
  { id: 4, status: "active" },
  { id: 5, status: "occupied" },
  { id: 6, status: "available" },
  { id: 7, status: "active" },
  { id: 8, status: "occupied" },
];

const available = tables.filter(
  (t) => t.status === "available"
).length;

const active = tables.filter(
  (t) => t.status === "active"
).length;

const occupied = tables.filter(
  (t) => t.status === "occupied"
).length;

const getColor = (status) => {
  switch (status) {
    case "available":
      return "bg-green-400";
    case "active":
      return "bg-yellow-400";
    case "occupied":
      return "bg-red-500";
    default:
      return "bg-neutral-500";
  }
};

const TablesCard = () => {
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
      {/* Glow */}
      <div className="absolute -top-10 right-0 h-28 w-28 rounded-full bg-green-500/20 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-400">
            Restaurant Tables
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {tables.length}
          </h2>
        </div>

        <div className="rounded-xl bg-green-500/15 p-3">
          <UtensilsCrossed
            size={24}
            className="text-green-400"
          />
        </div>
      </div>

      {/* Mini Floor Layout */}
      <div className="mt-6 grid grid-cols-4 gap-3">
        {tables.map((table) => (
          <motion.div
            key={table.id}
            whileHover={{
              scale: 1.1,
            }}
            animate={
              table.status === "active"
                ? {
                    scale: [1, 1.08, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat:
                table.status === "active"
                  ? Infinity
                  : 0,
            }}
            className={`flex aspect-square items-center justify-center rounded-xl ${getColor(
              table.status
            )}`}
          >
            <Users
              size={18}
              className="text-white"
            />
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-3">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={16}
              className="text-green-400"
            />

            <span className="text-sm text-neutral-300">
              Available
            </span>
          </div>

          <span className="font-semibold text-white">
            {available}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer
              size={16}
              className="text-yellow-400"
            />

            <span className="text-sm text-neutral-300">
              Active
            </span>
          </div>

          <span className="font-semibold text-white">
            {active}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users
              size={16}
              className="text-red-400"
            />

            <span className="text-sm text-neutral-300">
              Occupied
            </span>
          </div>

          <span className="font-semibold text-white">
            {occupied}
          </span>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-400">
            Occupancy
          </span>

          <span className="font-semibold text-green-400">
            62%
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "62%" }}
            transition={{ duration: 1 }}
            className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TablesCard;