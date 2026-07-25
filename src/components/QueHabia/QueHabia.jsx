import Star from "../ui/Star";
import Bricks from "../ui/Bricks";
import WildTitle from "../ui/WildTitle";
import { zonasIII, gruposZona } from "../../data/festival";
import "./QueHabia.css";

// Rotaciones mínimas por índice: algo de vida sin ensuciar la lectura del mapa.
const ROT = [0, -1.5, 1, -1, 1.5, -1, 1, -1.5, 1, -1];

export default function QueHabia() {
  return (
    <section className="queh" aria-labelledby="queh-title">
      <div className="sf-container">
        <header className="queh__head">
          <h2 id="queh-title" className="queh__title">
            <WildTitle text="Qué había" />
          </h2>
        </header>

        <div className="queh__mapa">
          <span className="queh__dir" aria-hidden="true">Av. Corrientes 6271</span>

          <ul className="queh__zonas sf-stagger">
            {zonasIII.map((zona, i) => {
              const color = gruposZona[zona.grupo]?.color ?? "blanco";
              const destacada = zona.grupo === "musica";
              return (
                <li
                  key={zona.nombre}
                  className={`queh__zona queh__zona--${color} ${destacada ? "queh__zona--big" : ""}`}
                  style={{ "--rot": `${ROT[i % ROT.length]}deg` }}
                >
                  <span className="queh__zona-nombre">{zona.nombre}</span>
                  {zona.nota && <span className="queh__zona-nota">{zona.nota}</span>}
                </li>
              );
            })}
          </ul>

          <Bricks className="queh__bricks queh__bricks--bl" stroke="var(--sf-rosa)" />
          <Bricks className="queh__bricks queh__bricks--tr" stroke="var(--sf-rosa)" />
        </div>

        <div className="queh__pie">
          <ul className="queh__leyenda" aria-label="Referencias del mapa">
            {Object.entries(gruposZona).map(([key, g]) => (
              <li key={key} className="queh__ley">
                <span className={`queh__ley-dot queh__ley-dot--${g.color}`} aria-hidden="true" />
                {g.label}
              </li>
            ))}
          </ul>
        </div>

        <Star className="queh__star" color="var(--sf-cyan)" />
      </div>
    </section>
  );
}
