import styled from "styled-components";
import { Box, Button, IconButton } from "@mui/material";

export const ContenedorDetalle = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 80px 50px 20px 50px;
  max-width: 1200px;
  margin: auto;
  background-color: ${({ theme }) => theme.palette.primario.main};
  color: ${({ theme }) => theme.palette.secundario.main};
`;

export const EncabezadoDetalle = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    font-size: calc(${({ theme }) => theme.typography.h1.fontSize} * 1.2);
  }
`;

export const TituloProducto = styled.h1`
  font-family: ${({ theme }) => theme.typography.h1.fontFamily};
  font-weight: 900;
  font-size: calc(${({ theme }) => theme.typography.h1.fontSize} * 1.6);
  color: ${({ theme }) => theme.palette.secundario.main};

  @media (max-width: 600px) {
    font-size: 32px;
    text-align: center;
  }
`;

export const BotonRetroceso = styled(IconButton)`
  background: #e0e0e0;
  border-radius: 50%;
  padding: 6px;

  &:hover {
    background: ${({ theme }) => theme.palette.botones.hovered};
  }
`;

export const BloqueImagenes = styled(Box)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`;

export const ImagenPrincipal = styled(Box)`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.015);
  }

  @media (max-width: 600px) {
    height: 280px;
  }
`;

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

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: none;
    height: auto;
  }
`;

export const BotonVerMas = styled(Button)`
  position: absolute !important;
  bottom: 5px;
  right: 5px;
  z-index: 3;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.detalle.main} !important;
  background: transparent;
  border-radius: 8px;
  padding: 6px 12px;
  font-family: ${({ theme }) => theme.typography.button.fontFamily};
  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.palette.botones.hovered} !important;
  }
  @media (max-width: 600px) {
    bottom: 1px;
    right: 1px;
    font-size: 14px;
  }
`;

export const ContenedorInfo = styled(Box)`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TituloDescripcion = styled.h2`
  font-family: ${({ theme }) => theme.typography.h2.fontFamily};
  font-weight: 900;
  font-size: calc(${({ theme }) => theme.typography.h2.fontSize} * 1.4);
  color: ${({ theme }) => theme.palette.secundario.main};
  margin-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

export const DescripcionProducto = styled(Box)`
  flex: 2;
  padding: 20px;
  font-family: ${({ theme }) => theme.typography.h3.fontFamily};
  font-weight: bold;
  font-size: calc(${({ theme }) => theme.typography.h3.fontSize} * 1.3);
  font-style: normal;

  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.typography.h4.fontSize};
    padding: 10px;
  }
`;

export const ContenedorReserva = styled(Box)`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-family: ${({ theme }) => theme.typography.h4.fontFamily};
  font-weight: bold;
  font-size: calc(${({ theme }) => theme.typography.h4.fontSize} * 1.3);
  color: black;

  @media (max-width: 600px) {
    padding: 8px;
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
  }
`;

export const PrecioProducto = styled.p`
  font-family: ${({ theme }) => theme.typography.h2.fontFamily};
  font-size: calc(${({ theme }) => theme.typography.h1.fontSize} * 1.1);
  font-weight: 600;
  color: ${({ theme }) => theme.palette.secundario.main};
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const BotonReservar = styled(Button)`
  color: white !important;
  font-weight: 400 !important;
  text-transform: none !important;
  border-radius: 5px !important;
  width: 30%;
  margin: 10px 0 !important;
  padding: 2px !important;
  font-size: 16px !important;
  background-color: ${({ theme }) => theme.palette.botones.activo} !important;

  &:hover {
    background-color: ${({ theme }) =>
      theme.palette.botones.hovered} !important;
  }

  &:active {
    background-color: ${({ theme }) =>
      theme.palette.botones.presionado} !important;
  }

  &:disabled {
    background-color: ${({ theme }) =>
      theme.palette.botones.inactivo} !important;
  }

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }
`;
export const ContenedorCaracteristicas = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const ListaCaracteristicas = styled(Box)`
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CaracteristicaItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
`;

export const IconoCaracteristica = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;

  svg {
    font-size: 24px;
    color: #6c63ff;
  }
`;
