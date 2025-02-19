import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import servicios from "../../Utils/servicios.json";
import {
  ContenedorDestacados,
  TarjetaDestacada,
  ContenidoHover,
  EstrellaDestacada,
  BotonVerMas,
  ControlesCarrusel,
  Indicadores,
  Indicador,
  TituloDestacado,
} from "./ProductoDestacado.styled";

const ProductosDestacados = () => {
  const [productosVisibles, setProductosVisibles] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [productosPorPantalla, setProductosPorPantalla] = useState(4);

  // 🔹 Filtrar solo 8 servicios destacados aleatorios
  const productos = servicios.slice(0, 8);

  // 🔹 Ajustar la cantidad de productos según la pantalla
  useEffect(() => {
    const ajustarCantidadProductos = () => {
      if (window.innerWidth < 600) {
        setProductosPorPantalla(1);
      } else if (window.innerWidth < 960) {
        setProductosPorPantalla(3);
      } else {
        setProductosPorPantalla(4);
      }
    };

    ajustarCantidadProductos();
    window.addEventListener("resize", ajustarCantidadProductos);
    return () => window.removeEventListener("resize", ajustarCantidadProductos);
  }, []);

  // 🔹 Actualizar los productos visibles
  useEffect(() => {
    setProductosVisibles(
      productos.slice(indiceActual, indiceActual + productosPorPantalla)
    );
  }, [indiceActual, productosPorPantalla]);

  // 🔹 Cambio automático del carrusel
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((prevIndice) =>
        prevIndice + 1 >= productos.length - productosPorPantalla + 1 ? 0 : prevIndice + 1
      );
    }, 3000);

    return () => clearInterval(intervalo);
  }, [productosPorPantalla]);

  return (
    <Box>
            <h2 style={{ textAlign: "center", marginBottom: "20px", fontStyle: "italic" }}>
              SERVICIOS DESTACADOS
            </h2>
      <ContenedorDestacados>
        {productosVisibles.map((producto) => (
          <TarjetaDestacada key={producto.id} imagen={producto.imagenes[0]}>
            <EstrellaDestacada className="estrella">
              <StarIcon />
            </EstrellaDestacada>
            <TituloDestacado className="titulo">{producto.nombre}</TituloDestacado>
            <ContenidoHover className="hover">
              <Typography variant="h6" fontWeight="bold">
                {producto.nombre}
              </Typography>
              <Typography variant="body2">{producto.descripcion}</Typography>
              <BotonVerMas>Ver más</BotonVerMas>
            </ContenidoHover>
          </TarjetaDestacada>
        ))}
      </ContenedorDestacados>

      {/* Controles del carrusel */}
      <ControlesCarrusel>
        <Indicadores>
          {Array.from({ length: productos.length - productosPorPantalla + 1 }).map(
            (_, index) => (
              <Indicador
                key={index}
                activo={index === indiceActual}
                onClick={() => setIndiceActual(index)}
              />
            )
          )}
        </Indicadores>
      </ControlesCarrusel>
    </Box>
  );
};

export default ProductosDestacados;