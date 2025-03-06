import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
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
  AvatarUsuario,
  ContenedorUsuario,
  MenuUsuario,
  OpcionMenu,
} from "./Header.styled";
import Logo from "../../assets/isotipo_glowin.svg";

const Header = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(AuthContext);
  const [menuUsuario, setMenuUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    console.log("Estado de usuario en Header:", usuario);
  }, [usuario]);

  const abrirMenuUsuario = (event) => setMenuUsuario(event.currentTarget);
  const cerrarMenuUsuario = () => setMenuUsuario(null);
  const toggleMenu = (estado) => () => setMenuAbierto(estado);

  const obtenerIniciales = (nombre) => {
    return nombre
      ? nombre
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "";
  };

  return (
    <ContenedorHeader position="static">
      <BarraNavegacion>
        <ContenedorLogo onClick={() => navigate("/")}>
          <LogoImg src={Logo} alt="Glowin Logo" />
          <Lema>B R I L L A - C O N - E S T I L O</Lema>
        </ContenedorLogo>

        <ContenedorBotones>
          {usuario ? (
            <ContenedorUsuario>
              <AvatarUsuario onClick={abrirMenuUsuario}>
                {obtenerIniciales(usuario.nombre)}
              </AvatarUsuario>
              <MenuUsuario
                anchorEl={menuUsuario}
                open={Boolean(menuUsuario)}
                onClose={cerrarMenuUsuario}
              >
                <OpcionMenu disabled>
                  <strong>
                    {usuario?.nombre} {usuario?.apellido}
                  </strong>
                </OpcionMenu>
                <OpcionMenu disabled>{usuario?.email}</OpcionMenu>
                <hr />
                <OpcionMenu
                  onClick={() => {
                    logout();
                    cerrarMenuUsuario();
                  }}
                >
                  Cerrar sesión
                </OpcionMenu>
              </MenuUsuario>
            </ContenedorUsuario>
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
            {!usuario ? (
              <>
                <Link to="/iniciar-sesion">Iniciar Sesión</Link>
                <Link to="/crear-cuenta">Crear Cuenta</Link>
              </>
            ) : (
              <>
                <p>
                  <strong>
                    {usuario?.nombre} {usuario?.apellido}
                  </strong>
                </p>
                <p>{usuario?.email}</p>
                <hr />
                <Link to="#" onClick={logout}>
                  Cerrar Sesión
                </Link>
              </>
            )}
          </ListaMenu>
        </DrawerMenu>
      </BarraNavegacion>
    </ContenedorHeader>
  );
};

export default Header;
