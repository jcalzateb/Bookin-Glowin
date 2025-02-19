import styled from "styled-components";

export const ContenedorAdmin = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  background-color: #333;
  color: white;
  min-height: 100vh;
`;

export const SeccionIzquierda = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #444;
  border-radius: 10px;
  text-align: center; /* Centra el contenido */
`;

export const SeccionDerecha = styled.div`
  flex: 2;
  padding: 20px;
  background-color: #555;
  border-radius: 10px;
  text-align: center; /* Centra el contenido */
`;

export const TituloSeccion = styled.h2`
  text-align: center;
  margin-bottom: 15px;
  font-size: 22px;
  font-weight: bold;
`;
