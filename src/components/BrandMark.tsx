import { profile } from "../data/portfolio";

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3" aria-label={`${profile.name}, founder of ${profile.company}`}>
      <svg
        viewBox="0 0 42 28"
        className="h-6 w-9 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
        aria-hidden
      >
        <path d="M3 3l11 11L3 25" />
        <path d="M18 25h20" />
      </svg>
      {!compact && (
        <span className="flex items-baseline gap-2">
          <span className="font-display text-[0.95rem] font-medium tracking-[0.08em] text-ink">ARYAN</span>
          <span className="mono hidden text-[0.62rem] tracking-[0.16em] text-ink-faint sm:inline">/ BUILDER</span>
        </span>
      )}
    </span>
  );
}