import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">

        {/* Brand Name */}
        <h1 className="relative text-5xl font-extrabold tracking-wide">
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient">
            DINERY
          </span>

          {/* Glow */}
          <span className="absolute inset-0 blur-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 opacity-30"></span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs uppercase tracking-[0.35em] text-white/70">
          Restaurant POS System
        </p>

        {/* Animated Line */}
        <div className="relative h-1 w-40 overflow-hidden rounded-full bg-white/20">
          <div className="absolute h-full w-1/3 bg-gradient-to-r from-amber-400 to-red-500 animate-loading"></div>
        </div>

        {/* Loading Text */}
        <p className="text-sm text-white/60 animate-pulse">
          Initializing system…
        </p>
      </div>
    </div>
  );
};

export default Loader;

