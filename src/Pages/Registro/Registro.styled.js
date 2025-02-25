import styled from "styled-components";

export const ContenedorFormulario = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 80px auto 20px auto;
  padding: 20px;
  background-color: #444;
  border-radius: 10px;
  color: white;
`;

export const CampoInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid white;
  background: transparent;
  color: white;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border-color: #9747ff;
  }
`;

export const BotonAccion = styled.button`
  padding: 12px;
  background-color: #9747ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    background-color: #530eae;
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
