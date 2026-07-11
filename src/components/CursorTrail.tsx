import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const TRAIL_COUNT = 4;
const BASE_DELAY = 0.04;

/**
 * Ghost cursor trail — 4 fading rings follow the main cursor with
 * decreasing opacity and increasing delay. Only on fine-pointer devices.
 * Renders at z-9998 to stay just below the main cursor dot.
 */
export default function CursorTrail() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const [visible, setVisible] = useState(false);

  const trails = Array.from({ length: TRAIL_COUNT }, (_, i) => ({
    x: useSpring(rawX, { stiffness: 150 - i * 25, damping: 18 - i * 2, mass: 1 + i * 0.4 }),
    y: useSpring(rawY, { stiffness: 150 - i * 25, damping: 18 - i * 2, mass: 1 + i * 0.4 }),
    opacity: 0.55 - i * 0.12,
    scale: 1 - i * 0.15,
    size: 28 - i * 5,
  }));

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [rawX, rawY]);

  return (
    <>
      {trails.map((trail, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[9998] hidden rounded-full border border-accent/40 md:block"
          style={{
            x: trail.x,
            y: trail.y,
            width: trail.size,
            height: trail.size,
            opacity: visible ? trail.opacity : 0,
            scale: trail.scale,
          }}
          transition={{ opacity: { duration: 0.3 } }}
        />
      ))}
    </>
  );
}
