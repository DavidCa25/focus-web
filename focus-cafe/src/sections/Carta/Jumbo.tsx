import { brand } from "../../data/assets";
import { JUMBO } from "../../data/menu";
import "./Jumbo.css";

/** "Para los atrevidos": la página del menú impreso, como cartel. */
export function Jumbo() {
  return (
    <article className="jumbo" aria-labelledby="jumbo-title">
      <div className="jumbo__text">
        <p className="eyebrow">Para los atrevidos</p>
        <h3 className="jumbo__title" id="jumbo-title">
          <span className="visually-hidden">{JUMBO.name}</span>
          <span aria-hidden="true">JUMBO</span>
        </h3>
        <p className="jumbo__sub">
          Caramel macchiato · <b>{JUMBO.size}</b>
        </p>
        <p className="jumbo__shout hand-note">¡ekioma!</p>
      </div>

      <div className="jumbo__art">
        <img className="jumbo__cup" src={JUMBO.image} alt="" loading="lazy" />
        <ul className="jumbo__notes">
          {JUMBO.notes.map((note, i) => (
            <li key={note} className={`hand-note jumbo__note jumbo__note--${i}`}>
              {note}
            </li>
          ))}
        </ul>
        <img className="jumbo__burst" src={brand.sticker_burst_135} alt={`Por solo $${JUMBO.price}`} loading="lazy" />
      </div>
    </article>
  );
}
