import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
} from "@mui/material";
import { styled } from "@mui/system";

// Contenedor principal del Header
export const ContenedorHeader = styled(AppBar)({
  position: "fixed",
  backgroundColor: "#fff",
  boxShadow: "none",
  borderBottom: "1px solid #ddd",
  padding: "0 20px",
  top: "0",
  width: "100%",
  zIndex: "100000",
});

// Barra de navegación
export const BarraNavegacion = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

// Contenedor del Logo
export const ContenedorLogo = styled("div")({
  display: "flex",
  alignItems: "center",
});

// Imagen del Logo
export const LogoImg = styled("img")({
  height: 50,
  cursor: "pointer",
  "@media (max-width: 600px)": {
    height: 40,
  },
});

// Lema
export const Lema = styled("span")({
  fontSize: "1.2rem",
  letterSpacing: "2px",
  fontWeight: 100,
  marginLeft: 30,
  color: "#9747FF",
  fontFamily: "roboto",
  "@media (max-width: 960px)": {
    display: "none",
  },
});

// Contenedor de los botones
export const ContenedorBotones = styled("div")({
  display: "flex",
  gap: 10,
  "@media (max-width: 600px)": {
    display: "none",
  },
});

// Botones de navegación
export const BotonNav = styled(Button)(({ variante }) => ({
  textTransform: "none",
  fontSize: "0.9rem",
  fontWeight: 500,
  padding: "6px 16px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  ...(variante === "bordeado" && {
    border: "2px solid #673ab7",
    color: "#673ab7",
    "&:hover": {
      backgroundColor: "#f3e5f5",
    },
  }),
  ...(variante === "solido" && {
    backgroundColor: "#673ab7",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#452782",
    },
  }),
}));

// Botón del menú hamburguesa
export const BotonMenu = styled(IconButton)({
  display: "none",
  "@media (max-width: 600px)": {
    display: "flex",
    color: "#333",
  },
});

// Drawer para el menú hamburguesa
export const DrawerMenu = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: 250,
    padding: "20px",
    backgroundColor: "#fff",
  },
});

// Lista dentro del menú hamburguesa
export const ListaMenu = styled(List)({
  display: "flex",
  flexDirection: "column",
  gap: 15,
  padding: "20px",
  "& a": {
    textDecoration: "none",
    color: "#333",
    fontSize: "1rem",
    fontWeight: 500,
    transition: "color 0.3s ease",
    "&:hover": {
      backgroundColor: "#f3e5f5",
      color: "#673ab7",
    },
  },
});
