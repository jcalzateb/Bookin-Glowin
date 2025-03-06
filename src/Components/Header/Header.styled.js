import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";

export const ContenedorHeader = styled(AppBar)({
  position: "fixed",
  backgroundColor: "rgba(246,235,249,0.8)",
  boxShadow: "none",
  borderBottom: "2px solid #2d0363",
  padding: "0 20px",
  top: "0",
  width: "100%",
  zIndex: "100000",
});

export const BarraNavegacion = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

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

export const Lema = styled("span")({
  fontSize: "16px",
  letterSpacing: "2px",
  fontWeight: 100,
  marginLeft: 30,
  color: "#2d0363",
  fontFamily: "poppins, sans-serif",
  "@media (max-width: 960px)": {
    display: "none",
  },
});

export const ContenedorBotones = styled("div")({
  display: "flex",
  gap: 10,
  "@media (max-width: 600px)": {
    display: "none",
  },
});

export const BotonNav = styled(Button)(({ variante }) => ({
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 500,
  padding: "12px 16px",
  borderRadius: "8px",
  width: "152px",
  height: "48px",
  transition: "all 0.3s ease",
  ...(variante === "bordeado" && {
    border: "2px solid #2d0363",
    color: "#2d0363",
    "&:hover": {
      backgroundColor: "#f6ebf9",
    },
  }),
  ...(variante === "solido" && {
    backgroundColor: "#2d0363",
    color: "#f6ebf9",
    "&:hover": {
      backgroundColor: "#530eae",
    },
  }),
}));

export const BotonMenu = styled(IconButton)({
  display: "none",
  "@media (max-width: 600px)": {
    display: "flex",
    color: "#2d0363",
  },
});

//  menú hamburguesa
export const DrawerMenu = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: 250,
    padding: "80px 20px",
    backgroundColor: "#fff",
  },
});

export const ListaMenu = styled(List)({
  display: "flex",
  flexDirection: "column",
  gap: 15,
  padding: "20px",
  backgroundColor: "#C9B9DF",
  "& a": {
    textDecoration: "none",
    color: "#2d0363",
    fontSize: "1rem",
    fontWeight: 500,
    transition: "color 0.3s ease",
    "&:hover": {
      backgroundColor: "#2d0363",
      color: "#f6ebf9",
    },
  },
});

export const ContenedorUsuario = styled("div")({
  position: "relative",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

export const AvatarUsuario = styled("div")({
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: "#2d0363",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#530eae",
  },
});

export const MenuUsuario = styled(Menu)({
  marginTop: "10px",
  "& .MuiPaper-root": {
    backgroundColor: "#fff",
    minWidth: "200px",
  },
});

export const OpcionMenu = styled(MenuItem)({
  padding: "12px 20px",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: "#f6ebf9",
  },
});
