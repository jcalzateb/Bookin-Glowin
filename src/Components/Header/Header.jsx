import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
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
import Logo from "../../../public/isotipo_glowin.svg";

const Header = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(AuthContext);
  //const [menuUsuario, setMenuUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const abrirMenu = (event) => setMenuAbierto(event.currentTarget);
  const cerrarMenu = () => setMenuAbierto(null);
  const toggleMenu = (estado) => () => setMenuAbierto(estado);

  return (
    <ContenedorHeader position="static">
      <BarraNavegacion>
        <ContenedorLogo onClick={() => navigate("/")}>
          <LogoImg src={Logo} alt="Glowin Logo" />
          <Lema>B R I L L A - C O N - E S T I L O</Lema>
        </ContenedorLogo>

        <ContenedorBotones>
          {usuario ? (
            <>
              <AccountCircleIcon
                onClick={abrirMenu}
                style={{ cursor: "pointer" }}
              />
              <Menu
                anchorEl={menuAbierto}
                open={Boolean(menuAbierto)}
                onClose={cerrarMenu}
              >
                <MenuItem disabled>
                  {usuario?.nombre} {usuario?.apellido}
                </MenuItem>
                <MenuItem disabled>{usuario?.email}</MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    cerrarMenu();
                  }}
                >
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <BotonNav component={Link} to="/ingresar" variante="bordeado">
                Iniciar sesión
              </BotonNav>
              <BotonNav component={Link} to="/registrar" variante="solido">
                Crear cuenta
              </BotonNav>
            </>
          )}
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
