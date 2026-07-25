import Burst from "../ui/Burst";
import Star from "../ui/Star";
import Bricks from "../ui/Bricks";
import Label from "../ui/Label";
import WildTitle from "../ui/WildTitle";
import { edicionAnterior } from "../../data/festival";
import "./AsiFueLaIII.css";

export default function AsiFueLaIII() {
  return (
    <section id="recap" className="asifue" aria-labelledby="asifue-title">
      {/* Estallido de fondo que desborda por la derecha */}
      <Burst className="asifue__bg-burst" color="var(--sf-rosa)" points={15} />

      <div className="sf-container asifue__inner">
        <h2 id="asifue-title" className="asifue__title">
          <WildTitle text="Así fue la" className="asifue__title-txt" />
          <span className="asifue__edicion">
            <Burst className="asifue__edicion-burst" color="var(--sf-cyan)" points={12} />
            <WildTitle text={edicionAnterior.edicion} className="asifue__edicion-txt" />
          </span>
        </h2>

        <div className="asifue__datos sf-stagger">
          <Label variant="blanco" rotate={-2} shadow="rosa">
            {edicionAnterior.fechaLarga}
          </Label>
          <Label variant="blanco" rotate={2} shadow="rosa">
            {edicionAnterior.ubicacion}
          </Label>
        </div>

        <p className="asifue__resumen">{edicionAnterior.resumen}</p>

        {/* Relleno de densidad (fuera del área de texto) */}
        <Star className="asifue__star asifue__star--1" color="var(--sf-blanco)" />
        <Star className="asifue__star asifue__star--2" color="var(--sf-cyan)" />
        <Bricks className="asifue__bricks" />
      </div>
    </section>
  );
}
