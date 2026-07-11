import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * A thin reading-progress bar pinned to the top of a section.
 * Animates fill as the user scrolls through the section.
 */
export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative">
      <motion.div
        aria-hidden
        className="sticky top-[72px] z-10 h-[2px] origin-left bg-accent"
        style={{ scaleX }}
      />
    </div>
  );
}
