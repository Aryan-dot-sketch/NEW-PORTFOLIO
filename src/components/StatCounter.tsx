import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  label: string;
  detail: string;
  suffix?: string;
}

/**
 * Animates a number from 0 to `value` when it enters the viewport.
 * Then displays the final number statically (no re-trigger).
 */
function StatCounter({ value, label, detail, suffix = "" }: StatCounterProps) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1400; // ms
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [started, value]);

  return (
    <div ref={ref} className="group text-center lg:text-left">
      <p
        className="font-display text-7xl font-medium tracking-[-0.04em] text-ink transition-colors group-hover:text-accent sm:text-8xl lg:text-9xl"
        aria-live="polite"
      >
        {display}
        {suffix}
      </p>
      <p className="mt-3 font-display text-lg font-medium tracking-[-0.02em] text-ink-soft sm:text-xl">
        {label}
      </p>
      <p className="mt-1 text-sm text-ink-faint">{detail}</p>
    </div>
  );
}

export default StatCounter;
