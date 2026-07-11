import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Project } from "../data/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
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
      "Atmadarshan was born from a question: what if an AI could carry your voice — not just your words, but your cadence, your pauses, your particular way of seeing the world? The system mirrors speaking style, emotional texture, and presence. It taught me more about what it means to sound like a person than any book on writing ever could.",
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
      "ExamCodes came from a real problem: students needed reliable access to quality study resources, but every existing option was either paywalled behind opaque systems or flooded with unverified content. I built a marketplace with a verified delivery protocol — every transaction gets a digital receipt showing item, status, and delivery outcome.",
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
      "The Telegram bot is ExamCodes' nervous system. Payments, purchases, resource delivery, group chats, support, and admin overrides — all running through one interface. The hardest part wasn't building it; it was designing the error states. What happens when a payment fails? When a resource isn't found? Every edge case became a feature that built trust.",
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
      "The phone bot was a middleware experiment — can you build a system that sits between buyers and services without either side knowing the other's infrastructure? The answer was yes, and it required thinking carefully about trust, escrow, and what information each party actually needs.",
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
      "The novel was written in the gaps between building systems. It started as a question: can a story hold time fiction, a time loop, murder, love, adventure, betrayal, and paranormal activity — all at once, without any of them feeling forced? The answer is yes, but only if the genres serve the same emotional core. The engineer and the author fed each other.",
  },
};

/**
 * Full-screen modal overlay for project details.
 * Opens on project click, closes on backdrop click or Escape.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const details = project ? (techDetails[project.id] ?? { tech: [], highlights: [], story: "More details coming soon." }) : null;

  // Lock scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && details && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[160] bg-[#17130f]/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            aria-hidden
          />

          {/* Modal panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} details`}
            className="fixed inset-4 z-[170] overflow-y-auto rounded-sm border border-line-strong bg-paper sm:inset-8 lg:inset-12"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="sticky top-0 float-right m-4 flex h-10 w-10 items-center justify-center border border-line-strong text-ink-faint transition-colors hover:border-ink hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="grain p-8 sm:p-12 lg:p-16">
              {/* Header */}
              <div className="pr-14">
                <span className="mono text-[0.65rem] tracking-[0.16em] text-accent">
                  {project.category}
                </span>
                <h2
                  className="opsz-display mt-3 font-display text-5xl font-medium tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1' }}
                >
                  {project.name}
                </h2>
                <div className="mt-4 flex items-center gap-4">
                  <span className="mono text-[0.6rem] tracking-[0.14em] text-ink-faint">{project.year}</span>
                  <span className="h-px w-8 bg-line-strong" />
                  <span
                    className={`mono text-[0.6rem] tracking-[0.14em] ${
                      project.status === "Live"
                        ? "text-signal"
                        : project.status === "Shipped"
                        ? "text-ink-soft"
                        : "text-accent"
                    }`}
                  >
                    {project.status.toUpperCase()}
                  </span>
                  {project.id === "examcodes" && (
                    <a
                      href="https://examcodes.site"
                      target="_blank"
                      rel="noreferrer"
                      className="mono text-[0.6rem] tracking-[0.14em] text-accent hover:text-ink"
                    >
                      VISIT SITE ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Story */}
              <p className="mt-10 max-w-3xl font-display text-xl leading-relaxed tracking-[-0.02em] text-ink-soft sm:text-2xl">
                {details.story}
              </p>

              {/* Divider */}
              <div className="mt-12 h-px w-full bg-line" />

              {/* Two-column: tech + highlights */}
              <div className="mt-12 grid gap-12 lg:grid-cols-2">
                {/* Tech */}
                <div>
                  <p className="mono text-[0.6rem] tracking-[0.2em] text-ink-faint">TECH STACK</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {details.tech.map((t) => (
                      <li key={t}>
                        <span className="inline-flex min-h-8 items-center border border-line-strong px-3 mono text-[0.6rem] tracking-[0.1em] text-ink">
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                <div>
                  <p className="mono text-[0.6rem] tracking-[0.2em] text-ink-faint">KEY HIGHLIGHTS</p>
                  <ul className="mt-5 space-y-3">
                    {details.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 font-display text-lg tracking-[-0.01em] text-ink-soft">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
