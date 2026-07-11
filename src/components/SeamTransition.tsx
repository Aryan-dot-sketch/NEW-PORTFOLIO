import { motion, useReducedMotion } from "framer-motion";

/**
 * Enhanced gradient bridge between warm (Aryan) and cold (ExamCodes) sections.
 * Includes a subtle animated wipe and a glowing pulse at the midpoint.
 */
export default function SeamTransition({
  direction,
}: {
  direction: "toDark" | "toLight";
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    const background =
      direction === "toDark"
        ? "linear-gradient(180deg, #f1ece2 0%, #0a0806 55%, #050505 100%)"
        : "linear-gradient(180deg, #050505 0%, #0a0806 45%, #f1ece2 100%)";
    return <div className="relative h-20 w-full sm:h-28 lg:h-36" style={{ background }} />;
  }

  return (
    <div className="relative h-20 overflow-hidden sm:h-28 lg:h-36" aria-hidden>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            direction === "toDark"
              ? "linear-gradient(180deg, #f1ece2 0%, #0a0806 55%, #050505 100%)"
              : "linear-gradient(180deg, #050505 0%, #0a0806 45%, #f1ece2 100%)",
        }}
      />

      {/* Animated horizontal wipe line */}
      <motion.div
        className="absolute inset-x-0 h-px"
        style={{
          background:
            direction === "toDark"
              ? "linear-gradient(90deg, transparent, #b5481e 40%, #d9e0e9 60%, transparent)"
              : "linear-gradient(90deg, transparent, #d9e0e9 40%, #b5481e 60%, transparent)",
          top: "50%",
          opacity: 0.6,
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Center pulse glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            direction === "toDark"
              ? "radial-gradient(circle, rgba(181,72,30,0.25) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(217,224,233,0.25) 0%, transparent 70%)",
        }}
        animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}
