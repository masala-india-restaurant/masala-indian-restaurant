type Variant = "footer" | "splash";

type Props = {
  prefix?: string;
  variant?: Variant;
  className?: string;
};

export default function LowhpMark({ prefix, variant = "footer", className }: Props) {
  const cls = [
    "lowhp-mark",
    variant === "splash" ? "lowhp-mark--splash" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href="https://lowhp.studio"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${prefix ? prefix + " " : ""}lowhp.studio`}
      className={cls}
    >
      {prefix && <span className="lowhp-mark__prefix">{prefix}</span>}
      <span className="lowhp-mark__name">lowhp.studio</span>
      <span className="lowhp-mark__arrow" aria-hidden="true">↗</span>
    </a>
  );
}
