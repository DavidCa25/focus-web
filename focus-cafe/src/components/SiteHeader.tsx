import { useEffect, useState } from "react";
import { brand } from "../data/assets";
import { NAV } from "../data/site";
import "./SiteHeader.css";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <a href="#inicio" className="header__brand" onClick={close}>
        <img src={brand.logo_negro} alt="Focus Café, inicio" width="120" height="46" />
      </a>

      <nav id="nav-principal" className="header__nav" aria-label="Principal">
        <ul>
          {NAV.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="pill pill--solid header__cta" href="#carta" onClick={close}>
          Ver la carta
        </a>
      </nav>

      <button
        type="button"
        className="header__toggle"
        aria-expanded={open}
        aria-controls="nav-principal"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
