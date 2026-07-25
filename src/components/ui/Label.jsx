import "./Label.css";

// Caja tipo label de flyer: borde navy, sin radio, rotación y halftone opcionales.
// variant: "blanco" | "amarillo" | "rosa" | "cyan" | "navy"
export default function Label({
  children,
  variant = "blanco",
  rotate = 0,
  halftone = false,
  shadow = "rosa", // "rosa" | "navy" | "cyan" | "none"
  as: Tag = "span",
  className = "",
  style,
  ...rest
}) {
  return (
    <Tag
      className={`sf-label sf-label--${variant} sf-label--sh-${shadow} ${
        halftone ? "sf-label--halftone" : ""
      } ${className}`}
      style={{ "--rot": `${rotate}deg`, ...style }}
      {...rest}
    >
      <span className="sf-label__text">{children}</span>
    </Tag>
  );
}
