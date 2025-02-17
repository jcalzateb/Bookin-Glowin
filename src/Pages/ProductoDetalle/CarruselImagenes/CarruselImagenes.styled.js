import styled from "styled-components";
import { DialogContent, IconButton } from "@mui/material";

// Contenedor del modal con fondo oscuro
export const ContenidoModal = styled(DialogContent)`
  position: relative;
  background: #000;
`;

// Botón para cerrar el modal
export const BotonCerrar = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  background: rgba(255, 255, 255, 0.3);
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

// Imagen dentro del carrusel
export const ImagenCarrusel = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
`;
