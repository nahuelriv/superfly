// Capa de trama ben-day (puntos). Se apila como decorado dentro de cajas/bloques.
export default function Halftone({
  color = "var(--sf-navy)",
  size = 9,
  className = "",
  style,
}) {
  return (
    <span
      className={`sf-halftone ${className}`}
      aria-hidden="true"
      style={{ "--ht-color": color, "--ht-size": `${size}px`, ...style }}
    />
  );
}
