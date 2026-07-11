import { useEffect, useState } from "react";

/**
 * Dark/Light mode toggle. When active, forces all sections into a single
 * global tone regardless of their data-tone attribute. Persists across the
 * current session. Defaults to ambient (section-driven) tone.
 */
export default function DarkModeToggle() {
  const [mode, setMode] = useState<"ambient" | "dark" | "light">("ambient");

  useEffect(() => {
    const stored = sessionStorage.getItem("aryan-theme") as
      | "ambient"
      | "dark"
      | "light"
      | null;
    if (stored) {
      setMode(stored);
      document.documentElement.setAttribute("data-force-theme", stored);
    }
  }, []);

  const toggle = (next: "ambient" | "dark" | "light") => {
    setMode(next);
    sessionStorage.setItem("aryan-theme", next);
    if (next === "ambient") {
      document.documentElement.removeAttribute("data-force-theme");
    } else {
      document.documentElement.setAttribute("data-force-theme", next);
    }
  };

  return (
    <div className="hidden min-h-10 items-center border border-line-strong sm:flex" role="group" aria-label="Theme selector">
      {(["ambient", "light", "dark"] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => toggle(m)}
          aria-pressed={mode === m}
          className={`min-h-10 min-w-10 border-r border-line-strong px-2.5 text-xs mono tracking-[0.1em] transition-colors last:border-r-0 ${
            mode === m
              ? "bg-ink text-paper"
              : "text-ink-faint hover:bg-paper-2 hover:text-ink"
          }`}
        >
          {m === "ambient" ? "◎" : m === "light" ? "◐" : "●"}
        </button>
      ))}
    </div>
  );
}
