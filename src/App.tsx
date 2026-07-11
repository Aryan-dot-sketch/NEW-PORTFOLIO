import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import Architecture from "./components/Architecture";
import Archive from "./components/Archive";
import Arsenal from "./components/Arsenal";
import Book from "./components/Book";
import CaseStudy from "./components/CaseStudy";
import ChapterRail from "./components/ChapterRail";
import CommandPalette from "./components/CommandPalette";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import DecisionLog from "./components/DecisionLog";
import Evolution from "./components/Evolution";
import Footer from "./components/Footer";
import FounderLog from "./components/FounderLog";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import SeamTransition from "./components/SeamTransition";

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const completeLoader = useCallback(() => {
    setHeroReady(true);
    setShowLoader(false);
  }, []);

  const openCommand = useCallback(() => setCommandOpen(true), []);
  const closeCommand = useCallback(() => setCommandOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = showLoader || commandOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [commandOpen, showLoader]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if (((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") || (event.key === "/" && !typing)) {
        event.preventDefault();
        setCommandOpen((current) => !current);
      }
      if (event.key === "Escape") setCommandOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
    });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchor = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.35 });
    };

    document.addEventListener("click", onAnchor);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[250] focus:bg-ink focus:px-4 focus:py-3 focus:mono focus:text-xs focus:text-paper">
        Skip to content
      </a>

      <AnimatePresence>{showLoader && <Loader onComplete={completeLoader} />}</AnimatePresence>
      <CommandPalette open={commandOpen} onClose={closeCommand} />
      <ScrollProgress />

      <div className="site-shell">
        <Cursor />
        <Nav onOpenCommand={openCommand} />
        <ChapterRail />

        {/*
          The narrative arc: Aryan (warm) -> ExamCodes' product world
          (cold) -> Aryan again (warm). Each section owns its tone;
          the two SeamTransitions are the only places colour actually
          blends, everywhere else the cut is a clean hand-off.
        */}
        <main id="main">
          <Hero start={heroReady} />
          <Projects />
          <SeamTransition direction="toDark" />
          <CaseStudy />
          <Architecture />
          <Evolution />
          <SeamTransition direction="toLight" />
          <Book />
          <Arsenal />
          <DecisionLog />
          <FounderLog />
          <Archive />
          <Contact onOpenCommand={openCommand} />
        </main>

        <Footer onOpenCommand={openCommand} />
      </div>
    </>
  );
}
