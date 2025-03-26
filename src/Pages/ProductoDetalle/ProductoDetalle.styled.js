import styled from "styled-components";
import { Box, Button, IconButton, Typography } from "@mui/material";

export const Contenedor = styled(Box)`
  background-color: white;
  padding: 80px 50px 20px 50px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  @media (max-width: 600px) {
    padding: 80px 20px 20px 20px;
  }
`;

export const ContenedorDetalle = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
  padding: 20px;

  @media (max-width: 786px) {
    padding: 0 10px;
    width: 100%;
  }
`;

export const EncabezadoDetalle = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  //padding: 0 20px;
  margin-bottom: 20px;

  @media (max-width: 786px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    width: 100%;
    font-size: calc(${({ theme }) => theme.typography.h1.fontSize} * 1.2);
  }
`;

export const TituloProducto = styled.h1`
  text-align: center;
  font-family: ${({ theme }) => theme.typography.h1.fontFamily};
  font-weight: 900;
  font-size: calc(${({ theme }) => theme.typography.h1.fontSize} * 1.6);
  color: ${({ theme }) => theme.palette.secundario.main};

  @media (max-width: 600px) {
    font-size: 24px;
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

export const BotonesIconos = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 600px) {
    justify-content: flex-start;
    gap: 8px;
  }
`;

export const BloqueImagenes = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;

  @media (max-width: 786px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ImagenPrincipal = styled(Box)`
  width: 50%;
  border-radius: 12px;
  overflow: hidden;
  background-size: cover;
  background-position: center;

  @media (max-width: 786px) {
    width: 100%;
    height: 350px;
  }
`;

export const MiniaturasImagenes = styled(Box)`
  position: relative;
  width: 50%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;

  img {
    width: 48%;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (max-width: 786px) {
    width: 100%;
    justify-content: center;
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

export const CarruselImagenes = styled(Box)`
  display: ${(props) => (props.abierto ? "block" : "none")};
`;

export const ContenedorInfo = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  padding: 30px 0 50px 0;

  @media (max-width: 786px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
  }
`;

export const ContenedorInfoI = styled(Box)`
  flex: 70%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
`;

export const DescripcionProducto = styled(Box)`
  margin-bottom: 20px;
`;

export const TituloDescripcion = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #2d0363;
  margin-bottom: 20px;
`;

export const CuerpoDescripcion = styled(Typography)`
  font-size: 18px !important;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const ContenedorValoracionResena = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  gap: 20px;
  margin-bottom: 12px;
  @media (max-width: 1030px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const TituloValoracion = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  color: #555;
`;

export const Valoracion = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #2d0363;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BotonVerResena = styled(Button)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.detalle.main} !important;
  background: transparent;
  padding: 0 !important;
  font-family: ${({ theme }) => theme.typography.button.fontFamily};
  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.palette.botones.hovered} !important;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const ContenedorCaracteristicas = styled(Box)`
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  @media (max-width: 786px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ListaCaracteristicas = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;

  gap: 10px;
  @media (max-width: 1130px) {
    padding: 10px 30px;
    flex-direction: column;
  }
`;

export const CaracteristicaItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IconoCaracteristica = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6ebf9;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding: 5px;
`;

export const ContenedorInfoD = styled(Box)`
  flex: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 10px;
  padding: 20px 40px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
export const PrecioProducto = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #2d0363;
  margin-bottom: 10px;
`;

export const ContenedorReserva = styled(Box)`
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 12px;
  font-weight: bold;
  height: 80%;
`;

export const Turno = styled(Box)`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 20px;
`;
export const Horario = styled(Box)`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;
export const Disponibilidad = styled(Box)`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid #ddd;
  padding: 20px;
`;

export const BotonReservar = styled(Button)`
  background-color: #2d0363;
  color: white;
  font-weight: 500;
  text-transform: none;
  padding: 10px 20px;
  border-radius: 8px;
  &:hover {
    background-color: #530eae;
  }
`;

export const ContenedorPuntuacion = styled(Box)`
  margin-top: 20px;
`;

export const ContenedorResenas = styled(Box)`
  margin-top: 20px;
  padding: 10px;
  border-radius: 8px;
`;

export const PoliticasContenedor = styled(Box)`
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  color: #333;

  @media (max-width: 600px) {
    width: 100%;
    font-size: calc(${({ theme }) => theme.typography.h1.fontSize} * 1.2);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TituloPoliticas = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #2d0363;
  margin-bottom: 20px;
  text-align: center;
`;

export const PoliticaItem = styled(Box)`
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;

  & > strong {
    font-weight: bold;
    color: #2d0363;
  }

  & > p {
    margin-left: 15px;
  }
`;

export const LineaSeparator = styled.hr`
  border: 0;
  border-top: 1px solid #ddd;
  margin: 20px 0;
`;

export const MensajeError = styled(Typography)`
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 40px;
`;

export const BotonCompartirRedes = styled(Button)`
  background-color: transparent;
  color: gray;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 8px;
  text-transform: none;
  display: flex;
  align-items: center;
  margin-left: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: ${({ theme }) => theme.palette.botones.hovered};
  }
`;
