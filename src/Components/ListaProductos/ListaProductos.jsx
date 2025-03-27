import React, { useState, useEffect } from "react";
import { obtenerServicios } from "../../Services/serviciosService";
import { obtenerImagenesPorServicio } from "../../Services/imagenesService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritosUsuario,
} from "../../Services/favoritosService";
import { Rating } from "@mui/material";
import {
  Contenedor,
  TituloSeccion,
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
  CorazonFavorito,
  PuntuacionProducto,
  CategiraProducto,
  Valoracion,
} from "./ListaProductos.styled";

const ListaProductos = ({
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  mostrarFavoritos,
  setMostrarFavoritos,
}) => {
  const [servicios, setServicios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [favoritos, setFavoritos] = useState([]);
  const productosPorPagina = 10;
  const navigate = useNavigate();

  const mezclarProductos = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const cargarServicios = async () => {
      try {
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
        setServicios(mezclarProductos(serviciosConImagenes));
        const favoritosDelUsuario = await obtenerFavoritosUsuario();
        console.log("favoritos del usuario ", favoritosDelUsuario);
        setFavoritos(favoritosDelUsuario);
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      }
    };

    cargarServicios();
  }, []);

  //const [productosAleatorios, setProductosAleatorios] = useState([]);

  /*   useEffect(() => {
    setProductosAleatorios(mezclarProductos(servicios)); // Mezclar productos cuando se cargan
  }, [servicios]); // Re-ejecutar cuando los servicios cambien */

  const serviciosFiltrados = categoriaSeleccionada
    ? servicios.filter(
        (servicio) => servicio.categoria === categoriaSeleccionada
      )
    : servicios;

  const serviciosFavoritos = serviciosFiltrados.filter((servicio) =>
    favoritos.some((fav) => fav.servicioId === servicio.id)
  );

  const serviciosAFiltrar = mostrarFavoritos
    ? serviciosFavoritos
    : serviciosFiltrados;

  useEffect(() => {
    setPaginaActual(1);
  }, [categoriaSeleccionada, mostrarFavoritos]);

  const totalPaginas = Math.ceil(serviciosAFiltrar.length / productosPorPagina);

  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const serviciosActuales = serviciosAFiltrar.slice(
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
    setMostrarFavoritos(null);
    setPaginaActual(1);
  };

  const agregarAFavoritos = async (productoId) => {
    try {
      const resultado = await agregarFavorito(productoId);
      if (resultado) {
        console.log("Favorito agregado correctamente:", resultado);
        setFavoritos((prevFavoritos) => [
          ...prevFavoritos,
          { id: resultado.id, servicioId: productoId },
        ]);
      }
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };

  const eliminarDeFavoritos = async (productoId) => {
    try {
      const favorito = favoritos.find((fav) => fav.servicioId === productoId);

      if (favorito) {
        console.log("Eliminando favorito con id:", favorito.id);
        await eliminarFavorito(favorito.id);

        setFavoritos((prevFavoritos) =>
          prevFavoritos.filter((fav) => fav.id !== favorito.id)
        );
      } else {
        console.log("Favorito no encontrado para el productoId:", productoId);
      }
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  };
  const esFavorito = (productoId) => {
    return favoritos.some((fav) => fav.servicioId === productoId);
  };

  return (
    <Contenedor>
      <div id="lista-productos">
        <TituloSeccion>SERVICIOS</TituloSeccion>

        <ContenedorFiltro>
          <TextoFiltro>
            Numeros de servicios: {serviciosAFiltrar.length}
            {""}
          </TextoFiltro>

          {categoriaSeleccionada && (
            <TextoFiltro>
              {"en la categoria de "}
              {categoriaSeleccionada}
            </TextoFiltro>
          )}

          {mostrarFavoritos && <TextoFiltro>{"Favoritos"}</TextoFiltro>}

          {(categoriaSeleccionada || mostrarFavoritos) && (
            <BotonEliminarFiltro onClick={limpiarFiltro}>
              Limpiar
            </BotonEliminarFiltro>
          )}
        </ContenedorFiltro>

        <ContenedorLista>
          {serviciosActuales.length > 0 ? (
            serviciosActuales.map((servicio) => (
              <TarjetaProducto key={servicio.id}>
                <CorazonFavorito
                  onClick={() => {
                    if (esFavorito(servicio.id)) {
                      eliminarDeFavoritos(servicio.id);
                    } else {
                      agregarAFavoritos(servicio.id);
                    }
                  }}
                  $favorito={esFavorito(servicio.id)}
                >
                  <FavoriteIcon />
                </CorazonFavorito>
                <ImagenProducto
                  src={
                    Array.isArray(servicio.imagenes) &&
                    servicio.imagenes.length > 0
                      ? servicio.imagenes[0].urlImagen
                      : "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={servicio.nombre}
                />
                <ContenidoProducto>
                  <TituloProducto>{servicio.nombre}</TituloProducto>
                  <CategiraProducto>{servicio.categoria}</CategiraProducto>
                  <DescripcionProducto variant="body2">
                    {servicio.descripcion}
                  </DescripcionProducto>
                  <Valoracion>
                    <PuntuacionProducto variant="body2">
                      {servicio.puntuacionMedia || "N/A "}
                    </PuntuacionProducto>
                    <Rating
                      value={servicio.puntuacionMedia || 0}
                      readOnly
                      size="small"
                    />
                  </Valoracion>

                  <BotonVerMas
                    onClick={() => navigate(`/producto/${servicio.id}`)}
                  >
                    Ver servicio
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
    </Contenedor>
  );
};

export default ListaProductos;
