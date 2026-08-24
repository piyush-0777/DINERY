import { motion } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";

const PremiumBadge = ({
  text = "Most Popular",
  className = "",
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-lg ${className}`}
    >
      <Crown size={16} />

      <span>{text}</span>

      <Sparkles size={15} />
    </motion.div>
  );
};

export default PremiumBadge;