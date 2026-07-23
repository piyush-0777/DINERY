// src/components/public/HeroSection.jsx

import React from "react";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroFloatingCards from "./HeroFloatingCards";
import HeroStats from "./HeroStats";
import ScrollIndicator from "./ScrollIndicator";

import HeroDashboard from "./dashboard/HeroDashboard";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-neutral-950 text-white"
    >
      {/* Background */}
      <HeroBackground />

      <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6 pt-32 pb-24">

        {/* Hero Content */}
        <HeroContent />

        {/* Dashboard */}
        <div className="relative mt-20 w-full max-w-6xl">
          <HeroDashboard />

          {/* Floating Cards */}
          <HeroFloatingCards />
        </div>

        {/* Statistics */}
        <div className="mt-20 w-full">
          <HeroStats />
        </div>

      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;