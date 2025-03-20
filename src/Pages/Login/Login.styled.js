import styled from "styled-components";
import { Link } from "react-router-dom";
import fondo from "../../assets/Desktop2.png";

export const ContenedorLogin = styled.div`
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
  display: flex;

  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    align-content: none;
  }
`;

export const ContenedorFormulario = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  gap: 2px;
  max-width: 500px;
  padding: 60px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #333;
  text-align: center;
  margin-top: 80px;

  @media (min-width: 600px) {
    padding: 60px;
  }

  @media (min-width: 768px) {
    max-width: 700px;
    padding: 70px;
  }

  @media (min-width: 1024px) {
    max-width: 900px;
    padding: 100px;
  }
`;

export const Titulo = styled.h2`
  margin-bottom: 20px;
  color: #7b4eff;
  font-size: 32px;
  @media (min-width: 600px) {
    font-size: 32px;
  }

  @media (min-width: 768px) {
    font-size: 40px;
  }
  @media (min-width: 1024px) {
    font-size: 48px;
  }
`;

export const CampoInput = styled.input`
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.$error ? "red" : props.$touched ? "green" : "#ccc")};
  background: transparent;
  outline: none;
  color: #333;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #7b4eff;
  }
  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

export const BotonAccion = styled.button`
  padding: 12px;
  background-color: #7b4eff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    background-color: #5a3bcc;
  }

  &:disabled {
    background-color: #b093d5;
    cursor: not-allowed;
  }
`;

export const MensajeError = styled.p`
  color: red;
  font-size: 11px;
  margin-bottom: 8px;
`;

export const Enlace = styled(Link)`
  color: #7b4eff;
  font-size: 12px;
  text-decoration: none;
  margin-top: 10px;
  display: block;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 600px) {
    font-size: 12px;
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }
  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;
