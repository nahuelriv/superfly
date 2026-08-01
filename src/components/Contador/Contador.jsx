import { useState, useEffect } from "react";
import Star from "../ui/Star";
import { edicionAnterior } from "../../data/festival";
import { FESTIVAL_DATE } from "../../config";
import "./Contador.css";

const DIA = 86400000;

const diasDesde = (iso) => Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / DIA));
const diasHasta = (iso) => Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / DIA));

// Contador de días. Por defecto cuenta hacia ARRIBA desde la última edición
// ("hace X días que no pasa nada bueno"). Cuando se cargue FESTIVAL_DATE en
// config.js, se invierte solo a cuenta REGRESIVA ("faltan X días").
export default function Contador() {
  const regresiva = Boolean(FESTIVAL_DATE);
  const calc = () =>
    regresiva ? diasHasta(FESTIVAL_DATE) : diasDesde(edicionAnterior.fechaISO);

  const [dias, setDias] = useState(calc);

  useEffect(() => {
    // Se recalcula contra new Date() cada hora (cambia de día sin recargar).
    const id = setInterval(() => setDias(calc()), 60 * 60 * 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="contador"
      aria-label={regresiva ? "Días para el próximo festival" : "Días desde la última edición"}
    >
      <div className="contador__banda">
        <Star className="contador__star contador__star--1" color="var(--sf-blanco)" />
        <Star className="contador__star contador__star--2" color="var(--sf-cyan)" />

        <div className="sf-container contador__inner">
          <p className="contador__pre">{regresiva ? "Faltan" : "Hace"}</p>
          <p className="contador__num titular-a">{dias.toLocaleString("es-AR")}</p>
          <p className="contador__post">
            {regresiva
              ? "días para el mejor festival del mundo"
              : "días que no pasa nada bueno"}
          </p>
        </div>
      </div>
    </section>
  );
}
