"use client";

import { MotionConfig } from "motion/react";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 120, damping: 22 }}>
      {children}
    </MotionConfig>
  );
}
