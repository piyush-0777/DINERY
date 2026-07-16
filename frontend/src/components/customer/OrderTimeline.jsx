import React from "react";
import { motion } from "framer-motion";
import {
  CircleCheckBig,
  Circle,
  CookingPot,
  UtensilsCrossed,
  BadgeCheck,
  CircleX,
} from "lucide-react";

const steps = [
  {
    key: "pending",
    title: "Order Received",
    subtitle: "Restaurant received your order",
    icon: CircleCheckBig,
  },
  {
    key: "preparing",
    title: "Preparing",
    subtitle: "Chef is preparing your food",
    icon: CookingPot,
  },
  {
    key: "served",
    title: "Served",
    subtitle: "Your food is ready",
    icon: UtensilsCrossed,
  },
  {
    key: "completed",
    title: "Completed",
    subtitle: "Enjoy your meal ❤️",
    icon: BadgeCheck,
  },
];

const statusIndex = {
  pending: 0,
  preparing: 1,
  served: 2,
  completed: 3,
};

const OrderTimeline = ({ status }) => {
  if (status === "cancelled") {
    return (
      <div className="bg-white rounded-3xl shadow p-5">
        <div className="flex gap-3 items-center">
          <CircleX className="text-red-500" size={30} />

          <div>
            <h2 className="font-semibold text-red-500">
              Order Cancelled
            </h2>

            <p className="text-sm text-gray-500">
              Please contact restaurant.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const activeIndex = statusIndex[status];

  return (
    <div className="bg-white rounded-3xl shadow p-5">

      <h2 className="font-bold text-lg mb-6">
        Order Progress
      </h2>

      <div className="space-y-6">

        {steps.map((step, index) => {

          const Icon = step.icon;

          const completed = index < activeIndex;
          const active = index === activeIndex;

          return (

            <div
              key={step.key}
              className="flex gap-4 relative"
            >

              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-[18px] top-10 h-12 w-[2px]
                  
                  ${
                    completed
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              )}

              <motion.div

                animate={
                  active
                    ? {
                        scale: [1, 1.15, 1],
                      }
                    : {}
                }

                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                }}

                className={`h-9 w-9 rounded-full flex items-center justify-center

                ${
                  completed
                    ? "bg-green-500 text-white"
                    : active
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {completed ? (
                  <CircleCheckBig size={18} />
                ) : (
                  <Icon size={18} />
                )}
              </motion.div>

              <div>

                <h3
                  className={`font-semibold
                  
                  ${
                    active
                      ? "text-black"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {step.subtitle}
                </p>

              </div>

            </div>

          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;