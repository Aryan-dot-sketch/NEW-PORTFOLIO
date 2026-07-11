import { navigation, profile } from "../data/portfolio";
import BrandMark from "./BrandMark";

export default function Footer({ onOpenCommand }: { onOpenCommand: () => void }) {
  return (
    <footer data-tone="warm" className="border-t border-line bg-paper py-8 text-ink sm:py-10">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <a href="#top" className="type-caret text-ink">
              <BrandMark />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">Aryan first. Builder, author, and founder of {profile.company}. A living record of starting at 15, building in public, and growing beyond one product.</p>
          </div>

          <div>
            <p className="meta text-ink-faint">INDEX</p>
            <nav className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3" aria-label="Footer navigation">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} className="link-line w-fit text-sm text-ink-soft hover:text-ink">{item.label}</a>
              ))}
            </nav>
          </div>

          <div>
            <p className="meta text-ink-faint">SYSTEM</p>
            <div className="mt-5 space-y-3 mono text-[0.62rem] tracking-[0.1em] text-ink-soft">
              <button type="button" onClick={onOpenCommand} className="block hover:text-ink">COMMAND PALETTE / ⌘K</button>
              <a href={profile.companyUrl} target="_blank" rel="noreferrer" className="block hover:text-ink">EXAMCODES.SITE / ↗</a>
              <p>NO TRACKING / NO COOKIES</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-[0.58rem] tracking-[0.12em] text-ink-faint">© {new Date().getFullYear()} ARYAN / PERSONAL FOUNDER ARCHIVE</p>
          <a href="#top" className="mono text-[0.58rem] tracking-[0.12em] text-ink-faint hover:text-ink">RETURN TO ORIGIN ↑</a>
        </div>
      </div>
    </footer>
  );
}