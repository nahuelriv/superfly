import "./WildTitle.css";

// Título "de flyer": cada LETRA con rotación y salto de línea de base propios,
// relleno navy + contorno blanco fino + eco de contorno rosa hueco por letra.
// El tamaño lo define el contenedor (font-size). Las palabras se mantienen
// juntas (sin cortar) y separadas por un espacio.
// Letras derechas: rotación casi nula + salto vertical (em) apenas perceptible.
const ROT = [-0.5, 0.5, -0.6, 0.4, -0.5, 0.6, -0.4, 0.5, -0.6, 0.4, -0.5, 0.5, -0.4, 0.6];
const DY = [0.02, -0.02, 0.015, -0.025, 0.02, -0.015, 0.025, -0.02, 0.015, -0.02, 0.02, -0.015, 0.025, -0.02];

export default function WildTitle({ text, className = "", id }) {
  const words = String(text).split(" ");
  let k = 0; // índice de letra corrido para variar en todo el título
  return (
    <span className={`wild ${className}`} {...(id ? { id } : {})}>
      {words.map((word, wi) => (
        <span className="wild__word" key={wi}>
          {[...word].map((ch, ci) => {
            const i = k++;
            return (
              <span
                key={ci}
                className="wild__l"
                data-ch={ch}
                style={{ "--rot": `${ROT[i % ROT.length]}deg`, "--dy": DY[i % DY.length] }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
