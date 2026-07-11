import { projects } from "../data/portfolio";
import { Reveal } from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" data-tone="warm" className="grain section-pad border-b border-line bg-paper text-ink">
      <div className="site-container">
        <Reveal variant="clip">
          <div className="grid gap-7 border-t border-line pt-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <p className="meta text-ink-faint">01 / BREADTH OF WORK</p>
            <h2 className="opsz-display display-section text-ink lg:text-right">
              Six projects.<br />
              <span className="italic text-accent" style={{ fontWeight: 380 }}>
                Built between 15 and 17.
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px bg-line lg:mt-20 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05} variant="drift">
              <article className="group relative h-full cursor-pointer bg-paper-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-paper-3 hover:shadow-[0_12px_40px_-12px_rgba(23,19,15,0.18)] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="mono tabular-nums text-xs text-ink-faint">{project.index}</span>
                  <div className="flex items-center gap-3">
                    <span className="meta text-accent">{project.category}</span>
                    <span className="meta text-ink-faint">{project.year}</span>
                  </div>
                </div>

                <h3 className="opsz-display mt-6 font-display text-3xl font-medium tracking-[-0.03em] text-ink sm:text-4xl">
                  {project.name}
                </h3>

                <p className="mt-5 max-w-prose text-sm leading-relaxed text-ink-soft">
                  {project.description}
                </p>

                <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
                  <span className="meta text-ink-faint">{project.status}</span>
                  {project.id === "examcodes" && (
                    <a
                      href="https://examcodes.site"
                      target="_blank"
                      rel="noreferrer"
                      className="meta text-accent transition-colors hover:text-ink"
                    >
                      Visit site ↗
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
