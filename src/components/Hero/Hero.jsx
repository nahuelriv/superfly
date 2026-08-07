import { motion, useReducedMotion } from "framer-motion";
import Burst from "../ui/Burst";
import Star from "../ui/Star";
import Bricks from "../ui/Bricks";
import ActionDashes from "../ui/ActionDashes";
import TicketButton from "../TicketButton/TicketButton";
import WildTitle from "../ui/WildTitle";
import PlaneIcon from "../ui/PlaneIcon";
import { useIsReady } from "../../hooks/useIsReady";
import { logo, proximo } from "../../data/festival";
import "./Hero.css";

// Curva "golpe de cómic": overshoot corto, sin rebote elástico largo.
const POP = [0.34, 1.56, 0.64, 1];

// Secuencia dirigida: los estallidos entran primero y le dan pie al logo, que
// cae con un shake corto; el título desliza desde la izquierda; los botones
// suben en stagger; y las estrellitas cierran con un twinkle.
const vBurstR = {
  hidden: { opacity: 0, scale: 0, rotate: -24, y: "-50%" },
  show: { opacity: 1, scale: 1, rotate: -8, y: "-50%", transition: { duration: 0.4, ease: POP } },
};
const vBurstL = {
  hidden: { opacity: 0, scale: 0, rotate: 26, y: "-55%" },
  show: { opacity: 1, scale: 1, rotate: 12, y: "-55%", transition: { duration: 0.4, ease: POP } },
};
// Blur a foco: entra desenfocado y se enfoca de golpe, como una cámara
// ajustando. El blur es transitorio (termina en foco total): excepción puntual
// al §4, no queda nada borroso.
const vLogo = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: 0.15, duration: 0.34, ease: "easeOut" },
  },
};
const vAviso = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { delay: 0.4, duration: 0.32, ease: "easeOut" } },
};
const vCtas = {
  hidden: {},
  show: { transition: { delayChildren: 0.55, staggerChildren: 0.09 } },
};
const vCtaItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function Hero({ onVote }) {
  const ready = useIsReady();
  const reduce = useReducedMotion();

  // Con reduced-motion: initial=false → framer pinta el estado final sin animar.
  const play = reduce ? "show" : ready ? "show" : "hidden";
  const initial = reduce ? false : "hidden";

  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* Estallidos-marco: entran primero y disparan el ritmo */}
      <motion.div className="hero__burst hero__burst--r" variants={vBurstR} initial={initial} animate={play}>
        <Burst className="hero__burst-svg" color="var(--sf-rosa)" points={14} />
      </motion.div>
      <motion.div className="hero__burst hero__burst--l" variants={vBurstL} initial={initial} animate={play}>
        <Burst className="hero__burst-svg" color="var(--sf-rosa)" points={13} />
      </motion.div>

      {/* Decoración siempre presente (estrellitas, ladrillos, líneas) */}
      <Star className="hero__star hero__star--1" color="var(--sf-blanco)" />
      <Star className="hero__star hero__star--2" color="var(--sf-cyan)" />
      <Star className="hero__star hero__star--3" color="var(--sf-blanco)" />
      <Star className="hero__star hero__star--4" color="var(--sf-cyan)" />

      <Bricks className="hero__bricks hero__bricks--tl" />
      <Bricks className="hero__bricks hero__bricks--br" stroke="var(--sf-rosa)" />
      <ActionDashes className="hero__dashes hero__dashes--l" />
      <ActionDashes className="hero__dashes hero__dashes--r" />

      <div className="hero__inner">
        <motion.h1 id="hero-title" className="hero__logo" variants={vLogo} initial={initial} animate={play}>
          <img
            src={logo.src}
            alt="Festival SuperFly"
            width="1530"
            height="580"
            fetchPriority="high"
            decoding="async"
          />
        </motion.h1>

        <motion.p className="hero__aviso" variants={vAviso} initial={initial} animate={play}>
          <WildTitle text="El mejor" className="hero__aviso-line hero__aviso-line--1" />
          <WildTitle text="festival" className="hero__aviso-line hero__aviso-line--2" />
          <WildTitle text="del mundo" className="hero__aviso-line hero__aviso-line--3" />
        </motion.p>

        <motion.div className="hero__ctas" variants={vCtas} initial={initial} animate={play}>
          <motion.div variants={vCtaItem}>
            <TicketButton className="hero__cta-primary" />
          </motion.div>
          <motion.div variants={vCtaItem}>
            <button type="button" className="tourvote-cta" onClick={onVote}>
              <span>¿A dónde vamos?</span>
              <PlaneIcon className="tourvote-cta__icon" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll: el peek de la sección siguiente es intencional */}
      <a className="hero__scroll" href="#recap" aria-label="Ver la edición anterior">
        <span className="hero__scroll-txt">Scroll</span>
        <svg className="hero__scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9 L12 15 L18 9" />
        </svg>
      </a>
    </section>
  );
}
