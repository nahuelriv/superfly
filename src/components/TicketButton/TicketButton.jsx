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
            <svg className="ticketbtn__lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <rect x="4" y="10.5" width="16" height="9.5" rx="1.5" />
              <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
            </svg>
            Comprar entradas
          </button>
          <span className="ticketbtn__soon">Próximamente</span>
        </>
      )}
    </span>
  );
}
