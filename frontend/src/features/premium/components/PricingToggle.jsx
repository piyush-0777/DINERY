import { motion } from "framer-motion";

const PricingToggle = ({ billing, setBilling }) => {
  return (
    <div className="inline-flex items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-1 shadow-sm">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setBilling("monthly")}
        className={`relative px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
          billing === "monthly"
            ? "bg-blue-600 text-white shadow"
            : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
        }`}
      >
        Monthly
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setBilling("yearly")}
        className={`relative px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
          billing === "yearly"
            ? "bg-blue-600 text-white shadow"
            : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
        }`}
      >
        Yearly
        <span className="ml-2 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
          SAVE 17%
        </span>
      </motion.button>
    </div>
  );
};

export default PricingToggle;