"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const storageKey = "masala-entry-transition-complete";

function shouldSkipEntryTransition(reducedMotion: boolean | null) {
  if (typeof window === "undefined") return true;
  if (window.sessionStorage.getItem(storageKey)) return true;
  return Boolean(reducedMotion);
}

export default function EntryTransition() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (shouldSkipEntryTransition(reducedMotion)) {
      document.getElementById("entry-block")?.remove();
      return;
    }

    window.sessionStorage.setItem(storageKey, "true");

    const frame = window.requestAnimationFrame(() => setVisible(true));
    const timer = window.setTimeout(() => setVisible(false), 1750);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (visible) document.getElementById("entry-block")?.remove();
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="masala-entry-transition"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.42, ease: [0.7, 0, 0.22, 1] } }}
        >
          <motion.span
            className="masala-entry-transition__glow"
            initial={{ opacity: 0, scale: 0.78 }}
            animate={{ opacity: [0, 1, 0.48], scale: [0.78, 1.08, 1.22] }}
            transition={{ duration: 1.15, ease: [0.2, 0.82, 0.22, 1] }}
          />
          <motion.span
            className="masala-entry-transition__wipe"
            initial={{ x: "-62%", opacity: 0 }}
            animate={{ x: "62%", opacity: [0, 1, 0] }}
            transition={{ duration: 1.12, ease: [0.2, 0.9, 0.22, 1], delay: 0.08 }}
          />
          <motion.span
            className="masala-entry-transition__brand"
            initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.78, ease: [0.2, 0.82, 0.22, 1], delay: 0.22 }}
          >
            Masala
          </motion.span>
          <motion.span
            className="masala-entry-transition__line"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.7 }}
            transition={{ duration: 0.78, ease: [0.2, 0.82, 0.22, 1], delay: 0.36 }}
          />
          <motion.span
            className="masala-entry-transition__credit"
            initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
            transition={{ duration: 0.6, ease: [0.2, 0.82, 0.22, 1], delay: 0.62 }}
          >
            by<b>lowhp.studio</b>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
