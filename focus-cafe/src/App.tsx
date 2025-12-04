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
  ref: React.RefObject<HTMLDivElement>;
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
    <section id="inicio" className="section hero">
      <div className="section-inner hero-grid" ref={ref}>
        <div className={`hero-text fade-up ${isVisible ? "is-visible" : ""}`}>
          <div className="hero-tag">Otra forma de disfrutar el café</div>
          <h1 className="hero-title">
            Focus Café
            <span className="hero-highlight">
              {" "}
              desayunos y café de especialidad
            </span>
          </h1>
          <p className="hero-subtitle">
            Croissants, waffles, sandwiches y café de fincas de Veracruz y
            Puebla. Un espacio pensado para que tu mañana tenga su propio
            ritual.
          </p>
          <div className="hero-badges">
            <span className="badge">Sabroso</span>
            <span className="badge">Café de especialidad</span>
            <span className="badge">Ambiente de barrio</span>
          </div>
          <div className="hero-actions">
            <a href="#menu" className="btn-primary">
              Ver menú
            </a>
            <a href="#experiencia" className="btn-secondary">
              Ver experiencia en el local
            </a>
          </div>
          <p className="hero-note">
            Calzada Tepeyac 401 Local A · Colonia León Moderno · León,
            Guanajuato
          </p>
        </div>

        <div
          className={`hero-visual fade-up ${isVisible ? "is-visible" : ""}`}
        >
          <div className="hero-card hero-card-focus">
            <div className="hero-card-header">
              <h2>Primera parada del día</h2>
              <p>Un café claro, un desayuno sencillo y personajes que recuerdas.</p>
            </div>
            <div className="hero-card-body">
              <ul>
                <li>Café de especialidad de Veracruz y Puebla</li>
                <li>Desayunos completos y pan dulce</li>
                <li>Espacio cómodo para trabajar o estudiar</li>
                <li>Identidad visual presente en todo el lugar</li>
              </ul>
            </div>
            <div className="hero-character-placeholder hero-character-img">
              <img
                src={cupVerde}
                alt="Personaje taza Focus Café"
              />
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
    "CAFÉ Y DESAYUNOS",
    "DE TODOS LOS DÍAS",
    "FOCUS CAFÉ",
    "CAFÉ DE ESPECIALIDAD",
    "AMBIENTE DE BARRIO",
    "DESAYUNOS TODO EL DÍA"
  ];

  return (
    <section className="marquee-strip">
      <div className="marquee-inner">
        {/* Duplicamos para loop infinito perfecto */}
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
          <p className="section-label">Carta Focus Café</p>
          <h2 className="section-title">Café y desayunos de todos los días</h2>
          <p className="section-description">
            Inspirado en tu menú físico, este tablero muestra una selección de
            bebidas y platillos clave. En la versión final puedes conectar con
            tu carta completa o plataformas de pedido.
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
            <div className="menu-highlight-tag">Combo recomendado</div>
            <h3>Cold brew y croissant de jamón</h3>
            <p>
              Un clásico ligero para arrancar el día con energía. El cold brew
              resalta notas de cacao y caramelo que combinan con el croissant
              salado.
            </p>
            <ul className="menu-highlight-list">
              <li>Ideal para quienes vienen de paso</li>
              <li>Disponible para consumir aquí o para llevar</li>
              <li>Se puede personalizar con leches vegetales</li>
            </ul>
            <span className="menu-highlight-pill">
              Café de especialidad de Veracruz y Puebla
            </span>
          </div>
        </div>

        <p className="menu-note">
          Todos los productos y precios son de ejemplo. En producción se
          reemplazan con los de tu carta oficial.
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
          <h2 className="section-title">Más que una taza de café</h2>
          <p className="section-description">
            El sitio web y el menú físico cuentan la misma historia: personajes
            amigables, colores reconocibles y un espacio que puedes sentir
            incluso antes de venir.
          </p>
        </div>

        <div className="experience-grid">
          <div className="experience-card">
            <div className="experience-icon">
              <img src={teteraVerde} alt="Tetera Focus Café" />
            </div>
            <h3>Para sentarte un rato</h3>
            <p>
              Mesas cómodas, enchufes disponibles y una barra donde puedes ver
              cómo se prepara tu bebida.
            </p>
          </div>

          <div className="experience-card experience-card--highlight">
            <div className="experience-icon">
              <img src={cupPastel} alt="Taza Focus Café" />
            </div>
            <h3>Para tu ritual diario</h3>
            <p>
              Personas que te reconocen, un café preparado a tu gusto y
              personajes que se repiten en tazas, paredes y en este sitio.
            </p>
          </div>

          <div className="experience-card">
            <div className="experience-icon">
              <img src={cafecitoImg} alt="Vaso cafecito Focus Café" />
            </div>
            <h3>Para llevar contigo</h3>
            <p>
              Opciones para llevar sin perder la experiencia: vasos ilustrados,
              mensajes breves y la misma calidad de café.
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
    { src: cupAnimado, alt: "Taza animada" },
  ];

  return (
    <section className="section characters-mural">
      <div className="section-inner" ref={ref}>
        <div className="mural-header">
          <p className="section-label">Mural Focus Café</p>
          <h2 className="section-title">Un muro lleno de personajes</h2>
          <p className="section-description">
            Igual que en tu menú físico, este mural digital reúne a todas las
            versiones de tus personajes. Aparecen uno por uno, como si se
            fueran acomodando en la pared.
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
          <h2 className="section-title">Un café de barrio con alma</h2>
          <p className="section-description">
            Focus Café nació con la idea de darle otra forma a las mañanas:
            café de especialidad, desayunos sencillos y un espacio donde se
            antoje quedarse. Queremos que la gente nos reconozca por el sabor y
            por los detalles.
          </p>

          <ul className="about-list">
            <li>
              <span className="about-icon">A</span>
              <span>
                <strong>Ingredientes seleccionados:</strong> uso de insumos
                locales y opciones orgánicas siempre que es posible.
              </span>
            </li>
            <li>
              <span className="about-icon">B</span>
              <span>
                <strong>Café de especialidad:</strong> granos de Veracruz y
                Puebla con tostados pensados para el día a día.
              </span>
            </li>
            <li>
              <span className="about-icon">C</span>
              <span>
                <strong>Diseño coherente:</strong> del menú a la web, la misma
                identidad de personajes y colores.
              </span>
            </li>
          </ul>

          <div className="about-tagline">
            Hecho en León, con el ambiente de una cafetería de barrio.
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
          <h2 className="section-title">Agenda tu siguiente visita</h2>
          <p className="section-description">
            Puedes pasar directamente, anticipar tu pedido o reservar una mesa
            para una reunión pequeña. Estos datos se adaptan a la operación real
            de Focus Café.
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
              Aquí puedes insertar el mapa de Google Maps con la ubicación de
              Focus Café.
            </div>
            <p className="map-note">
              En producción, este cuadro se reemplaza con el iframe oficial de
              Google Maps para que las personas ubiquen tu cafetería con un
              clic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
