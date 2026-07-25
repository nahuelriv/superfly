// Configuración editable del landing. Cambiar acá para activar features sin tocar
// componentes.

// === Entradas ===
// Cuando estén a la venta: poner TICKETS_ENABLED en true y completar TICKETS_URL.
export const TICKETS_ENABLED = false;
export const TICKETS_URL = ""; // p.ej. "https://passline.com/eventos/superfly"

// === Captura de mail (NotifyForm) ===
// Endpoint de Formspree (https://formspree.io). Reemplazar por el ID real del form.
export const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";

// === Fecha del festival (Countdown) ===
// null → el bloque muestra la franja de texto (sin contador).
// Cuando haya fecha: string ISO, p.ej. "2026-03-21T20:00:00-03:00".
export const FESTIVAL_DATE = null;
