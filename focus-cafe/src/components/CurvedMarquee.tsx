import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface CurvedMarqueeProps {
  text: string;
  /** Trazo SVG que sigue el texto. */
  path: string;
  viewBox: string;
  className?: string;
  /** Píxeles por frame; el scroll lo acelera. */
  speed?: number;
  repeat?: number;
  /** Si se define, dibuja una cinta de ese color bajo el texto. */
  ribbon?: { color: string; width: number };
}

export function CurvedMarquee({ text, path, viewBox, className, speed = 0.7, repeat = 4, ribbon }: CurvedMarqueeProps) {
  const id = "curve-" + useId().replace(/[^\w-]/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextPathElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    const tp = textRef.current;
    if (!svg || !tp || reduced) return;

    let raf = 0;
    let off = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let visible = false;
    let unit = 0;

    const tick = () => {
      off -= speed + boost;
      if (off < -unit) off += unit;
      boost *= 0.92;
      tp.setAttribute("startOffset", String(off));
      if (visible) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      boost = Math.min(14, boost + Math.abs(window.scrollY - lastY) * 0.08);
      lastY = window.scrollY;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && unit) raf = requestAnimationFrame(tick);
    });

    // Medir después de cargar la fuente, o el largo del texto sale mal.
    document.fonts.ready.then(() => {
      unit = tp.getComputedTextLength() / repeat;
      io.observe(svg);
    });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [text, repeat, speed, reduced]);

  return (
    <svg ref={svgRef} className={className} viewBox={viewBox} aria-hidden="true">
      <path id={id} d={path} fill="none" style={{ stroke: ribbon?.color ?? "none", strokeWidth: ribbon?.width ?? 0 }} />
      <text dominantBaseline={ribbon ? "central" : undefined}>
        <textPath ref={textRef} href={`#${id}`}>
          {text.repeat(repeat)}
        </textPath>
      </text>
    </svg>
  );
}
