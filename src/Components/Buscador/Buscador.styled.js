import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import tema from "../../Styles/tema";

export const ContenedorBuscador = styled.div`
  position: relative;
  width: 100%;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: start;
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

// Contenedor (Títulos + barra de búsqueda + botón)
export const ContenedorContenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  max-width: 900px;
  padding: 25px 6%;
  border-radius: 0 0 10px 10px;


  @media (max-width: 960px) {
    padding: 30px;
  }

  @media (max-width: 600px) {
    padding: 20px;
    width: 85%;
  }
`;

// Nuevos componentes para el título y subtítulo
export const TituloBuscador = styled.h1`
  color: white;
  font-size: 4rem;
  line-height: 1.15;
  margin-bottom: 0.5rem;
  text-align: left;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

export const SubtituloBuscador = styled.h2`
  color: white;
  font-size: 2.5rem;
  font-family: 'Poppins';
  font-style: italic;
  margin-bottom: 2rem;
  text-align: left;
  font-weight: normal;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

// Actualizar el contenedor de parámetros para una vista más integrada
export const ContenedorParametros = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 700px;
  background-color: #f6ebf9;
  border-radius: 50px;
  padding: 5px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
    border-radius: 20px;
  }
`;

export const BarraBusqueda = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  position: relative;
  padding: 5px;

  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const CampoBusqueda = styled(TextField)`
  && {
    width: 100%;
    background-color: transparent !important;
    
    & .MuiOutlinedInput-root {
      border-radius: 30px;
      
      & fieldset {
        border: none;
      }
      
      &:hover fieldset {
        border: none;
      }
      
      &.Mui-focused fieldset {
        border: none;
      }
    }

    & .MuiInputLabel-root {
      color: #2d0363 !important;
    }

    & .MuiOutlinedInput-input {
      color: #2d0363 !important;
      padding: 12px 16px;
    }
  }
`;

export const DividerVertical = styled.div`
  width: 1px;
  height: 36px;
  background-color: #ccc;
  margin: 0 8px;
  
  @media (max-width: 600px) {
    display: none;
  }
`;


export const BotonBuscarCircular = styled(Button)`
  && {
    width: 50px;
    height: 50px;
    min-width: 50px;
    border-radius: 50%;
    margin-left: 10px;
    background-color: ${(props) => props.disabled ? '#C9B9DF' : '#9F72D9'} !important;
    color: ${(props) => props.disabled ? '#9F72D9' : '#2D0363'} !important;
    transition: all 0.3s ease;
    box-shadow: ${(props) => props.disabled ? 'none' : '0 3px 5px rgba(0, 0, 0, 0.2)'};
    
    &:hover {
      background-color: ${(props) => props.disabled ? '#e6d0f0' : '#7b27dd'} !important;
    }
    
    @media (max-width: 600px) {
      margin-top: 10px;
    }
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
    background-color:rgba(72, 25, 180, 0.87) !important;
    color: #f6ebf9 !important;
    font-weight: 500;
    width: auto;
    padding: 12px 40px;
    border: 1px solid #DDD !important;
    border-radius: ${({ theme }) => theme.borderRadius.botones} !important;
    text-transform: none;
    font-size: 1rem;
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

//--------------------------------------------
export const ContenedorFecha = styled.div`
  width: 100%;
  max-width: 200px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 12px;
  background-color: #f6ebf9;
  border-radius: 20px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ResultadosContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
`;

export const TablaResultados = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

export const CabeceraTabla = styled.th`
  text-align: left;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #e0e0e0;
  font-weight: 600;
`;

export const FilaTabla = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const CeldaTabla = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
`;