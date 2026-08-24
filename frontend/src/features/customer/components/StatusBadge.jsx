import React from "react";
import { motion } from "framer-motion";

const statusConfig = {
  pending: {
    color: "bg-yellow-100 text-yellow-700",
    emoji: "🟡",
    text: "Pending",
  },

  preparing: {
    color: "bg-orange-100 text-orange-700",
    emoji: "👨‍🍳",
    text: "Preparing",
  },

  served: {
    color: "bg-blue-100 text-blue-700",
    emoji: "🍽️",
    text: "Served",
  },

  completed: {
    color: "bg-green-100 text-green-700",
    emoji: "✅",
    text: "Completed",
  },

  cancelled: {
    color: "bg-red-100 text-red-700",
    emoji: "❌",
    text: "Cancelled",
  },
};

const StatusBadge = ({ status }) => {

  const current =
    statusConfig[status] || statusConfig.pending;

  return (
    <motion.div
      key={status}
      initial={{
        opacity: 0,
        y: -8
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: .25
      }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mt-3 font-semibold ${current.color}`}
    >
      <motion.span
        animate={{
          scale: [1, 1.2, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5
        }}
      >
        {current.emoji}
      </motion.span>

      {current.text}
    </motion.div>
  );
};

export default StatusBadge;