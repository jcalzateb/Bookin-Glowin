import styled from "styled-components";
import { Box, Button, IconButton } from "@mui/material";

// Contenedor principal
export const ContenedorDetalle = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  max-width: 1200px;
  margin: auto;
`;

// Encabezado con título y botón de retroceso
export const EncabezadoDetalle = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const BotonRetroceso = styled(IconButton)`
  background: #e0e0e0;
  border-radius: 50%;
  padding: 6px;

  &:hover {
    background: #d0d0d0;
  }
`;

// Contenedor del bloque de imágenes
export const BloqueImagenes = styled(Box)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
`;

// Imagen principal
export const ImagenPrincipal = styled(Box)`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
`;

// Miniaturas de imágenes
export const MiniaturasImagenes = styled(Box)`
   position: relative !important;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

// Botón "Ver Más"
export const BotonVerMas = styled(Button)`
  position: absolute !important;
  bottom: 5px;
  right: 5px; 
   z-index: 3;
  font-weight: bold;
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;



// Contenedor de la segunda sección
export const ContenedorInfo = styled(Box)`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  width: 100%;
`;

// Descripción del producto
export const DescripcionProducto = styled(Box)`
  flex: 2;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 12px;
`;

// Contenedor de reserva
export const ContenedorReserva = styled(Box)`
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;
`;

// Botón de reserva
export const BotonReservar = styled(Button)`
  color: white;
  font-weight: bold;
  text-transform: none;
  border-radius: 8px;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;
