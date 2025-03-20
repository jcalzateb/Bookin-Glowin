import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { obtenerServicios } from "../../Services/serviciosService";
import { obtenerImagenesPorServicio } from "../../Services/imagenesService";
import { useNavigate } from "react-router-dom";
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
  const [productos, setProductos] = useState([]);
  const [productosVisibles, setProductosVisibles] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [productosPorPantalla, setProductosPorPantalla] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarServicios = async () => {
      const data = await obtenerServicios();
      const serviciosConImagenes = await Promise.all(
        data.map(async (producto) => {
          const imagenes = await obtenerImagenesPorServicio(producto.id);
          return {
            ...producto,
            imagenes: imagenes.length > 0 ? imagenes : [],
          };
        })
      );
      setProductos(serviciosConImagenes.slice(0, 8));
    };

    cargarServicios();
  }, []);

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

  useEffect(() => {
    setProductosVisibles(
      productos.slice(indiceActual, indiceActual + productosPorPantalla)
    );
  }, [indiceActual, productosPorPantalla]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((prevIndice) =>
        prevIndice + 1 >= productos.length - productosPorPantalla + 1
          ? 0
          : prevIndice + 1
      );
    }, 3000);

    return () => clearInterval(intervalo);
  }, [productosPorPantalla, productos.length]);

  return (
    <Box>
      <h2
        style={{
          textAlign: "center",
          margin: "30px 0 10px 0",
          fontStyle: "italic",
        }}
      >
        SERVICIOS DESTACADOS
      </h2>
      <ContenedorDestacados>
        {productosVisibles.map((producto) => (
          <TarjetaDestacada
            key={producto.id}
            imagen={
              Array.isArray(producto.imagenes) && producto.imagenes.length > 0
                ? producto.imagenes[0].urlImagen
                : "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          >
            <EstrellaDestacada className="estrella">
              <StarIcon />
            </EstrellaDestacada>
            <TituloDestacado variant="h6" className="titulo">
              {producto.nombre}
            </TituloDestacado>
            <ContenidoHover className="hover">
              <Typography variant="h6" fontWeight="bold">
                {producto.nombre}
              </Typography>
              <Typography variant="body2">{producto.descripcion}</Typography>
              <BotonVerMas onClick={() => navigate(`/producto/${producto.id}`)}>
                Ver más
              </BotonVerMas>
            </ContenidoHover>
          </TarjetaDestacada>
        ))}
      </ContenedorDestacados>

      <ControlesCarrusel>
        <Indicadores>
          {Array.from({
            length: productos.length - productosPorPantalla + 1,
          }).map((_, index) => (
            <Indicador
              key={index}
              $activo={index === indiceActual}
              onClick={() => setIndiceActual(index)}
            />
          ))}
        </Indicadores>
      </ControlesCarrusel>
    </Box>
  );
};

export default ProductosDestacados;
