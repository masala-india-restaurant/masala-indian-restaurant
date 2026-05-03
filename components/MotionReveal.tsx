"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
};

const delayMap: Record<NonNullable<Props["delay"]>, number> = {
  0: 0,
  1: 0.1,
  2: 0.18,
  3: 0.26,
  4: 0.34,
};

export default function MotionReveal({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -72px 0px" }}
      transition={{ duration: 0.78, delay: delayMap[delay], ease: [0.2, 0.82, 0.22, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
