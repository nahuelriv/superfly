// Ladrillos parciales en line-art navy (los que asoman en las esquinas de los flyers).
export default function Bricks({
  stroke = "var(--sf-navy)",
  strokeWidth = 4,
  className = "",
  style,
}) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      {/* Fila superior */}
      <path d="M4 20 H50" />
      <path d="M62 20 H116" />
      {/* Junta vertical */}
      <path d="M34 20 V40" />
      <path d="M86 20 V40" />
      {/* Fila del medio */}
      <path d="M10 40 H60" />
      <path d="M72 40 H112" />
      {/* Junta vertical fila baja */}
      <path d="M50 40 V60" />
      {/* Fila inferior */}
      <path d="M6 60 H48" />
      <path d="M60 60 H100" />
    </svg>
  );
}
