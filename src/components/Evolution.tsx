import { Reveal } from "./Reveal";

const timeline = [
  {
    year: "15",
    phase: "Start",
    title: "First line of code",
    copy: "Python. A simple bot. The realization that systems could be built, not just used.",
    state: "Origin",
  },
  {
    year: "15–16",
    phase: "AI Systems",
    title: "Kronos",
    copy: "A macOS voice assistant with full system access. Learned what it means to build something that feels alive.",
    state: "Shipped",
  },
  {
    year: "16",
    phase: "Identity",
    title: "Atmadarshan",
    copy: "An AI that mirrors its creator — voice, speaking style, nature. Learned what it means to sound like yourself.",
    state: "Shipped",
  },
  {
    year: "16–17",
    phase: "Fiction",
    title: "The Novel",
    copy: "Time fiction, time loop, murder, love, adventure, betrayal, paranormal. Learned what story requires.",
    state: "Written",
  },
  {
    year: "17",
    phase: "Commerce",
    title: "ExamCodesBot + PhoneBot",
    copy: "Telegram bots handling payments, support, virtual numbers. Learned what infrastructure demands.",
    state: "Live",
  },
  {
    year: "17",
    phase: "Marketplace",
    title: "ExamCodes.site",
    copy: "A digital study marketplace for JEE, NEET, CBSE. Learned what marketplaces take to build.",
    state: "Live",
  },
];

export default function Evolution() {
  return (
    <section id="evolution" data-tone="cold" className="section-pad border-b border-line bg-paper text-ink">
      <div className="site-container">
        <Reveal variant="clip">
          <div className="grid gap-7 border-t border-line pt-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
            <p className="meta text-ink-faint">04 / TIMELINE</p>
            <h2 className="display-section text-ink lg:text-right">BUILT BETWEEN<br /><span className="text-outline">15 AND 17.</span></h2>
          </div>
        </Reveal>

        <div className="hide-scrollbar mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:mt-20 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {timeline.map((item, index) => (
            <Reveal
              key={item.year}
              className="min-w-[82vw] snap-center sm:min-w-[48vw] lg:min-w-0"
              delay={index * 0.05}
              variant="drift"
            >
              <article className="flex h-full min-h-[25rem] flex-col border border-line-strong bg-paper p-6 transition-colors hover:bg-paper-2">
                <div className="flex items-center justify-between">
                  <span className="mono tabular-nums text-xs text-ink-faint">{item.year}</span>
                  <span className="mono text-[0.56rem] tracking-[0.12em] text-ink-faint">{item.state.toUpperCase()}</span>
                </div>
                <div className="mt-auto pt-20">
                  <p className="meta text-ink-faint">{item.phase}</p>
                  <h3 className="mt-4 font-display text-2xl font-medium leading-tight tracking-[-0.035em] text-ink">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{item.copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-right meta text-ink-faint lg:hidden">SWIPE TO TRACE THE TIMELINE →</p>
      </div>
    </section>
  );
}
