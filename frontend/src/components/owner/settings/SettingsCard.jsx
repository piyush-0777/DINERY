import { motion } from "framer-motion";

export default function SettingsCard({
  title,
  subtitle,
  icon,
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -2 }}
      className="rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md overflow-hidden shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-zinc-800 px-6 py-5">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              {icon}
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-white">
              {title}
            </h2>

            {subtitle && (
              <p className="text-sm text-zinc-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
}