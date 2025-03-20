import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

const Header = ({ setMostrarFavoritos }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const [menuUsuario, setMenuUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    console.log("Estado de usuario en Header:", usuario);
  }, [usuario]);

  const abrirMenuUsuario = (event) => setMenuUsuario(event.currentTarget);
  const cerrarMenuUsuario = () => setMenuUsuario(null);
  const toggleMenu = (estado) => () => setMenuAbierto(estado);

  const obtenerIniciales = (nombre, apellido) => {
    if (nombre && apellido) {
      return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
    }
    if (nombre) {
      return nombre.charAt(0).toUpperCase();
    }
    return "";
  };

  const redirigir = () => {
    if (location.pathname === "/admin") {
      navigate("/");
    } else {
      navigate("/admin");
    }
    cerrarMenuUsuario();
  };

  const mostrarFavoritos = () => {
    setMostrarFavoritos(true);
    cerrarMenuUsuario();
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
                {obtenerIniciales(usuario.nombre, usuario.apellido)}
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
                {location.pathname !== "/admin" &&
                  !location.pathname.startsWith("/producto/") && (
                    <OpcionMenu onClick={mostrarFavoritos}>
                      Favoritos
                    </OpcionMenu>
                  )}
                {usuario.rol === "SUPER_ADMINISTRADOR" ||
                usuario.rol === "ADMINISTRADOR" ? (
                  <OpcionMenu onClick={redirigir}>
                    {location.pathname === "/admin"
                      ? "Ir al inicio"
                      : "Ir al administración"}
                  </OpcionMenu>
                ) : null}
                <hr />
                <OpcionMenu
                  onClick={() => {
                    cerrarSesion();
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
                <Link to="/ingresar">Iniciar Sesión</Link>
                <Link to="/registrar">Crear Cuenta</Link>
              </>
            ) : (
              <>
                <p>
                  <strong>
                    {usuario?.nombre} {usuario?.apellido}
                  </strong>
                </p>
                {location.pathname !== "/admin" &&
                  !location.pathname.startsWith("/producto/") && (
                    <a href="#" onClick={mostrarFavoritos}>
                      Favoritos
                    </a>
                  )}
                {usuario.rol === "SUPER_ADMINISTRADOR" ||
                usuario.rol === "ADMINISTRADOR" ? (
                  <a href="#" onClick={redirigir}>
                    {location.pathname === "/admin"
                      ? "Ir al inicio"
                      : "Ir al administración"}
                  </a>
                ) : null}
                <hr />
                <Link to="#" onClick={cerrarSesion}>
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
