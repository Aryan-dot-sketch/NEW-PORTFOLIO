import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Project } from "../data/portfolio";

interface ProjectPanelProps {
  project: Project;
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
      "Kronos began as a frustration: every voice assistant on the market was cloud-dependent and impersonal. I wanted something that ran locally, sounded like me, and actually did things — not just answered questions. Six months of iteration resulted in a macOS app that plays music, opens terminals, reads files, sorts desktops, browses the web, and logs into sites. All by voice.",
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
      "Atmadarshan was born from a question: what if an AI could carry your voice — not just your words, but your cadence, your pauses, your particular way of seeing the world? 'Atmadarshan' means seeing the self. The system mirrors speaking style, emotional texture, and presence. It taught me more about what it means to sound like a person than any book on writing ever could.",
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
      "ExamCodes came from a real problem: students needed reliable access to quality study resources, but every existing option was either paywalled behind opaque systems or flooded with unverified content. I built a marketplace with a verified delivery protocol — every transaction gets a digital receipt showing item, status, and delivery outcome. The interface is clean, direct, and honest about what you're getting.",
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
      "The Telegram bot is ExamCodes' nervous system. Payments, purchases, resource delivery, group chats, support, and admin overrides — all running through one interface. The hardest part wasn't building it; it was designing the error states. What happens when a payment fails? When a resource isn't found? When a student needs a refund? Every edge case became a feature that built trust.",
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
      "The phone bot was a middleware experiment — can you build a system that sits between buyers and services without either side knowing the other's infrastructure? The answer was yes, and it required thinking carefully about trust, escrow, and what information each party actually needs. The lessons from this project directly shaped how ExamCodesBot was designed.",
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
      "The novel was written in the gaps between building systems. It started as a question: can a story hold time fiction, a time loop, murder, love, adventure, betrayal, and paranormal activity — all at once, without any of them feeling forced? The answer is yes, but only if the genres serve the same emotional core. This book taught me that constraints don't limit creativity; they focus it. The engineer and the author fed each other.",
  },
};

export default function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  const details = techDetails[project.id] ?? {
    tech: [],
    highlights: [],
    story: "More details coming soon.",
  };

  return (
    <AnimatePresence>
      <motion.div
        layoutId={`panel-${project.id}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-full border border-line-strong bg-paper-2 p-6 sm:p-8 lg:p-10"
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="meta text-ink-faint">{project.category} / {project.year}</span>
            <h4 className="mt-2 font-display text-2xl font-medium tracking-[-0.03em] text-ink sm:text-3xl">
              {project.name}
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-line-strong text-ink-faint transition-colors hover:border-ink hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Story */}
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {details.story}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Tech stack */}
          <div>
            <p className="meta text-ink-faint">TECH STACK</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {details.tech.map((t) => (
                <li key={t}>
                  <span className="inline-flex min-h-8 items-center border border-line px-3 mono text-[0.6rem] tracking-[0.1em] text-ink">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          <div>
            <p className="meta text-ink-faint">KEY HIGHLIGHTS</p>
            <ul className="mt-4 space-y-2">
              {details.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-ink-soft">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 border-t border-line pt-6">
          <span className="meta text-ink-faint">STATUS / </span>
          <span
            className={`mono text-[0.62rem] tracking-[0.12em] ${
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
              className="ml-4 mono text-[0.62rem] tracking-[0.12em] text-accent hover:text-ink"
            >
              VISIT SITE ↗
            </a>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
