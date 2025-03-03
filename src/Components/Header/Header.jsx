import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
  ContenedorUsuario,
  AvatarUsuario,
  MenuUsuario,
  ItemMenuUsuario,
} from "./Header.styled";
import Logo from "../../assets/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuarioAutenticado(JSON.parse(usuarioGuardado));
    }
  }, []);

  const toggleMenu = (estado) => () => setMenuAbierto(estado);
  const toggleMenuUsuario = () => setMenuUsuarioAbierto(!menuUsuarioAbierto);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuarioAutenticado(null);
    setMenuUsuarioAbierto(false);
    navigate("/");
  };

  return (
    <ContenedorHeader position="static">
      <BarraNavegacion>
        <ContenedorLogo onClick={() => navigate("/")}>
          <LogoImg src={Logo} alt="Glowin Logo" />
          <Lema>B R I L L A - C O N - E S T I L O</Lema>
        </ContenedorLogo>

        {usuarioAutenticado ? (
          <ContenedorUsuario>
            <AvatarUsuario onClick={toggleMenuUsuario}>
              {usuarioAutenticado.nombre[0]}
              {usuarioAutenticado.apellido[0]}
            </AvatarUsuario>

            {menuUsuarioAbierto && (
              <MenuUsuario>
                <ItemMenuUsuario>
                  <AvatarUsuario>
                    {usuarioAutenticado.nombre[0]}
                    {usuarioAutenticado.apellido[0]}
                  </AvatarUsuario>
                  <div>
                    <p>
                      {usuarioAutenticado.nombre} {usuarioAutenticado.apellido}
                    </p>
                    <small>{usuarioAutenticado.email}</small>
                  </div>
                </ItemMenuUsuario>
                <hr />
                <ItemMenuUsuario onClick={cerrarSesion}>
                  Cerrar sesión
                </ItemMenuUsuario>
              </MenuUsuario>
            )}
          </ContenedorUsuario>
        ) : (
          <ContenedorBotones>
            <BotonNav component={Link} to="/ingresar" variante="bordeado">
              Iniciar sesión
            </BotonNav>
            <BotonNav component={Link} to="/registrar" variante="solido">
              Crear cuenta
            </BotonNav>
          </ContenedorBotones>
        )}

        <BotonMenu onClick={toggleMenu(true)}>
          <MenuIcon />
        </BotonMenu>

        <DrawerMenu
          anchor="right"
          open={menuAbierto}
          onClose={toggleMenu(false)}
        >
          <ListaMenu>
            {!usuarioAutenticado ? (
              <>
                <Link to="/ingresar">Iniciar Sesión</Link>
                <Link to="/registrar">Crear Cuenta</Link>
              </>
            ) : (
              <ItemMenuUsuario onClick={cerrarSesion}>
                Cerrar sesión
              </ItemMenuUsuario>
            )}
          </ListaMenu>
        </DrawerMenu>
      </BarraNavegacion>
    </ContenedorHeader>
  );
};

export default Header;
