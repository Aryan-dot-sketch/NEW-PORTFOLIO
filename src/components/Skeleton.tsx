/**
 * Loading skeleton components — match the visual weight of the content
 * they replace so the layout never jumps.
 */

function SkeletonBlock({
  className = "",
  height = "1rem",
}: {
  className?: string;
  height?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-paper-3 ${className}`}
      style={{ height }}
      aria-hidden
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="border border-line bg-paper p-6">
      <div className="flex items-start justify-between">
        <SkeletonBlock className="w-8" height="0.75rem" />
        <div className="flex gap-3">
          <SkeletonBlock className="w-16" height="0.75rem" />
          <SkeletonBlock className="w-12" height="0.75rem" />
        </div>
      </div>
      <SkeletonBlock className="mt-6 w-3/4" height="2rem" />
      <SkeletonBlock className="mt-5 w-full" height="0.875rem" />
      <SkeletonBlock className="mt-2 w-5/6" height="0.875rem" />
      <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
        <SkeletonBlock className="w-20" height="0.75rem" />
        <SkeletonBlock className="w-16" height="0.75rem" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock
          key={i}
          className="w-full"
          height="0.9rem"
          style={{ width: i === lines - 1 ? "65%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function SkeletonSection() {
  return (
    <div className="section-pad border-b border-line">
      <div className="site-container space-y-8">
        <div className="flex items-end justify-between border-t border-line pt-6">
          <SkeletonBlock className="w-32" height="0.75rem" />
          <SkeletonBlock className="w-48 hidden sm:block" height="4rem" />
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}
