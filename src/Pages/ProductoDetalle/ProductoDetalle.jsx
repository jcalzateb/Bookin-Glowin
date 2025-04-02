import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
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
import { AuthContext } from "../../Context/AuthContext";
import AuthRequiredModal from "../../Components/AuthRequiredModal/AuthRequiredModal";
//import { realizarValoracion } from "../../Services/valoracionesService";
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
  ContenedorComentario,
  EstrellaComentario,
  DetallesComentario,
} from "./ProductoDetalle.styled";
import CarruselImagenes from "./CarruselImagenes/CarruselImagenes";
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritosUsuario,
} from "../../Services/favoritosService";
import CompartirModal from "../../Pages/ProductoDetalle/CompartirModal/CompartirModal";
import { asignarPuntuacionAleatoria } from "../../Utils/utils";
import { obtenerNombreCategoria } from "../../Utils/utils";
import { comentariosPredefinidos } from "../../Utils/utils";

const ProductoDetalle = ({ setMostrarHeader }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext); // Añado contexto de autenticación
  const [modalAbierto, setModalAbierto] = useState(false);
  const [servicio, setServicio] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [compartirModalAbierto, setCompartirModalAbierto] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [mostrarResenas, setMostrarResenas] = useState(false);
  const [calendarioAbierto, setCalendarioAbierto] = useState(false);
  const [authModalAbierto, setAuthModalAbierto] = useState(false); // Estado para el modal de autenticación

  // Crear un objeto observable para abrir el calendario
  const calendarioToggleRef = useRef({
    observers: [],
    subscribe(callback) {
      this.observers.push(callback);
      return () => {
        this.observers = this.observers.filter(cb => cb !== callback);
      };
    },
    notify() {
      this.observers.forEach(callback => callback());
    }
  });

  // Función para manejar la apertura/cierre del calendario
  const toggleCalendario = useCallback(() => {
    calendarioToggleRef.current.notify();
  }, []);

  const obtenerComentariosAleatorios = () => {
    const comentariosAleatorios = [];
    while (comentariosAleatorios.length < 2) {
      const comentario =
        comentariosPredefinidos[
          Math.floor(Math.random() * comentariosPredefinidos.length)
        ];
      if (!comentariosAleatorios.includes(comentario)) {
        comentariosAleatorios.push(comentario);
      }
    }
    return comentariosAleatorios;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerDetallesServicio();
  }, []);

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

  const obtenerDetallesServicio = async () => {
    try {
      const data = await obtenerServicioPorId(id);
      const imagenesDelServicio = await obtenerImagenesPorServicio(id);
      const puntuacionAleatoria = asignarPuntuacionAleatoria();
      setServicio({
        ...data,
        puntuacionMedia: puntuacionAleatoria, // Asignamos la puntuación aquí
      });
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
        {error || "Servicio no encontrado"}
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

  const manejarSeleccionTurno = (fecha, turno) => {
    setTurnoSeleccionado({
      fecha: fecha,
      hora: turno.hora,
      id: turno.id,
    });
    setCalendarioAbierto(false);
  };

  const manejarBotonReserva = () => {
    if (!turnoSeleccionado) {
      toggleCalendario();
    } else if (!usuario) {
      setAuthModalAbierto(true);
    } else {
      navigate(`/reserva`, {
        state: {
          servicioId: id,
          turnoId: turnoSeleccionado.id,
          hora: turnoSeleccionado.hora,
          fecha: turnoSeleccionado.fecha.format("YYYY-MM-DD"),
        },
      });
    }
  };

  const manejarBotonVerResenas = () => {
    setMostrarResenas(!mostrarResenas);
    console.log(mostrarResenas);
    if (mostrarResenas == false) {
      window.scrollTo({
        top: document.getElementById("reseñas-seccion").offsetTop - 20,
        behavior: "smooth",
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
                  {(servicio.puntuacionMedia || 5.0).toFixed(1)}
                </Typography>
                <Rating
                  value={(servicio.puntuacionMedia || 5.0).toFixed(1)}
                  precision={0.1}
                  readOnly
                  size="large"
                />
              </Valoracion>

              <BotonVerResena onClick={manejarBotonVerResenas}>
                {mostrarResenas ? "Ocultar reseñas" : "Ver reseñas"}
              </BotonVerResena>
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
                    Categoría: {obtenerNombreCategoria(servicio.categoria)}
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
                    color: "#2d0363",
                    fontSize: "30px",
                                      }}
                />
                <Horario>
                  <Typography variant="body2">Horarios disponibles:</Typography>
                  <Typography variant="body2">
                    Lunes - Viernes / 10:00 AM - 6:00 PM
                  </Typography>
                </Horario>
              </Turno>
              <Disponibilidad>
                <CalendarioDisponibilidad
                  servicioId={servicio.id}
                  onSeleccionTurno={manejarSeleccionTurno}
                  toggleAbierto={calendarioToggleRef.current}
                />

                {turnoSeleccionado ? (
                  <>
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "left", paddingLeft: "2rem" }}
                    >
                      Fecha seleccionada:{" "}
                      <strong>
                        {turnoSeleccionado.fecha.format("DD/MM/YYYY")}
                      </strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "left", paddingLeft: "2rem" }}
                    >
                      Turno seleccionado:{" "}
                      <strong>{turnoSeleccionado.hora}</strong>
                    </Typography>
                  </>
                ) : (
                  <Typography 
                    variant="body2" 
                    onClick={toggleCalendario}
                    sx={{ 
                      textDecoration: 'underline', 
                      cursor: 'pointer',
                      color: '#2d0363',
                      '&:hover': {
                        color: '#530eae',
                      }
                    }}
                  >
                    Ver Disponibilidad
                  </Typography>
                )}
              </Disponibilidad>
            </ContenedorReserva>

            <BotonReservar onClick={manejarBotonReserva}>
              {turnoSeleccionado ? "Reservar Turno" : "Selecciona un Turno"}
            </BotonReservar>
          </ContenedorInfoD>
        </ContenedorInfo>

        <ContenedorPuntuacion
          id="reseñas-seccion"
          style={{ Padding: "30px 130px" }}
        >{/*           <ContenedorResenas>
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
        </ContenedorResenas> */}
          {mostrarResenas && (
            <ContenedorResenas>
              <Typography
                variant="h2"
                style={{
                  marginBottom: "20px",
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#2d0363",
                }}
              >
                Reseñas del Servicio:
              </Typography>
              {obtenerComentariosAleatorios().map((comentario, index) => (
                <ContenedorComentario key={index}>
                  <EstrellaComentario
                    value={(servicio.puntuacionMedia || 5.0).toFixed(1)}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" style={{ fontStyle: "italic" }}>
                    Comentario: {comentario.comentario}
                  </Typography>
                  <DetallesComentario>
                    - {comentario.usuario}, {comentario.fecha}
                  </DetallesComentario>
                </ContenedorComentario>
              ))}
            </ContenedorResenas>
          )}
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
              <strong>Salud y Cuidados de la Piel y el Cabello:</strong>
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

        <AuthRequiredModal
          open={authModalAbierto}
          onClose={() => setAuthModalAbierto(false)}
        />
      </ContenedorDetalle>
    </Contenedor>
  );
};

export default ProductoDetalle;
