import type { CSSProperties } from "react";
import { itemsOf } from "../../data/menu";
import type { MenuCategory, MenuItem } from "../../data/menu";

const priceOf = (it: MenuItem) => {
  if (it.price !== undefined) return `$${it.price}`;
  if (it.hot !== undefined || it.cold !== undefined) return `desde $${Math.min(it.hot ?? Infinity, it.cold ?? Infinity)}`;
  return "del día";
};

/** Vista de mostrador: los productos con foto sobre un estante. */
export function Vitrina({ category }: { category: MenuCategory }) {
  const items = itemsOf(category);
  const withPhoto = items.filter((it) => it.image);
  const rest = items.filter((it) => !it.image);

  return (
    <div className="vitrina">
      <ul className="vitrina__shelf">
        {withPhoto.map((it, i) => (
          <li key={it.name} style={{ "--i": i } as CSSProperties}>
            <div className="vitrina__slot">
              <img src={it.image} alt={it.name} className={it.cut ? `cut-${it.cut}` : undefined} loading="lazy" />
            </div>
            <p>
              {it.name}
              {it.favorite && <b aria-label="favorito de la casa"> ♥</b>}
              <span className="hand-note tnum">{priceOf(it)}</span>
            </p>
          </li>
        ))}
      </ul>
      {rest.length > 0 && (
        <p className="vitrina__more">
          <b>También en la carta:</b> {rest.map((it) => `${it.name} ${priceOf(it)}`).join(" · ")}
        </p>
      )}
    </div>
  );
}
