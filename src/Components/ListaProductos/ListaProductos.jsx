import React, { useState, useEffect } from "react";
import { obtenerServicios } from "../../Services/serviciosService";
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
  const [servicios, setServicios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const data = await obtenerServicios();
        setServicios(data);
      } catch (error) {
        console.error("❌ Error al cargar los servicios:", error);
      }
    };

    cargarServicios();
  }, []);

  const [productosAleatorios, setProductosAleatorios] = useState([]);

  //Mezcla aleatoria de productos
  const mezclarProductos = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setProductosAleatorios(mezclarProductos(servicios));
  }, []);

  const serviciosFiltrados = categoriaSeleccionada
    ? servicios.filter(
        (servicio) => servicio.categoria === categoriaSeleccionada
      )
    : servicios;

  useEffect(() => {
    setPaginaActual(1);
  }, [categoriaSeleccionada]);

  //Calcular número total de páginas
  const totalPaginas = Math.ceil(
    serviciosFiltrados.length / productosPorPagina
  );

  //Calcular los productos
  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const serviciosActuales = serviciosFiltrados.slice(
    indiceInicial,
    indiceInicial + productosPorPagina
  );

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
            Numeros de servicios: {serviciosFiltrados.length}
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
          {serviciosActuales.length > 0 ? (
            serviciosActuales.map((servicio) => (
              <TarjetaProducto key={servicio.id}>
                <ImagenProducto
                  src={
                    Array.isArray(servicio.imagenes) &&
                    servicio.imagenes.length > 0
                      ? servicio.imagenes[0]
                      : "https://via.placeholder.com/150"
                  }
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
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No hay servicios disponibles.
            </p>
          )}
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
