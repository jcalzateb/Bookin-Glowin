import styled from "styled-components";
import { Link } from "react-router-dom";

export const ContenedorLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('https://luis-liberty.s3.us-east-2.amazonaws.com/tratamiento-facial.png') no-repeat left center;
  background-size: contain;
`;

export const ContenedorFormulario = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9); 
  border-radius: 20px; /* Bordes redondeados 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #333;
  text-align: center;
`;

export const Titulo = styled.h2`
  margin-bottom: 20px;
  color: #7b4eff;
  font-size: 24px;
`;

export const CampoInput = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: transparent;
  color: #333;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #7b4eff;
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
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Enlace = styled(Link)`
  color: #7b4eff;
  font-size: 14px;
  text-decoration: none;
  margin-top: 10px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;