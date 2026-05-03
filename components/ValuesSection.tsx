import RevealOnScroll from "./RevealOnScroll";
import type { SiteDictionary } from "@/lib/i18n";

const values = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 6c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18S33.941 6 24 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 24c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 16v-6M24 38v-6M32 24h6M10 24h6" />
      </svg>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 8c0 0-12 8-12 18a12 12 0 0024 0C36 16 24 8 24 8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 30c0 0-6-4-6-10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M30 24c0 0-3-8-6-16" />
      </svg>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" />
        <circle cx="24" cy="20" r="6" strokeLinecap="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M38 30c0-3.866-3.134-7-7-7M10 30c0-3.866 3.134-7 7-7" />
        <circle cx="38" cy="18" r="4" />
        <circle cx="10" cy="18" r="4" />
      </svg>
    ),
  },
];

type Props = { copy: SiteDictionary["values"] };

export default function ValuesSection({ copy }: Props) {
  return (
    <section className="bg-surface-soft py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <RevealOnScroll className="text-center mb-16">
          <p className="section-label mb-4">{copy.eyebrow}</p>
          <h2
            className="font-heading text-ink leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            {copy.title} <em className="text-maroon not-italic">{copy.accent}</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="block h-px w-12 bg-gold/60" />
            <span className="text-gold text-sm">✦</span>
            <span className="block h-px w-12 bg-gold/60" />
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {values.map((v, i) => (
            <RevealOnScroll
              key={copy.items[i].title}
              delay={(i + 1) as 1 | 2 | 3}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="text-saffron mb-6 p-4 border border-gold/30 rounded-full bg-surface">
                {v.icon}
              </div>

              {/* Gold rule */}
              <span className="gold-rule mb-6" />

              <h3 className="font-heading text-2xl text-ink mb-4 font-semibold">{copy.items[i].title}</h3>
              <p className="text-ink-muted font-body text-sm leading-relaxed">{copy.items[i].text}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
