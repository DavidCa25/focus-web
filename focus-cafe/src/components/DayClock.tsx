import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import "./DayClock.css";

const START = 7 * 60; // 07:00
const SPAN = 13 * 60; // hasta las 20:00

const moment = (h: number) => (h < 12 ? "mañana" : h < 15 ? "mediodía" : h < 19 ? "tarde" : "noche");

/** Reloj flotante: el scroll entre #inicio y #noche avanza la hora de 07:00 a 20:00. */
export function DayClock() {
  const [minutes, setMinutes] = useState(START);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const start = document.getElementById("inicio");
      const end = document.getElementById("noche");
      if (!start || !end) return;
      const a = start.offsetTop;
      const b = end.offsetTop;
      const p = Math.max(0, Math.min(1, (window.scrollY - a) / (b - a)));
      setMinutes(START + Math.round((p * SPAN) / 15) * 15);
      setVisible(window.scrollY > window.innerHeight * 0.4);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const h = Math.floor(minutes / 60);
  const time = `${String(h).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

  return (
    <div
      className={`clock ${visible ? "is-on" : ""} ${h >= 19 ? "is-night" : ""}`}
      style={{ "--rot": `${180 + (minutes / 720) * 360}deg` } as CSSProperties}
      aria-hidden="true"
    >
      <span className="clock__dial" />
      <span className="clock__time tnum">{time}</span>
      <span className="clock__moment">{moment(h)}</span>
    </div>
  );
}
