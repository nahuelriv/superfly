// Estallido cómic de puntas irregulares. Contorno navy por defecto (nunca negro).
export default function Burst({
  color = "var(--sf-rosa)",
  stroke = "var(--sf-navy)",
  strokeWidth = 5,
  points = 14,
  irregularidad = 0.14,
  className = "",
  style,
}) {
  const cx = 100;
  const cy = 100;
  const outerR = 95;
  const innerR = 60;
  const total = points * 2;
  const angleStep = (Math.PI * 2) / total;
  const path = [];

  // Semilla determinística para que el estallido sea estable entre renders.
  const jitter = (i) => {
    const s = Math.sin(i * 12.9898) * 43758.5453;
    return (s - Math.floor(s) - 0.5) * 2; // [-1, 1]
  };

  for (let i = 0; i < total; i++) {
    const base = i % 2 === 0 ? outerR : innerR;
    const r = base * (1 + jitter(i) * irregularidad);
    const angle = i * angleStep - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    path.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  path.push("Z");

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={path.join(" ")}
        fill={color}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}
