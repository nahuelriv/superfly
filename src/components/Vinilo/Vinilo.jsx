import { useEffect, useRef } from "react";
import "./Vinilo.css";

// Vinilo (guiño a SuperFly de Curtis Mayfield + el set en vinilos del festival).
// Gira SOLO según el progreso de scroll: se frena cuando el scroll se frena.
// No hay animación perpetua (excepción aprobada a §9). Se oculta con
// prefers-reduced-motion.
export default function Vinilo() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.setProperty("--scroll-progress", p.toFixed(4));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="vinilo" ref={ref} aria-hidden="true">
      <svg className="vinilo__disc" viewBox="0 0 100 100" focusable="false">
        {/* disco negro (vinilo real; excepción aprobada al "nada de negro") */}
        <circle cx="50" cy="50" r="49" fill="#141414" stroke="var(--sf-navy)" strokeWidth="2" />
        {/* surcos: anillos finos */}
        <g fill="none" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1">
          <circle cx="50" cy="50" r="44" />
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="36" />
          <circle cx="50" cy="50" r="32" />
          <circle cx="50" cy="50" r="28" />
        </g>
        {/* reflejo plano (una cuña clara, sin gradiente) que hace notar el giro */}
        <path d="M50 3 A47 47 0 0 1 92 28 L50 50 Z" fill="rgba(255,255,255,0.1)" />
        {/* etiqueta central (color clásico cálido) */}
        <circle cx="50" cy="50" r="17" fill="var(--sf-naranja)" stroke="var(--sf-navy)" strokeWidth="2" />
        {/* marca en la etiqueta para que se note la rotación */}
        <rect x="48.5" y="34" width="3" height="9" rx="1" fill="var(--sf-navy)" />
        {/* agujero central */}
        <circle cx="50" cy="50" r="2.6" fill="#141414" />
      </svg>
    </div>
  );
}
