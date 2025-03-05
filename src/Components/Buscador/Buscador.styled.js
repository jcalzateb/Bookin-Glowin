import styled from "styled-components";
import { Button, TextField } from "@mui/material";

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

export const FondoBanner = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

// Contenedor (isologo + barra de búsqueda + botón)
export const ContenedorContenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 40px;
  border-radius: 0 0 10px 10px;


  @media (max-width: 960px) {
    padding: 30px;
  }

  @media (max-width: 600px) {
    padding: 20px;
    width: 85%;
  }
`;

export const Isologo = styled.img`
  width: 100%;
  max-width: 500px;
  margin-bottom: 36px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.20));
  @media (max-width: 960px) {
    max-width: 400px;
  }

  @media (max-width: 600px) {
    max-width: 280px;
  }
`;

export const BarraBusqueda = styled.div`
  display: flex;
  width:100%;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    flex-wrap: nowrap;
  }
`;

export const CampoBusqueda = styled(TextField)`
  && {
    background-color: #f6ebf9 !important;
    border-radius: 50px;
    width: 100%;
    border-color: #f6ebf9 !important;
    font-family: ${({ theme }) => theme.typography.button.fontFamily};

    & .MuiOutlinedInput-root {
      border-radius: 50px;
      border-color: #f6ebf9 !important;

      &:hover fieldset {
        border-color: #9747ff !important;
      }

      &.Mui-focused fieldset {
        border-color: #2d0363 !important;
      }
    }

    & .MuiInputLabel-root {
      color: #2d0363 !important;
    }

    & .MuiOutlinedInput-input {
      color: #2d0363 !important;
    }

    & .Mui-focused {
      color: ${({ theme }) => theme.palette.botones.activo} !important;
    }
  }
`;

export const BotonLimpiar = styled(Button)`
  && {
    background-color: #2d0363 !important;
    color: #f6ebf9 !important;
    border-radius: 50%;
    height: 56px;
    min-width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #f6ebf9 !important;
      color: #2d0363 !important;
    }
    &:active {
      background-color: #9747ff !important;
    }
  }
`;

export const BotonBuscar = styled(Button)`
  && {
    background-color: #2d0363 !important;
    color: #f6ebf9 !important;
    font-weight: 500;
    width: 100%;
    padding: 12px;
    border-radius: ${({ theme }) => theme.borderRadius.botones} !important;
    text-transform: none;
    font-size: 16px;
    font-family: ${({ theme }) => theme.typography.button.fontFamily} !important;

    &:hover {
      background-color: #530eae !important;
    }

    &:active {
      background-color: #9747ff !important;
    }

    &:disabled {
      background-color: ${({ theme }) =>
        theme.palette.botones.inactivo} !important;
    }
  }

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }
`;
