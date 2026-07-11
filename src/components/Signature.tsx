import { motion, useReducedMotion } from "framer-motion";

/**
 * A hand-drawn signature stroke — the one clearly human artifact on
 * the page. Draws itself on when scrolled into view.
 */
export default function Signature({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 160 50" className={`h-11 w-auto text-ink ${className}`} aria-hidden>
      <motion.path
        d="M5 38 C 20 10, 35 10, 30 32 C 28 42, 40 30, 50 28 C 60 26, 58 42, 72 36 C 82 32, 78 18, 92 22 C 104 25, 100 42, 118 36 C 132 31, 130 16, 148 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
