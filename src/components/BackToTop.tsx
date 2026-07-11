import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Smart Back-to-Top button.
 * Auto-appears after the user scrolls past the hero.
 * Keyboard: press Home key or ↑ when at top of page.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Home" || (e.key === "ArrowUp" && window.scrollY < 200)) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center border border-line-strong bg-paper text-ink shadow-lg transition-colors hover:bg-ink hover:text-paper sm:bottom-8 sm:left-8"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
