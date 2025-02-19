import styled from "styled-components";
import { Button, TextField  } from "@mui/material";

// Contenedor principal
export const ContenedorBuscador = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 960px) {
    height: 500px;
  }

  @media (max-width: 600px) {
    height: auto;
    padding: 20px 0;
  }
`;

// Imagen de fondo
export const FondoBanner = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

// Contenedor del contenido (isologo + barra de búsqueda + botón)
export const ContenedorContenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  backdrop-filter: blur(5px);

  @media (max-width: 960px) {
    padding: 30px;
  }

  @media (max-width: 600px) {
    padding: 20px;
    width: 85%;
  }
`;

// Imagen del isologo
export const Isologo = styled.img`
  width: 100%;
  max-width: 500px;
  margin-bottom: 30px;

  @media (max-width: 960px) {
    max-width: 400px;
  }

  @media (max-width: 600px) {
    max-width: 280px;
  }
`;

// Contenedor de la barra de búsqueda
export const BarraBusqueda = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-wrap: nowrap;
  }
`;

export const CampoBusqueda = styled(TextField)`
  && {
    background-color: #fff;
    border-radius: 10px;

    & .MuiOutlinedInput-root {
      border-radius: 5px;
      border-color: ${({ theme }) => theme.palette.botones.activo} !important;

      &:hover fieldset {
        border-color: ${({ theme }) => theme.palette.botones.hovered} !important;
      }

      &.Mui-focused fieldset {
        border-color: ${({ theme }) => theme.palette.botones.activo} !important;
      }
    }

    & .MuiInputLabel-root {
      color: #000 !important;
    }

    & .MuiOutlinedInput-input {
      color: #000 !important;
    }

    & .Mui-focused {
      color: ${({ theme }) => theme.palette.botones.activo} !important;
    }
  }
`;

export const BotonLimpiar = styled(Button)`
  && {
    background-color:rgba(136, 136, 136, 0) !important; 
    color:rgb(129, 129, 129) !important;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    min-width: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color:rgb(255, 255, 255) !important;
      color:rgba(111, 111, 111, 0.58) !important;
    }
    &:active {
      background-color:rgba(116, 116, 116, 0.88) !important; 
    }
  }
`;

export const BotonBuscar = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.palette.botones.activo} !important;
    color: white !important;
    font-weight: 500;
    width: 100%;
    padding: 12px;
    border-radius: 4px;
    text-transform: none;
    font-size: 16px;

    &:hover {
      background-color: ${({ theme }) => theme.palette.botones.hovered} !important;
    }

    &:active {
      background-color: ${({ theme }) => theme.palette.botones.presionado} !important;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.palette.botones.inactivo} !important;
    }
  }

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }
`;