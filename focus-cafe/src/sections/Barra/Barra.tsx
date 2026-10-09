import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { SplitText } from "../../components/SplitText";
import { FEATURED } from "../../data/menu";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./Barra.css";

const AUTOPLAY_MS = 5500;
const LEAVE_MS = 480;
const pad = (n: number) => String(n).padStart(2, "0");

/** 10:00 · Card Swap: cada cambio de ficha cambia la palabra gigante, el color de la sección y los datos. */
export function Barra() {
  const reduced = useReducedMotion();
  const [order, setOrder] = useState(() => FEATURED.map((_, i) => i));
  const [leaving, setLeaving] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const leaveTimer = useRef<number>(0);

  const front = order[0];
  const item = FEATURED[front];

  const next = useCallback(() => {
    if (leaving !== null) return;
    if (reduced) {
      setOrder((o) => [...o.slice(1), o[0]]);
      return;
    }
    setLeaving(order[0]);
    leaveTimer.current = window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(null);
    }, LEAVE_MS);
  }, [leaving, order, reduced]);

  const prev = () => leaving === null && setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  // Avance automático; se reinicia con cada cambio y se pausa con el cursor o el foco.
  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [front, paused, reduced, next]);

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  return (
    <section
      id="barra"
      className="barra"
      style={{ "--tint": item.tint, "--ink": item.ink } as CSSProperties}
      aria-labelledby="barra-title"
      aria-roledescription="carrusel"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <div className="barra__mega" aria-hidden="true" style={{ "--chars": item.word.length } as CSSProperties}>
        <SplitText key={item.word} lines={[item.word]} inline stagger={40} />
      </div>

      <div className="barra__grid container gutter">
        <div className="barra__info" aria-live="polite">
          <p className="eyebrow barra__eyebrow" id="barra-title">
            La barra · los más pedidos
          </p>
          <h2 className="section-title">{item.name}</h2>
          <p className="barra__desc">{item.description}</p>
          <dl className="barra__specs">
            {item.specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd className="tnum">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="barra__controls">
            <button type="button" onClick={prev} aria-label="Bebida anterior">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button type="button" onClick={next} aria-label="Bebida siguiente">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="barra__count tnum">
              {pad(front + 1)}/{pad(FEATURED.length)}
            </span>
            <span className="barra__progress" aria-hidden="true">
              <i key={front} className={paused || reduced ? "is-paused" : ""} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
            </span>
          </div>
        </div>

        <div
          className="barra__deck"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {FEATURED.map((p, i) => {
            const pos = order.indexOf(i);
            return (
              <article
                key={p.name}
                className={`barra-card ${leaving === i ? "is-leaving" : ""}`}
                data-pos={pos}
                aria-hidden={pos !== 0}
                onClick={() => pos === 0 && next()}
              >
                <div className="barra-card__top">
                  <span>N.º {pad(i + 1)}</span>
                  <span>Los más pedidos</span>
                </div>
                <div className="barra-card__photo">
                  <img src={p.image} alt={pos === 0 ? p.name : ""} loading="lazy" />
                </div>
                <span className="barra-card__note hand-note">{p.note}</span>
                <h3>{p.name}</h3>
                <div className="barra-card__row">
                  <span>Focus Café · León</span>
                  <b className="tnum">${p.price}</b>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
