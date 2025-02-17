import styled from "styled-components";
import { AppBar, Toolbar, Button, IconButton } from "@mui/material";

// Contenedor del Header
export const ContenedorHeader = styled(AppBar)`
  background: linear-gradient(to right, #000, #1c1c1e);
  position: static;
  border-bottom: 2px solid #000;
`;

// Barra de navegacion
export const BarraNavegacion = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

// Contenedor del logo
export const Logo = styled.img`
  height: 50px;
  cursor: pointer;
`;

// Contenedor de los botones
export const ContenedorBotones = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 744px) {
    display: none; /* Ocultar en tablet y móvil */
  }
`;

// Botón de menú hamburguesa
export const BotonMenu = styled(IconButton)`
  display: none;

  @media (max-width: 428px) {
    display: flex;
  }
`;

// Botones de inicio de sesión y registro
export const BotonNav = styled(Button)`
  background-color: ${({ theme }) => theme.palette.botones.activo};
  color: #fff;
  font-weight: bold;
  text-transform: none;
  border-radius: 8px;
  padding: 8px 16px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.botones.hovered};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.botones.presionado};
  }
`;
