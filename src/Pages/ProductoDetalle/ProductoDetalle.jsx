import React, { useState, useEffect } from "react";
import { obtenerServicioPorId } from "../../Services/serviciosService";
import { obtenerImagenesPorServicio } from "../../Services/imagenesService";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import CategoryIcon from "@mui/icons-material/FaceRetouchingNatural";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  ContenedorDetalle,
  EncabezadoDetalle,
  BloqueImagenes,
  ImagenPrincipal,
  MiniaturasImagenes,
  BotonVerMas,
  ContenedorInfo,
  DescripcionProducto,
  ContenedorReserva,
  BotonReservar,
  BotonRetroceso,
  TituloProducto,
  TituloDescripcion,
  PrecioProducto,
  ContenedorCaracteristicas,
  ListaCaracteristicas,
  CaracteristicaItem,
  IconoCaracteristica,
  MensajeError,
} from "./ProductoDetalle.styled";
import CarruselImagenes from "./CarruselImagenes/CarruselImagenes";
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritosUsuario,
} from "../../Services/favoritosService";

const ProductoDetalle = ({ setMostrarHeader }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [servicio, setServicio] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerDetallesServicio();
  }, []);

  const obtenerDetallesServicio = async () => {
    try {
      const data = await obtenerServicioPorId(id);
      const imagenesDelServicio = await obtenerImagenesPorServicio(id);
      setServicio(data);
      setImagenes(imagenesDelServicio);
      const favoritosDelUsuario = await obtenerFavoritosUsuario();
      setFavoritos(favoritosDelUsuario);
    } catch (error) {
      console.log("No se pudo cargar la información del servicio.", error);
    } finally {
      setCargando(false);
    }
  };

  const agregarAFavoritos = async () => {
    try {
      const resultado = await agregarFavorito(servicio.id);
      setFavoritos((prevFavoritos) => [
        ...prevFavoritos,
        { id: resultado.id, servicioId: servicio.id },
      ]);
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };

  const eliminarDeFavoritos = async () => {
    try {
      const favorito = favoritos.find((fav) => fav.servicioId === servicio.id);
      if (favorito) {
        await eliminarFavorito(favorito.id);
        setFavoritos((prevFavoritos) =>
          prevFavoritos.filter((fav) => fav.id !== favorito.id)
        );
      }
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  };

  const esFavorito = (productoId) => {
    return favoritos.some((fav) => fav.servicioId === productoId);
  };

  if (cargando) {
    if (!servicio || !imagenes) {
      return (
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: "40px" }}
        >
          Cargando servicio... <CircularProgress size={30} />
        </Typography>
      );
    }
  }

  if (error || !servicio) {
    return (
      <MensajeError
        variant="h4"
        sx={{ textAlign: "center", marginTop: "40px" }}
      >
        {error || "Producto no encontrado"}
      </MensajeError>
    );
  }

  const abrirCarrusel = () => {
    setModalAbierto(true);
    setMostrarHeader(false);
  };

  const cerrarCarrusel = () => {
    setModalAbierto(false);
    setMostrarHeader(true);
  };

  return (
    <ContenedorDetalle>
      <EncabezadoDetalle>
        <BotonRetroceso onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </BotonRetroceso>
        <TituloProducto>{servicio.nombre}</TituloProducto>
        <FavoriteIcon
          onClick={() => {
            if (esFavorito(servicio.id)) {
              eliminarDeFavoritos();
            } else {
              agregarAFavoritos();
            }
          }}
          style={{
            cursor: "pointer",
            color: esFavorito(servicio.id) ? "red" : "gray",
          }}
        />
      </EncabezadoDetalle>

      <BloqueImagenes>
        <ImagenPrincipal
          style={{
            backgroundImage: imagenes.length
              ? `url(${imagenes[0].urlImagen})`
              : "url('https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />
        <MiniaturasImagenes>
          {imagenes.length > 1 ? (
            imagenes
              .slice(1)
              .map((img, index) => (
                <img
                  key={index}
                  src={img.urlImagen}
                  alt={`Miniatura ${index}`}
                />
              ))
          ) : (
            <Typography variant="body2">No hay imágenes adicionales</Typography>
          )}
          <BotonVerMas onClick={abrirCarrusel}>Ver Más</BotonVerMas>
        </MiniaturasImagenes>
      </BloqueImagenes>

      <CarruselImagenes
        imagenes={imagenes}
        abierto={modalAbierto}
        cerrar={cerrarCarrusel}
      />

      <ContenedorInfo>
        <DescripcionProducto>
          <TituloDescripcion>Descripción del Servicio</TituloDescripcion>
          <Typography variant="body1">{servicio.descripcion}</Typography>
        </DescripcionProducto>

        <ContenedorReserva>
          <PrecioProducto>${servicio.costo} USD</PrecioProducto>
          <Typography variant="body2">Horario: 10:00 AM - 6:00 PM</Typography>
          <Typography variant="body2">
            Disponibilidad: Lunes - Viernes
          </Typography>
          <BotonReservar>Reservar</BotonReservar>
        </ContenedorReserva>
      </ContenedorInfo>
      <ContenedorCaracteristicas>
        <TituloDescripcion>Características del Servicio</TituloDescripcion>
        <ListaCaracteristicas>
          <CaracteristicaItem>
            <IconoCaracteristica>
              <CategoryIcon />
            </IconoCaracteristica>
            <Typography variant="body1">
              Categoría: {servicio.categoria}
            </Typography>
          </CaracteristicaItem>
          <CaracteristicaItem>
            <IconoCaracteristica>
              <AccessTimeIcon />
            </IconoCaracteristica>
            <Typography variant="body1">
              Duración: {servicio.duracionMinutos} min
            </Typography>
          </CaracteristicaItem>
          <CaracteristicaItem>
            <IconoCaracteristica>
              <AttachMoneyIcon />
            </IconoCaracteristica>
            <Typography variant="body1">
              Precio: ${servicio.costo} USD
            </Typography>
          </CaracteristicaItem>
          <CaracteristicaItem>
            <IconoCaracteristica>
              <ContentCutIcon />
            </IconoCaracteristica>
            <Typography variant="body1">
              Sesiones: {servicio.cantidadSesiones}
            </Typography>
          </CaracteristicaItem>
        </ListaCaracteristicas>
      </ContenedorCaracteristicas>
    </ContenedorDetalle>
  );
};

export default ProductoDetalle;
