import { TICKETS_ENABLED, TICKETS_URL } from "../../config";
import "./TicketButton.css";

// Botón de entradas. Config-gated por TICKETS_ENABLED (src/config.js).
// - Deshabilitado (default): <button disabled> + "Próximamente" debajo.
// - Habilitado: <a href={TICKETS_URL}> clickeable.
export default function TicketButton({ className = "" }) {
  return (
    <span className={`ticketbtn-wrap ${className}`}>
      {TICKETS_ENABLED ? (
        <a
          className="ticketbtn ticketbtn--on"
          href={TICKETS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Comprar entradas
        </a>
      ) : (
        <>
          <button
            type="button"
            className="ticketbtn ticketbtn--off"
            disabled
            aria-disabled="true"
          >
            Comprar entradas
          </button>
          <span className="ticketbtn__soon">Próximamente</span>
        </>
      )}
    </span>
  );
}
