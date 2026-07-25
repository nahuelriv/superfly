import Star from "./Star";
import "./Marquee.css";

// Franja/marquesina infinita con borde navy. Respeta prefers-reduced-motion
// (la animación se detiene por el reset global de reduced-motion).
export default function Marquee({
  texto = "SUPERFLY!",
  variant = "rosa", // "rosa" | "cyan" | "amarillo"
  repeticiones = 8,
  className = "",
}) {
  const items = Array.from({ length: repeticiones });
  return (
    <div className={`marquee marquee--${variant} ${className}`} aria-hidden="true">
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
}
