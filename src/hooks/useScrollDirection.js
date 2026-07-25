import { useState, useEffect, useRef } from "react";

// Dirección de scroll con umbral anti-jitter. Devuelve { direction, atTop }.
export function useScrollDirection(threshold = 10) {
  const [state, setState] = useState({ direction: "up", atTop: true });
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);
        const atTop = y < 8;
        if (Math.abs(y - lastY.current) >= threshold) {
          const direction = y > lastY.current ? "down" : "up";
          lastY.current = y;
          setState((s) =>
            s.direction === direction && s.atTop === atTop ? s : { direction, atTop }
          );
        } else {
          setState((s) => (s.atTop === atTop ? s : { ...s, atTop }));
        }
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
