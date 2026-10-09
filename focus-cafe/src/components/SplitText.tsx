import type { CSSProperties, ElementType } from "react";
import "./SplitText.css";

interface SplitTextProps {
  /** Cada string es una línea; las letras suben en cascada al montarse. */
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Retraso inicial y separación entre letras, en ms. */
  delay?: number;
  stagger?: number;
  inline?: boolean;
}

export function SplitText({ lines, as: Tag = "span", className = "", delay = 0, stagger = 28, inline = false }: SplitTextProps) {
  const starts = lines.map((_, i) => lines.slice(0, i).join("").length);

  return (
    <Tag className={`split ${inline ? "split--inline" : ""} ${className}`} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span className="split-line" aria-hidden="true" key={li}>
          {[...line].map((ch, ci) => (
            <span
              className="split-ch"
              key={ci}
              style={{ "--d": `${delay + (starts[li] + ci) * stagger}ms` } as CSSProperties}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
