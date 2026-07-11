import { motion, useScroll, useSpring } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";

/**
 * Persistent right-edge chapter navigator — clickable dots jump to sections,
 * labels always visible on hover, scroll progress fill animates.
 */
export default function ChapterRail() {
  const { activeIndex, chapters } = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.3,
  });

  return (
    <nav
      aria-label="Chapter navigation"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
    >
      <div className="relative flex items-center gap-4 rounded-full border border-line-strong bg-paper/90 py-4 pl-2 pr-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md">
        {/* Vertical track */}
        <div className="relative h-44 w-px bg-line-strong">
          {/* Fill progress */}
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-accent"
            style={{ scaleY: progress, height: "100%" }}
          />

          {/* Chapter dots */}
          {chapters.map((chapter, index) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className="group absolute left-1/2 -translate-x-1/2"
              style={{ top: `${(index / (chapters.length - 1)) * 100}%` }}
              aria-label={`Jump to ${chapter.label}`}
              aria-current={index === activeIndex ? "step" : undefined}
            >
              {/* Tooltip label — always visible on right */}
              <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-sm border border-line bg-paper px-2.5 py-1.5 font-mono text-[0.56rem] tracking-[0.1em] text-ink-faint opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                {chapter.index} / {chapter.label.toUpperCase()}
              </span>

              {/* Dot */}
              <span
                className={`block -translate-y-1/2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "h-3 w-3 bg-accent"
                    : "h-2 w-2 bg-ink-faint/40 group-hover:bg-ink-soft"
                }`}
              />
            </a>
          ))}
        </div>

        {/* Active chapter label */}
        <span className="mono min-w-[3ch] tabular-nums text-[0.58rem] tracking-[0.1em] text-ink">
          {chapters[activeIndex].index}
        </span>
      </div>
    </nav>
  );
}
