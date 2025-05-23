import styled from "styled-components";

export const ContenedorAdmin = styled.div`
  display: flex;
  background-color: #444;
  color: white;
  min-height: 100vh;
  padding: 80px 50px 30px 50px;
`;

export const MenuSuperior = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding-top: 80px;
  z-index: 1000;
  background-color: rgb(24, 23, 23);
  margin-bottom: 5px;
`;

export const BotonMenu = styled.button`
  flex: 1;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 0;
  background-color: ${({ $activo }) => ($activo ? "#444" : "#D1D1D1")};
  color: ${({ $activo }) => ($activo ? "#FFF" : "#000")};
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: rgb(85, 85, 85);
  }
`;

export const Contenido = styled.div`
  width: 100%;
  margin-top: 80px;
  padding: 15px;
  background-color: #333;
  border-radius: 15px;
`;

export const MensajeNoDisponible = styled.h1`
  text-align: center;
  color: white;
  margin-top: 50px;
  font-size: 22px;
  font-weight: bold;
  padding: 20px;
  background-color: black;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  margin: 50px auto;
`;
