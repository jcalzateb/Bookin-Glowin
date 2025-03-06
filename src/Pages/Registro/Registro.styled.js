import styled from "styled-components";

export const ContenedorRegistro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2)), 
              url('https://luis-liberty.s3.us-east-2.amazonaws.com/manos-hermosas.png') no-repeat left top;
  background-size: cover; 
  padding: 10rem 0; 
  min-height: 100vh;

  @media (max-width: 768px) {
    background-attachment: scroll; 
    background-size: cover;
    padding: 5rem 0; 
  }
`;

export const ContenedorIzquierda = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: flex-start; 
  flex: 1;
  margin-right: 2rem;
  position: relative; 

  @media (max-width: 768px) {
    margin-right: 0;
    align-items: center; 
  }
`;

export const TituloRegistro = styled.h2`
  margin: 0;
  margin-bottom: 1rem;
  color: #7b4eff; 
  font-size: 2.5rem;
  text-align: left;
  z-index: 3; 
`;

export const ContenedorFormulario = styled.form`
  flex: 1;
  max-width: 500px;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  margin-top: 1rem;
  z-index: 3; 
`;

export const CampoInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

  &::placeholder {
    color: #aaa;
  }
`;

export const BotonAccion = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  background: #7b4eff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #5a3bcc;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const MensajeError = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0;
`;

export const ContenedorRadio = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;

  input {
    margin-right: 0.5rem;
  }
`;

export const TextoDecorativo = styled.p`
  margin: 0; /* Se elimina el margen superior para alinear con el radio */
  font-size: 0.8rem;
  color: #666;
  text-align: left;
`;