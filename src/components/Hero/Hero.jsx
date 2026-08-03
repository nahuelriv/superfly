import { useRef } from "react";
import Burst from "../ui/Burst";
import Star from "../ui/Star";
import Bricks from "../ui/Bricks";
import ActionDashes from "../ui/ActionDashes";
import TicketButton from "../TicketButton/TicketButton";
import WildTitle from "../ui/WildTitle";
import PlaneIcon from "../ui/PlaneIcon";
import { useParallax } from "../../hooks/useParallax";
import { logo, proximo } from "../../data/festival";
import "./Hero.css";

export default function Hero({ onVote }) {
  const heroRef = useRef(null);
  useParallax(heroRef);

  return (
    <section className="hero" aria-labelledby="hero-title" ref={heroRef}>
      {/* Estallidos a ambos lados como marco (no dominan el centro) */}
      <Burst className="hero__burst hero__burst--r" color="var(--sf-rosa)" points={14} />
      <Burst className="hero__burst hero__burst--l" color="var(--sf-rosa)" points={13} />

      {/* Destellos repartidos parejo, lejos del área de texto */}
      <Star className="hero__star hero__star--1" color="var(--sf-blanco)" />
      <Star className="hero__star hero__star--2" color="var(--sf-cyan)" />
      <Star className="hero__star hero__star--3" color="var(--sf-blanco)" />
      <Star className="hero__star hero__star--4" color="var(--sf-cyan)" />
      <Bricks className="hero__bricks hero__bricks--tl" />
      <Bricks className="hero__bricks hero__bricks--br" stroke="var(--sf-rosa)" />
      <ActionDashes className="hero__dashes hero__dashes--l" />
      <ActionDashes className="hero__dashes hero__dashes--r" />

      <div className="hero__inner">
        <h1 id="hero-title" className="hero__logo">
          <img
            src={logo.src}
            alt="Festival SuperFly"
            width="1530"
            height="580"
            fetchPriority="high"
            decoding="async"
          />
        </h1>

        <p className="hero__aviso">
          <WildTitle text="El mejor festival del mundo" className="hero__aviso-txt" />
        </p>

        <div className="hero__ctas">
          <TicketButton className="hero__cta-primary" />

          <button type="button" className="tourvote-cta" onClick={onVote}>
            <span>¿A dónde vamos?</span>
            <PlaneIcon className="tourvote-cta__icon" />
          </button>
        </div>
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
