import { DayClock } from "./components/DayClock";
import { SiteHeader } from "./components/SiteHeader";
import { Barra } from "./sections/Barra/Barra";
import { Carta } from "./sections/Carta/Carta";
import { Experiencia } from "./sections/Experiencia/Experiencia";
import { Hero } from "./sections/Hero/Hero";
import { Noche } from "./sections/Noche/Noche";
import { Personajes } from "./sections/Personajes/Personajes";
import { PourRibbon } from "./sections/PourRibbon/PourRibbon";

/** La página es un día en Focus: de las 07:00 (crema) a las 20:00 (noche). */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#carta">
        Saltar a la carta
      </a>
      <SiteHeader />
      <main>
        {/* 07:30 */}
        <Hero />
        <PourRibbon />
        {/* 10:00 */}
        <Barra />
        {/* 13:00 */}
        <Carta />
        {/* 16:00 */}
        <Personajes />
        {/* 18:00 */}
        <Experiencia />
        {/* 20:00 · video, visita y footer */}
        <Noche />
      </main>
      <DayClock />
    </>
  );
}
