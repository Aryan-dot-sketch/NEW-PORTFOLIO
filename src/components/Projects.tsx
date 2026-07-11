import { useEffect, useRef, useState } from "react";
import { projects } from "../data/portfolio";
import { Reveal } from "./Reveal";
import ProjectBook from "./ProjectBook";
import type { Project } from "../data/portfolio";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation across the project grid
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const total = projects.length;
      if (total === 0) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) => (i + 1) % total);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => (i - 1 + total) % total);
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (focusedIndex >= 0) {
          setSelectedProject(projects[focusedIndex]);
        }
      }
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedIndex]);

  return (
    <>
      <section
        id="projects"
        data-tone="warm"
        className="grain section-pad border-b border-line bg-paper text-ink"
      >
        <div className="site-container">
          <Reveal variant="clip">
            <div className="grid gap-7 border-t border-line pt-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <p className="meta text-ink-faint">01 / BREADTH OF WORK</p>
              <h2 className="opsz-display display-section text-ink lg:text-right">
                Six projects.
                <br />
                <span
                  className="italic text-accent"
                  style={{ fontWeight: 380 }}
                >
                  Built between 15 and 17.
                </span>
              </h2>
            </div>
          </Reveal>

          {/* Keyboard hint */}
          <p className="mt-6 text-right mono text-[0.58rem] tracking-[0.12em] text-ink-faint">
            ← → KEYBOARD NAV / ENTER TO OPEN BOOK
          </p>

          {/* Project grid */}
          <div
            ref={gridRef}
            className="relative mt-8 grid gap-px bg-line lg:mt-14 lg:grid-cols-2"
            role="listbox"
            aria-label="Projects"
          >
            {projects.map((project, index) => {
              const isFocused = focusedIndex === index;
              const isWarm = project.tone === "warm";

              return (
                <Reveal key={project.id} delay={index * 0.05} variant="drift">
                  <article
                    role="option"
                    aria-selected={selectedProject?.id === project.id}
                    onClick={() => setSelectedProject(project)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={`
                      group relative h-full cursor-pointer p-6 transition-all duration-300 sm:p-8
                      ${isWarm
                        ? "bg-paper-2 hover:bg-paper-3 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(23,19,15,0.18)]"
                        : "bg-[#0a0b0d] hover:bg-[#101216] hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]"
                      }
                      ${isFocused
                        ? isWarm ? "ring-1 ring-accent/40" : "ring-1 ring-white/20"
                        : ""
                      }
                    `}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                  >
                    {/* Accent line */}
                    <div
                      className={`absolute left-0 top-0 h-full w-0.5 transition-opacity duration-300 ${
                        isWarm
                          ? "bg-accent/40 group-hover:bg-accent/70"
                          : "bg-[#d9e0e9]/40 group-hover:bg-[#d9e0e9]/70"
                      } ${isFocused ? "opacity-100" : "opacity-60"}`}
                      aria-hidden
                    />

                    <div className="flex items-start justify-between gap-4">
                      <span className="mono tabular-nums text-xs text-ink-faint">
                        {project.index}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className={`meta ${isWarm ? "text-accent" : "text-[#d9e0e9]/70"}`}>
                          {project.category}
                        </span>
                        <span className="meta text-ink-faint">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <h3
                      className={`opsz-display mt-6 font-display text-3xl font-medium tracking-[-0.03em] sm:text-4xl ${
                        isWarm ? "text-ink" : "text-[#f2f4f7]"
                      }`}
                    >
                      {project.name}
                    </h3>

                    <p
                      className={`mt-5 max-w-prose text-sm leading-relaxed sm:text-base ${
                        isWarm ? "text-ink-soft" : "text-[#a1a8b4]"
                      }`}
                    >
                      {project.description}
                    </p>

                    <div className="mt-8 flex items-center justify-between border-t border-line-strong pt-5">
                      <span
                        className={`mono text-[0.62rem] tracking-[0.12em] ${
                          project.status === "Live"
                            ? "text-signal"
                            : project.status === "Written"
                            ? "text-accent"
                            : "text-ink-faint"
                        }`}
                      >
                        {project.status.toUpperCase()}
                      </span>
                      <span
                        className={`mono text-[0.62rem] tracking-[0.12em] transition-colors ${
                          isWarm
                            ? "text-ink-faint group-hover:text-accent"
                            : "text-[#d9e0e9]/50 group-hover:text-[#d9e0e9]"
                        }`}
                      >
                        OPEN CHAPTER →
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project book viewer */}
      <ProjectBook
        open={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        allProjects={projects}
        onNavigate={(p) => setSelectedProject(p)}
      />
    </>
  );
}
