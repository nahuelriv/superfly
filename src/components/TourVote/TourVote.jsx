import { useEffect, useRef, useState } from "react";
import Burst from "../ui/Burst";
import PlaneIcon from "../ui/PlaneIcon";
import "./TourVote.css";

// Data estática de la votación de la gira.
const REGIONES = [
  { region: "Buenos Aires", ciudades: ["CABA", "La Plata", "Mar del Plata"] },
  { region: "Centro & Cuyo", ciudades: ["Córdoba Capital", "Rosario", "Mendoza Capital"] },
  { region: "Norte", ciudades: ["Tucumán Capital", "Salta Capital"] },
  { region: "Sur", ciudades: ["Neuquén Capital", "Bariloche"] },
];

// Nota musical (reemplaza al emoji 🎸, prohibido por el brief).
function NoteIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9 18V6l11-2v12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="6.5" cy="18" r="2.6" fill="currentColor" />
      <circle cx="17.5" cy="16" r="2.6" fill="currentColor" />
    </svg>
  );
}

export default function TourVote({ open, onOpen, onClose }) {
  const [voted, setVoted] = useState(false);
  const [showFloat, setShowFloat] = useState(false);
  const timerRef = useRef(null);

  // Botón flotante: visible sólo tras scrollear más de 300px.
  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Al abrir: resetear estado, bloquear scroll de fondo, cerrar con Escape.
  useEffect(() => {
    if (!open) return;
    setVoted(false);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Limpiar el timer al desmontar.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const votar = () => {
    setVoted(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onClose(), 2000);
  };

  return (
    <>
      {/* Botón flotante (esquina inferior derecha) */}
      <button
        type="button"
        className={`tourvote__float ${showFloat ? "is-visible" : ""}`}
        onClick={onOpen}
        aria-label="Votá a dónde va la gira"
        tabIndex={showFloat ? 0 : -1}
      >
        <PlaneIcon />
      </button>

      {/* Modal de votación */}
      {open && (
        <div
          className="tourvote__modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tourvote-title"
          onClick={onClose}
        >
          <div className="tourvote__box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="tourvote__close" onClick={onClose} aria-label="Cerrar">
              Cerrar
            </button>

            {voted ? (
              <div className="tourvote__ok" role="status">
                <Burst className="tourvote__ok-burst" color="var(--sf-rosa)" points={13} />
                <p className="tourvote__ok-main titular-b">¡Voto registrado!</p>
                <p className="tourvote__ok-sub">
                  Nos vemos en la ruta <NoteIcon className="tourvote__ok-note" />
                </p>
              </div>
            ) : (
              <>
                <h2 id="tourvote-title" className="tourvote__title">¡Armá el mapa de la gira!</h2>
                <p className="tourvote__sub">¿A dónde querés que vayamos? Tocá tu ciudad.</p>

                <div className="tourvote__regiones">
                  {REGIONES.map((r) => (
                    <div className="tourvote__region" key={r.region}>
                      <h3 className="tourvote__region-name">{r.region}</h3>
                      <div className="tourvote__ciudades">
                        {r.ciudades.map((c) => (
                          <button
                            key={c}
                            type="button"
                            className="tourvote__ciudad"
                            onClick={votar}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
