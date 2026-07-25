import { useState, useEffect } from "react";
import Marquee from "../ui/Marquee";
import { FESTIVAL_DATE } from "../../config";
import "./Countdown.css";

const TERMS = "BANDURRIAS · JUEGUITOS · CULTURA";

function diff(date) {
  const ms = new Date(date).getTime() - Date.now();
  if (Number.isNaN(ms) || ms <= 0) return null;
  return {
    dias: Math.floor(ms / 86400000),
    horas: Math.floor((ms % 86400000) / 3600000),
    min: Math.floor((ms % 3600000) / 60000),
  };
}

function Unidad({ n, label }) {
  return (
    <span className="countdown__unit">
      <span className="countdown__num">{String(n).padStart(2, "0")}</span>
      <span className="countdown__label">{label}</span>
    </span>
  );
}

// Un solo componente: sin fecha muestra la franja de texto; con fecha, el
// contador + la franja reducida abajo.
export default function Countdown({ date = FESTIVAL_DATE }) {
  const [left, setLeft] = useState(() => (date ? diff(date) : null));

  useEffect(() => {
    if (!date) return;
    setLeft(diff(date));
    const id = setInterval(() => setLeft(diff(date)), 20000);
    return () => clearInterval(id);
  }, [date]);

  if (!date || !left) {
    return <Marquee texto={TERMS} variant="cyan" />;
  }

  return (
    <div className="countdown">
      <div className="countdown__grid" role="timer" aria-label="Cuenta regresiva para el festival">
        <Unidad n={left.dias} label="días" />
        <Unidad n={left.horas} label="horas" />
        <Unidad n={left.min} label="min" />
      </div>
      <Marquee texto={TERMS} variant="cyan" className="countdown__strip" />
    </div>
  );
}
