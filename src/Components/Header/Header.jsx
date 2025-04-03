import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HistoryIcon from "@mui/icons-material/History";
import CerrarSesionModal from "../MensajeModal/CerrarSesionModal";
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
  const [modalAbierto, setModalAbierto] = useState(false);

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
    setMenuAbierto(false);
  };

  const mostrarFavoritos = () => {
    if (location.pathname !== "/") {
      navigate("/");
      cerrarMenuUsuario();
    }
    setMostrarFavoritos(true);
    cerrarMenuUsuario();
    setMenuAbierto(false);
  };

  const verInicio = () => {
    navigate("/");
    cerrarMenuUsuario();
    setMenuAbierto(false);
  };

  const verHistorial = () => {
    navigate("/historial");
    cerrarMenuUsuario();
    setMenuAbierto(false);
  };

  const obtenerIconoMenu = () => {
    if (location.pathname === "/admin") {
      return <HomeOutlinedIcon style={{ marginRight: "5px" }} />;
    } else {
      return <ManageAccountsOutlinedIcon style={{ marginRight: "5px" }} />;
    }
  };

  const confirmarCerrarSesion = () => {
    cerrarMenuUsuario();
    cerrarSesion();
    setModalAbierto(false);
    navigate("/");
    setMenuAbierto(false);
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
                  location.pathname !== "/" && (
                    <OpcionMenu onClick={verInicio}>
                      <HomeOutlinedIcon
                        style={{
                          marginRight: "5px",
                        }}
                      />
                      Inicio
                    </OpcionMenu>
                  )}
                {location.pathname !== "/admin" &&
                  location.pathname !== "/historial" &&
                  !location.pathname.startsWith("/producto/") && (
                    <OpcionMenu onClick={mostrarFavoritos}>
                      <FavoriteBorderIcon
                        style={{
                          marginRight: "5px",
                        }}
                      />
                      Mis favoritos
                    </OpcionMenu>
                  )}
                {usuario.rol === "SUPER_ADMINISTRADOR" ||
                usuario.rol === "ADMINISTRADOR" ? (
                  <OpcionMenu onClick={redirigir}>
                    {obtenerIconoMenu()}
                    {location.pathname === "/admin"
                      ? "Inicio"
                      : "Panel administrador"}
                  </OpcionMenu>
                ) : null}
                <OpcionMenu onClick={verHistorial}>
                  <HistoryIcon style={{ marginRight: "5px" }} />
                  Historial de Reservas
                </OpcionMenu>
                <hr />
                <OpcionMenu onClick={() => setModalAbierto(true)}>
                  <LogoutIcon
                    style={{
                      marginRight: "5px",
                    }}
                  />
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
                  location.pathname !== "/" && (
                    <a href="#" onClick={verInicio}>
                      Inicio
                    </a>
                  )}
                {location.pathname !== "/admin" &&
                  location.pathname !== "/historial" &&
                  !location.pathname.startsWith("/producto/") && (
                    <a href="#" onClick={mostrarFavoritos}>
                      Mis favoritos
                    </a>
                  )}
                {usuario.rol === "SUPER_ADMINISTRADOR" ||
                usuario.rol === "ADMINISTRADOR" ? (
                  <a href="#" onClick={redirigir}>
                    {location.pathname === "/admin"
                      ? "Inicio"
                      : "Panel administrador"}
                  </a>
                ) : null}
                <a href="#" onClick={verHistorial}>
                  Historial de Reservas
                </a>
                <hr />
                <Link to="#" onClick={() => setModalAbierto(true)}>
                  Cerrar Sesión
                </Link>
              </>
            )}
          </ListaMenu>
        </DrawerMenu>
      </BarraNavegacion>
      <CerrarSesionModal
        abierto={modalAbierto}
        cerrar={() => setModalAbierto(false)}
        confirmarCerrarSesion={confirmarCerrarSesion}
      />
    </ContenedorHeader>
  );
};

export default Header;
