import styled from "styled-components";
import { Box, TextField, FormControl, InputLabel, Select, IconButton } from "@mui/material";

// Contenedor Principal del Buscador
export const ContenedorBuscador = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 40px 20px;
  text-align: center;
`;

// Campo de Búsqueda
export const CampoBusqueda = styled(TextField)`
  max-width: 500px;
  background-color: #ffffff;
  border-radius: 25px;

  & .MuiOutlinedInput-root {
    border-radius: 25px;
    & fieldset {
      border-color: #c4c4c4;
    }
    &:hover fieldset {
      border-color: #1c1919;
    }
    &.Mui-focused fieldset {
      border-color: #1c1919;
    }
  }
`;

// Botón de Limpiar Búsqueda
export const BotonLimpiar = styled(IconButton)`
  background-color: #cccccc;
  color: #1c1919;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #bcbcbc;
  }
`;


// Contenedor de Filtros
export const ContenedorFiltros = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 900px;
  width: 100%;
`;

// Estilos para los Filtros con mayor tamaño
export const Filtro = styled(FormControl)`
  min-width: 200px !important;

  & .MuiOutlinedInput-root {
    border-radius: 0 25px 25px 25px;
    & fieldset {
      border-color: #c4c4c4;
    }
    &:hover fieldset {
      border-color: #1c1919;
    }
    &.Mui-focused fieldset {
      border-color: #1c1919;
    }
  }

  & .MuiInputLabel-root {
    color: #000;
  }

  & .Mui-focused {
    color: #000 !important;
  }
`;

