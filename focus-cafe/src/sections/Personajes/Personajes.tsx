import { useState } from "react";
import { characters } from "../../data/assets";
import { useInView } from "../../hooks/useInView";
import "./Personajes.css";

const FIGURES = [
  { file: "cup", label: "taza" },
  { file: "tetera", label: "tetera" },
  { file: "cafe", label: "vaso" },
];

const INKS = [
  { id: "animado", label: "Color", swatch: "conic-gradient(#e84c3d 0 25%, #afc556 0 50%, #4a9b8f 0 75%, #f2a33a 0)" },
  { id: "pastel", label: "Pastel", swatch: "#f6c6c0" },
  { id: "verde", label: "Verde", swatch: "var(--verde)" },
  { id: "negra", label: "Línea", swatch: "var(--negro)" },
];

/** 16:00 · Pruebas de impresión: las ilustraciones originales entran desalineadas y se alinean. */
export function Personajes() {
  const [ink, setInk] = useState("animado");
  const [ref, printed] = useInView<HTMLDivElement>(0.4);

  return (
    <section id="personajes" className="personajes gutter" aria-labelledby="personajes-title">
      <div className="container">
        <header className="personajes__head">
          <div>
            <p className="eyebrow">Personajes Focus</p>
            <h2 className="section-title personajes__title" id="personajes-title">
              Las mismas caras, cuatro tintas.
            </h2>
          </div>
          <div className="personajes__inks" role="group" aria-label="Acabado de los personajes">
            {INKS.map((option) => (
              <button key={option.id} type="button" aria-pressed={ink === option.id} onClick={() => setInk(option.id)}>
                <i style={{ background: option.swatch }} />
                {option.label}
              </button>
            ))}
          </div>
        </header>

        <div ref={ref} className={`proofs ${printed ? "is-printed" : ""}`} data-ink={ink}>
          {FIGURES.map((fig, i) => (
            <figure key={fig.file} className="proof">
              <span className="proof__crop" aria-hidden="true" />
              <span className="proof__reg proof__reg--l" aria-hidden="true" />
              <span className="proof__reg proof__reg--r" aria-hidden="true" />
              <div className="proof__stack">
                {INKS.map((option) => (
                  <img
                    key={option.id}
                    className={`proof__ink proof__ink--${option.id}`}
                    src={characters[`${fig.file}_${option.id}`]}
                    alt={option.id === ink ? `Personaje ${fig.label} de Focus, acabado ${option.label.toLowerCase()}` : ""}
                    loading="lazy"
                  />
                ))}
              </div>
              <figcaption>
                <span>Prueba 0{i + 1}</span>
                <span>{fig.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="personajes__foot">Ilustraciones originales de Focus. Solo cambia la tinta.</p>
      </div>
    </section>
  );
}
