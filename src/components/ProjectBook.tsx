import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "../data/portfolio";

interface ProjectBookProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  allProjects: Project[];
  onNavigate: (project: Project) => void;
}

const techDetails: Record<string, { tech: string[]; highlights: string[]; story: string }> = {
  kronos: {
    tech: ["Swift", "Python", "AVFoundation", "Wake-word detection", "macOS system APIs"],
    highlights: [
      "Full system-level voice control on macOS",
      "Natural language wake word: 'Hey Kronos'",
      "Terminal command execution by voice",
      "Desktop file organization by voice",
      "Web browsing and site login by voice",
    ],
    story:
      "Kronos began as a frustration: every voice assistant on the market was cloud-dependent and impersonal. I wanted something that ran locally, sounded like me, and actually did things. Six months of iteration resulted in a macOS app that plays music, opens terminals, reads files, sorts desktops, browses the web, and logs into sites. All by voice.",
  },
  atmadarshan: {
    tech: ["Python", "LLM APIs", "Voice synthesis", "NLP pipelines", "Audio processing"],
    highlights: [
      "Digital twin of the creator's voice and speaking style",
      "'Atmadarshan' means 'seeing the self' in Sanskrit",
      "Trained on personal speech patterns and tone",
      "Context-aware responses that feel authentically personal",
      "Proved what it means for an AI to truly sound like a person",
    ],
    story:
      "Atmadarshan was born from a question: what if an AI could carry your voice — not just your words, but your cadence, your pauses, your particular way of seeing the world? The system mirrors speaking style, emotional texture, and presence.",
  },
  examcodes: {
    tech: ["HTML", "CSS", "JavaScript", "Telegram API", "Payment gateway", "Python backend"],
    highlights: [
      "Digital marketplace for JEE, NEET & CBSE resources",
      "Verified delivery system with digital receipts",
      "Direct discovery interface — no clutter",
      "Secure access protocol with explicit state",
      "Operational 24/7 with automated support",
    ],
    story:
      "ExamCodes came from a real problem: students needed reliable access to quality study resources, but every existing option was either paywalled behind opaque systems or flooded with unverified content. I built a marketplace with a verified delivery protocol.",
  },
  examcodesbot: {
    tech: ["Python", "Telegram Bot API", "Payment processing", "SQLite", "Admin panels"],
    highlights: [
      "Handles payments, purchases, and organization end-to-end",
      "24/7 automated customer support",
      "Instant admin access for exceptions and refunds",
      "Group chat management built in",
      "The operational backbone of ExamCodes",
    ],
    story:
      "The Telegram bot is ExamCodes' nervous system. Payments, purchases, resource delivery, group chats, support, and admin overrides — all running through one interface.",
  },
  phonebot: {
    tech: ["Python", "Telegram API", "Virtual number providers", "Routing systems", "Middleware architecture"],
    highlights: [
      "Middleware selling virtual phone numbers on Telegram",
      "Handles routing and delivery without exposing infrastructure",
      "Automated transaction processing",
      "Escrow-style payment flow",
      "Built before turning 17",
    ],
    story:
      "The phone bot was a middleware experiment — can you build a system that sits between buyers and services without either side knowing the other's infrastructure?",
  },
  novel: {
    tech: ["Fiction writing", "Narrative design", "Multi-genre structure", "Character architecture", "Editorial craft"],
    highlights: [
      "Seven genres in one continuous narrative",
      "Time loop mechanics as emotional architecture",
      "Murder mystery driving plot tension",
      "Love story threading through betrayal",
      "Paranormal elements that comment on memory",
    ],
    story:
      "The novel was written in the gaps between building systems. It started as a question: can a story hold time fiction, a time loop, murder, love, adventure, betrayal, and paranormal activity — all at once?",
  },
};

function BookPage({
  project,
  details,
  onClose,
  pageNum,
  total,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  project: Project;
  details: { tech: string[]; highlights: string[]; story: string };
  onClose: () => void;
  pageNum: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const reduce = useReducedMotion();
  const isWarm = project.tone === "warm";

  return (
    <motion.div
      data-tone={project.tone}
      className={`relative flex min-h-screen w-full shrink-0 flex-col ${isWarm ? "grain bg-paper text-ink" : "bg-[#050505] text-[#f2f4f7]"}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: -30 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, rotateY: 30 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Page header */}
      <div className={`flex items-center justify-between border-b px-8 py-5 lg:px-16 ${isWarm ? "border-line" : "border-white/10"}`}>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className={`flex h-10 w-10 items-center justify-center border transition-colors ${isWarm ? "border-line-strong text-ink-faint hover:border-ink hover:text-ink" : "border-white/20 text-white/50 hover:border-white/60 hover:text-white"}`}
            aria-label="Close book"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <span className={`mono text-[0.6rem] tracking-[0.16em] ${isWarm ? "text-ink-faint" : "text-white/50"}`}>
            {String(pageNum).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex h-10 w-10 items-center justify-center border transition-all ${!hasPrev ? "opacity-30 cursor-not-allowed" : isWarm ? "border-line-strong text-ink-faint hover:border-ink hover:text-ink" : "border-white/20 text-white/50 hover:border-white/60 hover:text-white"}`}
            aria-label="Previous project"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex h-10 w-10 items-center justify-center border transition-all ${!hasNext ? "opacity-30 cursor-not-allowed" : isWarm ? "border-line-strong text-ink-faint hover:border-ink hover:text-ink" : "border-white/20 text-white/50 hover:border-white/60 hover:text-white"}`}
            aria-label="Next project"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Book content — two columns */}
      <div className={`flex flex-1 flex-col lg:flex-row ${isWarm ? "" : ""}`}>
        {/* Left page — project info */}
        <div className={`flex flex-1 flex-col justify-between p-8 lg:p-16 lg:w-1/2 ${isWarm ? "" : "border-r border-white/10"}`}>
          <div>
            <div className="flex items-center gap-4">
              <span className={`mono text-[0.65rem] tracking-[0.2em] ${isWarm ? "text-accent" : "text-[#d9e0e9]"}`}>
                {project.category}
              </span>
              <span className={`h-px w-8 ${isWarm ? "bg-line-strong" : "bg-white/20"}`} />
              <span className={`mono text-[0.6rem] tracking-[0.14em] ${isWarm ? "text-ink-faint" : "text-white/40"}`}>
                {project.year}
              </span>
            </div>

            <h2
              className={`mt-8 font-display text-5xl font-medium tracking-[-0.04em] lg:text-7xl ${isWarm ? "text-ink" : "text-[#f2f4f7]"}`}
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1' }}
            >
              {project.name}
            </h2>

            {/* Story */}
            <p className={`mt-8 max-w-xl font-display text-xl leading-relaxed tracking-[-0.01em] lg:text-2xl ${isWarm ? "text-ink-soft" : "text-white/70"}`}>
              {details.story}
            </p>

            {/* Status */}
            <div className="mt-10 flex items-center gap-4">
              <span className={`mono text-[0.62rem] tracking-[0.14em] ${project.status === "Live" ? "text-signal" : project.status === "Written" ? "text-accent" : isWarm ? "text-ink-faint" : "text-white/40"}`}>
                {project.status.toUpperCase()}
              </span>
              {project.id === "examcodes" && (
                <a
                  href="https://examcodes.site"
                  target="_blank"
                  rel="noreferrer"
                  className={`mono text-[0.62rem] tracking-[0.14em] ${isWarm ? "text-accent hover:text-ink" : "text-[#d9e0e9] hover:text-white"}`}
                >
                  VISIT SITE ↗
                </a>
              )}
            </div>
          </div>

          {/* Tech stack */}
          <div className="mt-12">
            <p className={`mono text-[0.6rem] tracking-[0.2em] ${isWarm ? "text-ink-faint" : "text-white/40"}`}>
              TECH STACK
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {details.tech.map((t) => (
                <span
                  key={t}
                  className={`inline-flex min-h-8 items-center border px-3 mono text-[0.6rem] tracking-[0.1em] ${isWarm ? "border-line-strong text-ink" : "border-white/20 text-white/60"}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right page — highlights */}
        <div className={`flex flex-1 flex-col justify-between p-8 lg:p-16 lg:w-1/2 ${isWarm ? "" : ""}`}>
          <div>
            <p className={`mono text-[0.6rem] tracking-[0.2em] ${isWarm ? "text-ink-faint" : "text-white/40"}`}>
              KEY HIGHLIGHTS
            </p>

            <ul className="mt-8 space-y-5">
              {details.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={reduce ? undefined : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-start gap-4 font-display text-lg tracking-[-0.01em] ${isWarm ? "text-ink-soft" : "text-white/70"}`}
                >
                  <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${isWarm ? "bg-accent" : "bg-[#d9e0e9]"}`} aria-hidden />
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Chapter indicator */}
          <div className={`mt-12 border-t pt-6 ${isWarm ? "border-line" : "border-white/10"}`}>
            <div className="flex items-center justify-between">
              <p className={`mono text-[0.6rem] tracking-[0.14em] ${isWarm ? "text-ink-faint" : "text-white/40"}`}>
                EXAMCODES.SITE — PERSONAL FOUNDER ARCHIVE
              </p>
              <p className={`font-display text-4xl font-medium tracking-[-0.04em] ${isWarm ? "text-ink-faint" : "text-white/20"}`} style={{ fontVariationSettings: '"opsz" 144' }}>
                {String(pageNum).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Full-screen horizontal book viewer for project details.
 * Opens like turning a page in a physical book.
 * Navigate between projects like flipping chapters.
 */
export default function ProjectBook({
  open,
  project,
  onClose,
  allProjects,
  onNavigate,
}: ProjectBookProps) {
  const currentIndex = project
    ? allProjects.findIndex((p) => p.id === project.id)
    : -1;

  const details = project
    ? (techDetails[project.id] ?? { tech: [], highlights: [], story: "" })
    : { tech: [], highlights: [], story: "" };

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Keyboard navigation
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(allProjects[currentIndex - 1]);
    }
  }, [currentIndex, allProjects, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < allProjects.length - 1) {
      onNavigate(allProjects[currentIndex + 1]);
    }
  }, [currentIndex, allProjects, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden bg-[#050505]"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Scrollable horizontal pages */}
          <motion.div
            className="flex h-full"
            animate={{ x: `calc(-${currentIndex * 100}vw)` }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            {allProjects.map((p) => {
              const d = techDetails[p.id] ?? { tech: [], highlights: [], story: "" };
              return (
                <BookPage
                  key={p.id}
                  project={p}
                  details={d}
                  onClose={onClose}
                  pageNum={allProjects.findIndex((x) => x.id === p.id) + 1}
                  total={allProjects.length}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  hasPrev={allProjects.findIndex((x) => x.id === p.id) > 0}
                  hasNext={allProjects.findIndex((x) => x.id === p.id) < allProjects.length - 1}
                />
              );
            })}
          </motion.div>

          {/* Progress dots */}
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {allProjects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => onNavigate(p)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? p.tone === "warm" ? "bg-accent w-8" : "bg-[#d9e0e9] w-8"
                    : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to ${p.name}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
