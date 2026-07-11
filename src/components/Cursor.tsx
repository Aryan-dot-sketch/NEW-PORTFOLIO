import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A subtle custom cursor for fine-pointer (desktop) devices.
 * Renders at z-9999 to always stay on top — even above overlays.
 * Disabled on touch / coarse pointers and when reduced motion is preferred.
 */
export default function Cursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 350, damping: 30, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 350, damping: 30, mass: 0.4 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement;
      const interactive = !!target.closest(
        'a, button, [role="button"], [data-cursor="hover"], input, textarea, select'
      );
      setHovering(interactive);
    };

    const downHandler = () => setDown(true);
    const upHandler = () => setDown(false);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", downHandler);
    window.addEventListener("mouseup", upHandler);
    document.addEventListener("mouseleave", leave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", downHandler);
      window.removeEventListener("mouseup", upHandler);
      document.removeEventListener("mouseleave", leave);
    };
  }, [dotX, dotY]);

  return (
    <>
      {/* Dot — always on top */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: visible ? 1 : 0, scale: down ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="rounded-full bg-accent"
          style={{ width: 6, height: 6, transform: "translate(-50%, -50%)" }}
        />
      </motion.div>
      {/* Ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.6 : 1,
          width: hovering ? 44 : 30,
          height: hovering ? 44 : 30,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div
          className="h-full w-full rounded-full border border-accent/70"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </motion.div>
    </>
  );
}
