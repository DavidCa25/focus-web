import { photos } from "../../data/assets";
import "./Experiencia.css";

const MOMENTS = [
  {
    note: "para quedarte",
    title: "Un rato largo",
    text: "Mesas cómodas, enchufes, buena luz y música a un volumen que deja conversar o trabajar.",
  },
  {
    note: "para tu rutina",
    title: "Tu pedido de siempre",
    text: "Un equipo que ya conoce tu café y lo sirve a tu gusto, con leches vegetales y jarabes de temporada.",
  },
  {
    note: "para llevar",
    title: "Focus a casa",
    text: "Café en grano o molido, prensa francesa, cafetera moka y termos. Pregunta en barra.",
  },
];

/** 18:00 · Un café de barrio con personalidad. */
export function Experiencia() {
  return (
    <section id="experiencia" className="experiencia gutter" aria-labelledby="experiencia-title">
      <div className="container experiencia__grid">
        <figure className="experiencia__photo">
          <img src={photos.local} alt="Barra de Focus Café con vasos, bolsas de café y tarjetas de la marca" loading="lazy" />
          <figcaption className="hand-note">hecho en León ✦</figcaption>
        </figure>

        <div className="experiencia__text">
          <p className="eyebrow">Experiencia Focus</p>
          <h2 className="section-title" id="experiencia-title">
            Un café de barrio con personalidad.
          </h2>
          <p className="experiencia__lede">
            Focus nace de la idea de tener un lugar sencillo, honesto y bien cuidado. Los alimentos se preparan al momento
            y el café es de especialidad, de Veracruz y Puebla.
          </p>

          <ol className="experiencia__moments">
            {MOMENTS.map((m) => (
              <li key={m.title}>
                <span className="hand-note">{m.note}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
