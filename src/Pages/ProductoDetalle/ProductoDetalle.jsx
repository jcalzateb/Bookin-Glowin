import React, { useState, useEffect } from "react";
import { obtenerServicioPorId } from "../../Services/serviciosService";
import { obtenerImagenesPorServicio } from "../../Services/imagenesService";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import CategoryIcon from "@mui/icons-material/FaceRetouchingNatural";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
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
  BotonCompartirRedes,
  BotonesIconos,
  PoliticasContenedor,
  PoliticaItem,
  TituloPoliticas,
} from "./ProductoDetalle.styled";
import CarruselImagenes from "./CarruselImagenes/CarruselImagenes";
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritosUsuario,
} from "../../Services/favoritosService";
import CompartirModal from "../../Pages/ProductoDetalle/CompartirModal/CompartirModal";

const ProductoDetalle = ({ setMostrarHeader }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [servicio, setServicio] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [compartirModalAbierto, setCompartirModalAbierto] = useState(false);

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

  const abrirModalCompartir = () => {
    setCompartirModalAbierto(true);
  };

  const cerrarModalCompartir = () => {
    setCompartirModalAbierto(false);
  };

  return (
    <ContenedorDetalle>
      <EncabezadoDetalle>
        <BotonRetroceso onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </BotonRetroceso>
        <TituloProducto>{servicio.nombre}</TituloProducto>
        <BotonesIconos>
          <BotonCompartirRedes onClick={abrirModalCompartir}>
            <ShareIcon />
          </BotonCompartirRedes>
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
        </BotonesIconos>
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

      <PoliticasContenedor>
        <TituloPoliticas>Políticas de uso del servicio</TituloPoliticas>
        <PoliticaItem>
          <Typography variant="body1">
            Para brindarte la mejor experiencia y garantizar un servicio de
            calidad, te pedimos que tengas en cuenta las siguientes cosas:
          </Typography>
        </PoliticaItem>
        <PoliticaItem>
          <Typography variant="body2">
            <strong>Puntualidad:</strong> Llegar a tiempo para no afectar la
            programación de otros clientes.
          </Typography>
        </PoliticaItem>
        <PoliticaItem>
          <Typography variant="body2">
            <strong>Reservas y Cancelaciones:</strong> Las reservas deben
            hacerse con al menos 24 horas de antelación. Las cancelaciones deben
            realizarse con un mínimo de 12 horas.
          </Typography>
        </PoliticaItem>
        <PoliticaItem>
          <Typography variant="body2">
            <strong>Condiciones Previas al Servicio:</strong> Asegúrate de
            seguir las instrucciones previas al servicio para obtener los
            mejores resultados.
          </Typography>
        </PoliticaItem>
        <PoliticaItem>
          <Typography variant="body2">
            <strong>Salud y Cuidado de Piel y Cabello:</strong> Es importante
            que nos informes de cualquier condición de salud relevante antes de
            tu servicio.
          </Typography>
        </PoliticaItem>
        <PoliticaItem>
          <Typography variant="body2">
            <strong>Menores de Edad:</strong> Los menores de edad deben estar
            acompañados por un adulto responsable durante el servicio.
          </Typography>
        </PoliticaItem>
        <PoliticaItem>
          <Typography variant="body2">
            <strong>Formas de Pago:</strong> Aceptamos pagos en efectivo,
            tarjetas de crédito/débito y pagos electrónicos.
          </Typography>
        </PoliticaItem>
        <PoliticaItem>
          <Typography variant="body2">
            Tu bienestar y satisfacción son nuestra prioridad. Gracias por
            confiar en nosotros.
          </Typography>
        </PoliticaItem>
      </PoliticasContenedor>

      <CompartirModal
        abierto={compartirModalAbierto}
        cerrar={cerrarModalCompartir}
        servicio={servicio}
        imagenesServicio={imagenes}
      />
    </ContenedorDetalle>
  );
};

export default ProductoDetalle;
