// src/components/public/HeroStats.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  Store,
  ShoppingBag,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: Store,
    value: "500+",
    label: "Restaurants",
    description: "Growing every month",
    color: "text-orange-400",
  },
  {
    icon: ShoppingBag,
    value: "120K+",
    label: "Orders Processed",
    description: "Every single day",
    color: "text-blue-400",
  },
  {
    icon: IndianRupee,
    value: "₹50M+",
    label: "Revenue Managed",
    description: "Across businesses",
    color: "text-green-400",
  },
  {
    icon: ShieldCheck,
    value: "99.9%",
    label: "System Uptime",
    description: "Reliable & Secure",
    color: "text-purple-400",
  },
];

const HeroStats = () => {
  return (
    <section className="relative z-20 border-t border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-orange-500/30 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`rounded-xl bg-white/5 p-3 ${stat.color}`}
                  >
                    <Icon size={24} />
                  </div>

                  <motion.div
                    animate={{
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="h-2 w-2 rounded-full bg-green-400"
                  />
                </div>

                <h2 className="mt-6 text-4xl font-black text-white">
                  {stat.value}
                </h2>

                <p className="mt-2 text-lg font-semibold text-white">
                  {stat.label}
                </p>

                <p className="mt-2 text-sm leading-6 text-neutral-400">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroStats;