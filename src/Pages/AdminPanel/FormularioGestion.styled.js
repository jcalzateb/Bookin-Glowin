import styled from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export const ContenedorFormulario = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 25px;
  background-color: #444;
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  min-width: 600px;
  margin: auto;
`;

export const TituloFormulario = styled.h2`
  color: white;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

export const ContenedorCaracteristicas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 15px;
  background: transparent;
  border-radius: 8px;
  border: 1px dashed gray;
  margin: 10px 0;
`;

export const TituloCaracteristicas = styled.h3`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: left;
`;

export const CampoContenedor = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export const Etiqueta = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

export const CampoInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: white;
  font-style: normal;
  border: 1.5px solid
    ${({ estado }) =>
      estado === "error" ? "red" : estado === "success" ? "green" : "gray"};
  border-radius: 5px;
  background: transparent;
  outline: none;
  transition: 0.3s;
  padding-right: 40px;

  &::placeholder {
    color: ${({ estado }) =>
      estado === "error" ? "red" : estado === "success" ? "green" : "gray"};
  }
`;

export const AreaTexto = styled.textarea`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid gray;
  background: transparent;
  color: white;
  font-size: 16px;
  width: 100%;
  height: 100px;
  resize: none;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    outline: none;
  }
`;

export const CampoSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid gray;
  background: transparent;
  color: white;
  font-size: 16px;
  width: 100%;
  cursor: pointer;

  option {
    background: #444;
    color: white;
  }

  &::placeholder {
    color: #ccc;
  }
`;

// Contenedor de las imágenes
export const ContenedorImagenes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border: 2px dashed white;
  border-radius: 10px;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
`;

// Caja de imágenes
export const CajaImagen = styled.div`
  width: 80px;
  height: 80px;
  border: 2px dashed white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Botones de acción
export const BotonAccion = styled.button`
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: ${({ color }) => color || "#28a745"};
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: ${({ color }) =>
      color === "#28a745"
        ? "#218838"
        : color === "#dc3545"
        ? "#c82333"
        : "#0056b3"};
    opacity: 0.8 !important;
  }
`;

// Contenedor de botones en fila
export const ContenedorBotones = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const MensajeError = styled.span`
  font-size: 12px;
  color: red;
  margin-top: 0px;
  position: absolute;
  bottom: -18px;
`;

// Ícono dentro del input (error o éxito)
export const IconoEstado = styled.span`
  position: absolute;
  right: 10px;
  top: 68%;
  transform: translateY(-50%);
  color: ${({ estado }) => (estado === "error" ? "red" : "green")};
  font-size: 20px;
  display: flex;
  align-items: center;
`;

// Componente para Icono de Error
export const IconoError = styled(ErrorIcon)`
  color: red;
`;

// Componente para Icono de Éxito
export const IconoSuccess = styled(CheckCircleIcon)`
  color: green;
`;
