import { CurvedMarquee } from "../../components/CurvedMarquee";
import { VideoDialog } from "../../components/VideoDialog";
import { brand, photos } from "../../data/assets";
import { BRAND_VIDEO, CONTACT, MARQUEE, VCARD } from "../../data/site";
import "./Noche.css";

const vcardHref = `data:text/vcard;charset=utf-8,${encodeURIComponent(VCARD)}`;

/** 20:00 · El video se ve a través de la palabra; después, cómo llegar. */
export function Noche() {
  return (
    <section id="noche" className="noche" aria-labelledby="visita-title">
      <CurvedMarquee
        className="noche__neon"
        text={MARQUEE.night}
        viewBox="0 0 1600 160"
        path="M-60,140 C400,10 1200,10 1660,140"
        speed={0.5}
        repeat={6}
      />
      <img className="noche__fuego" src={brand.mascota_fuego} alt="" />

      {/* ---------- Video de marca ---------- */}
      <div className="reel gutter">
        <p className="eyebrow reel__eyebrow">Focus en movimiento</p>
        <VideoDialog
          src={BRAND_VIDEO}
          poster={photos.local}
          title="Video de marca de Focus Café"
          className="reel__word"
        >
          <span className="reel__letters" style={{ backgroundImage: `url(${photos.local})` }}>
            FOCUS
          </span>
          <span className="reel__play" aria-hidden="true" />
        </VideoDialog>
        <p className="reel__hint">Toca la palabra para ver el video.</p>
      </div>

      {/* ---------- Visítanos ---------- */}
      <div className="visit container gutter">
        <div>
          <p className="eyebrow reel__eyebrow">Visítanos</p>
          <h2 className="visit__title" id="visita-title">
            {CONTACT.street}
          </h2>
          <p className="visit__area">{CONTACT.area}</p>
          <div className="visit__actions">
            <a className="pill visit__pill visit__pill--solid" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">
              Cómo llegar →
            </a>
            <a className="pill visit__pill" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
              Pedir por WhatsApp
            </a>
            <a className="pill visit__pill" href={vcardHref} download="focus-cafe.vcf">
              Guardar contacto
            </a>
          </div>
        </div>

        <dl className="visit__facts">
          {CONTACT.phones.map((phone) => (
            <div key={phone}>
              <dt>Teléfono</dt>
              <dd>
                <a className="tnum" href={`tel:+52${phone.replace(/\s/g, "")}`}>
                  {phone}
                </a>
              </dd>
            </div>
          ))}
          <div>
            <dt>Menú de tarde</dt>
            <dd>Jue y vie · 4 a 8 pm</dd>
          </div>
          {CONTACT.hours && (
            <div>
              <dt>Horario</dt>
              <dd>{CONTACT.hours}</dd>
            </div>
          )}
          <div>
            <dt>Para llevar</dt>
            <dd>Sí</dd>
          </div>
        </dl>
      </div>

      <footer className="footer gutter">
        <span>
          <b>Focus Café</b> · Cafetería y desayunos
        </span>
        <span>© {new Date().getFullYear()} · Hecho en León</span>
      </footer>
    </section>
  );
}
