import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const phases: { text: string; voice: "warm" | "cold" }[] = [
  { text: "Aryan", voice: "warm" },
  { text: "AI SYSTEMS", voice: "cold" },
  { text: "FICTION", voice: "warm" },
  { text: "INFRASTRUCTURE", voice: "cold" },
  { text: "MARKETPLACES", voice: "cold" },
  { text: "NEXT", voice: "cold" },
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce) {
      const timeout = window.setTimeout(onComplete, 120);
      return () => window.clearTimeout(timeout);
    }

    let completionTimer = 0;
    const timer = window.setInterval(() => {
      setPhase((current) => {
        if (current >= phases.length - 1) {
          window.clearInterval(timer);
          completionTimer = window.setTimeout(onComplete, 550);
          return current;
        }
        return current + 1;
      });
    }, 330);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(completionTimer);
    };
  }, [onComplete, reduce]);

  const progress = ((phase + 1) / phases.length) * 100;
  const current = phases[phase];

  return (
    <motion.div
      data-tone="cold"
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-[#050505] p-5 text-[#f2f4f7] sm:p-8 lg:p-12"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-3 text-[#f2f4f7]">
          <svg viewBox="0 0 42 28" className="h-6 w-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
            <path d="M3 3l11 11L3 25" />
            <path d="M18 25h20" />
          </svg>
          <span style={{ fontFamily: "var(--font-display-warm)" }} className="text-[0.95rem] font-medium tracking-[0.06em]">
            Aryan
          </span>
        </span>
        <span className="mono tabular-nums text-[0.62rem] tracking-[0.18em] text-[#737b89]">ARCHIVE / 017</span>
      </div>

      <div className="relative mx-auto w-full max-w-5xl py-12">
        <p className="mono mb-5 text-[0.65rem] tracking-[0.22em] text-[#737b89]">PERSONAL FOUNDER ARCHIVE</p>
        <div className="overflow-hidden">
          <motion.p
            key={current.text}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            style={{
              fontFamily: current.voice === "warm" ? "var(--font-display-warm)" : "var(--font-display-cold)",
              fontStyle: current.voice === "warm" ? "italic" : "normal",
              fontWeight: current.voice === "warm" ? 380 : 500,
              letterSpacing: current.voice === "warm" ? "-0.02em" : "-0.065em",
            }}
            className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.82]"
          >
            {current.text}
          </motion.p>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between mono text-[0.6rem] tracking-[0.16em] text-[#737b89]">
          <span>STARTED AT 17</span>
          <span className="tabular-nums">{Math.round(progress).toString().padStart(3, "0")}%</span>
        </div>
        <div className="h-px bg-white/15">
          <motion.div
            className="h-full origin-left bg-white"
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.28, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
