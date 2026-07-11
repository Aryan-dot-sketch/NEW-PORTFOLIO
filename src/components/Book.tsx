import { motion, useReducedMotion } from "framer-motion";
import ReadingProgress from "./ReadingProgress";
import { Reveal } from "./Reveal";

const genres = ["Time fiction", "Time loop", "Murder", "Love", "Adventure", "Betrayal", "Paranormal"];

/**
 * The novel section. A dedicated editorial spread that gives Aryan's fiction
 * work the same weight as his engineering work. Left side is a designed book
 * cover artifact; right side is prose + a row of genre chips.
 *
 * The heading is deliberately larger than any other section title — this is
 * the one place on the page where the *author* is louder than the *builder*.
 */
export default function Book() {
  const reduce = useReducedMotion();

  return (
    <section id="book" data-tone="warm" className="grain section-pad relative overflow-hidden border-b border-line bg-paper text-ink">
      <ReadingProgress />
      <div className="site-container">
        {/* Editorial header: the italic sits inside the same heading and
            carries the accent colour — echoes the "with care" moment in
            the hero, but bigger and to the right. */}
        <div className="grid gap-8 border-t border-line pt-6 lg:grid-cols-[auto_1fr] lg:items-start">
          <p className="meta text-ink-faint">04 / THE OTHER CRAFT</p>
          <Reveal variant="clip" className="justify-self-end">
            <h2
              className="opsz-display display-section text-right"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1' }}
            >
              Before the code,<br />
              <span
                className="italic text-accent"
                style={{ fontWeight: 400, fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1' }}
              >
                the story.
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* ============================================================
              BOOK COVER ARTIFACT
              A designed cover, not a stock image. Deep warm-black
              gradient, generous margins, serif title, mono metadata top
              and bottom. Tilts slightly on hover; a soft double-shadow
              suggests a real object sitting on the paper.
              ============================================================ */}
          <Reveal variant="drift">
            <figure className="relative mx-auto w-full max-w-md lg:mx-0">
              {/* Second card behind, offset — hints at a book, not a flat card */}
              <div
                aria-hidden
                className="absolute -bottom-2 -right-2 h-full w-full bg-paper-3"
              />
              <motion.div
                whileHover={reduce ? undefined : { rotate: -1.2, y: -4 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] w-full overflow-hidden"
                style={{
                  background:
                    "radial-gradient(circle at 70% 20%, #2a1a10 0%, #1a0f08 45%, #0d0704 100%)",
                  boxShadow:
                    "0 30px 60px -20px rgba(23,19,15,0.35), 0 12px 24px -12px rgba(23,19,15,0.25)",
                }}
              >
                {/* Corner registration marks */}
                <span aria-hidden className="absolute left-4 top-4 h-3 w-3 border-l border-t border-white/25" />
                <span aria-hidden className="absolute right-4 top-4 h-3 w-3 border-r border-t border-white/25" />
                <span aria-hidden className="absolute left-4 bottom-4 h-3 w-3 border-l border-b border-white/25" />
                <span aria-hidden className="absolute right-4 bottom-4 h-3 w-3 border-r border-b border-white/25" />

                {/* Subtle radial vignette */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 40%, rgba(255,220,180,0.06), transparent 55%)",
                  }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-9 lg:p-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="mono text-[0.58rem] tracking-[0.22em] text-white/50">A NOVEL BY</p>
                      <p
                        className="mt-3 italic text-white"
                        style={{
                          fontFamily: "var(--font-display-warm)",
                          fontSize: "1.5rem",
                          fontWeight: 400,
                          fontVariationSettings: '"opsz" 144, "SOFT" 60, "WONK" 1',
                        }}
                      >
                        Aryan
                      </p>
                    </div>
                    <span className="mono tabular-nums text-[0.58rem] tracking-[0.14em] text-white/40">04</span>
                  </div>

                  <div>
                    <p
                      className="italic leading-[1.05] text-white"
                      style={{
                        fontFamily: "var(--font-display-warm)",
                        fontSize: "clamp(2rem, 4.5vw, 3rem)",
                        fontWeight: 400,
                        fontVariationSettings: '"opsz" 144, "SOFT" 60, "WONK" 1',
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Seven genres.<br />One story.
                    </p>
                  </div>

                  <p className="mono text-[0.56rem] tracking-[0.2em] text-white/45">
                    TIME LOOP / MURDER / LOVE / PARANORMAL
                  </p>
                </div>
              </motion.div>
              <figcaption className="mt-4 flex items-center justify-between meta text-ink-faint">
                <span>Fig. 04 / cover study</span>
                <span>Unpublished manuscript</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* ============================================================
              RIGHT-HAND EDITORIAL COLUMN
              ============================================================ */}
          <Reveal delay={0.08}>
            <div>
              {/* Pull-quote lead-in, italic, warm-tone */}
              <p
                className="opsz-display italic leading-[1.2] text-ink"
                style={{
                  fontSize: "clamp(1.35rem, 2.4vw, 1.95rem)",
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 96, "SOFT" 60, "WONK" 1',
                }}
              >
                One story holding seven genres at once.
              </p>

              <p className="prose-warm mt-8 text-base leading-relaxed text-ink-soft sm:text-lg">
                A single narrative that refuses to pick a lane: a time loop
                wrapped around a murder, a love story threaded through betrayal,
                an adventure haunted by paranormal forces — all braided into one
                book. It is the clearest proof that Aryan is a storyteller first
                and an engineer second, and that the two feed each other.
              </p>

              {/* Genre chips */}
              <ul className="mt-10 flex flex-wrap gap-2" aria-label="Genres in the novel">
                {genres.map((genre) => (
                  <li key={genre}>
                    <span className="inline-flex min-h-9 items-center border border-line-strong px-3 mono text-[0.62rem] tracking-[0.14em] text-ink">
                      {genre}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-line pt-6">
                <p className="text-sm leading-relaxed text-ink-soft">
                  Purchase and edition details will be published here once they are
                  ready to share.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
