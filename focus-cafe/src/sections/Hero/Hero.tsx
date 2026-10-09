import { SplitText } from "../../components/SplitText";
import { brand, products } from "../../data/assets";
import "./Hero.css";

const Arrow = () => (
  <svg viewBox="0 0 90 50" aria-hidden="true">
    <path d="M4 44 C 30 40, 55 28, 82 8 M70 8 L83 7 L79 19" />
  </svg>
);

/** 07:30 · La bebida atraviesa la palabra FOCUS: la mitad queda detrás y el contorno pasa por delante. */
export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__art" aria-hidden="true">
        <div className="hero__sun" />
        <div className="hero__word">FOCUS</div>
        <div className="hero__ground" />
        <div className="hero__float">
          <img className="hero__cup" src={products.cafe_vietnamita} alt="" />
        </div>
        <div className="hero__word hero__word--front">FOCUS</div>
        <img className="hero__ice" src={brand.mascota_hielo} alt="" />
        <img className="hero__spark" src={brand.destello} alt="" />
        <p className="hero__note hero__note--a hand-note">
          <Arrow />
          solo en
          <br />
          frío
        </p>
        <p className="hero__note hero__note--b hand-note">
          <Arrow />
          ♡ de los más
          <br />
          pedidos
        </p>
      </div>

      <div className="hero__copy">
        <p className="eyebrow">Café de especialidad en León</p>
        <SplitText as="h1" lines={["Así empiezan", "las mañanas", "en Focus."]} delay={500} className="hero__title" />
        <p className="hero__lede">
          Café de fincas de Veracruz y Puebla, desayunos preparados al momento y un lugar al que quieres volver
          mañana.
        </p>
        <a className="pill pill--solid" href="#carta">
          Ver la carta →
        </a>
      </div>

      <dl className="hero__spec" aria-label="Bebida destacada">
        <div className="hero__spec-head">
          <dt>N.º 01</dt>
          <dd>Café vietnamita</dd>
        </div>
        <div>
          <dt>Servido</dt>
          <dd>Frío</dd>
        </div>
        <div>
          <dt>Lista</dt>
          <dd>Los más pedidos</dd>
        </div>
        <div>
          <dt>Precio</dt>
          <dd className="tnum">$75</dd>
        </div>
      </dl>
    </section>
  );
}
