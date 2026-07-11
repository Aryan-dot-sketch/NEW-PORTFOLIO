import { Reveal } from "./Reveal";

type ArsenalRow = {
  category: string;
  tools: string[];
  note: string;
};

const arsenal: ArsenalRow[] = [
  {
    category: "Languages",
    tools: ["Python", "Swift", "HTML", "Shell"],
    note: "From automation scripts to native macOS to the web.",
  },
  {
    category: "AI & Voice",
    tools: ["Voice assistants", "Wake-word systems", "Digital twins", "LLM tooling"],
    note: "Kronos and Atmadarshan are built on this stack.",
  },
  {
    category: "Systems & Bots",
    tools: ["Telegram bots", "Payment flows", "Middleware", "Live web products"],
    note: "Commerce, support and brokering, end to end.",
  },
  {
    category: "Security",
    tools: ["Cybersecurity", "Auth & access", "System internals"],
    note: "A working, hands-on interest — not a checkbox.",
  },
  {
    category: "Craft",
    tools: ["Fiction writing", "Narrative design", "Product taste"],
    note: "The author feeds the engineer and back again.",
  },
];

/**
 * The Arsenal section — Aryan's actual toolkit, expressed as an editorial
 * skills table rather than a Dribbble icon grid. Every row has three
 * columns: category name (serif bold), the tools themselves (sans, quiet),
 * and a one-line human explanation (right-aligned, muted).
 *
 * The heading pairs an upright roman line with a huge italic accent line —
 * the same warm/italic contrast the hero uses, tuned even softer.
 */
export default function Arsenal() {
  return (
    <section id="arsenal" data-tone="warm" className="grain section-pad relative overflow-hidden border-b border-line bg-paper text-ink">
      <div className="site-container">
        <div className="grid gap-8 border-t border-line pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal variant="clip">
            <h2 className="opsz-display display-section" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1' }}>
              What the<br />
              <span
                className="italic text-accent"
                style={{ fontWeight: 400, fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1' }}
              >
                hands know.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-md text-base leading-relaxed text-ink-soft lg:text-right">
              Not a résumé of buzzwords — the actual tools behind the works
              above, from voice AI on macOS to payment systems to the deep end
              of security.
            </p>
          </Reveal>
        </div>

        {/* ==============================================================
            The table itself. Three-column grid on desktop; two-column on
            tablet (tools + note stack under category); single-column on
            phone with the category as a small meta label above.
            Every row uses the "whisper" border weight for internal
            dividers, keeping the surface quiet.
            ============================================================== */}
        <div className="mt-16 border-t border-line lg:mt-24">
          {arsenal.map((row, index) => (
            <Reveal key={row.category} delay={index * 0.05} variant="drift">
              <div
                className="group grid gap-4 border-b border-line py-8 sm:py-10 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-baseline lg:gap-10"
              >
                {/* Category */}
                <h3
                  className="opsz-display font-display text-2xl leading-none tracking-[-0.02em] text-ink sm:text-3xl lg:text-[2rem]"
                  style={{ fontWeight: 520, fontVariationSettings: '"opsz" 72, "SOFT" 40, "WONK" 1' }}
                >
                  {row.category}
                </h3>

                {/* Tools list — quiet, comma-free, wide-spaced */}
                <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label={`${row.category} tools`}>
                  {row.tools.map((tool) => (
                    <li key={tool} className="text-base text-ink-soft transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-ink sm:text-lg">
                      {tool}
                    </li>
                  ))}
                </ul>

                {/* Human note — right-aligned on desktop */}
                <p className="max-w-sm text-sm leading-relaxed text-ink-faint sm:text-base lg:text-right lg:justify-self-end">
                  {row.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
