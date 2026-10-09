import { useState } from "react";
import type { CSSProperties } from "react";
import { brand } from "../../data/assets";
import { hasTemperatures, itemsOf } from "../../data/menu";
import type { MenuCategory, MenuItem } from "../../data/menu";

const money = (n?: number) => (n === undefined ? "—" : `$${n}`);

function Prices({ item, temps }: { item: MenuItem; temps: boolean }) {
  if (item.price !== undefined || !temps) {
    return (
      <span className="menu-row__price menu-row__price--single tnum">
        {item.price !== undefined ? money(item.price) : "del día"}
      </span>
    );
  }
  return (
    <>
      <span className="menu-row__price tnum" aria-label={`Caliente ${money(item.hot)}`}>
        {money(item.hot)}
      </span>
      <span className="menu-row__price tnum" aria-label={`Frío ${money(item.cold)}`}>
        {money(item.cold)}
      </span>
    </>
  );
}

/** Lo que se ve a la derecha: la foto del producto activo o, si no hay foto, su ficha tipográfica. */
function Plate({ item }: { item: MenuItem }) {
  const price =
    item.price !== undefined
      ? money(item.price)
      : [item.hot && `caliente ${money(item.hot)}`, item.cold && `frío ${money(item.cold)}`].filter(Boolean).join(" · ");

  return (
    <div className="menu-plate" aria-hidden="true">
      {item.image ? (
        <>
          <img key={item.name} src={item.image} alt="" className={item.cut ? `cut-${item.cut}` : undefined} />
          <span className="menu-plate__caption hand-note">
            {item.name.toLowerCase()}
            {price && ` · ${price}`}
          </span>
        </>
      ) : (
        <div key={item.name} className="menu-plate__ticket">
          <b>{item.name}</b>
          {item.description && <p>{item.description}</p>}
          {price && <span className="hand-note">{price}</span>}
        </div>
      )}
    </div>
  );
}

export function MenuList({ category }: { category: MenuCategory }) {
  const items = itemsOf(category);
  const temps = hasTemperatures(category);
  const [active, setActive] = useState(items.find((it) => it.image) ?? items[0]);
  let index = 0;

  return (
    <div className="menu-list">
      <div>
        {temps && (
          <div className="menu-row menu-row--temps menu-row--head" aria-hidden="true">
            <span className="menu-row__thumb" />
            <span />
            <img src={brand.mascota_fuego} alt="" title="Caliente" />
            <img src={brand.mascota_hielo} alt="" title="Frío" />
          </div>
        )}

        {category.groups.map((group, gi) => (
          <div key={gi} className="menu-group">
            {group.title && <h3 className="menu-group__title">{group.title}</h3>}
            {group.note && <p className="menu-group__note">{group.note}</p>}
            <ul>
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className={`menu-row ${temps ? "menu-row--temps" : ""} ${item === active ? "is-active" : ""}`}
                  style={{ "--i": index++ } as CSSProperties}
                  tabIndex={0}
                  onMouseEnter={() => setActive(item)}
                  onFocus={() => setActive(item)}
                >
                  {item.image ? (
                    <img className="menu-row__thumb" src={item.image} alt="" loading="lazy" />
                  ) : (
                    <span className="menu-row__thumb" />
                  )}
                  <span className="menu-row__text">
                    <span className="menu-row__name">
                      {item.name}
                      {item.favorite && (
                        <b className="menu-row__fav" aria-label="favorito de la casa">
                          ♥
                        </b>
                      )}
                    </span>
                    {item.description && <span className="menu-row__desc">{item.description}</span>}
                  </span>
                  <Prices item={item} temps={temps} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Plate item={active} />
    </div>
  );
}
