import { useEffect, useState } from "react";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { proximo } from "../../data/festival";
import "./NavbarMin.css";

export default function NavbarMin() {
  const { direction, atTop } = useScrollDirection(10);
  const [pastHero, setPastHero] = useState(false);

  // El logo del header aparece recién cuando el hero sale de vista.
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "-60px 0px 0px 0px", threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const hidden = direction === "down" && !atTop;

  return (
    <header
      className={[
        "navmin",
        hidden ? "navmin--hidden" : "",
        atTop ? "navmin--top" : "navmin--solid",
      ].join(" ")}
    >
      <a
        className={`navmin__brand ${pastHero ? "navmin__brand--in" : ""}`}
        href="#main"
        aria-label="Ir al inicio"
        tabIndex={pastHero ? 0 : -1}
      >
        <img src="/favicon.jpg" alt="" width="96" height="96" aria-hidden="true" />
      </a>

      <a
        className="navmin__ig"
        href={proximo.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram de Festival SuperFly"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
      </a>
    </header>
  );
}
