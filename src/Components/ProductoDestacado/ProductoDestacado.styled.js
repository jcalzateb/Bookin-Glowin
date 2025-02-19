import styled from "styled-components";
import { Box, Button } from "@mui/material";

// Contenedor del carrusel
export const ContenedorDestacados = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 20px;
  flex-wrap: wrap;

  @media (max-width: 960px) { 
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 600px) { 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
  }
`;

// Tarjetas de productos destacados
export const TarjetaDestacada = styled(Box)`
  width: 200px;
  height: 200px;
  background-image: url(${(props) => props.imagen});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 0 5px;

  &:hover .hover {
    opacity: 1;
  }

  &:hover .titulo {
    opacity: 0;
  }

  &:hover .estrella {
    opacity: 0;
  }

  @media (max-width: 960px) { 
    width: 180px;
    height: 180px;
  }

  @media (max-width: 600px) { 
    width: 220px;
    height: 220px;
  }
`;

// 🔹 **Corrección del título** → Siempre visible con tamaño fijo
export const TituloDestacado = styled(Box)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 34%; /* 🔹 Altura fija */
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  color: white;
  padding: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 10;
`;

// Contenedor de la estrella
export const EstrellaDestacada = styled(Box)`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  color: gold;
  font-size: 24px;
`;

// Contenedor del hover
export const ContenidoHover = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  z-index: 20;
`;

// **Botón "Ver Más" corregido**
export const BotonVerMas = styled(Button)`
  background: transparent !important;
  color: #9747FF !important;
  font-weight: 500;
  text-transform: none;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #530EAE !important;
  }

  &:active {
    color: #2D0363 !important;
  }
`;

// Controles del carrusel
export const ControlesCarrusel = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

// Indicadores del carrusel
export const Indicadores = styled(Box)`
  display: flex;
  gap: 6px;
  margin: 0 10px;
`;

// Puntos indicadores
export const Indicador = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ activo }) => (activo ? "#9747FF" : "#C4C4C4")};
  cursor: pointer;
  transition: background 0.3s;
`;
