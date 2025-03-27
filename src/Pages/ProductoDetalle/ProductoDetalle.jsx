import React, { useState, useEffect } from "react";
import { obtenerServicioPorId } from "../../Services/serviciosService";
import { obtenerImagenesPorServicio } from "../../Services/imagenesService";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Rating,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import CategoryIcon from "@mui/icons-material/FaceRetouchingNatural";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CalendarioDisponibilidad from "../../Components/CalendarioDisponibilidad/CalendarioDisponibilidad";
import { realizarValoracion } from "../../Services/valoracionesService";
import {
  Contenedor,
  ContenedorDetalle,
  EncabezadoDetalle,
  BloqueImagenes,
  ImagenPrincipal,
  MiniaturasImagenes,
  BotonVerMas,
  ContenedorInfo,
  ContenedorInfoI,
  ContenedorInfoD,
  Horario,
  DescripcionProducto,
  CuerpoDescripcion,
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
  ContenedorPuntuacion,
  TituloValoracion,
  ContenedorValoracionResena,
  ContenedorResenas,
  Valoracion,
  BotonVerResena,
  Turno,
  Disponibilidad,
  ListaPoliticas,
  FavoritoIcono,
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
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  /*   const [valoracion, setValoracion] = useState(0);
  const [comentario, setComentario] = useState(""); */
  const [calendarioAbierto, setCalendarioAbierto] = useState(false);

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

  /*   const manejarValoracion = async () => {
    if (valoracion === 0) {
      setError("Por favor, selecciona una puntuación.");
      return;
    }

    try {
      await realizarValoracion(id, valoracion, comentario);
      alert("Valoración enviada con éxito");
      setValoracion(0);
      setComentario("");
    } catch (err) {
      setError("Hubo un error al enviar la valoración.");
    }
  }; */

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

  // Función para manejar la apertura/cierre del calendario
  const toggleCalendario = () => {
    setCalendarioAbierto(!calendarioAbierto);
  };

  const manejarSeleccionTurno = (fecha, turno) => {
    setTurnoSeleccionado({
      fecha: fecha,
      hora: turno.hora,
      id: turno.id,
    });
    setCalendarioAbierto(false); // Cerrar el calendario después de seleccionar
  };

  // Función para manejar el clic en el botón de reserva
  const manejarBotonReserva = () => {
    if (!turnoSeleccionado) {
      // Si no hay turno seleccionado, mostrar el calendario
      toggleCalendario();
    } else {
      // Si ya hay turno seleccionado, navegar a la página de reserva
      navigate(`/reserva`, {
        state: {
          servicioId: id,
          turnoId: turnoSeleccionado.id,
          hora: turnoSeleccionado.hora,
          fecha: turnoSeleccionado.fecha.toISOString().split("T")[0],
        },
      });
    }
  };

  return (
    <Contenedor>
      <ContenedorDetalle>
        <EncabezadoDetalle>
          <BotonRetroceso onClick={() => navigate("/")}>
            <ArrowBackIcon
              style={{
                cursor: "pointer",
                color: "#f6ebf9",
              }}
            />
          </BotonRetroceso>
          <TituloProducto>{servicio.nombre}</TituloProducto>
          <BotonesIconos>
            <BotonCompartirRedes onClick={abrirModalCompartir}>
              <ShareIcon
                style={{
                  cursor: "pointer",
                  color: "#f6ebf9",
                }}
              />
            </BotonCompartirRedes>
            <FavoritoIcono>
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
                  color: esFavorito(servicio.id) ? "red" : "#f6ebf9",
                }}
              />
            </FavoritoIcono>
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
              <Typography variant="body2">
                No hay imágenes adicionales
              </Typography>
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
          <ContenedorInfoI>
            <DescripcionProducto>
              <TituloDescripcion>Descripción del Servicio</TituloDescripcion>
              <CuerpoDescripcion>{servicio.descripcion}</CuerpoDescripcion>
            </DescripcionProducto>
            <ContenedorValoracionResena>
              <TituloValoracion>
                La puntuación del servicio es:
              </TituloValoracion>
              <Valoracion>
                <Typography variant="body1">
                  {servicio.puntuacionMedia || "N/A"}
                </Typography>
                <Rating
                  value={servicio.puntuacionMedia || 0}
                  readOnly
                  size="large"
                />
              </Valoracion>

              <BotonVerResena>Ver reseñas</BotonVerResena>
            </ContenedorValoracionResena>
            <ContenedorCaracteristicas>
              <TituloDescripcion>
                Características del Servicio
              </TituloDescripcion>
              <ListaCaracteristicas>
                <CaracteristicaItem>
                  <IconoCaracteristica>
                    <CategoryIcon />
                  </IconoCaracteristica>
                  <Typography variant="body2">
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
          </ContenedorInfoI>

          <ContenedorInfoD>
            <PrecioProducto>Precio: ${servicio.costo} USD</PrecioProducto>
            <ContenedorReserva>
              <Turno>
                <AccessTimeIcon
                  style={{
                    cursor: "pointer",
                    color: "#2d0363",
                  }}
                />
                <Horario>
                  <Typography variant="body2">Horario:</Typography>
                  <Typography variant="body2">10:00 AM - 6:00 PM</Typography>
                  <Typography variant="body2">Lunes - Viernes</Typography>
                </Horario>
              </Turno>
              <Disponibilidad>
                {calendarioAbierto && (
                  <CalendarioDisponibilidad
                    servicioId={servicio.id}
                    onSeleccionTurno={manejarSeleccionTurno}
                  />
                )}

                {turnoSeleccionado ? (
                  <Typography
                    variant="body2"
                    sx={{ color: "green", fontWeight: "bold", my: 1 }}
                  >
                    Turno seleccionado:{" "}
                    {turnoSeleccionado.fecha.toLocaleDateString("es-ES")} a las{" "}
                    {turnoSeleccionado.hora}
                  </Typography>
                ) : (
                  <Typography variant="body2">Ver Disponibilidad</Typography>
                )}
              </Disponibilidad>
            </ContenedorReserva>
            <BotonReservar onClick={manejarBotonReserva}>
              {turnoSeleccionado ? "Reservar" : "Ver Disponibilidad"}
            </BotonReservar>
          </ContenedorInfoD>
        </ContenedorInfo>

        <ContenedorPuntuacion>
          <ContenedorResenas>
            {servicio.valoraciones &&
              servicio.valoraciones.map((valoracion, index) => (
                <div key={index}>
                  <Rating value={valoracion.puntuacion} readOnly size="small" />
                  <Typography variant="body2">
                    {valoracion.comentario}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    - {valoracion.usuarioNombre}, {valoracion.fecha}
                  </Typography>
                </div>
              ))}
          </ContenedorResenas>
        </ContenedorPuntuacion>

        <PoliticasContenedor>
          <PoliticaItem>
            <TituloPoliticas>Políticas de uso del servicio</TituloPoliticas>
            <Typography variant="body1">
              Para brindarte e la mejor experiencia y garantizar un servicio de
              calidad, te pedimos tener en cuenta las siguientes políticas:
            </Typography>
          </PoliticaItem>
          <ListaPoliticas>
            <PoliticaItem>
              <strong>Puntualidad:</strong>
              <Typography variant="body2">
                5 minutos de anticipación. En caso de retraso, el tiempo del
                servicio podría verse reducido o necesitar reprogramación.
              </Typography>
            </PoliticaItem>
            <PoliticaItem>
              <strong>Reservas y Cancelaciones:</strong>
              <Typography variant="body2">
                Cancelar con al menos 24 horas de anticipación. De lo contrario
                el servicio será confirmado.
              </Typography>
            </PoliticaItem>
            <PoliticaItem>
              <strong>Condiciones Previas al Servicio:</strong>
              <Typography variant="body2">
                Zona a tratar limpia y libre de productos como maquillaje,
                aceites, cremas o fijadores, según el servicio seleccionado.
              </Typography>
            </PoliticaItem>
            <PoliticaItem>
              <strong>SSalud y Cuidados de la Piel y el Cabello:</strong>
              <Typography variant="body2">
                Si presentas alguna condición dermatológica, informar con
                anticipación.
              </Typography>
            </PoliticaItem>
            <PoliticaItem>
              <strong>Menores de Edad:</strong>
              <Typography variant="body2">
                Acompañados por un adulto responsable durante todo el servicio.
              </Typography>
            </PoliticaItem>
            <PoliticaItem>
              <strong>Formas de Pago:</strong>
              <Typography variant="body2">
                Aceptamos pagos en efectivo y medios electrónicos. Consulte por
                promociones o descuentos vigentes.
              </Typography>
            </PoliticaItem>
          </ListaPoliticas>
          <PoliticaItem>
            <Typography variant="body2">
              Tu bienestar y satisfacción son nuestra prioridad. ¡Gracias por
              confiar en nosotros!
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
    </Contenedor>
  );
};

export default ProductoDetalle;
