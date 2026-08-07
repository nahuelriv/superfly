import NavbarMin from "./components/NavbarMin/NavbarMin";
import Hero from "./components/Hero/Hero";
import AsiFueLaIII from "./components/AsiFueLaIII/AsiFueLaIII";
import Fotos from "./components/Fotos/Fotos";
import Canon from "./components/Canon/Canon";
import Flyers from "./components/Flyers/Flyers";
import Contador from "./components/Contador/Contador";
import NotifyForm from "./components/NotifyForm/NotifyForm";
import Countdown from "./components/Countdown/Countdown";
import Footer from "./components/Footer/Footer";
import TourVote from "./components/TourVote/TourVote";
import Vinilo from "./components/Vinilo/Vinilo";
import Intro from "./components/Intro/Intro";
import AnimatedSection from "./components/ui/AnimatedSection";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [voteOpen, setVoteOpen] = useState(false);

  return (
    <>
      <Intro />

      <a href="#main" className="sf-skip">Saltar al contenido</a>

      <NavbarMin />

      <main id="main" tabIndex="-1">
        <Hero onVote={() => setVoteOpen(true)} />

        <AnimatedSection from="up"><Contador /></AnimatedSection>
        <AnimatedSection from="left"><AsiFueLaIII /></AnimatedSection>
        <Fotos />
        <AnimatedSection from="left"><Canon /></AnimatedSection>
        <Flyers />
        <Countdown />
        <AnimatedSection from="up"><NotifyForm /></AnimatedSection>
      </main>

      <Footer />

      <TourVote
        open={voteOpen}
        onOpen={() => setVoteOpen(true)}
        onClose={() => setVoteOpen(false)}
      />

      <Vinilo />
    </>
  );
}
