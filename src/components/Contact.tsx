import { profile } from "../data/portfolio";
import { Reveal } from "./Reveal";

export default function Contact({ onOpenCommand }: { onOpenCommand: () => void }) {
  return (
    <section id="contact" data-tone="warm" className="grain section-pad overflow-hidden bg-paper text-ink">
      <div className="site-container">
        {/* Meta caption + massive tri-line closing statement.
            Two upright lines, one italic accent — the same visual grammar
            as the hero, tuned as a resolving mirror at the end. */}
        <Reveal variant="clip">
          <div className="border-t border-line pt-6">
            <p className="meta text-ink-faint">08 / CONTINUE THE STORY</p>
            <h2
              className="opsz-display display-section mt-10 text-ink"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1' }}
            >
              <span className="block">An author.</span>
              <span className="block">An engineer.</span>
              <span
                className="block italic text-accent"
                style={{ fontWeight: 400, fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1' }}
              >
                Still starting.
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Prose + three-button action row.
            The buttons follow the hierarchy set up across the site:
            primary (solid ink), external (outline + ↗), tertiary (outline).
            All three sit on the same row on desktop, stack on mobile. */}
        <Reveal className="mt-14 grid gap-8 border-y border-line py-8 lg:grid-cols-[1fr_auto] lg:items-end" delay={0.05}>
          <div>
            <p className="prose-warm text-base text-ink-soft sm:text-lg">
              This archive will change as I do. A novel, voice AI, Telegram
              systems and a live marketplace are only the works so far —
              writing, engineering and security all pulling in the same
              direction, with more to come.
            </p>
            <p className="mt-5 meta text-ink-faint">BUILDING SINCE 15 / BUILDING FORWARD</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#projects"
              className="flex min-h-14 items-center justify-center bg-ink px-6 mono text-[0.65rem] tracking-[0.14em] text-paper transition-opacity hover:opacity-75"
            >
              REVISIT THE WORKS
            </a>
            <a
              href={profile.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-14 items-center justify-center border border-line-strong px-6 mono text-[0.65rem] tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              EXAMCODES.SITE ↗
            </a>
            <button
              type="button"
              onClick={onOpenCommand}
              className="flex min-h-14 items-center justify-center border border-line-strong px-6 mono text-[0.65rem] tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              OPEN COMMAND
            </button>
          </div>
        </Reveal>

        {/* Decorative signature stroke — hand-drawn, warm, right-aligned */}
        <div className="pointer-events-none mt-16 select-none overflow-hidden opacity-[0.15]" aria-hidden>
          <svg viewBox="0 0 600 90" className="mx-auto w-full max-w-3xl">
            <path
              d="M10 70 C 60 10, 110 10, 100 55 C 95 82, 140 40, 170 45 C 210 50, 200 78, 240 65 C 280 52, 275 20, 320 30 C 370 40, 360 78, 420 62 C 470 48, 465 15, 520 25 C 560 32, 570 55, 590 45"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
