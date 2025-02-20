import React, { useState, useEffect } from "react";
import servicios from "../../Utils/servicios.json";
import { useNavigate } from "react-router-dom";
import {
  ContenedorLista,
  TarjetaProducto,
  ImagenProducto,
  ContenidoProducto,
  TituloProducto,
  DescripcionProducto,
  BotonVerMas,
  ContenedorPaginacion,
  BotonPagina,
} from "./ListaProductos.styled";
const ListaProductos = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;
  const navigate = useNavigate();

  const [productosAleatorios, setProductosAleatorios] = useState([]);
  const mezclarProductos = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };
  useEffect(() => {
    setProductosAleatorios(mezclarProductos(servicios));
  }, []);

  // Calcular número total de páginas basado en la cantidad de servicios
  const totalPaginas = Math.ceil(
    productosAleatorios.length / productosPorPagina
  );

  // Calcular servicios de la página actual
  const indiceInicial = (paginaActual - 1) * productosPorPagina;

  const serviciosActuales = productosAleatorios.slice(
    indiceInicial,
    indiceInicial + productosPorPagina
  );

  // Cambiar página
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo({
      top: document.getElementById("lista-productos").offsetTop - 20, // Ajuste opcional
      behavior: "smooth",
    });
  };

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          margin: "30px 0 20px 0",
          fontStyle: "italic",
        }}
      >
        SERVICIOS
      </h2>

      <div id="lista-productos">
        <ContenedorLista>
          {serviciosActuales.map((servicio) => (
            <TarjetaProducto key={servicio.id}>
              <ImagenProducto
                src={servicio.imagenes[0]}
                alt={servicio.nombre}
              />
              <ContenidoProducto>
                <TituloProducto>{servicio.nombre}</TituloProducto>
                <DescripcionProducto variant="body2">
                  {servicio.descripcion}
                </DescripcionProducto>
                <BotonVerMas
                  onClick={() => navigate(`/producto/${servicio.id}`)}
                >
                  VER MÁS
                </BotonVerMas>
              </ContenidoProducto>
            </TarjetaProducto>
          ))}
        </ContenedorLista>

        <ContenedorPaginacion>
          <BotonPagina
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            {"<"}
          </BotonPagina>

          {Array.from({ length: totalPaginas }).map((_, index) => (
            <BotonPagina
              key={index}
              onClick={() => cambiarPagina(index + 1)}
              $activo={paginaActual === index + 1}
            >
              {index + 1}
            </BotonPagina>
          ))}

          <BotonPagina
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            {">"}
          </BotonPagina>
        </ContenedorPaginacion>
      </div>
    </>
  );
};

export default ListaProductos;
