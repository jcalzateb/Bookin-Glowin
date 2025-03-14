import styled from "styled-components";
import fondo from "../../assets/Desktop1.png";

export const ContenedorRegistro = styled.div`
  display: flex;
  justify-content: center;
  background-image: url(${fondo});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 90vh;
`;

export const ContenedorIzquierda = styled.div`
  width: 100%;
  margin-top: 70px;
  @media (max-width: 600px) {
    width: 0%;
  }
`;
export const ContenedorDerecha = styled.div`
  width: 100%;
  padding: 70px 80px;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    width: 100vw;
  }
`;

export const TituloRegistro = styled.h2`
  text-align: center;
  font-size: 32px;
  margin: 15px 0;
  color: #7b4eff;
`;

export const ContenedorFormulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CampoInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid
    ${(props) => (props.$error ? "red" : props.$touched ? "green" : "#ccc")};
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #9747ff;
  }

  &::placeholder {
    color: #aaa;
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

export const MensajeError = styled.p`
  font-size: 10px;
  color: red;
  margin: 0;
`;

export const BotonAccion = styled.button`
  background-color: #9747ff !important;
  color: white !important;
  font-weight: bold !important;
  text-transform: none !important;
  border-radius: 10px !important;
  padding: 12px !important;
  margin: grid-auto-flow;

  &:hover {
    background-color: #530eae !important;
  }

  &:disabled {
    background-color: #b093d5 !important;
    cursor: not-allowed !important;
  }
`;

export const ContenedorRadio = styled.div`
  display: flex;
  align-items: center;
`;

export const TextoDecorativo = styled.span`
  font-size: 14px;
  margin-left: 8px;
  color: #333;
`;
