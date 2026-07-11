import { lessons } from "../data/portfolio";
import { Reveal } from "./Reveal";

export default function DecisionLog() {
  return (
    <section id="decisions" data-tone="warm" className="grain section-pad border-b border-line bg-paper text-ink">
      <div className="site-container">
        <Reveal variant="clip">
          <div className="grid gap-7 border-t border-line pt-6 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="meta text-ink-faint">05 / LESSONS</p>
              <h2 className="display-section mt-7 text-ink">WHAT THE WORK<br /><span className="text-outline">TAUGHT ME.</span></h2>
            </div>
            <p className="max-w-prose text-base leading-relaxed text-ink-soft lg:justify-self-end">
              Six projects across AI, fiction, commerce, and infrastructure. Each one taught something the others couldn't.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-16 lg:mt-20" variant="drift">
          <div className="grid gap-px bg-line-whisper md:grid-cols-3">
            {lessons.map((lesson) => (
              <article key={lesson.number} className="bg-paper p-7 sm:p-9">
                <span className="mono tabular-nums text-xs text-ink-faint">{lesson.number}</span>
                <h3 className="mt-10 font-display text-2xl font-medium tracking-[-0.035em] text-ink sm:text-3xl">{lesson.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{lesson.copy}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
