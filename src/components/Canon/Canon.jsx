import { useRef, useState, useEffect, useCallback } from "react";
import Tshirt from "../ui/Tshirt";
import Burst from "../ui/Burst";
import { momentoCanonIII } from "../../data/festival";
import "./Canon.css";

const COLORS = ["var(--sf-cyan)", "var(--sf-rosa)", "var(--sf-blanco)", "var(--sf-naranja)"];
const GRAV = 1600; // px/s²
const MAX_ACTIVAS = 48; // tope de remeras vivas (protege el rendimiento)
let uid = 0;

const prefiereMenosMovimiento = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Canon() {
  const [remeras, setRemeras] = useState([]); // [{ id, color }] para renderizar
  const fisica = useRef(new Map()); // id -> { x, y, vx, vy, rot, vrot }
  const nodos = useRef(new Map()); // id -> DOM node
  const raf = useRef(0);
  const corriendo = useRef(false);
  const ultimo = useRef(0);
  const btnRef = useRef(null);
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

  const disparar = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    // boca del cañón: arriba a la derecha del botón
    const mx = rect.left + rect.width * 0.72;
    const my = rect.top + rect.height * 0.32;

    // reduced-motion: aparecen sin trayectoria y se van (nada persiste)
    if (prefiereMenosMovimiento()) {
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
  }, [loop]);

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
      <div className="sf-container canon__inner">
        <p className="canon__hora">{momentoCanonIII.hora}</p>
        <h2 id="canon-title" className="canon__title titular-a">Momento Cañón</h2>

        <div className="canon__stage">
          <Burst className="canon__burst" color="var(--sf-rosa)" points={13} />
          <button
            type="button"
            ref={btnRef}
            className="canon__btn"
            onClick={disparar}
            aria-label="Disparar remeras del cañón"
          >
            <svg className="canon__svg" viewBox="0 0 130 100" aria-hidden="true" focusable="false">
              <g transform="rotate(-32 40 68)">
                <rect x="38" y="55" width="74" height="22" rx="4" fill="var(--sf-cyan)" stroke="var(--sf-navy)" strokeWidth="4" />
                <ellipse cx="112" cy="66" rx="5" ry="12" fill="var(--sf-navy)" />
              </g>
              <circle cx="34" cy="78" r="19" fill="var(--sf-naranja)" stroke="var(--sf-navy)" strokeWidth="4" />
              <g stroke="var(--sf-navy)" strokeWidth="3" strokeLinecap="round">
                <line x1="34" y1="61" x2="34" y2="95" />
                <line x1="17" y1="78" x2="51" y2="78" />
                <line x1="22" y1="66" x2="46" y2="90" />
                <line x1="46" y1="66" x2="22" y2="90" />
              </g>
              <circle cx="34" cy="78" r="5" fill="var(--sf-navy)" />
            </svg>
          </button>
        </div>

        <p className="canon__hint">¡Tocá el cañón!</p>
      </div>

      {/* Capa de remeras voladoras (fija al viewport, no intercepta taps) */}
      <div className="canon__fx" aria-hidden="true">
        {remeras.map((r) => (
          <span key={r.id} ref={setNodo(r.id)} className="canon__shirt">
            <Tshirt fill={r.color} />
          </span>
        ))}
      </div>
    </section>
  );
}
