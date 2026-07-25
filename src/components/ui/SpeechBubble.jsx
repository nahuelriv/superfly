import "./SpeechBubble.css";

// Bocadillo de historieta con cola. El texto va como children.
export default function SpeechBubble({ children, className = "", style }) {
  return (
    <div className={`speech ${className}`} style={style}>
      <svg
        className="speech__shape"
        viewBox="0 0 300 180"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M20 20
             Q10 10 30 8
             H270
             Q292 8 290 30
             V120
             Q292 142 270 140
             H120
             L70 172
             L86 140
             H30
             Q8 142 10 120
             V30
             Q8 12 20 20 Z"
          fill="var(--sf-blanco)"
          stroke="var(--sf-navy)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
      <span className="speech__text">{children}</span>
    </div>
  );
}
