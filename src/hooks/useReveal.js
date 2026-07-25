import { useEffect, useRef, useState } from "react";

function shouldRevealImmediately() {
  if (typeof window === "undefined") return true;
  if (typeof IntersectionObserver === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

// threshold 0 + rootMargin negativo chico: revela apenas la sección asoma,
// sin esperar a que entre un % grande (evita que "tarde de más" en secciones altas).
export function useReveal(options = { threshold: 0, rootMargin: "0px 0px -60px 0px" }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(() => shouldRevealImmediately());

  useEffect(() => {
    if (revealed) return;
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        });
      },
      options
    );

    obs.observe(node);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  return [ref, revealed];
}
