import { motion } from "framer-motion";

/**
 * Layered Hero background: gradient, radial gold glow, cyber grid,
 * slowly rotating industrial gears, scan line, noise.
 */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden noise-overlay">
      {/* Base radial + linear */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,color-mix(in_oklab,var(--cyber)_10%,transparent),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {/* Rotating industrial gear (left) */}
      <motion.svg
        className="absolute -left-40 top-1/3 h-[520px] w-[520px] text-gold/20"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="90" />
        <circle cx="100" cy="100" r="72" />
        <circle cx="100" cy="100" r="54" />
        <circle cx="100" cy="100" r="36" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI) / 12;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 72}
              y1={100 + Math.sin(a) * 72}
              x2={100 + Math.cos(a) * 90}
              y2={100 + Math.sin(a) * 90}
            />
          );
        })}
      </motion.svg>

      {/* Counter-rotating small gear (right) */}
      <motion.svg
        className="absolute -right-24 bottom-10 h-[360px] w-[360px] text-cyber/15"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="88" />
        <circle cx="100" cy="100" r="60" />
        {Array.from({ length: 32 }).map((_, i) => {
          const a = (i * Math.PI) / 16;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 60}
              y1={100 + Math.sin(a) * 60}
              x2={100 + Math.cos(a) * 88}
              y2={100 + Math.sin(a) * 88}
            />
          );
        })}
      </motion.svg>

      {/* Breathing gold orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 35%, transparent) 0%, transparent 65%)",
          filter: "blur(20px)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyber scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--cyber) 80%, transparent), transparent)",
          boxShadow: "0 0 20px color-mix(in oklab, var(--cyber) 60%, transparent)",
        }}
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
