"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MotionPressable({ children, className = "inline-flex" }: Props) {
  return (
    <motion.span
      className={className}
      whileHover={{ y: -2, scale: 1.025 }}
      whileTap={{ y: 0, scale: 0.975 }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
    >
      {children}
    </motion.span>
  );
}
