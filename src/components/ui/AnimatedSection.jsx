import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Wrapper de entrada on-scroll: pop con overshoot (spring) y dirección
// configurable (up / left / right), una sola vez por sección.
// Al entrar en viewport agrega la clase `sf-inview`, que dispara el stagger
// CSS de los hijos `.sf-stagger` internos (Fotos, "Así fue la III").
// Respeta prefers-reduced-motion: entra sin animación, visible directo.
const FROM = {
  up: { y: 64 },
  left: { x: -72 },
  right: { x: 72 },
};

export default function AnimatedSection({ children, from = "up", delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(false);

  if (reduce) {
    return <div className={`sf-inview ${className}`.trim()}>{children}</div>;
  }

  return (
    <motion.div
      className={`${inView ? "sf-inview" : ""} ${className}`.trim()}
      initial={{ opacity: 0, scale: 0.94, ...(FROM[from] || FROM.up) }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      onViewportEnter={() => setInView(true)}
      transition={{ type: "spring", stiffness: 210, damping: 14, delay }}
    >
      {children}
    </motion.div>
  );
}
