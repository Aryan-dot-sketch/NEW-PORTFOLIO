import { useEffect, useState } from "react";
import { chapters } from "../data/portfolio";

/**
 * Tracks which chapter of the page is currently in view.
 * This single source of truth drives two things independently:
 *  - the fixed nav, which crossfades between Aryan's warm chrome
 *    and ExamCodes' dark chrome
 *  - the right-edge chapter rail, which highlights progress
 */
export function useActiveSection() {
  const [activeId, setActiveId] = useState<string>(chapters[0].id);

  useEffect(() => {
    const elements = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeIndex = Math.max(
    0,
    chapters.findIndex((chapter) => chapter.id === activeId),
  );
  const active = chapters[activeIndex];

  return { activeId, activeIndex, tone: active.tone, chapters };
}
