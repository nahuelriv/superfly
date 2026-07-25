import Marquee from "../ui/Marquee";
import Star from "../ui/Star";
import Bricks from "../ui/Bricks";
import { logo, proximo } from "../../data/festival";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <Marquee texto="SUPERFLY! · EL MEJOR FESTIVAL DEL MUNDO" variant="rosa" />

      <div className="sf-container footer__inner">
        <Star className="footer__star footer__star--1" color="var(--sf-cyan)" />
        <Star className="footer__star footer__star--2" color="var(--sf-blanco)" />
        <Bricks className="footer__bricks" stroke="var(--sf-navy)" />
        <a className="footer__brand" href="#main" aria-label="Ir al inicio">
          <img src={logo.src} alt={logo.alt} width="1530" height="580" loading="lazy" decoding="async" />
        </a>

        <a
          className="footer__ig"
          href={proximo.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Star className="footer__ig-star" color="var(--sf-cyan)" />
          {proximo.instagramHandle}
        </a>

        <p className="footer__credito">
          <span className="footer__credito-cart">C Art Media</span>
          <span className="footer__credito-sep" aria-hidden="true">·</span>
          Festival SuperFly!
        </p>
      </div>
    </footer>
  );
}
