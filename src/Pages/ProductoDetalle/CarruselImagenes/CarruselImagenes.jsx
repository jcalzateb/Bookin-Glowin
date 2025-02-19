import React, { useState } from "react";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  ContenidoModal,
  BotonCerrar,
  ImagenCarrusel,
  BotonNavegacion,
} from "./CarruselImagenes.styled";

const CarruselImagenes = ({ imagenes, abierto, cerrar }) => {
  const [indiceActual, setIndiceActual] = useState(0);

  const handleNext = () => {
    setIndiceActual((prevIndex) => (prevIndex + 1) % imagenes.length);
  };

  const handlePrev = () => {
    setIndiceActual((prevIndex) => (prevIndex - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <Dialog open={abierto} onClose={cerrar} maxWidth="lg" fullWidth>
      <ContenidoModal>

        <BotonCerrar onClick={cerrar} aria-label="Cerrar carrusel">
          <CloseIcon />
        </BotonCerrar>

        <BotonNavegacion onClick={handlePrev} posicion="izquierda" aria-label="Imagen anterior">
          <ArrowBackIosIcon />
        </BotonNavegacion>

        <ImagenCarrusel src={imagenes[indiceActual]} alt={`Imagen ${indiceActual + 1}`} />

        <BotonNavegacion onClick={handleNext} posicion="derecha" aria-label="Imagen siguiente">
          <ArrowForwardIosIcon />
        </BotonNavegacion>
      </ContenidoModal>
    </Dialog>
  );
};

export default CarruselImagenes;
