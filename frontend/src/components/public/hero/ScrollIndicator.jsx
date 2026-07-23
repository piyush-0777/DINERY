// src/components/public/ScrollIndicator.jsx

import React from "react";
import { motion } from "framer-motion";
import { Mouse, ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 1.5,
        duration: 0.8,
      }}
      className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 lg:flex"
    >
      <div className="flex flex-col items-center gap-3">

        {/* Text */}

        <motion.p
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500"
        >
          Scroll
        </motion.p>

        {/* Mouse */}

        <div className="flex h-14 w-8 items-start justify-center rounded-full border border-white/20 bg-white/5 pt-2 backdrop-blur-xl">

          <motion.div
            animate={{
              y: [0, 18, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
            }}
            className="h-2.5 w-2.5 rounded-full bg-orange-400"
          />

        </div>

        {/* Arrow */}

        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
          }}
        >
          <ChevronDown
            size={18}
            className="text-orange-400"
          />
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ScrollIndicator;