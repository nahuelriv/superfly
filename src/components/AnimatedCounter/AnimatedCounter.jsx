import { useEffect, useState } from "react";
import { useReveal } from "../../hooks/useReveal";
import "./AnimatedCounter.css";

// Cuenta desde 0 hasta `to` cuando entra en viewport. Easing de desaceleración.
// Creado para cifras futuras (artistas, ediciones, asistentes). Hoy no se monta.
export default function AnimatedCounter({
  to = 0,
  duration = 1500,
  suffix = "",
  className = "",
}) {
  const [ref, revealed] = useReveal();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!revealed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [revealed, to, duration]);

  return (
    <span ref={ref} className={`animcounter ${className}`}>
      {val}
      {suffix}
    </span>
  );
}
