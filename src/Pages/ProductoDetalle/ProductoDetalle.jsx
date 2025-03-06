import React, { useState, useEffect } from "react";
import { obtenerServicioPorId } from "../../Services/serviciosService";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import CategoryIcon from "@mui/icons-material/FaceRetouchingNatural";
import servicios from "../../Utils/servicios.json";
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

const ProductoDetalle = ({ setMostrarHeader }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [servicio, setServicio] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const producto = servicios.find((item) => item.id === parseInt(id, 10));

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerDetallesServicio();
  }, []);
  if (!producto) {
    return (
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: "40px" }}>
        Producto no encontrado
      </Typography>
    );
  }
  const obtenerDetallesServicio = async () => {
    try {
      const data = await obtenerServicioPorId(id);
      setServicio(data);
    } catch (error) {
      setError("No se pudo cargar la información del servicio.");
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    if (!servicio || !servicio.imagenes) {
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
        <TituloProducto>{servicio.nombre}</TituloProducto>
        <BotonRetroceso onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </BotonRetroceso>
      </EncabezadoDetalle>

      <BloqueImagenes>
        <ImagenPrincipal
          style={{
            backgroundImage: servicio?.imagenes?.length
              ? `url(${servicio.imagenes[0]})`
              : "url('https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />
        <MiniaturasImagenes>
          {producto?.imagenes?.length > 1 ? (
            producto.imagenes
              .slice(1)
              .map((img, index) => (
                <img key={index} src={img} alt={`Miniatura ${index}`} />
              ))
          ) : (
            <Typography variant="body2">No hay imágenes adicionales</Typography>
          )}
          <BotonVerMas onClick={abrirCarrusel}>Ver Más</BotonVerMas>
        </MiniaturasImagenes>
      </BloqueImagenes>

      <CarruselImagenes
        imagenes={producto.imagenes}
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
