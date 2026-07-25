import { useEffect } from "react";

// Escribe el desplazamiento de scroll en la custom property --sf-parallax del
// contenedor referenciado. Los elementos decorativos aplican su propio factor
// (0.1–0.3) en CSS: translateY(calc(var(--sf-parallax) * factor)).
//
// Desactivado en mobile (<768px), en dispositivos touch y con reduced-motion.
export function useParallax(ref, { maxWidth = 768 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || isTouch || window.innerWidth < maxWidth) {
      el.style.setProperty("--sf-parallax", "0px");
      return;
    }

    let ticking = false;
    const update = () => {
      // rect.top: positivo arriba del viewport, negativo al pasar. Movimiento sutil.
      const shift = -el.getBoundingClientRect().top;
      el.style.setProperty("--sf-parallax", `${shift.toFixed(1)}px`);
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
  }, [ref, maxWidth]);
}
