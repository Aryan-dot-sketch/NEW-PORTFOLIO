import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { navigation, profile } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import BrandMark from "./BrandMark";

export default function Nav({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const { tone } = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus(), 40);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key === "Tab" && menuRef.current) {
        const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      {/*
        The header carries its own data-tone, independent of the section
        scrolled behind it, driven by the scroll-spy. This crossfades the
        chrome between Aryan's cream world and ExamCodes' dark world —
        the header itself narrates where the reader currently is.
      */}
      <header
        data-tone={tone}
        className={`fixed inset-x-0 top-0 z-50 text-ink transition-colors duration-500 ${
          scrolled ? "border-b border-line bg-paper/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="site-container flex h-[72px] items-center justify-between">
          <a href="#top" aria-label="Aryan, home" className="text-ink">
            <BrandMark />
          </a>

          <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="link-line mono text-[0.63rem] tracking-[0.14em] text-ink-soft transition-colors hover:text-ink">
                {item.label.toUpperCase()}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCommand}
              className="hidden min-h-10 items-center gap-3 border border-line-strong px-3 text-ink transition-colors hover:bg-ink hover:text-paper sm:flex"
              aria-label="Open command palette"
            >
              <span className="mono text-[0.62rem] tracking-[0.14em]">COMMAND</span>
              <kbd className="mono text-[0.58rem] text-ink-faint">⌘K</kbd>
            </button>
            <a
              href="#projects"
              className="hidden min-h-10 items-center bg-ink px-4 mono text-[0.62rem] tracking-[0.14em] text-paper transition-opacity hover:opacity-75 md:flex"
            >
              SEE THE WORKS
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="flex h-10 w-10 items-center justify-center border border-line-strong xl:hidden"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              <span className="relative h-4 w-5">
                <span className={`absolute left-0 top-1 h-px w-5 bg-ink transition-transform ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`absolute bottom-1 left-0 h-px w-5 bg-ink transition-transform ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            data-tone="warm"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-40 flex flex-col bg-paper px-5 pb-8 pt-24 text-ink xl:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="border-t border-line" aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="grid grid-cols-[3rem_1fr] items-center border-b border-line py-5"
                >
                  <span className="mono tabular-nums text-[0.62rem] text-ink-faint">0{index + 1}</span>
                  <span className="opsz-display font-display text-3xl tracking-[-0.03em] text-ink">{item.label}</span>
                </a>
              ))}
            </nav>
            <div className="mt-auto grid gap-3">
              <button type="button" onClick={() => { setMenuOpen(false); onOpenCommand(); }} className="min-h-12 border border-line-strong mono text-[0.65rem] tracking-[0.14em] text-ink">
                OPEN COMMAND PALETTE
              </button>
              <a href={profile.companyUrl} target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-center bg-ink mono text-[0.65rem] tracking-[0.14em] text-paper">
                OPEN EXAMCODES.SITE ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
