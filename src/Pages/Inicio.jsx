import React from "react";
import { Box, Typography } from "@mui/material";
import ProductoCard from "../Components/ProductoCard/ProductoCard";

const productos = [
  {
    id: 1,
    nombre: "Corte de Cabello",
    descripcion: "Corte profesional con estilo moderno.",
    precio: "20.00",
    imagen: "https://picsum.photos/200/300?random=1", // Imagen provisional
  },
  {
    id: 2,
    nombre: "Manicure",
    descripcion: "Cuidado y diseño de uñas con esmalte.",
    precio: "15.00",
    imagen: "https://picsum.photos/200/300?random=2",
  },
  {
    id: 3,
    nombre: "Depilación de Cejas",
    descripcion: "Moldeo y diseño de cejas con cera.",
    precio: "10.00",
    imagen: "https://picsum.photos/200/300?random=3",
  },
];

const Inicio = () => {
  return (
    <Box sx={{ padding: "40px 20px", textAlign: "center" }}>
      {/* Título */}
      <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Nuestros Servicios
      </Typography>

      {/* Lista de Productos */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </Box>
    </Box>
  );
};

export default Inicio;
