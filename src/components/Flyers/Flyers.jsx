import { useEffect, useState } from "react";
import Star from "../ui/Star";
import WildTitle from "../ui/WildTitle";
import { flyersIII } from "../../data/festival";
import "./Flyers.css";

const ROT = [-3, 2.5, -1.5, 3, -2.5, 1.5];

export default function Flyers() {
  const [activeIndex, setActiveIndex] = useState(null);
  const open = activeIndex !== null;
  const activeFlyer = open ? flyersIII[activeIndex] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % flyersIII.length);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + flyersIII.length) % flyersIII.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section className="flyers" aria-labelledby="flyers-title">
      <div className="sf-container">
        <header className="flyers__head">
          <h2 id="flyers-title" className="flyers__title">
            <WildTitle text="Rewind" />
          </h2>
          <Star className="flyers__star" color="var(--sf-cyan)" />
        </header>

        <ul className="flyers__wall">
          {flyersIII.map((flyer, i) => (
            <li key={flyer.titulo} className="flyers__cell" style={{ "--rot": `${ROT[i % ROT.length]}deg` }}>
              <button
                type="button"
                className="flyers__item"
                onClick={() => setActiveIndex(i)}
                aria-label={`Ampliar flyer: ${flyer.titulo}`}
              >
                {flyer.src ? (
                  <img src={flyer.src} alt={flyer.alt} loading="lazy" decoding="async" />
                ) : (
                  <span className="flyers__ph" aria-hidden="true">
                    <span className="flyers__ph-txt">falta la imagen</span>
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open && activeFlyer && (
        <div
          className="flyers__lb"
          role="dialog"
          aria-modal="true"
          aria-label={`Flyer: ${activeFlyer.titulo}`}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="flyers__lb-btn flyers__lb-close"
            aria-label="Cerrar"
            onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}
          >
            Cerrar
          </button>

          <button
            type="button"
            className="flyers__lb-btn flyers__lb-prev"
            aria-label="Flyer anterior"
            onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i - 1 + flyersIII.length) % flyersIII.length); }}
          >
            ‹
          </button>

          <figure className="flyers__lb-fig" onClick={(e) => e.stopPropagation()}>
            {activeFlyer.src ? (
              <img src={activeFlyer.src} alt={activeFlyer.alt} />
            ) : (
              <span className="flyers__ph flyers__ph--lb"><span className="flyers__ph-txt">falta la imagen</span></span>
            )}
            <figcaption>{activeFlyer.titulo}</figcaption>
          </figure>

          <button
            type="button"
            className="flyers__lb-btn flyers__lb-next"
            aria-label="Flyer siguiente"
            onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i + 1) % flyersIII.length); }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
