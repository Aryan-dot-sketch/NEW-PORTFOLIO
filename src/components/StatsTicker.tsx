import { useEffect, useState } from "react";

interface TickerItem {
  value: string;
  label: string;
}

/** Compute stats from birthdate March 6, 2009 */
function computeStats(): TickerItem[] {
  const birth = new Date("2009-03-06T00:00:00");
  const now = new Date();

  // Age in years
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;

  // Days alive
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysAlive = Math.floor((now.getTime() - birth.getTime()) / msPerDay);

  // Countdown to next birthday
  const thisYear = now.getFullYear();
  let nextBirthday = new Date(`${thisYear + 1}-03-06T00:00:00`);
  if (new Date(`${thisYear}-03-06T00:00:00`) > now) {
    nextBirthday = new Date(`${thisYear}-03-06T00:00:00`);
  }
  const daysToBirthday = Math.max(
    0,
    Math.ceil((nextBirthday.getTime() - now.getTime()) / msPerDay)
  );

  return [
    { value: String(age), label: "YEARS YOUNG" },
    { value: String(daysAlive).replace(/\B(?=(\d{3})+(?!\d))/g, ","), label: "DAYS ALIVE" },
    { value: String(daysToBirthday), label: "DAYS TO NEXT BIRTHDAY" },
    { value: "17", label: "CURRENT AGE" },
    { value: String(daysToBirthday), label: "UNTIL 18" },
  ];
}

export default function StatsTicker() {
  const stats = computeStats();
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const cycle = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % stats.length);
        setFading(false);
      }, 300);
    }, 3200);
    return () => clearInterval(cycle);
  }, [stats.length]);

  const current = stats[index];

  return (
    <div className="grain flex items-center justify-center gap-3 border-t border-b border-line bg-paper-2 py-4 text-center">
      <span className="mono text-[0.56rem] tracking-[0.16em] text-ink-faint">● LIVE</span>
      <div className="h-3 w-px bg-line-strong" aria-hidden />
      <div className="min-w-[12ch]">
        <span
          className={`font-display text-lg font-medium tracking-[-0.03em] text-ink transition-opacity duration-300 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
          aria-live="polite"
        >
          {current.value}
        </span>{" "}
        <span className="mono text-[0.56rem] tracking-[0.14em] text-ink-faint">
          {current.label}
        </span>
      </div>
    </div>
  );
}
