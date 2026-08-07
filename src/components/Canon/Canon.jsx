import { useRef, useState, useEffect, useCallback } from "react";
import Tshirt from "../ui/Tshirt";
import Burst from "../ui/Burst";
import Star from "../ui/Star";
import { momentoCanonIII } from "../../data/festival";
import "./Canon.css";

const COLORS = ["var(--sf-cyan)", "var(--sf-rosa)", "var(--sf-blanco)", "var(--sf-naranja)"];
const GRAV = 1600; // px/s²
const MAX_ACTIVAS = 48; // tope de remeras vivas (protege el rendimiento)
const ONOMA = ["¡PUM!", "¡FIU!", "¡PAM!", "¡BOOM!", "¡ZAS!"]; // onomatopeyas cómic
// Item repetido para las marquesinas (alterna nombre y hora)
const MARQUEE = Array.from({ length: 5 }, () => ["Momento Cañón", momentoCanonIII.hora]).flat();
let uid = 0;

const prefiereMenosMovimiento = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Canon() {
  const [remeras, setRemeras] = useState([]); // [{ id, color }] para renderizar
  const [pops, setPops] = useState([]); // [{ id, text, x, y, rot }] onomatopeyas
  const fisica = useRef(new Map()); // id -> { x, y, vx, vy, rot, vrot }
  const nodos = useRef(new Map()); // id -> DOM node
  const raf = useRef(0);
  const corriendo = useRef(false);
  const ultimo = useRef(0);
  const btnRef = useRef(null);
  const svgRef = useRef(null);
  const timeouts = useRef(new Set());

  const setNodo = useCallback(
    (id) => (el) => {
      if (el) {
        nodos.current.set(id, el);
        const p = fisica.current.get(id);
        if (p) el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
      } else {
        nodos.current.delete(id);
      }
    },
    []
  );

  const loop = useCallback((t) => {
    const dt = Math.min(0.032, (t - ultimo.current) / 1000);
    ultimo.current = t;
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const muertas = [];

    fisica.current.forEach((p, id) => {
      p.vy += GRAV * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vrot * dt;
      const node = nodos.current.get(id);
      if (node) node.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
      // se destruyen al salir del viewport
      if (p.y > vh + 140 || p.x < -180 || p.x > vw + 180) muertas.push(id);
    });

    if (muertas.length) {
      muertas.forEach((id) => {
        fisica.current.delete(id);
        nodos.current.delete(id);
      });
      setRemeras((s) => s.filter((r) => fisica.current.has(r.id)));
    }

    if (fisica.current.size > 0) {
      raf.current = requestAnimationFrame(loop);
    } else {
      corriendo.current = false;
    }
  }, []);

  // Easter-egg al disparar: onomatopeya cómic en la boca + retroceso del cañón.
  const efectoDisparo = useCallback((mx, my, reduce) => {
    const id = ++uid;
    const text = ONOMA[Math.floor(Math.random() * ONOMA.length)];
    const rot = (Math.random() * 2 - 1) * 8;
    setPops((s) => [...s, { id, text, x: mx, y: my, rot }]);
    const to = setTimeout(() => {
      setPops((s) => s.filter((p) => p.id !== id));
      timeouts.current.delete(to);
    }, 650);
    timeouts.current.add(to);

    // Retroceso (recoil) del tubo: patea abajo-izquierda y vuelve. Solo con
    // movimiento habilitado (WAAPI, sin re-render).
    if (!reduce && svgRef.current) {
      svgRef.current.animate(
        [
          { transform: "translate(0, 0) rotate(0deg)" },
          { transform: "translate(-12px, 9px) rotate(5deg)", offset: 0.22 },
          { transform: "translate(0, 0) rotate(0deg)" },
        ],
        { duration: 280, easing: "ease-out" }
      );
    }
  }, []);

  const disparar = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    // boca del cañón: arriba a la derecha del botón
    const mx = rect.left + rect.width * 0.72;
    const my = rect.top + rect.height * 0.32;
    const reduce = prefiereMenosMovimiento();

    efectoDisparo(mx, my, reduce);

    // reduced-motion: aparecen sin trayectoria y se van (nada persiste)
    if (reduce) {
      const nuevas = [];
      for (let i = 0; i < 5; i++) {
        const id = ++uid;
        fisica.current.set(id, {
          x: rect.left + Math.random() * rect.width,
          y: rect.top - 30 - Math.random() * 90,
          rot: Math.random() * 40 - 20,
          vx: 0, vy: 0, vrot: 0,
        });
        nuevas.push({ id, color: COLORS[Math.floor(Math.random() * COLORS.length)] });
      }
      setRemeras((s) => [...s, ...nuevas]);
      const to = setTimeout(() => {
        nuevas.forEach((n) => { fisica.current.delete(n.id); nodos.current.delete(n.id); });
        setRemeras((s) => s.filter((r) => fisica.current.has(r.id)));
        timeouts.current.delete(to);
      }, 900);
      timeouts.current.add(to);
      return;
    }

    const libres = MAX_ACTIVAS - fisica.current.size;
    if (libres <= 0) return;
    const cuantas = Math.min(6, libres);
    const nuevas = [];
    for (let i = 0; i < cuantas; i++) {
      const id = ++uid;
      fisica.current.set(id, {
        x: mx,
        y: my,
        vx: 120 + Math.random() * 280, // ↗ hacia la derecha
        vy: -(640 + Math.random() * 340), // ↑ hacia arriba
        rot: Math.random() * 360,
        vrot: (Math.random() * 2 - 1) * 560,
      });
      nuevas.push({ id, color: COLORS[Math.floor(Math.random() * COLORS.length)] });
    }
    setRemeras((s) => [...s, ...nuevas]);

    if (!corriendo.current) {
      corriendo.current = true;
      ultimo.current = performance.now();
      raf.current = requestAnimationFrame(loop);
    }
  }, [loop, efectoDisparo]);

  // Limpieza: frenar rAF y timeouts al desmontar (nada queda huérfano)
  useEffect(() => {
    const tos = timeouts.current;
    return () => {
      cancelAnimationFrame(raf.current);
      tos.forEach((t) => clearTimeout(t));
      tos.clear();
    };
  }, []);

  return (
    <section className="canon" aria-labelledby="canon-title">
      {/* Marquesina bookend: encierra la sección como panel de cómic */}
      <div className="canon__marquee canon__marquee--top" aria-hidden="true">
        <div className="canon__marquee-track">
          {[0, 1].map((g) => (
            <div className="canon__marquee-group" key={g}>
              {MARQUEE.map((t, i) => (
                <span className="canon__marquee-item" key={i}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="sf-container canon__inner">
        <p className="canon__hora">{momentoCanonIII.hora}</p>
        <h2 id="canon-title" className="canon__title titular-a">Momento Cañón</h2>

        <div className="canon__stage">
          <Burst className="canon__burst" color="var(--sf-rosa)" points={14} />
          <Star className="canon__star canon__star--1" color="var(--sf-blanco)" />
          <Star className="canon__star canon__star--2" color="var(--sf-cyan)" />
          <button
            type="button"
            ref={btnRef}
            className="canon__btn"
            onClick={disparar}
            aria-label="Disparar remeras del cañón"
          >
            <svg ref={svgRef} className="canon__svg" viewBox="0 0 180 125" aria-hidden="true" focusable="false">
              {/* Lanzador de remeras (bazooka): tubo + tanque + empuñadura + boca */}
              <g transform="rotate(-13 66 74)">
                {/* tanque de presión (abajo/atrás) */}
                <rect x="30" y="62" width="70" height="26" rx="13" fill="var(--sf-naranja)" stroke="var(--sf-navy)" strokeWidth="4" />
                <circle cx="30" cy="75" r="6" fill="var(--sf-naranja)" stroke="var(--sf-navy)" strokeWidth="4" />
                {/* conexión tanque - barril */}
                <rect x="60" y="58" width="12" height="12" fill="var(--sf-navy)" />

                {/* empuñadura + gatillo */}
                <path d="M58 60 L76 60 L71 96 L61 96 Z" fill="var(--sf-navy)" />
                <path d="M62 66 q-9 7 -2 16" fill="none" stroke="var(--sf-navy)" strokeWidth="4" strokeLinecap="round" />

                {/* barril / tubo */}
                <rect x="48" y="36" width="74" height="28" rx="14" fill="var(--sf-cyan)" stroke="var(--sf-navy)" strokeWidth="4" />
                {/* banda */}
                <rect x="104" y="34" width="6" height="32" fill="var(--sf-navy)" />
                {/* boca acampanada */}
                <polygon points="118,32 148,24 148,76 118,68" fill="var(--sf-cyan)" stroke="var(--sf-navy)" strokeWidth="4" strokeLinejoin="round" />
                {/* labio rosa */}
                <rect x="144" y="22" width="9" height="56" rx="4" fill="var(--sf-rosa)" stroke="var(--sf-navy)" strokeWidth="4" />
                {/* remera asomando de la boca */}
                <rect x="151" y="36" width="16" height="28" rx="8" fill="var(--sf-blanco)" stroke="var(--sf-navy)" strokeWidth="3" />
                {/* brillo plano en el tubo */}
                <path d="M56 45 L112 39" stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" />
              </g>
            </svg>
          </button>
        </div>

        <p className="canon__hint">¡Tocá el cañón!</p>
      </div>

      <div className="canon__marquee canon__marquee--bottom" aria-hidden="true">
        <div className="canon__marquee-track">
          {[0, 1].map((g) => (
            <div className="canon__marquee-group" key={g}>
              {MARQUEE.map((t, i) => (
                <span className="canon__marquee-item" key={i}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Capa de remeras voladoras (fija al viewport, no intercepta taps) */}
      <div className="canon__fx" aria-hidden="true">
        {remeras.map((r) => (
          <span key={r.id} ref={setNodo(r.id)} className="canon__shirt">
            <Tshirt fill={r.color} />
          </span>
        ))}
      </div>

      {/* Onomatopeyas cómic al disparar (fija al viewport) */}
      <div className="canon__pops" aria-hidden="true">
        {pops.map((p) => (
          <span
            key={p.id}
            className="canon__pop"
            style={{ left: `${p.x}px`, top: `${p.y}px`, "--rot": `${p.rot}deg` }}
          >
            {p.text}
          </span>
        ))}
      </div>
    </section>
  );
}
