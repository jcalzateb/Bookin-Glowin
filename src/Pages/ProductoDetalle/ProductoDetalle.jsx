import React, { useState, useEffect } from "react";
import servicios from "../../Utils/servicios.json";
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
} from "./ProductoDetalle.styled";
import CarruselImagenes from "./CarruselImagenes/CarruselImagenes";

const ProductoDetalle = ({ setMostrarHeader }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const producto = servicios.find((item) => item.id === parseInt(id, 10));

  if (!producto) {
    return (
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: "40px" }}>
        Producto no encontrado
      </Typography>
    );
  }

  const abrirCarrusel = () => {
    setModalAbierto(true);
    setMostrarHeader(false); // Oculta el Header
  };

  const cerrarCarrusel = () => {
    setModalAbierto(false);
    setMostrarHeader(true); // Muestra el Header nuevamente
  };

  return (
    <ContenedorDetalle>
      <EncabezadoDetalle>
        <TituloProducto>{producto.nombre}</TituloProducto>
        <BotonRetroceso onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </BotonRetroceso>
      </EncabezadoDetalle>

      <BloqueImagenes>
        <ImagenPrincipal
          style={{ backgroundImage: `url(${producto.imagenes[0]})` }}
        />
        <MiniaturasImagenes>
          {producto.imagenes.slice(1).map((img, index) => (
            <img key={index} src={img} alt={`Miniatura ${index}`} />
          ))}
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
          <Typography variant="body1">{producto.descripcion}</Typography>
        </DescripcionProducto>

        <ContenedorReserva>
          <PrecioProducto>${producto.precio} COP</PrecioProducto>
          <Typography variant="body2">Horario: 10:00 AM - 6:00 PM</Typography>
          <Typography variant="body2">
            Disponibilidad: Lunes - Viernes
          </Typography>
          <BotonReservar>Reservar</BotonReservar>
        </ContenedorReserva>
      </ContenedorInfo>
    </ContenedorDetalle>
  );
};

export default ProductoDetalle;
