import styled from "styled-components";
import { Box, Button, IconButton, Typography, Rating } from "@mui/material";

export const Contenedor = styled(Box)`
  background-color: #2d0363;
  padding: 80px 0 0 0;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const ContenedorDetalle = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
`;

export const EncabezadoDetalle = styled(Box)`
  background-color: #2d0363;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #f6ebf9;
  padding: 10px 50px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (min-width: 601px) and (max-width: 768px) {
    padding: 0 20px;
  }

  @media (min-width: 769px) {
    padding: 10px 40px;
  }
`;

export const TituloProducto = styled.h1`
  font-size: 36px !important;
  text-align: center;
  font-family: ${({ theme }) => theme.typography.h1.fontFamily};
  font-weight: 600 !important;
  font-size: calc(${({ theme }) => theme.typography.h1.fontSize} * 1.6);
  color: #f6ebf9;

  @media (max-width: 768px) {
    font-size: 24px !important;
    text-align: center;
  }
`;
export const BotonRetroceso = styled(IconButton)`
  border-radius: 50% !important;
  padding: 6px !important;

  &:hover {
    color: #9747ff !important;
  }
  &:active {
    color: #530eae !important;
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
  height: 100%;
  max-height: 550px;
  background-color: #ffffff;
  padding: 30px 130px;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    padding: 10px 20px;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 601px) and (max-width: 786px) {
    padding: 30px 50px;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 787px) and (max-width: 1080px) {
    padding: 30px 100px;
    flex-direction: column;
    align-items: center;
  }
`;

export const ImagenPrincipal = styled(Box)`
  width: 50%;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  background-size: cover;
  background-position: center;

  @media (max-width: 786px) {
    width: 100%;
    height: 300px;
  }
  @media (min-width: 787px) and (max-width: 1080px) {
    width: 100%;
    height: 400px;
  }
`;

export const MiniaturasImagenes = styled(Box)`
  position: relative;
  width: 50%;
  height: 450px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: space-between;

  img {
    width: 48%;
    height: 48%;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 175px;
    align-content: space-between;
    justify-content: space-between;
  }

  @media (min-width: 601px) and (max-width: 786px) {
    width: 100%;
    height: 100px;
    flex-wrap: nowrap;
    justify-content: space-between;
    img {
      width: 22%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  @media (min-width: 787px) and (max-width: 1080px) {
    width: 100%;
    height: 200px;
    flex-wrap: nowrap;
    justify-content: space-between;
    img {
      width: 22%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }
`;

export const BotonVerMas = styled(Button)`
  position: absolute !important;
  bottom: 8px;
  right: 12px;
  z-index: 3;
  font-weight: bold;
  color: white !important;
  background-color: #2d0363 !important;
  border-radius: 8px;
  padding: 6px 12px;
  font-family: ${({ theme }) => theme.typography.button.fontFamily};
  &:hover {
    background-color: #530eae !important;
  }
  @media (max-width: 600px) {
    bottom: 4px;
    right: 4px;
    font-size: 14px;
  }
`;

export const CarruselImagenes = styled(Box)`
  display: ${(props) => (props.abierto ? "block" : "none")};
`;

export const ContenedorInfo = styled(Box)`
  background-color: #2d0363;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  padding: 30px 130px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px 30px;
  }

  @media (min-width: 601px) and (max-width: 786px) {
    padding: 20px 10px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export const ContenedorInfoI = styled(Box)`
  flex: 70%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin-bottom: 10px;
`;

export const DescripcionProducto = styled(Box)`
  margin-bottom: 20px;
`;

export const TituloDescripcion = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const CuerpoDescripcion = styled(Typography)`
  color: white !important;
  font-size: 18px !important;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const ContenedorValoracionResena = styled(Box)`
  color: white;
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
  color: white;
`;

export const Valoracion = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BotonVerResena = styled(Button)`
  font-weight: bold;
  color: white !important;
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
  padding: 30px 10px 0 0;
  color: white;
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
  gap: 50px;
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
  margin-bottom: 20px;
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
  font-size: 30px;
`;

export const BotonReservar = styled(Button)`
  background-color: #2d0363 !important;
  color: white !important;
  font-weight: 500;
  text-transform: none;
  padding: 10px 20px;
  border-radius: 8px;
  &:hover {
    background-color: #530eae !important;
  }
`;

export const ContenedorPuntuacion = styled(Box)`
  width: 100%;
  background-color: #ffffff;
`;

export const ContenedorResenas = styled(Box)`
  padding: 30px 130px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  @media (max-width: 600px) {
    padding: 30px 20px;
  }

  @media (min-width: 601px) and (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export const ContenedorComentario = styled(Box)`
  width: 100%;
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 2px solid #ddd;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const EstrellaComentario = styled(Rating)`
  color: #ff9800;
  margin-bottom: 10px;
`;

export const DetallesComentario = styled(Box)`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #888;
  text-align: left;
`;

export const PoliticasContenedor = styled(Box)`
  width: 100%;
  background-color: #ffffff;
  padding: 30px 130px;
  color: #333;

  @media (max-width: 600px) {
    width: 100%;
    font-size: calc(${({ theme }) => theme.typography.h1.fontSize} * 1.2);
  }
  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 1130px) {
    padding: 30px 60px;
  }
`;

export const TituloPoliticas = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: #2d0363;
  margin-bottom: 20px;
`;

export const ListaPoliticas = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PoliticaItem = styled(Box)`
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > strong {
    font-weight: 700;
    color: #2d0363;
  }

  & > p {
    color: #555;
    font-size: 16px;
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

export const BotonCompartirRedes = styled(IconButton)`
  border-radius: 50% !important;
  padding: 6px !important;
  &:hover {
    color: #9747ff !important;
  }
  &:active {
    color: #530eae !important;
  }
`;
export const FavoritoIcono = styled(IconButton)`
  border-radius: 50% !important;
  padding: 6px !important;
  &:hover {
    color: ${({ $favorito }) => ($favorito ? "darkred" : "#9747ff")}!important;
  }
  &:active {
    color: ${({ $favorito }) => ($favorito ? "darkred" : "#530eae")};
  }
`;
