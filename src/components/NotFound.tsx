import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * A branded 404 page — stays in the same design language as the portfolio.
 * Note: requires React Router to be set up. Falls back to a simple anchor.
 */
export default function NotFound() {
  return (
    <div
      data-tone="warm"
      className="grain flex min-h-screen items-center justify-center bg-paper px-5 text-ink"
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-display text-[16vw] font-medium leading-none tracking-[-0.06em] text-outline">
          404
        </p>
        <h1 className="mt-6 font-display text-3xl font-medium tracking-[-0.03em] text-ink">
          This page doesn't exist.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base text-ink-soft">
          You've found a blank chapter. The archive is still being written.
        </p>
        <a
          href="/"
          className="mt-10 inline-flex min-h-12 items-center bg-ink px-6 mono text-[0.65rem] tracking-[0.14em] text-paper transition-opacity hover:opacity-75"
        >
          RETURN TO ORIGIN
        </a>
      </motion.div>
    </div>
  );
}
