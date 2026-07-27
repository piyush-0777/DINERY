// src/components/public/HeroContent.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
  QrCode,
  ReceiptIndianRupee,
  BarChart3,
  LogIn,
} from "lucide-react";

// Import your logo


const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const features = [
  {
    icon: QrCode,
    text: "QR Ordering",
  },
  {
    icon: ReceiptIndianRupee,
    text: "Smart Billing",
  },
  {
    icon: BarChart3,
    text: "Live Analytics",
  },
];

const HeroContent = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative z-20 flex min-h-screen w-full flex-col justify-center py-20"
    >
      {/* Badge */}

      <motion.div variants={item}>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-medium text-orange-300 backdrop-blur-xl">
          <Sparkles size={16} />

          Trusted by Modern Restaurants
        </div>
      </motion.div>

      {/* Logo */}

      <motion.div
        variants={item}
        className="mt-8"
      >
       <motion.div variants={item}>
  <h2
    className="
      text-4xl
      sm:text-5xl
      font-light
      tracking-[0.45em]
      text-amber-300
      uppercase
      select-none
    "
    style={{
      fontFamily: "'Cormorant Garamond', serif",
    }}
  >
    DINERY
  </h2>
</motion.div>
      </motion.div>

      {/* Tagline */}

      <motion.div variants={item}>
        <p className="mt-5 text-2xl font-semibold text-white">
          Where Dining Meets Technology
        </p>

        <p className="mt-2 max-w-2xl text-neutral-400">
          The Complete Restaurant Operating System
        </p>
      </motion.div>

      {/* Brand Meaning */}

      <motion.div
        variants={item}
        className="mt-8 flex flex-wrap gap-3"
      >
        {[
          ["D", "Digital"],
          ["I", "Intelligent"],
          ["N", "Network"],
          ["E", "Efficient"],
          ["R", "Restaurant"],
          ["Y", "sYstem"],
        ].map(([letter, word]) => (
          <div
            key={letter}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
          >
            <span className="font-bold text-orange-400">
              {letter}
            </span>

            <span className="ml-2 text-sm text-neutral-300">
              {word}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Heading */}

      <motion.h1
        variants={item}
        className="mt-10 max-w-5xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
      >
        Manage Your

        <br />

        <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-red-400 bg-clip-text text-transparent">
          Restaurant
        </span>

        <br />

        From One Dashboard
      </motion.h1>

      {/* Description */}

      <motion.p
        variants={item}
        className="mt-8 max-w-3xl text-lg leading-8 text-neutral-300 lg:text-xl"
      >
        Dinery is a complete Restaurant Operating System designed
        for modern restaurants. Manage QR ordering, tables,
        kitchen operations, billing, payments, staff, customers
        and real-time business analytics from one intelligent
        dashboard.
      </motion.p>
            {/* Feature Chips */}
      <motion.div
        variants={item}
        className="mt-10 flex flex-wrap gap-4"
      >
        {features.map(({ icon: Icon, text }) => (
          <motion.div
            key={text}
            whileHover={{
              y: -4,
              scale: 1.03,
            }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white backdrop-blur-lg transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/10"
          >
            <Icon
              size={18}
              className="text-orange-400"
            />

            {text}
          </motion.div>
        ))}
      </motion.div>

      {/* Buttons */}
      <motion.div
        variants={item}
        className="mt-12 flex flex-wrap items-center gap-5"
      >
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="group flex items-center gap-3 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-xl shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600"
        >
          <Link
            to="/register"
            className="flex items-center gap-3 rounded-xl border border-orange-500/40 px-8 py-4 font-semibold text-orange-300 transition-all duration-300 hover:bg-orange-500 hover:text-white"
          ></Link>
          Get Started

          <ArrowRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-lg transition-all duration-300 hover:bg-white/10"
        >
          <Play
            size={18}
            fill="currentColor"
          />

          Watch Demo
        </motion.button>

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.96,
          }}
        >
          <Link
            to="/login"
            className="flex items-center gap-3 rounded-xl border border-orange-500/40 px-8 py-4 font-semibold text-orange-300 transition-all duration-300 hover:bg-orange-500 hover:text-white"
          >
            <LogIn size={18} />

            Login
          </Link>
        </motion.div>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        variants={item}
        className="mt-14 grid gap-4 sm:grid-cols-3"
      >
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <CheckCircle2
              className="text-green-400"
              size={20}
            />

            <div>
              <h4 className="font-semibold text-white">
                Free Setup
              </h4>

              <p className="text-sm text-neutral-400">
                Get started in minutes
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <CheckCircle2
              className="text-green-400"
              size={20}
            />

            <div>
              <h4 className="font-semibold text-white">
                No Credit Card
              </h4>

              <p className="text-sm text-neutral-400">
                Try before upgrading
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <CheckCircle2
              className="text-green-400"
              size={20}
            />

            <div>
              <h4 className="font-semibold text-white">
                24/7 Support
              </h4>

              <p className="text-sm text-neutral-400">
                We're always here to help
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Quote */}
      <motion.div
        variants={item}
        className="mt-12 max-w-3xl rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 backdrop-blur-xl"
      >
        <h3 className="text-lg font-bold text-white">
          Why Choose Dinery?
        </h3>

        <p className="mt-3 leading-7 text-neutral-300">
          From the moment your customer scans a QR code until the
          final payment is completed, Dinery manages every step of
          your restaurant's workflow. Tables, orders, kitchen,
          billing, analytics, customer management, and business
          insights—all connected in one modern platform.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;