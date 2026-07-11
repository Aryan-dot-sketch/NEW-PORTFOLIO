import { motion, useReducedMotion } from "framer-motion";

const line = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero({ start }: { start: boolean }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      data-tone="warm"
      className="grain relative flex min-h-[100svh] overflow-hidden bg-paper text-ink"
    >
      {/* Warm atmosphere: paper grain + a soft accent bloom, never the
          technical grid used inside ExamCodes' cold sections. */}
      <div
        className="pointer-events-none absolute -right-[10vw] top-[-10vh] h-[60vh] w-[60vh] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)" }}
        aria-hidden
      />
      <div className="absolute left-[7%] top-[22%] h-24 w-24 rounded-full bg-ink/5 blur-3xl sm:h-64 sm:w-64" aria-hidden />
      <p
        className="pointer-events-none absolute -right-[6vw] bottom-[-8vh] select-none font-display text-[46vw] font-medium leading-none text-outline opacity-[0.08]"
        aria-hidden
      >
        A
      </p>

      <div className="site-container relative z-10 flex flex-1 flex-col justify-between py-7 pt-[96px] sm:py-10 sm:pt-[104px]">
        <motion.div
          className="flex items-center justify-between border-t border-line pt-4"
          initial={{ opacity: 0 }}
          animate={start ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="meta text-ink-faint">00 / ARYAN — BUILDER & AUTHOR</span>
          <span className="meta hidden items-center gap-2 text-ink-faint sm:flex">
            <span className="protocol-blink h-1.5 w-1.5 bg-signal" /> BUILDING NOW
          </span>
        </motion.div>

        <motion.h1
          className="opsz-display display-hero py-10 text-ink sm:py-14"
          initial="hidden"
          animate={start ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.08, delayChildren: 0.12 }}
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1' }}
        >
          <span className="block overflow-hidden">
            <motion.span variants={reduce ? undefined : line} className="block">Aryan</motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={reduce ? undefined : line}
              className="block italic text-ink-soft"
              style={{ fontWeight: 400, fontVariationSettings: '"opsz" 144, "SOFT" 60, "WONK" 1' }}
            >
              writes stories
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={reduce ? undefined : line} className="block">
              <span
                className="italic"
                style={{ fontWeight: 380, fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}
              >
                &amp;
              </span>{" "}
              builds systems
              <span className="text-outline">.</span>
            </motion.span>
          </span>
        </motion.h1>

        <motion.div
          className="grid gap-7 border-t border-line pt-6 md:grid-cols-[1fr_auto] md:items-end"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="prose-warm text-base text-ink-soft sm:text-lg">
            I'm 17. I've been building since 15 — voice AI, Telegram commerce
            systems, a live marketplace — and I wrote a novel that holds seven
            genres in one story. The engineer feeds the author, and back again.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="flex min-h-12 items-center bg-ink px-5 mono text-[0.65rem] tracking-[0.14em] text-paper transition-opacity hover:opacity-75">
              SEE THE WORKS ↓
            </a>
            <a href="#book" className="flex min-h-12 items-center border border-line-strong px-5 mono text-[0.65rem] tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper">
              READ ABOUT THE BOOK
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
