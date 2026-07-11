import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * An editorial pull-quote. Reserved for the handful of moments per
 * page that deserve to stop the reader — always set in italic
 * Fraunces with the optical/soft/wonk axes engaged.
 */
export function Quote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center" y={16}>
      <figure>
        <div className="mx-auto mb-7 h-px w-12 bg-line-strong" aria-hidden />
        <blockquote
          className="opsz-display font-display italic leading-[1.22] tracking-[-0.02em] text-ink"
          style={{ fontWeight: 380, fontSize: "clamp(1.6rem, 3.6vw, 2.75rem)" }}
        >
          {children}
        </blockquote>
        {cite && <figcaption className="meta mt-7 text-ink-faint">{cite}</figcaption>}
        <div className="mx-auto mt-7 h-px w-12 bg-line-strong" aria-hidden />
      </figure>
    </Reveal>
  );
}
