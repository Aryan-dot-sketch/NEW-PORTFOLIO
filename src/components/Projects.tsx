import { useEffect, useRef, useState } from "react";
import { projects } from "../data/portfolio";
import { Reveal } from "./Reveal";
import ProjectPanel from "./ProjectPanel";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
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
          setActiveProject(projects[focusedIndex].id);
        }
      }
      if (e.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedIndex]);

  const activeData = projects.find((p) => p.id === activeProject);

  return (
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
          ← → KEYBOARD NAV
        </p>

        <div
          ref={gridRef}
          className="relative mt-8 grid gap-px bg-line lg:mt-14 lg:grid-cols-2"
          role="listbox"
          aria-label="Projects"
        >
          {projects.map((project, index) => {
            const isExpanded = activeProject === project.id;
            const isFocused = focusedIndex === index;

            return (
              <div key={project.id} role="option" aria-selected={isExpanded}>
                <Reveal delay={index * 0.05} variant="drift">
                  <article
                    data-tone={project.tone}
                    onClick={() =>
                      setActiveProject(isExpanded ? null : project.id)
                    }
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={`group relative h-full cursor-pointer p-6 transition-all duration-300 sm:p-8 ${
                      project.tone === "cold"
                        ? "bg-[#0a0b0d] text-[#f2f4f7] hover:bg-[#101216]"
                        : "bg-paper-2 hover:bg-paper-3"
                    } hover:-translate-y-1 ${
                      project.tone === "cold"
                        ? "hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]"
                        : "hover:shadow-[0_12px_40px_-12px_rgba(23,19,15,0.18)]"
                    } ${
                      isFocused
                        ? project.tone === "cold"
                          ? "ring-1 ring-white/20"
                          : "ring-1 ring-accent/30"
                        : ""
                    }`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveProject(isExpanded ? null : project.id);
                      }
                    }}
                  >
                    {/* Accent line on left */}
                    <div
                      className={`absolute left-0 top-0 h-full w-0.5 transition-opacity duration-300 ${
                        project.tone === "cold"
                          ? "bg-[#d9e0e9]/40 group-hover:bg-[#d9e0e9]/70"
                          : "bg-accent/40 group-hover:bg-accent/70"
                      } ${isFocused ? "opacity-100" : "opacity-60"}`}
                      aria-hidden
                    />

                    <div className="flex items-start justify-between gap-4">
                      <span className="mono tabular-nums text-xs text-ink-faint">
                        {project.index}
                      </span>
                      <div className="flex items-center gap-3">
                        <span
                          className={`meta ${
                            project.tone === "cold"
                              ? "text-[#d9e0e9]/70"
                              : "text-accent"
                          }`}
                        >
                          {project.category}
                        </span>
                        <span className="meta text-ink-faint">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <h3
                      className={`opsz-display mt-6 font-display text-3xl font-medium tracking-[-0.03em] sm:text-4xl ${
                        project.tone === "cold"
                          ? "text-[#f2f4f7]"
                          : "text-ink"
                      }`}
                    >
                      {project.name}
                    </h3>

                    <p
                      className={`mt-5 max-w-prose text-sm leading-relaxed sm:text-base ${
                        project.tone === "cold"
                          ? "text-[#a1a8b4]"
                          : "text-ink-soft"
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
                          project.tone === "cold"
                            ? "text-[#d9e0e9]/50 group-hover:text-[#d9e0e9]"
                            : "text-ink-faint group-hover:text-accent"
                        }`}
                      >
                        {isExpanded ? "CLOSE ↑" : "EXPAND ↓"}
                      </span>
                    </div>
                  </article>
                </Reveal>

                {/* Expandable panel */}
                {isExpanded && (
                  <ProjectPanel
                    project={project}
                    onClose={() => setActiveProject(null)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
