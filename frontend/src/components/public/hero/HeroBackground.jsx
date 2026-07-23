// src/components/public/HeroBackground.jsx

import React from "react";
import { motion } from "framer-motion";

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Base */}
      <div className="absolute inset-0 bg-[#09090B]" />

      {/* Main Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(127,29,29,0.18),transparent_40%),radial-gradient(circle_at_center,rgba(245,158,11,0.08),transparent_55%)]" />

      {/* Soft Orange Glow */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-48 -top-40 h-[650px] w-[650px] rounded-full bg-orange-500/20 blur-[170px]"
      />

      {/* Amber Glow */}
      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, 25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-1/4 top-20 h-[420px] w-[420px] rounded-full bg-amber-400/10 blur-[140px]"
      />

      {/* Red Glow */}
      <motion.div
        animate={{
          x: [0, -45, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-56 bottom-0 h-[700px] w-[700px] rounded-full bg-red-700/20 blur-[180px]"
      />

      {/* Brown Glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.45, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3A261B]/30 blur-[130px]"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.10) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle,#ffffff 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top Fade */}
      <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/70 to-transparent" />

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.82)_100%)]" />

    </div>
  );
};

export default HeroBackground;