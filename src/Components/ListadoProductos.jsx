import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import ProductoCard from "./ProductoCard/ProductoCard";
import { generarProductosAleatorios } from "../utils/productosUtils"; // Función para obtener productos aleatorios

const productosData = [
  { id: 1, nombre: "Corte de Cabello", descripcion: "Corte profesional.", precio: "20.00", imagen: "https://picsum.photos/200/300?random=1" },
  { id: 2, nombre: "Manicure", descripcion: "Cuidado de uñas.", precio: "15.00", imagen: "https://picsum.photos/200/300?random=2" },
  { id: 3, nombre: "Depilación de Cejas", descripcion: "Moldeo de cejas.", precio: "10.00", imagen: "https://picsum.photos/200/300?random=3" },
  { id: 4, nombre: "Peinado", descripcion: "Peinado profesional.", precio: "30.00", imagen: "https://picsum.photos/200/300?random=4" },
  { id: 5, nombre: "Pedicure", descripcion: "Cuidado de pies.", precio: "18.00", imagen: "https://picsum.photos/200/300?random=5" },
  { id: 6, nombre: "Tinte", descripcion: "Coloración de cabello.", precio: "50.00", imagen: "https://picsum.photos/200/300?random=6" },
  { id: 7, nombre: "Extensión de Pestañas", descripcion: "Pestañas más largas.", precio: "40.00", imagen: "https://picsum.photos/200/300?random=7" },
  { id: 8, nombre: "Tratamiento Facial", descripcion: "Cuidado facial profundo.", precio: "35.00", imagen: "https://picsum.photos/200/300?random=8" },
  { id: 9, nombre: "Masaje Relajante", descripcion: "Alivia el estrés.", precio: "60.00", imagen: "https://picsum.photos/200/300?random=9" },
  { id: 10, nombre: "Corte Infantil", descripcion: "Corte especial para niños.", precio: "15.00", imagen: "https://picsum.photos/200/300?random=10" },
  { id: 11, nombre: "Maquillaje Profesional", descripcion: "Maquillaje para eventos.", precio: "55.00", imagen: "https://picsum.photos/200/300?random=11" },
  { id: 12, nombre: "Alisado Permanente", descripcion: "Cabello liso por meses.", precio: "80.00", imagen: "https://picsum.photos/200/300?random=12" },
];

const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productosRecomendados, setProductosRecomendados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;

  useEffect(() => {
    // Generar productos aleatorios sin repetir
    setProductos(generarProductosAleatorios(productosData, productosPorPagina));
    setProductosRecomendados(generarProductosAleatorios(productosData, 5));
  }, []);

  // Cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    setProductos(generarProductosAleatorios(productosData, productosPorPagina));
  };

  return (
    <Box sx={{ padding: "40px 20px", textAlign: "center" }}>
      {/* Productos Recomendados */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Productos Recomendados
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
        {productosRecomendados.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </Box>

      {/* Lista de Productos */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Lista de Productos
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", justifyContent: "center", maxWidth: "600px", margin: "auto" }}>
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </Box>

      {/* Paginación */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
        <Button variant="contained" disabled={paginaActual === 1} onClick={() => cambiarPagina(paginaActual - 1)}>
          Anterior
        </Button>
        <Typography variant="body1">Página <br /> {paginaActual}</Typography>
        <Button variant="contained" disabled={paginaActual === 3} onClick={() => cambiarPagina(paginaActual + 1)}>
          Siguiente
        </Button>
      </Box>
    </Box>
  );
};

export default ListadoProductos;
