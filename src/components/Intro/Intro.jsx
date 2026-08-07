import { useEffect, useRef, useState, useCallback } from "react";
import Star from "../ui/Star";
import { logo } from "../../data/festival";
import "./Intro.css";

const prefiereMenosMovimiento = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const marcarListo = () => {
  document.documentElement.classList.remove("is-loading");
  document.documentElement.classList.add("is-ready"); // dispara la entrada del hero
};

// Pantalla de carga breve: "attract screen" de arcade sobre navy, con salida en
// cortina que revela la página. Excepción aprobada al §4, mitigada: corta,
// salteable, una vez por sesión, off con prefers-reduced-motion.
export default function Intro() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (prefiereMenosMovimiento()) return false;
    return !sessionStorage.getItem("sf-intro");
  });
  const [cerrando, setCerrando] = useState(false);
  const timers = useRef([]);

  const salir = useCallback(() => {
    setCerrando((yaCerrando) => {
      if (yaCerrando) return yaCerrando;
      // La cortina sube; recién al terminar se desmonta y ahí entra el hero
      // (marcarListo se dispara en el efecto al pasar visible a false).
      const t = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 480);
      timers.current.push(t);
      return true;
    });
  }, []);

  useEffect(() => {
    if (!visible) {
      marcarListo(); // sin intro (ya vista / reduced-motion): entrada normal
      return;
    }
    document.documentElement.classList.add("is-loading");
    sessionStorage.setItem("sf-intro", "1");
    document.body.style.overflow = "hidden";

    const auto = setTimeout(salir, 1800);
    timers.current.push(auto);
    window.addEventListener("click", salir);
    window.addEventListener("keydown", salir);
    window.addEventListener("touchstart", salir, { passive: true });

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      window.removeEventListener("click", salir);
      window.removeEventListener("keydown", salir);
      window.removeEventListener("touchstart", salir);
      document.body.style.overflow = "";
    };
  }, [visible, salir]);

  if (!visible) return null;

  return (
    <div className={`intro crt-screen ${cerrando ? "intro--out" : ""}`} aria-hidden="true">
      <Star className="intro__star intro__star--1" color="var(--sf-cyan)" />
      <Star className="intro__star intro__star--2" color="var(--sf-rosa)" />

      <div className="intro__arcade">
        <div className="intro__hud">
          <span className="intro__hud-col">
            <span className="intro__hud-label">1UP</span>
            <span className="intro__score">000000</span>
          </span>
          <span className="intro__hud-col intro__hud-col--r">
            <span className="intro__hud-label">HIGH SCORE</span>
            <span className="intro__score">021972</span>
          </span>
        </div>

        <img className="intro__logo" src={logo.src} alt={logo.alt} width="1530" height="580" />

        <p className="intro__coin">
          <span className="intro__arrow">►</span> Insert coin{" "}
          <span className="intro__arrow">◄</span>
        </p>

        <p className="intro__credit">© 1972 · Credit 00</p>
      </div>
    </div>
  );
}
