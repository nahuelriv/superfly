import NavbarMin from "./components/NavbarMin/NavbarMin";
import Hero from "./components/Hero/Hero";
import AsiFueLaIII from "./components/AsiFueLaIII/AsiFueLaIII";
import Fotos from "./components/Fotos/Fotos";
import Flyers from "./components/Flyers/Flyers";
import QueHabia from "./components/QueHabia/QueHabia";
import NotifyForm from "./components/NotifyForm/NotifyForm";
import Countdown from "./components/Countdown/Countdown";
import Footer from "./components/Footer/Footer";
import TourVote from "./components/TourVote/TourVote";
import { useReveal } from "./hooks/useReveal";
import { useState } from "react";
import "./App.css";

function Reveal({ children, delay = 0, as: Tag = "div" }) {
  const [ref, revealed] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${revealed ? "reveal--in" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export default function App() {
  const [voteOpen, setVoteOpen] = useState(false);

  return (
    <>
      <a href="#main" className="sf-skip">Saltar al contenido</a>

      <NavbarMin />

      <main id="main" tabIndex="-1">
        <Hero onVote={() => setVoteOpen(true)} />

        <Reveal><AsiFueLaIII /></Reveal>
        <Reveal><Fotos /></Reveal>
        <Reveal><Flyers /></Reveal>
        <Countdown />
        <Reveal><QueHabia /></Reveal>
        <Reveal><NotifyForm /></Reveal>
      </main>

      <Footer />

      <TourVote
        open={voteOpen}
        onOpen={() => setVoteOpen(true)}
        onClose={() => setVoteOpen(false)}
      />
    </>
  );
}
