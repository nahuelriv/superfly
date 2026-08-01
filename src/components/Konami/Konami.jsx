import { useEffect, useState } from "react";
import "./Konami.css";

// Huevo de pascua: código Konami. Guiño arcade contenido (permitido acá, no en
// el diseño principal §4). Solo desktop (necesita teclado). Sin sonido.
const CODE = [
  "arrowup", "arrowup", "arrowdown", "arrowdown",
  "arrowleft", "arrowright", "arrowleft", "arrowright",
  "b", "a",
];

// Sprite pixel-art (invader) 11x8.
const GRID = [
  "00100000100",
  "00010001000",
  "00111111100",
  "01101110110",
  "11111111111",
  "10111111101",
  "10100000101",
  "00011011000",
];

export default function Konami() {
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    let buffer = [];
    const onKey = (e) => {
      buffer.push(e.key.toLowerCase());
      if (buffer.length > CODE.length) buffer.shift(); // buffer de las últimas 10
      if (buffer.length === CODE.length && CODE.every((k, i) => k === buffer[i])) {
        buffer = []; // se limpia al activarse
        setActivo(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!activo) return null;

  const bloques = [];
  GRID.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c === "1") bloques.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    });
  });

  return (
    // Al terminar el cruce se desmonta: no queda nada corriendo.
    <div className="konami" aria-hidden="true" onAnimationEnd={() => setActivo(false)}>
      <svg className="konami__sprite" viewBox="0 0 11 8" focusable="false">
        <g fill="var(--sf-navy)">{bloques}</g>
        <rect x="3" y="3" width="1" height="1" fill="var(--sf-cyan)" />
        <rect x="7" y="3" width="1" height="1" fill="var(--sf-cyan)" />
      </svg>
    </div>
  );
}
