import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const toggleMenu = (estado) => () => {
    setMenuAbierto(estado);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#B9B9B9", color: "#FFFFFF", borderBottom: "1.5px solid black", boxShadow: "none", padding: "10px 0", }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "auto", width: "100%", paddingX: { xs: "16px", md: "24px" }, }}>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={Logo} alt="Glowin Logo" style={{ height: "40px" }} />
        </Box>

        <Box sx={{ display: { xs: "none", md: "none", lg: "flex" }, gap: "24px", }}>
          <span style={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>label</span>
          <span style={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>label</span>
          <span style={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>label</span>
          <span style={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>label</span>
          <span style={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>label</span>
        </Box>

        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "10px" }}>
          <Button
            component={Link}
            to="/iniciar-sesion"
            sx={{
              border: "2px solid black",
              backgroundColor: "white",
              color: "black",
              padding: "8px 16px",
              borderRadius: "5px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1C1919"
              }
            }}
          >
            Iniciar sesión
          </Button>

          <Button
            component={Link}
            to="/crear-cuenta"
            sx={{
              backgroundColor: "black",
              color: "white",
              padding: "8px 16px",
              borderRadius: "5px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1C1919"
              }
            }}
          >
            Crear cuenta
          </Button>
        </Box>

        <IconButton
          sx={{ display: { xs: "flex", sm: "none" }, color: "black" }}
          onClick={toggleMenu(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={menuAbierto} onClose={toggleMenu(false)}>
          <Box sx={{ width: 250 }}>
            <List>
              <ListItem button component={Link} to="/iniciar-sesion">
                <ListItemText primary="Iniciar Sesión" />
              </ListItem>
              <ListItem button component={Link} to="/crear-cuenta">
                <ListItemText primary="Crear Cuenta" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="label" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="label" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
