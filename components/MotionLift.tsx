"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MotionLift({ children, className = "" }: Props) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}
