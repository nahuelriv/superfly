import { useEffect, useState } from "react";

// Devuelve true cuando la página está "lista": es cuando la Intro sube la
// cortina (o al instante si no hay intro / hay reduced-motion). La Intro marca
// esto agregando la clase `is-ready` en <html>. Sirve para gatillar la entrada
// del hero recién cuando el contenido queda a la vista, no detrás de la cortina.
export function useIsReady() {
  const [ready, setReady] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("is-ready")
  );

  useEffect(() => {
    if (ready) return;
    const el = document.documentElement;
    // Re-chequear ya: la clase pudo agregarse entre el render y este efecto
    // (p. ej. en un refresh sin intro, la Intro marca is-ready al montar). Si
    // solo observáramos, ese cambio previo se pierde y el hero nunca aparece.
    if (el.classList.contains("is-ready")) {
      setReady(true);
      return;
    }
    const obs = new MutationObserver(() => {
      if (el.classList.contains("is-ready")) {
        setReady(true);
        obs.disconnect();
      }
    });
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [ready]);

  return ready;
}
