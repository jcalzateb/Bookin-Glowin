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
  width: 50%;
  @media (max-width: 600px) {
    width: 0%;
  }
  @media (max-width: 768px) {
    width: 0%;
  }
`;
export const ContenedorDerecha = styled.div`
  width: 50%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 30px;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 20px;
  }
`;

export const TituloRegistro = styled.h2`
  text-align: center;
  font-size: 32px;
  margin: 15px 0;
  color: #7b4eff;
  @media (min-width: 600px) {
    font-size: 38px;
  }

  @media (min-width: 768px) {
    font-size: 46px;
  }
  @media (min-width: 1024px) {
    font-size: 52px;
  }
`;

export const ContenedorFormulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  @media (min-width: 600px) {
    padding: 30px;
  }

  @media (min-width: 768px) {
    max-width: 700px;
    padding: 40px;
  }

  @media (min-width: 1024px) {
    max-width: 900px;
    padding: 50px;
  }
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
