import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin, elegant progress bar pinned to the very top of the viewport.
 * Uses the page's global tone — warm in Aryan's sections, cold in ExamCodes'.
 * The fill color smoothly transitions between warm accent and cold signal green.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
