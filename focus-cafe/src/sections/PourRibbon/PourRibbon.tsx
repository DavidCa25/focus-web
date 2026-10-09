import { CurvedMarquee } from "../../components/CurvedMarquee";
import { MARQUEE } from "../../data/site";
import "./PourRibbon.css";

/** Cinta de vertido: el texto corre sobre una curva y acelera con el scroll. */
export function PourRibbon() {
  return (
    <div className="ribbon">
      <CurvedMarquee
        text={MARQUEE.day}
        viewBox="0 0 1600 300"
        path="M-60,250 C260,60 620,40 860,160 S1360,300 1680,70"
        ribbon={{ color: "var(--verde)", width: 78 }}
      />
    </div>
  );
}
