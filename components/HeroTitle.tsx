"use client";
import { motion, useReducedMotion } from "motion/react";

const line = (children: React.ReactNode, i: number, reduce: boolean | null) => (
  <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em" }}>
    <motion.span style={{ display: "block" }} initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.1 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.span>
  </span>
);

export default function HeroTitle({ line1, line2 }: { line1: string; line2: string }) {
  const reduce = useReducedMotion();
  return (
    <h1 className="display" style={{ margin: 0, fontSize: "clamp(46px, 6.8vw, 92px)", lineHeight: 1.0, letterSpacing: "-0.04em" }}>
      {line(line1, 0, reduce)}
      {line(<span style={{ background: "linear-gradient(90deg, var(--accent), var(--signal))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{line2}</span>, 1, reduce)}
    </h1>
  );
}
