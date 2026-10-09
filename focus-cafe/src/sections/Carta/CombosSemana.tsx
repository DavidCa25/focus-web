import { useState } from "react";
import { COMBOS } from "../../data/menu";
import "./CombosSemana.css";

// getDay(): 0 = domingo … 6 = sábado. Fines de semana muestran el del lunes.
const todayIndex = () => {
  const d = new Date().getDay();
  return d >= 1 && d <= 5 ? d - 1 : null;
};

export function CombosSemana() {
  const [today] = useState(todayIndex);
  const [day, setDay] = useState(today ?? 0);
  const combo = COMBOS[day];

  return (
    <article className="combos" aria-labelledby="combo-title">
      <div className="combos__text">
        <div>
          <p className="eyebrow combos__eyebrow">{day === today ? "Hoy · combo del día" : `Combo del ${combo.day}`}</p>
          <h3 className="combos__day" id="combo-title">
            {combo.day}
          </h3>
          <p className="combos__dish">
            {combo.dish} <span>+ café americano</span>
          </p>
          <p className="combos__price tnum">${combo.price}</p>
        </div>

        <div>
          <div className="combos__days" role="group" aria-label="Elegir día">
            {COMBOS.map((c, i) => (
              <button key={c.day} type="button" aria-pressed={i === day} aria-label={c.day} onClick={() => setDay(i)}>
                {c.day.slice(0, 3)}
              </button>
            ))}
          </div>
          <p className="combos__fine hand-note">¿Otro combo? Te lo armamos cualquier día.</p>
        </div>
      </div>

      <figure className="combos__photo">
        <img key={combo.image} src={combo.image} alt={`Combo del ${combo.day}: ${combo.dish}`} loading="lazy" />
      </figure>
    </article>
  );
}
