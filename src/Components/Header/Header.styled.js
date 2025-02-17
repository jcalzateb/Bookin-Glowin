import styled from "styled-components";
import { AppBar, Toolbar, Button, IconButton, Drawer, List } from "@mui/material";

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

export const ContenedorLogo = styled.div`
  display: flex;
  align-items: center;
`;

export const ContenedorNav = styled.div`
  display: flex;
  gap: 24px;

  span {
    font-size: 16px;
    font-weight: 500;
    color: #000;
  }

  @media (max-width: 1133px) {
    display: none; /* Oculta los labels en Tablet y Móvil */
  }
`;
export const DrawerMenu = styled(Drawer)`
  .MuiPaper-root {
    width: 250px;
  }
`;
export const ListaMenu = styled(List)`
  display: flex;
  flex-direction: column;
  padding: 20px;

  a {
    text-decoration: none;
    color: black;
    font-size: 18px;
    padding: 10px 0;
  }
`;
export const LogoImg = styled.img`
  height: 40px;
`;