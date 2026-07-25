import { useState } from "react";
import Burst from "../ui/Burst";
import Star from "../ui/Star";
import { FORM_ENDPOINT } from "../../config";
import "./NotifyForm.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NotifyForm() {
  const [status, setStatus] = useState("idle"); // idle | enviando | enviado | error
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return; // chequeo simple además del nativo
    const form = e.currentTarget;
    setStatus("enviando");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      setStatus(res.ok ? "enviado" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="notify" aria-labelledby="notify-title">
      <div className="sf-container notify__inner">
        <Burst className="notify__burst" color="var(--sf-cyan)" points={13} />
        <Star className="notify__star" color="var(--sf-blanco)" />

        <div className="notify__box">
          {status === "enviado" ? (
            <p className="notify__done" role="status">
              ¡Listo! Te escribimos apenas salgan las entradas.
            </p>
          ) : (
            <>
              <h2 id="notify-title" className="notify__title titular-a">Avisame</h2>
              <p className="notify__copy">
                Enterate antes que nadie cuándo salen las entradas.
              </p>
              <form className="notify__form" onSubmit={onSubmit}>
                <input
                  className="notify__input"
                  type="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Tu email"
                  disabled={status === "enviando"}
                />
                <button
                  className="notify__btn"
                  type="submit"
                  disabled={status === "enviando"}
                >
                  {status === "enviando" ? "Enviando…" : "Avisame"}
                </button>
              </form>
              {status === "error" && (
                <p className="notify__error" role="alert">
                  Hubo un error al enviar. Probá de nuevo.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
