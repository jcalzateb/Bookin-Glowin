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
    margin-top: 40px;
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
    padding: 10px 15px;
    width: 100%;
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
  font-family: "Poppins";
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
  padding: 3px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 8px;
    border-radius: 20px;
    
  }
`;

export const BarraBusqueda = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  position: relative;
  padding: 5px;
  

  @media (max-width: 768px) {
    width: 80%;
    margin-bottom: 10px;
  }
    @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const CampoBusqueda = styled(TextField)`
  && {
    width: 100%;
    background-color: transparent !important;
    margin-top: 10px;

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
      color: #635E63 !important;
      transform: translate(14px, -9px) scale(0.75) !important; /* Posición fija para el label */
      background-color: transparent;
      padding-top: 0px;
      padding-left: 20px;
      
      &.Mui-focused {
        color: #635E63 !important;
        transform: translate(14px, -9px) scale(0.75) !important; /* Mantener la misma posición cuando está enfocado */
      }
      
      &.MuiFormLabel-filled {
        transform: translate(14px, -9px) scale(0.75) !important; /* Mantener la misma posición cuando contiene texto */
      }
    }

    & .MuiOutlinedInput-input {
      color: #2d0363 !important;
      padding-top: 20px;
      
      &::placeholder {
        color: rgba(45, 3, 99, 0.6);
        opacity: 1;
      }
    }
    
    & .MuiInputAdornment-root {
      margin-right: 0;
    }
  }
`;

export const DividerVertical = styled.div`
  width: 1px;
  height: 36px;
  background-color: #ccc;
  margin: 0 8px;

  @media (max-width: 768px) {
    width: 95%;
    height: 1px;
    margin: 0px auto;
  }
`;

export const BotonBuscarCircular = styled(Button)`
  && {
    width: 50px;
    height: 50px;
    min-width: 50px;
    border-radius: 50%;
    margin-left: 10px;
    background-color: ${(props) =>
      props.disabled ? "#C9B9DF" : "#9F72D9"} !important;
    color: ${(props) => (props.disabled ? "#9F72D9" : "#2D0363")} !important;
    transition: all 0.3s ease;
    box-shadow: ${(props) =>
      props.disabled ? "none" : "0 3px 5px rgba(0, 0, 0, 0.2)"};

    &:hover {
      background-color: ${(props) =>
        props.disabled ? "#e6d0f0" : "#7b27dd"} !important;
    }

    @media (max-width: 760px) {
      width: 20%;
      margin-top: 20px;
      padding: 1rem 3rem;
      border-radius: 30px;
    }
  }
`;

export const Isologo = styled.img`
  width: 100%;
  max-width: 500px;
  margin-bottom: 36px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
  @media (max-width: 960px) {
    max-width: 400px;
  }

  @media (max-width: 600px) {
    max-width: 280px;
  }
`;

export const BotonLimpiar = styled(Button)`
  && {
    background-color: transparent !important;
    color: #2d0363 !important;
    border-radius: 50%;
    height: 40px;
    min-width: 40px;
    padding: 0;
    margin-right: -20px; /* Mover el botón más hacia la derecha */
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: rgba(45, 3, 99, 0.1) !important;
    }
    &:active {
      background-color: rgba(151, 71, 255, 0.2) !important;
    }
  }
`;

export const BotonBuscar = styled(Button)`
  && {
    background-color: rgba(72, 25, 180, 0.87) !important;
    color: #f6ebf9 !important;
    font-weight: 500;
    width: auto;
    padding: 12px 40px;
    border: 1px solid #ddd !important;
    border-radius: ${({ theme }) => theme.borderRadius.botones} !important;
    
    text-transform: none;
    font-size: 1rem;
    font-family: ${({ theme }) =>
      theme.typography.button.fontFamily} !important;

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
  display: flex;
  align-items: center;
  background-color: #f6ebf9;
  border-radius: 20px;
  
  /* Estilos para el DatePicker */
  & .MuiFormControl-root {
    width: 100%;
    padding-top: 2px;
  }
  
  /* Estilos para la etiqueta del DatePicker */
  & .MuiFormLabel-root {
    transform: translate(0, 0px) scale(0.75) !important;
    color: #635E63 !important;
  }
  /* Estilos para el campo de entrada del DatePicker */
  /* Asegurar que el ícono del calendario sea visible en todas las resoluciones */
  & .MuiInputAdornment-root {
    display: flex !important;
    visibility: visible !important;
    margin-right: 2rem;

    & .MuiButtonBase-root {
      padding: 5px;
    }
    
    & .MuiSvgIcon-root {
      color: #635E63;
      font-size: 25px;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 15px;
    
    /* Ajustar espacio en móvil para mostrar bien el ícono */
    & .MuiInputAdornment-root {
      margin-right: 3rem;
    }
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
  background-color: #9F72D9;
  border-bottom: 2px solid #e0e0e0;
  color: white;
  font-weight: 600;
`;

export const FilaTabla = styled.tr`
  background-color: #F6EBF9;
  &:hover {
    background-color: #F9F9F9;
  }
`;

export const CeldaTabla = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
`;
