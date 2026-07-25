// Remera voladora (para el Momento Cañón). Contorno navy, relleno configurable.
export default function Tshirt({
  fill = "var(--sf-cyan)",
  stroke = "var(--sf-navy)",
  strokeWidth = 5,
  className = "",
  style,
}) {
  return (
    <svg
      viewBox="0 0 100 90"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M36 8
           L50 16 L64 8
           L92 24 L82 42 L72 36
           L72 82 L28 82 L28 36
           L18 42 L8 24 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}
