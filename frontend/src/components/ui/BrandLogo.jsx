import { motion } from "framer-motion";

const letters = ["D", "I", "N", "E", "R", "Y"];

export default function BrandLogo() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="flex text-6xl font-extrabold tracking-wide"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
          className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
