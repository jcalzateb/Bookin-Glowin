import styled from "styled-components";
import { Box, Button, Typography } from "@mui/material";

export const Contenedor = styled.div`
  padding: 20px;
  background-color: #b093d5;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 960px) {
    padding: 15px;
  }

  @media (max-width: 600px) {
    padding: 10px;
  }
`;
export const TituloSeccion = styled.h2`
  font-size: 42px;
  font-weight: bold;
  color: #2d0363;
  margin: 10px 20px;
  overflow: hidden;
  text-align: center;
`;

export const ContenedorDestacados = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;

  @media (max-width: 960px) {
    gap: 15px;
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

export const TarjetaDestacada = styled(Box)`
  width: 300px;
  height: 300px;
  background-image: url(${(props) => props.imagen});
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  &:hover .hover {
    opacity: 1;
  }

  &:hover .titulo {
    opacity: 0;
  }

  &:hover .estrella {
    opacity: 0;
  }
  @media (max-width: 1400px) {
    width: 240px;
    height: 240px;
  }

  @media (max-width: 960px) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: 600px) {
    width: 260px;
    height: 260px;
  }
`;

export const TituloDestacado = styled(Box)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background: rgba(26, 0, 48, 0.6);
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

export const EstrellaDestacada = styled(Box)`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #f6ebf9;
  color: gold;
  font-size: 4px;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 15;
`;

export const ContenidoHover = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  color: Black;
  text-align: left;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  z-index: 20;
  @media (max-width: 1400px) {
    padding: 4px 16px;
    gap: 12px;
    font-size: 16px;
  }
  @media (max-width: 960px) {
    padding: 5px 14px;
    gap: 7px;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    padding: 5px 20px;
    gap: 17px;
    font-size: 12px;
  }
`;
export const Valoracion = styled(Box)`
  display: flex;
  align-items: flex-start;
`;

export const BotonVerMas = styled.b`
  width: 100%;
  background: #2d0363;
  color: white;
  font-weight: 500;
  text-transform: none;
  font-size: 14px;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 5px;
  align-items: center;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #530eae;
  }
  @media (min-width: 960px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const ControlesCarrusel = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0 20px 0;
`;

export const Indicadores = styled(Box)`
  display: flex;
  gap: 6px;
  margin: 0 10px;
`;

export const Indicador = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $activo }) => ($activo ? "#9747FF" : "#C4C4C4")};
  cursor: pointer;
  transition: background 0.3s;
`;

export const PuntuacionProducto = styled(Typography)`
  font-size: 14px;
  color: #2d0363;
`;
