import React from "react";
import { motion } from "framer-motion";

const CurrencyToggle = ({ currency, setCurrency }) => {
  return (
    <div className="flex items-center gap-3 bg-gray-200 dark:bg-gray-800 p-1.5 rounded-2xl shadow-inner border border-gray-300 dark:border-gray-700">
      <button
        type="button"
        onClick={() => setCurrency("INR")}
        className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 ${
          currency === "INR"
            ? "text-white"
            : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
        }`}
      >
        {currency === "INR" && (
          <motion.div
            layoutId="currency-active-pill"
            className="absolute inset-0 bg-amber-500 rounded-xl shadow-md"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          <span>🇮🇳</span> INR (₹)
        </span>
      </button>

      <button
        type="button"
        onClick={() => setCurrency("USD")}
        className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 ${
          currency === "USD"
            ? "text-white"
            : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
        }`}
      >
        {currency === "USD" && (
          <motion.div
            layoutId="currency-active-pill"
            className="absolute inset-0 bg-amber-500 rounded-xl shadow-md"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          <span>🇺🇸</span> USD ($)
        </span>
      </button>
    </div>
  );
};

export default CurrencyToggle;
