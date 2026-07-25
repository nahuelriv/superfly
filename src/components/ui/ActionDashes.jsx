// Rayitas de movimiento navy (las que rodean a los personajes de los flyers).
export default function ActionDashes({
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
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      <path d="M8 14 H34" />
      <path d="M4 30 H24" />
      <path d="M12 48 H30" />
      <path d="M70 20 H96" />
      <path d="M78 38 H98" />
      <path d="M72 56 H92" />
    </svg>
  );
}
