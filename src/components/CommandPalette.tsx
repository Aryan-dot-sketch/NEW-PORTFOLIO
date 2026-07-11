import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { commands, profile } from "../data/portfolio";

type Command = (typeof commands)[number];

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const execute = (command: Command) => {
    if (command.type === "external") {
      window.open(profile.companyUrl, "_blank", "noopener,noreferrer");
    } else {
      document.querySelector(command.hint)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(focusTimer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % Math.max(filtered.length, 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
      }
      if (event.key === "Enter" && filtered[activeIndex]) {
        event.preventDefault();
        execute(filtered[activeIndex]);
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('input, button, [href]'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, filtered, onClose, open]);

  useEffect(() => setActiveIndex(0), [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-tone="warm"
          className="fixed inset-0 z-[150] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-2xl border border-line-strong bg-paper text-ink shadow-[0_30px_100px_rgba(0,0,0,.35)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 border-b border-line px-4 sm:px-5">
              <span className="mono text-sm text-ink-faint">&gt;_</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Jump to a chapter..."
                className="min-h-16 flex-1 bg-transparent mono text-sm text-ink outline-none placeholder:text-ink-faint"
                aria-controls="command-list"
                aria-activedescendant={filtered[activeIndex] ? `command-${filtered[activeIndex].id}` : undefined}
              />
              <kbd className="border border-line-strong px-2 py-1 mono text-[0.58rem] text-ink-faint">ESC</kbd>
            </div>

            <div id="command-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length ? (
                filtered.map((command, index) => (
                  <button
                    key={command.id}
                    id={`command-${command.id}`}
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => execute(command)}
                    className={`grid min-h-12 w-full grid-cols-[1fr_auto] items-center gap-4 px-3 text-left transition-colors ${index === activeIndex ? "bg-ink text-paper" : "text-ink hover:bg-paper-2"}`}
                  >
                    <span className="text-sm">{command.label}</span>
                    <span className={`mono text-[0.58rem] tabular-nums tracking-[0.1em] ${index === activeIndex ? "text-paper/55" : "text-ink-faint"}`}>
                      {command.hint}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-10 text-center mono text-xs tracking-[0.12em] text-ink-faint">NO MATCHING COMMAND</p>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-line px-5 py-3 mono text-[0.56rem] tracking-[0.1em] text-ink-faint">
              <span>↑↓ NAVIGATE / ↵ SELECT</span>
              <span>ARYAN ARCHIVE / 017</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
