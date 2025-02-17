import styled from "styled-components";
import { Box, Button } from "@mui/material";

// Contenedor principal
export const TarjetaProducto = styled(Box)`
  position: relative;
  width: 250px;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
  background-color: #1c1919;

  &:hover {
    transform: scale(1.05);
  }

  &:hover .contenido {
    opacity: 1;
    visibility: visible;
  }

  &:hover .fondo-titulo {
    opacity: 0;
    visibility: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

// Fondo para el título
export const FondoOscuro = styled(Box)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 12px;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  color: white;
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
  visibility: visible;
`;

// Contenedor del hover
export const ContenidoExpandido = styled(Box)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
`;

// Estilos del nombre y precio mejorar
export const NombreProducto = styled(Box)`
  font-size: 22px;
  font-weight: bold;
`;

export const PrecioProducto = styled(Box)`
  font-size: 18px;
  font-weight: bold;
`;

// Botón "Ver más"
export const BotonVerMas = styled(Button)`
  color: #9747ff;
  font-weight: bold;
  text-transform: none;
  border: none;
  background: transparent;
  width: 100%;
  margin-top: 10px;
  padding: 8px;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    color: #530eae;
  }
`;
