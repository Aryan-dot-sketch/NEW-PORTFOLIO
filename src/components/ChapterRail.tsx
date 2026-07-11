import { motion, useScroll, useSpring } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";

/**
 * A persistent right-edge instrument: part table-of-contents, part
 * reading-progress indicator. It always renders in the same neutral,
 * high-contrast chrome regardless of the section's tone underneath —
 * like a HUD that stays constant while the world behind it changes
 * from Aryan's cream to ExamCodes' black and back again.
 */
export default function ChapterRail() {
  const { activeIndex, chapters } = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  return (
    <nav
      aria-label="Chapter progress"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/75 py-4 pl-2 pr-3 text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
        {/* Track + fill */}
        <div className="relative h-40 w-px bg-white/15">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-white/70"
            style={{ scaleY: progress, height: "100%" }}
          />
          {chapters.map((chapter, index) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className="group absolute left-1/2 -translate-x-1/2"
              style={{ top: `${(index / (chapters.length - 1)) * 100}%` }}
              aria-label={`Jump to ${chapter.label}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span
                className={`block -translate-y-1/2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "h-2.5 w-2.5 bg-white" : "h-1.5 w-1.5 bg-white/35 group-hover:bg-white/70"
                }`}
              />
              <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-sm bg-white px-2 py-1 font-mono text-[0.58rem] tracking-[0.1em] text-black opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {chapter.index} / {chapter.label.toUpperCase()}
              </span>
            </a>
          ))}
        </div>

        <span className="mono tabular-nums text-[0.58rem] tracking-[0.12em] text-white/60">
          {chapters[activeIndex].index}
        </span>
      </div>
    </nav>
  );
}
