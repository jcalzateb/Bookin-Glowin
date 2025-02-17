import React from "react";
import { Box, Typography } from "@mui/material";
import ListadoProductos from "../Components/ListadoProductos";

const Inicio = () => {
  return (
    <Box sx={{ padding: "40px 20px", textAlign: "center" }}>
      {/* Título Principal */}
      <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Bienvenido a Glowin
      </Typography>

      {/* Sección de Listado de Productos */}
      <ListadoProductos />
    </Box>
  );
};

export default Inicio;
