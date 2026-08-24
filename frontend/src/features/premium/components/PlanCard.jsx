import { motion } from "framer-motion";
import {
  Check,
  X,
  Crown,
} from "lucide-react";

const PlanCard = ({
  title,
  price,
  period,
  description,
  features,
  premium = false,
  currentPlan = false,
  onSelect,
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`relative overflow-hidden rounded-3xl border bg-white dark:bg-gray-900 shadow-lg ${
        premium
          ? "border-amber-400 ring-2 ring-amber-300"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {premium && (
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-white">
          <Crown size={14} />
          MOST POPULAR
        </div>
      )}

      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>

        <div className="mt-6 flex items-end gap-1">
          <span className="text-5xl font-bold text-gray-900 dark:text-white">
            ₹{price}
          </span>

          <span className="pb-2 text-gray-500 dark:text-gray-400">
            / {period}
          </span>
        </div>

        <button
          disabled={currentPlan}
          onClick={onSelect}
          className={`mt-8 w-full rounded-xl py-3 font-semibold transition-all ${
            currentPlan
              ? "cursor-default bg-gray-300 text-gray-700"
              : premium
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {currentPlan ? "Current Plan" : "Upgrade Now"}
        </button>

        <div className="my-8 h-px bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              {feature.available ? (
                <Check
                  size={18}
                  className="mt-0.5 text-green-500"
                />
              ) : (
                <X
                  size={18}
                  className="mt-0.5 text-red-500"
                />
              )}

              <div>
                <p
                  className={`font-medium ${
                    feature.available
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-400 line-through"
                  }`}
                >
                  {feature.label}
                </p>

                {feature.note && (
                  <p className="text-xs text-gray-500">
                    {feature.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PlanCard;