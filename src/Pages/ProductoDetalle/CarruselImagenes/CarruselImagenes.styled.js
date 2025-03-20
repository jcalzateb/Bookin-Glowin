import styled from "styled-components";
import { DialogContent, IconButton } from "@mui/material";

export const ContenidoModal = styled(DialogContent)`
  position: relative;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

export const BotonCerrar = styled(IconButton)`
  position: absolute;
  padding: 0;
  margin: 0;
  border: none;
  bottom: 48%;
  color: #fff;
  background: rgba(255, 255, 255, 0.3);
  z-index: 100;
  &:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 600px) {
    left: 30px;
    width: 40px;
    height: 40px;
  }
`;

export const ImagenCarrusel = styled.img`
  width: 100%;
  max-width: 800px;
  height: 70vh;
  max-height: 800px;
  object-fit: contain;
  border-radius: 8px;
  margin: auto;
  border: none;

  @media (max-width: 600px) {
    padding: 0 25px 0 0;
    border-radius: 4px;
    width: 90%;
    max-width: 95%;
    max-height: 70vh;
  }
`;

export const BotonNavegacion = styled(IconButton)`
  position: absolute;
  padding: 0;
  margin: 0;
  border: none;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  color: white;
  z-index: 100;
  &:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  ${({ posicion }) =>
    posicion === "izquierda" ? `left: 50px;` : `right: 50px;`}

  @media (max-width: 600px) {
    ${({ posicion }) =>
      posicion === "izquierda" ? `left: 10px;` : `right: 30px;`}
    width: 40px;
    height: 40px;
  }
`;
