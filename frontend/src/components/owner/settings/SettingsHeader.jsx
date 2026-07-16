import { Settings, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-5"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Settings className="text-white" size={30} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">
            Restaurant Settings
          </h1>

          <p className="text-zinc-400 mt-1">
            Manage your restaurant information, owner details, security and
            subscription.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
        <ShieldCheck className="text-green-400" size={18} />

        <span className="text-green-400 text-sm font-medium">
          Secure Settings
        </span>
      </div>
    </motion.div>
  );
}