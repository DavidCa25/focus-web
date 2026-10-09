import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Los estilos globales van antes que App para que los de cada sección puedan sobrescribirlos.
import "./styles/tokens.css";
import "./styles/base.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
