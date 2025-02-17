import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ContenedorHeader,
  BarraNavegacion,
  ContenedorLogo,
  LogoImg,
  ContenedorNav,
  ContenedorBotones,
  BotonNav,
  BotonMenu,
  DrawerMenu,
  ListaMenu,
} from "./Header.styled";
import Logo from "../../assets/Logo.png";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = (estado) => () => {
    setMenuAbierto(estado);
  };

  return (
    <ContenedorHeader position="static">
      <BarraNavegacion>

        <ContenedorLogo>
          <LogoImg src={Logo} alt="Glowin Logo" />
        </ContenedorLogo>

        <ContenedorNav>
          <span>label</span>
          <span>label</span>
          <span>label</span>
        </ContenedorNav>

        <ContenedorBotones>
          <BotonNav component={Link} to="/iniciar-sesion" variante="bordeado">
            Iniciar sesión
          </BotonNav>
          <BotonNav component={Link} to="/crear-cuenta" variante="solido">
            Crear cuenta
          </BotonNav>
        </ContenedorBotones>

        <BotonMenu onClick={toggleMenu(true)}>
          <MenuIcon />
        </BotonMenu>

        <DrawerMenu anchor="right" open={menuAbierto} onClose={toggleMenu(false)}>
          <ListaMenu>
            <Link to="/iniciar-sesion">Iniciar Sesión</Link>
            <Link to="/crear-cuenta">Crear Cuenta</Link>
          </ListaMenu>
        </DrawerMenu>
      </BarraNavegacion>
    </ContenedorHeader>
  );
};

export default Header;
