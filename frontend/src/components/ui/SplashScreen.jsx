import { motion } from "framer-motion";
import BrandLogo from "./BrandLogo";

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* Brand */}
      <BrandLogo />

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-xs uppercase tracking-[0.4em] text-white/70"
      >
        Restaurant POS System
      </motion.p>

      {/* Progress Bar */}
      <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/20">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "300%" }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="h-full w-1/3 bg-gradient-to-r from-amber-400 to-red-500"
        />
      </div>

      {/* Status */}
      <p className="mt-4 text-sm text-white/60 animate-pulse">
        Initializing DINERY…
      </p>
    </motion.div>
  );
}
