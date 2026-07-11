import { useEffect, useState } from "react";

const BIRTHDAY = new Date("2009-03-06T00:00:00");

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getCountdown(): CountdownParts {
  const now = new Date();
  let nextBirthday = new Date(`${now.getFullYear()}-03-06T00:00:00`);
  if (nextBirthday <= now) {
    nextBirthday = new Date(`${now.getFullYear() + 1}-03-06T00:00:00`);
  }
  const diff = nextBirthday.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function getAgeDecimal(): string {
  const now = new Date();
  const diff = now.getTime() - BIRTHDAY.getTime();
  const years = diff / (1000 * 60 * 60 * 24 * 365.25);
  return years.toFixed(4);
}

function getDaysAlive(): number {
  const now = new Date();
  return Math.floor((now.getTime() - BIRTHDAY.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * A full-width hero birthday countdown bar.
 * Lives between Hero and Projects sections.
 * Shows: exact age decimal, countdown to next birthday, days alive.
 */
export default function BirthdayCountdown() {
  const [countdown, setCountdown] = useState(getCountdown());
  const [age, setAge] = useState(getAgeDecimal());
  const [daysAlive, setDaysAlive] = useState(getDaysAlive());

  useEffect(() => {
    const tick = () => {
      setCountdown(getCountdown());
      setAge(getAgeDecimal());
      setDaysAlive(getDaysAlive());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      data-tone="warm"
      className="grain border-b border-line bg-paper-2 py-10 sm:py-14"
      aria-label="Birthday countdown"
    >
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Exact age */}
          <div className="text-center lg:text-left">
            <p className="mono text-[0.6rem] tracking-[0.22em] text-ink-faint">EXACT AGE</p>
            <p
              className="mt-3 font-display text-5xl font-medium tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1' }}
            >
              {parseFloat(age).toFixed(2)}
              <span className="text-3xl text-accent sm:text-4xl lg:text-5xl">.</span>
              <span className="text-accent">{age.slice(-2)}</span>
            </p>
            <p className="mt-2 mono text-[0.6rem] tracking-[0.14em] text-ink-faint">YEARS YOUNG</p>
          </div>

          {/* Countdown to 18th birthday */}
          <div className="text-center">
            <p className="mono text-[0.6rem] tracking-[0.22em] text-ink-faint">
              UNTIL 18TH BIRTHDAY — MAR 6, {countdown.days > 240 ? new Date().getFullYear() + 1 : new Date().getFullYear()}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 sm:gap-5">
              {[
                { value: countdown.days, label: "DAYS" },
                { value: countdown.hours, label: "HRS" },
                { value: countdown.minutes, label: "MIN" },
                { value: countdown.seconds, label: "SEC" },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-3 sm:gap-4">
                  <div className="text-center">
                    <p
                      className="font-display text-4xl font-medium tabular-nums tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                    >
                      {pad(value)}
                    </p>
                    <p className="mono mt-1 text-[0.55rem] tracking-[0.18em] text-ink-faint">{label}</p>
                  </div>
                  {i < 3 && (
                    <span className="font-display text-3xl text-ink-faint/40 sm:text-4xl" aria-hidden>:</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Days alive */}
          <div className="text-center lg:text-right">
            <p className="mono text-[0.6rem] tracking-[0.22em] text-ink-faint">DAYS ALIVE</p>
            <p
              className="mt-3 font-display text-5xl font-medium tabular-nums tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1' }}
            >
              {daysAlive.toLocaleString()}
            </p>
            <p className="mt-2 mono text-[0.6rem] tracking-[0.14em] text-ink-faint">MOMENTS AND COUNTING</p>
          </div>
        </div>
      </div>
    </div>
  );
}
