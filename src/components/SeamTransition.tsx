/**
 * A short gradient bridge between a warm (Aryan) section and a cold
 * (ExamCodes) section, or vice-versa. This is what makes the tone
 * change feel like a temperature shift instead of a hard cut.
 */
export default function SeamTransition({ direction }: { direction: "toDark" | "toLight" }) {
  const background =
    direction === "toDark"
      ? "linear-gradient(180deg, #f1ece2 0%, #0a0806 55%, #050505 100%)"
      : "linear-gradient(180deg, #050505 0%, #0a0806 45%, #f1ece2 100%)";

  return (
    <div
      aria-hidden
      className="relative h-16 w-full sm:h-24 lg:h-32"
      style={{ background }}
    />
  );
}
