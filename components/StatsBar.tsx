"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteDictionary } from "@/lib/i18n";

type Props = { stats: SiteDictionary["stats"] };

function Counter({
  target,
  suffix,
  prefix,
  displayValue,
}: {
  target: number;
  suffix: string;
  prefix?: string;
  displayValue?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const steps = 50;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.round(current));
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-heading text-5xl lg:text-6xl font-semibold text-gold tabular-nums">
      {displayValue ?? (
        <>
          {prefix}
          {count}
          {suffix}
        </>
      )}
    </span>
  );
}

export default function StatsBar({ stats }: Props) {
  return (
    <section className="bg-maroon py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 divide-y-2 lg:divide-y-0 lg:divide-x divide-cream/10">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center gap-2 ${
                i > 0 ? "lg:pl-10" : ""
              } ${i < stats.length - 1 ? "lg:pr-10" : ""} pt-8 lg:pt-0 ${
                i < 2 ? "first:pt-0 [&:nth-child(2)]:pt-0" : ""
              }`}
            >
              <Counter target={s.value} suffix={s.suffix} prefix={s.prefix} displayValue={s.displayValue} />
              <span className="section-label text-cream/60 mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
