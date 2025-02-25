import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import {
  ContenedorHeader,
  BarraNavegacion,
  ContenedorLogo,
  LogoImg,
  ContenedorBotones,
  BotonNav,
  BotonMenu,
  DrawerMenu,
  ListaMenu,
  Lema,
} from "./Header.styled";
import Logo from "../../assets/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = (estado) => () => {
    setMenuAbierto(estado);
  };

  return (
    <ContenedorHeader position="static">
      <BarraNavegacion>
        <ContenedorLogo onClick={() => navigate("/")}>
          <LogoImg src={Logo} alt="Glowin Logo" />
          <Lema>B R I L L A - C O N - E S T I L O</Lema>
        </ContenedorLogo>

        <ContenedorBotones>
          <BotonNav component={Link} to="/ingresar" variante="bordeado">
            Iniciar sesión
          </BotonNav>
          <BotonNav component={Link} to="/registrar" variante="solido">
            Crear cuenta
          </BotonNav>
        </ContenedorBotones>

        <BotonMenu onClick={toggleMenu(true)}>
          <MenuIcon />
        </BotonMenu>

        <DrawerMenu
          anchor="right"
          open={menuAbierto}
          onClose={toggleMenu(false)}
        >
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
