import { caseStudy, profile } from "../data/portfolio";
import { Quote } from "./Quote";
import { Reveal } from "./Reveal";
import Signature from "./Signature";

export default function CaseStudy() {
  return (
    <section id="story" data-tone="cold" className="section-pad border-b border-line bg-paper text-ink">
      <div className="site-container">
        <Reveal variant="clip">
          <div className="grid gap-7 border-t border-line pt-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <p className="meta text-ink-faint">03 / ABOUT ARYAN</p>
            <h2 className="display-section text-ink lg:text-right">
              A BUILDER<br /><span className="text-outline">WITH RANGE.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 border-t border-line lg:mt-24">
          {caseStudy.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.04}>
              <article className="group grid gap-5 border-b border-line py-8 transition-all duration-300 hover:bg-paper-2/50 sm:grid-cols-[4rem_0.8fr_1.2fr] sm:gap-8 sm:py-10 sm:px-2 lg:grid-cols-[7rem_0.8fr_1.2fr]">
                <span className="mono tabular-nums text-xs text-ink-faint">{item.number}</span>
                <h3 className="font-display text-2xl font-medium tracking-[-0.035em] text-ink sm:text-3xl">{item.title}</h3>
                <p className="max-w-prose text-sm leading-relaxed text-ink-soft sm:text-base">{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/*
          The meeting point: this is the one place on the page where
          Aryan's warm, serif voice and ExamCodes' cold, mono voice sit
          side by side in the same panel — a literal staging of the
          relationship described in the copy. Each half re-declares its
          own data-tone, overriding the section's ambient "cold" tone.
        */}
        <Reveal className="mt-16 lg:mt-24" variant="drift">
          <div className="grid overflow-hidden border border-line-strong lg:grid-cols-[1.25fr_0.75fr]">
            <div data-tone="warm" className="grain bg-paper p-6 text-ink sm:p-10 lg:p-14">
              <p className="meta text-ink-faint">THE HONEST POSITION</p>
              <Quote>Range is the proof, not the resume.</Quote>
              <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-ink-soft">
                Six projects across AI, fiction, commerce, and infrastructure —
                all built between 15 and 17. The portfolio has room for all of it.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Signature />
                <span className="meta text-ink-faint">{profile.name}</span>
              </div>
            </div>
            <div data-tone="cold" className="flex flex-col justify-between bg-paper-2 p-6 text-ink sm:p-10">
              <p className="text-sm leading-relaxed text-ink-soft">
                Public user numbers and testimonials are intentionally absent
                until {profile.name} has verified figures and permission to
                publish them. The archive stays honest while the work grows.
              </p>
              <a
                href="#projects"
                className="mt-12 flex min-h-12 items-center justify-between border-t border-line pt-5 mono text-[0.65rem] tracking-[0.12em] text-ink"
              >
                SEE ALL PROJECTS <span>↓</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
