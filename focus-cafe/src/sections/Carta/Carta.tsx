import { useState } from "react";
import type { KeyboardEvent } from "react";
import { brand } from "../../data/assets";
import { MENU, itemsOf } from "../../data/menu";
import { CombosSemana } from "./CombosSemana";
import { Jumbo } from "./Jumbo";
import { MenuList } from "./MenuList";
import { Vitrina } from "./Vitrina";
import "./Carta.css";

type View = "lista" | "vitrina";

/** Mínimo de fotos que necesita una categoría para mostrarse como vitrina. */
const MIN_PHOTOS = 3;
const photosIn = (i: number) => itemsOf(MENU[i]).filter((it) => it.image).length;

/** 13:00 · Carta completa: categorías como titulares, lista editorial o vitrina, combos y el Jumbo. */
export function Carta() {
  const [cat, setCat] = useState(0);
  const [view, setView] = useState<View>("lista");

  const category = MENU[cat];
  const canShowcase = photosIn(cat) >= MIN_PHOTOS;
  const current: View = canShowcase ? view : "lista";

  const onTabKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const nextCat = (cat + (e.key === "ArrowRight" ? 1 : -1) + MENU.length) % MENU.length;
    setCat(nextCat);
    document.getElementById(`tab-${MENU[nextCat].id}`)?.focus();
  };

  return (
    <section id="carta" className="carta gutter" aria-labelledby="carta-title">
      <div className="container">
        <header className="carta__head">
          <div>
            <p className="eyebrow">La carta completa</p>
            <h2 className="section-title" id="carta-title">
              ¿Qué se te antoja?
            </h2>
          </div>
          <div className="carta__views" role="group" aria-label="Vista de la carta">
            <button type="button" aria-pressed={current === "lista"} onClick={() => setView("lista")}>
              Carta
            </button>
            <button
              type="button"
              aria-pressed={current === "vitrina"}
              disabled={!canShowcase}
              title={canShowcase ? undefined : "Esta categoría aún no tiene suficientes fotos"}
              onClick={() => setView("vitrina")}
            >
              Vitrina
            </button>
          </div>
        </header>

        <div className="carta__tabs-scroll">
          <div className="carta__tabs" role="tablist" aria-label="Categorías" onKeyDown={onTabKey}>
            {MENU.map((c, i) => (
              <button
                key={c.id}
                id={`tab-${c.id}`}
                type="button"
                role="tab"
                className="carta__tab"
                aria-selected={i === cat}
                aria-controls="carta-panel"
                tabIndex={i === cat ? 0 : -1}
                onClick={() => setCat(i)}
              >
                {c.label}
                <sup>{itemsOf(c).length}</sup>
              </button>
            ))}
          </div>
        </div>

        <div id="carta-panel" role="tabpanel" aria-labelledby={`tab-${category.id}`} className="carta__panel">
          {category.note && <p className="carta__note hand-note">{category.note}</p>}
          {current === "lista" ? <MenuList key={category.id} category={category} /> : <Vitrina key={category.id} category={category} />}
          {category.extras && <p className="carta__extras">{category.extras}</p>}
        </div>

        <p className="carta__legend">
          <span>
            <img src={brand.mascota_fuego} alt="" /> caliente
          </span>
          <span>
            <img src={brand.mascota_hielo} alt="" /> frío
          </span>
          <span>
            <b aria-hidden="true">♥</b> favoritos de la casa
          </span>
        </p>

        <CombosSemana />
        <Jumbo />
      </div>
    </section>
  );
}
