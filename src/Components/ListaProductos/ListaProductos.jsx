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

  // Calcular número total de páginas basado en la cantidad de servicios
  const totalPaginas = Math.ceil(servicios.length / productosPorPagina);

  // Calcular servicios de la página actual
  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const serviciosActuales = servicios.slice(
    indiceInicial,
    indiceInicial + productosPorPagina
  );

  // Cambiar página
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontStyle: "italic",
        }}
      >
        SERVICIOS
      </h2>

      <ContenedorLista>
        {serviciosActuales.map((servicio) => (
          <TarjetaProducto key={servicio.id}>
            <ImagenProducto src={servicio.imagenes[0]} alt={servicio.nombre} />
            <ContenidoProducto>
              <TituloProducto>{servicio.nombre}</TituloProducto>
              <DescripcionProducto variant="body2">
                {servicio.descripcion}
              </DescripcionProducto>
              <BotonVerMas onClick={() => navigate(`/producto/${servicio.id}`)}>
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
            activo={paginaActual === index + 1}
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
    </>
  );
};

export default ListaProductos;
