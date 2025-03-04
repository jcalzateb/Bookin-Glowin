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
  ContenedorFiltro,
  BotonEliminarFiltro,
  TextoFiltro,
} from "./ListaProductos.styled";

const ListaProductos = ({
  categoriaSeleccionada,
  setCategoriaSeleccionada,
}) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;
  const navigate = useNavigate();

  const [productosAleatorios, setProductosAleatorios] = useState([]);

  //Mezcla aleatoria de productos
  const mezclarProductos = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setProductosAleatorios(mezclarProductos(servicios));
  }, []);

  //Filtrar productos según la categoría
  const productosFiltrados = categoriaSeleccionada
    ? productosAleatorios.filter(
        (producto) => producto.categoria === categoriaSeleccionada
      )
    : productosAleatorios;

  useEffect(() => {
    setPaginaActual(1);
  }, [categoriaSeleccionada]);

  //Calcular número total de páginas
  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );

  //Calcular los productos
  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const serviciosActuales = productosFiltrados.slice(
    indiceInicial,
    indiceInicial + productosPorPagina
  );

  //Cambiar página y desplazar la vista
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo({
      top: document.getElementById("lista-productos").offsetTop - 20,
      behavior: "smooth",
    });
  };

  const limpiarFiltro = () => {
    setCategoriaSeleccionada(null);
    setPaginaActual(1);
  };

  return (
    <>
      <div id="lista-productos">
        <h2
          style={{
            textAlign: "center",
            margin: "30px 0 5px 0",
            fontStyle: "italic",
          }}
        >
          SERVICIOS
        </h2>

        <ContenedorFiltro>
          <TextoFiltro>
            Numeros de servicios: {productosFiltrados.length}
            {""}
          </TextoFiltro>

          {categoriaSeleccionada && (
            <TextoFiltro>
              {"en la categoria de "}
              {categoriaSeleccionada}
            </TextoFiltro>
          )}

          {categoriaSeleccionada && (
            <BotonEliminarFiltro onClick={limpiarFiltro}>
              Limpiar
            </BotonEliminarFiltro>
          )}
        </ContenedorFiltro>

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

        {totalPaginas > 1 && (
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
        )}
      </div>
    </>
  );
};

export default ListaProductos;
