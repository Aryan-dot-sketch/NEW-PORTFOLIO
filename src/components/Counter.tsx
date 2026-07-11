import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts up to a numeric value once scrolled into view. Falls back to
 * rendering the raw string for non-numeric values (e.g. "ARYAN", "LIVE")
 * so the same component can sit inside a mixed proof strip.
 */
export function Counter({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const numeric = Number(value);
  const isNumeric = !Number.isNaN(numeric) && value.trim() !== "";
  const padLength = value.replace(/[^0-9]/g, "").length || value.length;
  const [display, setDisplay] = useState(isNumeric ? "0".padStart(padLength, "0") : value);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, numeric, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString().padStart(padLength, "0")),
    });
    return () => controls.stop();
  }, [inView, isNumeric, numeric, duration, padLength, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
