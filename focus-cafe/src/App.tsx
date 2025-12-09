import React, { useEffect, useRef, useState } from "react";
import cafecitoImg from "./assets/cafe_animado.png";
import cafeAnimado from "./assets/cafe_animado.png";
import cafeNegra from "./assets/cafe_negra.png";
import cafePastel from "./assets/cafe_pastel.png";
import cafeVerde from "./assets/cafe_verde.png";

import cupAnimado from "./assets/cup_animado.png";
import cupNegra from "./assets/cup_negra.png";
import cupPastel from "./assets/cup_pastel.png";
import cupVerde from "./assets/cup_verde.png";

import teteraAnimado from "./assets/tetera_animado.png";
import teteraNegra from "./assets/tetera_negra.png";
import teteraPastel from "./assets/tetera_pastel.png";
import teteraVerde from "./assets/tetera_verde.png";

import focus from "./assets/Focus.jpeg";
import focusLogo from "./assets/focus_logo.png";

/* ----- Hook para animar cuando el bloque entra al viewport ----- */
type InViewReturn = {
  ref: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
};

function useInViewAnimation(): InViewReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

const App: React.FC = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <div className="page-root">
      {/* Fondo decorativo de granos */}
      <div className="coffee-beans-bg" aria-hidden="true">
        <div className="bean" />
        <div className="bean" />
        <div className="bean" />
        <div className="bean" />
      </div>

      {/* NAVBAR */}
      <header className={`navbar ${navScrolled ? "navbar--scrolled" : ""}`}>
        <div className="nav-inner">
          <div
            className="brand"
            onClick={() => handleNavClick("inicio")}
            style={{ cursor: "pointer" }}
          >
            <div className="brand-logo" aria-hidden="true">
              <img
                src={focusLogo}
                alt="Logo Focus Café"
                className="brand-logo-img"
              />
            </div>
            <div className="brand-text">
              <div className="brand-title">Focus Café</div>
              <div className="brand-subtitle">Cafetería y desayunos</div>
            </div>
          </div>

          <button
            className="nav-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Abrir menú"
          >
            <span className="nav-toggle-line" />
            <span className="nav-toggle-line" />
          </button>

          <nav className={`nav-links ${mobileOpen ? "nav-links--open" : ""}`}>
            <button
              onClick={() => handleNavClick("menu")}
              className="nav-link"
            >
              Menú
            </button>
            <button
              onClick={() => handleNavClick("experiencia")}
              className="nav-link"
            >
              Experiencia
            </button>
            <button
              onClick={() => handleNavClick("quienes-somos")}
              className="nav-link"
            >
              Quiénes somos
            </button>
            <button
              onClick={() => handleNavClick("contacto")}
              className="nav-link"
            >
              Contáctanos
            </button>
            <button
              onClick={() => handleNavClick("menu")}
              className="nav-cta"
            >
              Ver menú completo
            </button>
          </nav>
        </div>
      </header>

      <main>
        <HeroSection />
        <HeroMarquee />
        <MenuPreviewSection />
        <ExperienceSection />
        <CharactersMural />
        <AboutSection />
        <ContactSection />
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Focus Café. Cafetería y desayunos.
      </footer>
    </div>
  );
};

/* ---------- HERO ---------- */

const HeroSection: React.FC = () => {
  const { ref, isVisible } = useInViewAnimation();

  return (
    <section id="inicio" className="hero hero-brew">
      <div
        ref={ref}
        className={`hero-brew-inner fade-up ${isVisible ? "is-visible" : ""}`}
      >
        {/* LADO IZQUIERDO: TEXTO */}
        <div className="hero-brew-left">
          <p className="hero-brew-kicker">Café de especialidad en León</p>

          <h1 className="hero-brew-title">
            <span>Así empiezan</span>
            <span>las mañanas</span>
            <span>en Focus Café.</span>
          </h1>

          <p className="hero-brew-copy">
            Café de fincas mexicanas, desayunos preparados al momento y un
            espacio diseñado para que quieras volver mañana.
          </p>

          <button
            className="hero-brew-button"
            onClick={() => {
              const el = document.getElementById("menu");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Ver menú
          </button>
        </div>

        {/* LADO DERECHO: PRODUCTO / MARCA */}
        <div className="hero-brew-right">
          <div className="hero-brew-product">
            <img
              src={focusLogo}
              alt="Tarjeta de marca Focus Café"
              className="hero-brew-product-main"
            />

            <div className="hero-brew-product-tag">Focus Café</div>

            <div className="hero-brew-product-character">
              <img src={cupNegra} alt="Personaje taza Focus Café" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- MARQUEE HERO ---------- */

const HeroMarquee: React.FC = () => {
  const marqueeItems = [
    "CAFÉ DE ESPECIALIDAD",
    "DESAYUNOS TODO EL DÍA",
    "FOCUS CAFÉ",
    "PAN RECIÉN HORNEADO",
    "AMBIENTE DE BARRIO",
    "PARA LLEVAR O QUEDARSE"
  ];

  return (
    <section className="marquee-strip">
      <div className="marquee-inner">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </section>
  );
};

/* ---------- MENÚ ---------- */

interface MenuItemProps {
  name: string;
  price: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, price }) => (
  <div className="menu-item">
    <span>{name}</span>
    <span className="menu-item-price">{price}</span>
  </div>
);

const MenuPreviewSection: React.FC = () => {
  const { ref, isVisible } = useInViewAnimation();

  return (
    <section id="menu" className="section section-menu">
      <div
        className={`section-inner fade-up ${isVisible ? "is-visible" : ""}`}
        ref={ref}
      >
        <div className="section-header section-header--center">
          <p className="section-label">Menú Focus Café</p>
          <h2 className="section-title">Café, desayunos y algo dulce</h2>
          <p className="section-description">
            Una carta pensada para acompañar cada momento del día: desde el
            primer espresso de la mañana hasta el último antojo de la tarde.
          </p>
        </div>

        <div className="menu-grid">
          <div className="menu-column">
            <h3 className="menu-column-title">Café caliente</h3>
            <MenuItem name="Flat white" price="$55" />
            <MenuItem name="Cappuccino" price="$60" />
            <MenuItem name="Espresso americano" price="$40" />
            <MenuItem name="Mocha" price="$65" />
            <MenuItem name="Latte" price="$65" />

            <h3 className="menu-column-title" style={{ marginTop: "1rem" }}>
              Café frío
            </h3>
            <MenuItem name="Latte frío" price="$75" />
            <MenuItem name="Caramel macchiato" price="$75" />
            <MenuItem name="Café vietnamita" price="$75" />
            <MenuItem name="Cold brew para llevar" price="$45" />
          </div>

          <div className="menu-column">
            <h3 className="menu-column-title">Desayunos</h3>
            <MenuItem name="Sandwich Focus" price="$90" />
            <MenuItem name="Sandwich de atún" price="$70" />
            <MenuItem name="Grilled cheese" price="$65" />
            <MenuItem name="Croissant de jamón" price="$70" />
            <MenuItem name="Waffles con fruta" price="$45" />
            <MenuItem name="Açaí de frutos rojos" price="$55" />

            <h3 className="menu-column-title" style={{ marginTop: "1rem" }}>
              Pan dulce
            </h3>
            <MenuItem name="Strudel de manzana" price="$30" />
            <MenuItem name="Pay de queso" price="$30" />
            <MenuItem name="Mini croissant" price="$25" />
          </div>

          <div className="menu-highlight-card">
            <div className="menu-highlight-tag">Recomendación del día</div>
            <h3>Cold brew y croissant de jamón</h3>
            <p>
              Un combo ligero y lleno de sabor. El cold brew resalta notas de
              cacao y caramelo que equilibran perfecto el croissant salado.
            </p>
            <ul className="menu-highlight-list">
              <li>Ideal para arrancar la mañana sin prisas</li>
              <li>Disponible para consumir aquí o para llevar</li>
              <li>Opción de leches vegetales y jarabes de temporada</li>
            </ul>
            <span className="menu-highlight-pill">
              Café de especialidad de Veracruz y Puebla
            </span>
          </div>
        </div>

        <p className="menu-note">
          Los productos, preparaciones y precios pueden cambiar por temporada.
          Pregunta en barra por las novedades del día.
        </p>
      </div>
    </section>
  );
};

/* ---------- EXPERIENCIA ---------- */

const ExperienceSection: React.FC = () => {
  const { ref, isVisible } = useInViewAnimation();

  return (
    <section id="experiencia" className="section section-experience">
      <div
        className={`section-inner fade-up ${isVisible ? "is-visible" : ""}`}
        ref={ref}
      >
        <div className="section-header section-header--left">
          <p className="section-label">Experiencia Focus Café</p>
          <h2 className="section-title">Tu punto fijo para el café</h2>
          <p className="section-description">
            Focus Café es ese lugar al que regresas porque ya sabes cómo te
            gusta el café, dónde te quieres sentar y qué vas a pedir.
          </p>
        </div>

        <div className="experience-grid">
          <div className="experience-card">
            <div className="experience-icon">
              <img src={teteraVerde} alt="Tetera Focus Café" />
            </div>
            <h3>Para quedarte un rato</h3>
            <p>
              Mesas cómodas, enchufes disponibles, buena luz y música a un
              volumen que permite conversar o trabajar.
            </p>
          </div>

          <div className="experience-card experience-card--highlight">
            <div className="experience-icon">
              <img src={cupPastel} alt="Taza Focus Café" />
            </div>
            <h3>Para tu rutina diaria</h3>
            <p>
              Un equipo que ya conoce tu pedido, café servido a tu gusto y una
              identidad visual que te acompaña en cada detalle.
            </p>
          </div>

          <div className="experience-card">
            <div className="experience-icon">
              <img src={cafecitoImg} alt="Vaso cafecito Focus Café" />
            </div>
            <h3>Para llevar contigo</h3>
            <p>
              Opciones para llevar que mantienen la calidad del café y el toque
              de los personajes de Focus en cada vaso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- FRANJA DE PERSONAJES ---------- */

const CharactersMural: React.FC = () => {
  const { ref, isVisible } = useInViewAnimation();

  const muralCharacters = [
    { src: teteraVerde, alt: "Tetera verde" },
    { src: cupVerde, alt: "Taza verde" },
    { src: cafeVerde, alt: "Vaso verde" },
    { src: teteraPastel, alt: "Tetera pastel" },
    { src: cupPastel, alt: "Taza pastel" },
    { src: cafePastel, alt: "Vaso pastel" },
    { src: teteraNegra, alt: "Tetera negra" },
    { src: cupNegra, alt: "Taza negra" },
    { src: cafeNegra, alt: "Vaso negro" },
    { src: teteraAnimado, alt: "Tetera animada" },
    { src: cupAnimado, alt: "Taza animada" },
    { src: cafeAnimado, alt: "Vaso animado" },
    { src: cupVerde, alt: "Taza verde" },
    { src: cafePastel, alt: "Vaso pastel" },
    { src: teteraNegra, alt: "Tetera negra" },
    { src: cupAnimado, alt: "Taza animada" }
  ];

  return (
    <section className="section characters-mural">
      <div className="section-inner" ref={ref}>
        <div className="mural-header">
          <p className="section-label">Mural Focus Café</p>
          <h2 className="section-title">Personajes que se quedan contigo</h2>
          <p className="section-description">
            Los personajes de Focus aparecen en el menú, en las tazas y ahora
            también en este mural digital. Una forma de reconocer el café antes
            incluso de probarlo.
          </p>
        </div>

        <div
          className={`mural-grid ${
            isVisible ? "mural-grid--visible" : ""
          }`}
        >
          {muralCharacters.map((item, index) => (
            <div
              key={index}
              className="mural-item"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <img src={item.src} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- QUIÉNES SOMOS ---------- */

const AboutSection: React.FC = () => {
  const { ref, isVisible } = useInViewAnimation();

  return (
    <section id="quienes-somos" className="section section-about">
      <div
        className={`section-inner about-grid fade-up ${
          isVisible ? "is-visible" : ""
        }`}
        ref={ref}
      >
        <div className="about-text">
          <p className="section-label">Quiénes somos</p>
          <h2 className="section-title">Un café de barrio con personalidad</h2>
          <p className="section-description">
            Focus Café nace de la idea de tener un lugar sencillo, honesto y
            bien cuidado, donde lo importante es cómo te sientes cuando te
            sirven tu café.
          </p>

          <ul className="about-list">
            <li>
              <span className="about-icon">A</span>
              <span>
                <strong>Ingredientes seleccionados:</strong> preferimos insumos
                locales, productos frescos y opciones más ligeras para el día a
                día.
              </span>
            </li>
            <li>
              <span className="about-icon">B</span>
              <span>
                <strong>Café de especialidad:</strong> granos de Veracruz y
                Puebla con tostados pensados para resaltar sabor, no solo
                cafeína.
              </span>
            </li>
            <li>
              <span className="about-icon">C</span>
              <span>
                <strong>Identidad clara:</strong> personajes, colores y menú
                cuentan la misma historia, desde la fachada hasta la web.
              </span>
            </li>
          </ul>

          <div className="about-tagline">
            Hecho en León, con la calidez de una cafetería de barrio.
          </div>
        </div>

        <div className="about-card">
          <div className="about-label">Momento Focus</div>

          <div className="about-photo-placeholder">
            <img
              src={focus}
              alt="Interior de Focus Café"
              className="about-photo-img"
            />
          </div>
          <p>
            Cada detalle del espacio está pensado para que tu café, tu desayuno
            y tu tiempo aquí se sientan como una pausa necesaria en el día.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ---------- CONTACTO ---------- */

const ContactSection: React.FC = () => {
  const { ref, isVisible } = useInViewAnimation();

  return (
    <section id="contacto" className="section section-contact">
      <div
        className={`section-inner contact-grid fade-up ${
          isVisible ? "is-visible" : ""
        }`}
        ref={ref}
      >
        <div className="contact-info">
          <p className="section-label">Visítanos</p>
          <h2 className="section-title">Tu mesa te espera</h2>
          <p className="section-description">
            Pasa por tu café de camino al trabajo, quédate a desayunar o arma
            una reunión pequeña. Escríbenos o llámanos para coordinar tu visita.
          </p>

          <div className="contact-block">
            <h3 className="contact-heading">Dirección</h3>
            <p>
              Calzada Tepeyac 401 Local A
              <br />
              Colonia León Moderno · León, Guanajuato
            </p>
          </div>

          <div className="contact-block">
            <h3 className="contact-heading">Anticipa tu pedido</h3>
            <p>Teléfono 1: 33 1781 2099</p>
            <p>Teléfono 2: 477 567 0088</p>

            <div className="contact-actions">
              <a
                className="btn-whatsapp"
                href="https://wa.me/523317812099"
                target="_blank"
                rel="noreferrer"
              >
                Pedir por WhatsApp
              </a>
              <button className="btn-ghost" type="button">
                Guardar contacto
              </button>
            </div>
          </div>
        </div>

        <div className="contact-map">
          <div className="map-card">
            <div className="map-placeholder">
              Mapa de ubicación de Focus Café en Google Maps.
            </div>
            <p className="map-note">
              Usa el mapa interactivo para encontrar la ruta más rápida hacia
              Focus Café y planear tu próxima visita.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
