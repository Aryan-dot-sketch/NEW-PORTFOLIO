import { founderLog } from "../data/portfolio";
import { Reveal } from "./Reveal";

export default function FounderLog() {
  return (
    <section id="log" data-tone="warm" className="grain section-pad border-b border-line bg-paper-2 text-ink">
      <div className="site-container">
        <Reveal variant="clip">
          <div className="grid gap-7 border-t border-line pt-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="meta text-ink-faint">06 / LIVE FOUNDER LOG</p>
              <h2 className="opsz-display display-section mt-7 text-ink">BUILDING IN<br /><span className="italic text-accent" style={{ fontWeight: 380 }}>the open.</span></h2>
            </div>
            <p className="prose-warm text-base leading-relaxed text-ink-soft lg:justify-self-end">
              This log distinguishes recorded product artifacts from current work and future claims. Nothing is presented as earned before it is real.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 border-t border-line lg:mt-20">
          {founderLog.map((entry, index) => (
            <Reveal key={entry.stamp} delay={index * 0.05}>
              <article className="grid gap-5 border-b border-line py-8 sm:grid-cols-[11rem_1fr_auto] sm:items-start sm:gap-8 sm:py-10">
                <span className="mono text-[0.62rem] tracking-[0.12em] text-ink-faint">{entry.stamp}</span>
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-[-0.03em] text-ink sm:text-3xl">{entry.title}</h3>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-soft">{entry.copy}</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 border border-line-strong px-3 py-2 mono text-[0.56rem] tracking-[0.12em] text-ink">
                  <span className={`h-1.5 w-1.5 rounded-full ${entry.status === "Pending" ? "bg-ink-faint" : "bg-signal"}`} />
                  {entry.status.toUpperCase()}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
