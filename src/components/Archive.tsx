import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { archive } from "../data/portfolio";
import { Reveal } from "./Reveal";

export default function Archive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const active = archive[activeIndex];

  return (
    <section id="archive" data-tone="warm" className="grain section-pad border-b border-line bg-paper text-ink">
      <div className="site-container">
        <Reveal variant="clip">
          <div className="grid gap-7 border-t border-line pt-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
            <p className="meta text-ink-faint">07 / ARYAN ARCHIVE</p>
            <h2 className="opsz-display display-section text-ink lg:text-right">NOT JUST<br /><span className="italic text-accent" style={{ fontWeight: 380 }}>one company.</span></h2>
          </div>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20" variant="drift">
          <div className="grid border border-line-strong lg:grid-cols-[0.7fr_1.3fr]">
            <div className="border-b border-line lg:border-b-0 lg:border-r">
              {archive.map((item, index) => (
                <button
                  key={item.volume}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`grid min-h-24 w-full grid-cols-[5rem_1fr_auto] items-center gap-3 border-b border-line px-5 text-left transition-colors last:border-b-0 sm:px-7 ${index === activeIndex ? "bg-ink text-paper" : "text-ink hover:bg-paper-2"}`}
                  aria-pressed={index === activeIndex}
                >
                  <span className={`mono text-[0.6rem] tracking-[0.1em] ${index === activeIndex ? "text-paper/55" : "text-ink-faint"}`}>{item.volume}</span>
                  <span className="font-display text-lg font-medium tracking-[-0.02em] sm:text-xl">{item.title}</span>
                  <span className="mono text-xs">{index === activeIndex ? "●" : "○"}</span>
                </button>
              ))}
            </div>

            <div className="flex min-h-[26rem] items-center bg-paper-2 p-6 sm:p-10 lg:min-h-[34rem] lg:p-14">
              <motion.div key={active.volume} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="meta text-ink-faint">{active.volume}</span>
                  <span className="h-px w-10 bg-line-strong" />
                  <span className="meta text-ink-faint">{active.state}</span>
                </div>
                <h3 className="opsz-display mt-8 font-display text-5xl font-medium leading-[0.92] tracking-[-0.035em] text-ink sm:text-7xl lg:text-8xl">{active.title}</h3>
                <p className="mt-7 max-w-prose text-base leading-relaxed text-ink-soft">{active.copy}</p>
                {activeIndex === 0 ? (
                  <p className="mt-10 mono text-[0.62rem] tracking-[0.13em] text-signal">● CURRENT CHAPTER / ACTIVE</p>
                ) : (
                  <p className="mt-10 mono text-[0.62rem] tracking-[0.13em] text-ink-faint">LOCKED UNTIL THE MILESTONE IS REAL</p>
                )}
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
