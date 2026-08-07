import { useState, useEffect, useCallback } from "react";
import Burst from "../ui/Burst";
import Star from "../ui/Star";
import WildTitle from "../ui/WildTitle";
import { fotosIII } from "../../data/festival";
import "./Fotos.css";

// Rotaciones fijas por índice para que el collage sea estable y asimétrico.
const ROT = [-2, 3, -4, 2, -3, 1, 4, -2, 3, -3];

export default function Fotos() {
  // Índices cuya imagen no cargó (archivo todavía no subido) → placeholder.
  const [fallidas, setFallidas] = useState(() => new Set());
  const [activa, setActiva] = useState(null);

  // Solo se pueden abrir las fotos que efectivamente cargaron.
  const abribles = fotosIII
    .map((f, i) => ({ ...f, i }))
    .filter((f) => f.src && !fallidas.has(f.i));

  const abrir = useCallback((i) => setActiva(i), []);
  const cerrar = useCallback(() => setActiva(null), []);

  const paso = useCallback(
    (dir) => {
      setActiva((cur) => {
        if (cur === null || abribles.length === 0) return cur;
        const pos = abribles.findIndex((f) => f.i === cur);
        const next = (pos + dir + abribles.length) % abribles.length;
        return abribles[next].i;
      });
    },
    [abribles]
  );

  const open = activa !== null;
  const fotoActiva = open ? fotosIII[activa] : null;

  // Render de una tarjeta (usa el índice real de fotosIII para el lightbox).
  const renderCell = (foto, i) => {
    const mostrarImg = foto.src && !fallidas.has(i);
    return (
      <li
        key={i}
        className={`fotos__cell ${foto.destacada ? "fotos__cell--big" : ""} ${foto.frio ? "fotos__cell--frio" : ""}`}
        style={{ "--rot": `${ROT[i % ROT.length]}deg`, "--ratio": foto.ratio }}
      >
        {i === 0 && (
          <Burst className="fotos__burst" color="var(--sf-rosa)" points={13} />
        )}
        {mostrarImg ? (
          <button
            type="button"
            className="fotos__btn"
            onClick={() => abrir(i)}
            aria-label={`Ampliar foto: ${foto.alt}`}
          >
            <img
              className="fotos__img"
              src={foto.src}
              alt={foto.alt}
              loading="lazy"
              decoding="async"
              onError={() =>
                setFallidas((prev) => {
                  const next = new Set(prev);
                  next.add(i);
                  return next;
                })
              }
            />
          </button>
        ) : (
          <div className="fotos__ph" role="img" aria-label={`${foto.alt} (foto pendiente)`}>
            <span className="fotos__ph-txt">falta la foto</span>
          </div>
        )}
      </li>
    );
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") paso(1);
      if (e.key === "ArrowLeft") paso(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, cerrar, paso]);

  return (
    <section className="fotos" aria-labelledby="fotos-title">
      <div className="sf-container">
        <header className="fotos__head">
          <h2 id="fotos-title" className="fotos__title">
            <WildTitle text="La noche" />
          </h2>
          <Star className="fotos__star" color="var(--sf-blanco)" />
        </header>

        <ul className="fotos__grid">
          {fotosIII.map((foto, i) => renderCell(foto, i))}
        </ul>
      </div>

      {open && fotoActiva && (
        <div
          className="fotos__lb"
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada de la noche"
          onClick={cerrar}
        >
          <button
            type="button"
            className="fotos__lb-btn fotos__lb-close"
            aria-label="Cerrar"
            onClick={(e) => { e.stopPropagation(); cerrar(); }}
          >
            Cerrar
          </button>

          {abribles.length > 1 && (
            <button
              type="button"
              className="fotos__lb-btn fotos__lb-prev"
              aria-label="Foto anterior"
              onClick={(e) => { e.stopPropagation(); paso(-1); }}
            >
              ‹
            </button>
          )}

          <figure className="fotos__lb-fig" onClick={(e) => e.stopPropagation()}>
            <img src={fotoActiva.src} alt={fotoActiva.alt} />
          </figure>

          {abribles.length > 1 && (
            <button
              type="button"
              className="fotos__lb-btn fotos__lb-next"
              aria-label="Foto siguiente"
              onClick={(e) => { e.stopPropagation(); paso(1); }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </section>
  );
}
