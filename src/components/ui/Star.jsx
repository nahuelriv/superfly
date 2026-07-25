// Destello de 4 puntas. Contorno navy.
export default function Star({
  color = "var(--sf-blanco)",
  stroke = "var(--sf-navy)",
  strokeWidth = 4,
  className = "",
  style,
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M50 3 L59 41 L97 50 L59 59 L50 97 L41 59 L3 50 L41 41 Z"
        fill={color}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}
