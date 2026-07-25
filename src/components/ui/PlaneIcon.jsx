// Avióncito (reemplaza al emoji ✈️, prohibido por el brief). Usa currentColor.
export default function PlaneIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
    </svg>
  );
}
