// src/components/public/HeroFloatingCards.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CreditCard,
  Star,
  ShoppingBag,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const cards = [
  {
    icon: ShoppingBag,
    title: "New Order",
    value: "#2051",
    subtitle: "Table 08",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",

    className:
      "top-28 -left-10 hidden xl:flex",
    delay: 0,
  },

  {
    icon: CreditCard,
    title: "Payment Received",
    value: "₹860",
    subtitle: "Just Now",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",

    className:
      "bottom-36 -left-14 hidden lg:flex",
    delay: 0.4,
  },

  {
    icon: Star,
    title: "Customer Rating",
    value: "4.9",
    subtitle: "★★★★★",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",

    className:
      "top-16 -right-12 hidden xl:flex",
    delay: 0.8,
  },

  {
    icon: Bell,
    title: "Kitchen Ready",
    value: "Order #2048",
    subtitle: "Ready to Serve",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",

    className:
      "bottom-20 -right-8 hidden lg:flex",
    delay: 1.2,
  },

  {
    icon: TrendingUp,
    title: "Revenue",
    value: "+18.2%",
    subtitle: "Today",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",

    className:
      "top-1/2 -right-20 hidden 2xl:flex",
    delay: 1.5,
  },
];

const HeroFloatingCards = () => {
  return (
    <>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -12, 0],
            }}
            transition={{
              delay: card.delay,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.05,
              y: -8,
            }}
            className={`
              absolute
              z-30
              ${card.className}
            `}
          >
            <div
              className={`
                flex
                items-center
                gap-4
                rounded-2xl
                border
                ${card.border}
                ${card.bg}
                px-5
                py-4
                backdrop-blur-xl
                shadow-2xl
              `}
            >
              <div
                className={`
                  rounded-xl
                  bg-black/20
                  p-3
                `}
              >
                <Icon
                  size={20}
                  className={card.color}
                />
              </div>

              <div>
                <p className="text-xs text-neutral-400">
                  {card.title}
                </p>

                <h4 className="mt-1 font-bold text-white">
                  {card.value}
                </h4>

                <div className="mt-1 flex items-center gap-1">
                  <CheckCircle2
                    size={13}
                    className="text-green-400"
                  />

                  <span className="text-xs text-neutral-400">
                    {card.subtitle}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default HeroFloatingCards;