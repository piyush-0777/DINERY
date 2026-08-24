import { Save } from "lucide-react";
import { motion } from "framer-motion";

export default function SaveButton({
  loading = false,
  onClick,
}) {
  return (
    <div className="flex justify-end">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        disabled={loading}
        className="flex items-center gap-3 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save size={18} />
            Save Changes
          </>
        )}
      </motion.button>
    </div>
  );
}