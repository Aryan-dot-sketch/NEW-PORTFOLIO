import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./Reveal";

const principles = [
  {
    id: "listen",
    index: "01",
    label: "Listen first",
    detail: "Every project starts with a real problem. Kronos began with voice frustration. The novel began with a story that wouldn't leave. ExamCodes began with a marketplace that felt broken.",
  },
  {
    id: "design",
    index: "02",
    label: "Design the simplest version",
    detail: "Complexity is the enemy of shipping. The first version of every project is smaller than the final one. That's the point.",
  },
  {
    id: "build",
    index: "03",
    label: "Build in public",
    detail: "Telegram bots, AI assistants, marketplaces — all built while people watched. Feedback comes from usage, not speculation.",
  },
  {
    id: "learn",
    index: "04",
    label: "Learn from what breaks",
    detail: "Atmadarshan taught me what voice means. The novel taught me what story requires. Each failure is a lesson the next project inherits.",
  },
  {
    id: "iterate",
    index: "05",
    label: "Ship, then improve",
    detail: "Perfect is the enemy of done. Every project ships imperfectly, then improves based on what actually happens.",
  },
];

export default function Architecture() {
  const [activeId, setActiveId] = useState(principles[0].id);
  const reduce = useReducedMotion();
  const active = principles.find((item) => item.id === activeId) ?? principles[0];

  return (
    <section id="architecture" data-tone="cold" className="section-pad border-b border-line bg-paper text-ink">
      <div className="site-container">
        <Reveal variant="clip">
          <div className="grid gap-7 border-t border-line pt-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="meta text-ink-faint">03 / SYSTEMS THINKING</p>
              <h2 className="display-section mt-7 text-ink">HOW I<br /><span className="text-outline">BUILD.</span></h2>
            </div>
            <p className="max-w-prose text-base leading-relaxed text-ink-soft lg:justify-self-end">
              These principles apply across every project — AI systems, fiction, commerce, and infrastructure. The specifics change; the approach doesn't.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20" y={30}>
          <div className="grid-plane border border-line-strong bg-paper-2 p-5 sm:p-8 lg:p-12">
            <div className="relative grid gap-3 lg:grid-cols-5 lg:gap-6">
              <div className="absolute left-[10%] right-[10%] top-1/2 hidden h-px bg-line-strong lg:block" aria-hidden />
              {principles.map((node) => {
                const selected = node.id === active.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveId(node.id)}
                    className={`relative z-10 grid min-h-20 grid-cols-[3rem_1fr_auto] items-center border px-4 text-left transition-colors lg:min-h-32 lg:grid-cols-1 lg:content-center lg:text-center ${selected ? "border-ink bg-ink text-paper" : "border-line-strong bg-paper text-ink hover:border-ink"}`}
                    aria-pressed={selected}
                  >
                    <span className={`mono tabular-nums text-[0.6rem] ${selected ? "text-paper/55" : "text-ink-faint"}`}>{node.index}</span>
                    <span className="font-display text-lg font-medium tracking-[-0.025em] lg:mt-3 lg:text-xl">{node.label}</span>
                    <span className="mono text-xs lg:mt-3">{selected ? "●" : "○"}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 border-t border-line pt-7 sm:mt-12 sm:pt-9">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-5 lg:grid-cols-[0.55fr_1.45fr] lg:items-start"
              >
                <div>
                  <p className="meta tabular-nums text-ink-faint">PRINCIPLE / {active.index}</p>
                  <p className="mt-3 font-display text-3xl font-medium tracking-[-0.04em] text-ink">{active.label}</p>
                </div>
                <p className="max-w-prose text-base leading-relaxed text-ink-soft sm:text-lg">{active.detail}</p>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
