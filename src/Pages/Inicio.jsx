import React from "react";
import { Box, Typography } from "@mui/material";
import ProductoDestacado from "../Components/ProductoDestacado/ProductoDestacado";
import ListaProductos  from "../Components/ListaProductos/ListaProductos"

const Inicio = () => {
  return (
    <Box sx={{ padding: "40px 20px", textAlign: "center" }}>

      <ProductoDestacado />
      <ListaProductos />

    </Box>
  );
};

export default Inicio;
