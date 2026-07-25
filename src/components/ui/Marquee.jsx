import Star from "./Star";
import "./Marquee.css";

// Franja/marquesina infinita con borde navy. Respeta prefers-reduced-motion
// (la animación se detiene por el reset global de reduced-motion).
export default function Marquee({
  texto = "SUPERFLY!",
  variant = "rosa", // "rosa" | "cyan" | "amarillo"
  repeticiones = 8,
  tilt = 0, // inclinación en grados (0 = recta)
  fill, // color de relleno de los huecos que deja la inclinación
  className = "",
}) {
  const items = Array.from({ length: repeticiones });
  const band = (
    <div
      className={`marquee marquee--${variant} ${tilt ? "marquee--tilt" : ""} ${className}`}
      style={tilt ? { "--tilt": `${tilt}deg` } : undefined}
      aria-hidden="true"
    >
      <div className="marquee__track">
        {items.map((_, i) => (
          <span className="marquee__item" key={i}>
            {texto}
            <Star className="marquee__star" color="var(--sf-blanco)" />
          </span>
        ))}
      </div>
    </div>
  );

  // Marco que rellena los huecos del triángulo (por la inclinación) con `fill`.
  if (fill) {
    return (
      <div className="marquee-frame" style={{ background: fill }}>
        {band}
      </div>
    );
  }
  return band;
}
