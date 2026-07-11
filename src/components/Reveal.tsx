import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Variant = "rise" | "clip" | "drift";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "p" | "li" | "h2" | "h3";
  /**
   * Three motion verbs so the page doesn't move in a single register:
   *  - rise: opacity + gentle y (default, body content)
   *  - clip: a mask wipes up from the bottom (section headlines)
   *  - drift: a horizontal settle (lists, cards, rails)
   */
  variant?: Variant;
};

export function Reveal({ children, className, delay = 0, y = 22, as = "div", variant = "rise" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (variant === "clip") {
    return (
      <div className={`overflow-hidden ${className ?? ""}`}>
        <MotionTag
          initial={reduce ? false : { y: "100%" }}
          whileInView={reduce ? undefined : { y: "0%" }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </MotionTag>
      </div>
    );
  }

  if (variant === "drift") {
    return (
      <MotionTag
        className={className}
        initial={reduce ? false : { opacity: 0, x: -28 }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
