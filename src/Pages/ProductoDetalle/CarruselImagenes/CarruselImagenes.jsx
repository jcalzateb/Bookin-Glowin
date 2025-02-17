import React from "react";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ContenidoModal, BotonCerrar, ImagenCarrusel } from "./CarruselImagenes.styled";

const CarruselImagenes = ({ imagenes, abierto, cerrar }) => {
  return (
    <Dialog open={abierto} onClose={cerrar} maxWidth="md" fullWidth>
      <ContenidoModal>
        <BotonCerrar onClick={cerrar}>
          <CloseIcon />
        </BotonCerrar>

        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay swipeable emulateTouch>
          {imagenes.map((img, index) => (
            <div key={index}>
              <ImagenCarrusel src={img} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </ContenidoModal>
    </Dialog>
  );
};

export default CarruselImagenes;
