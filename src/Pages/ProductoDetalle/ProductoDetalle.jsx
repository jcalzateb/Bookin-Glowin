import React, { useState } from "react";
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
} from "./ProductoDetalle.styled";
import CarruselImagenes from "./CarruselImagenes/CarruselImagenes"; // Nueva ruta de importación


const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalAbierto, setModalAbierto] = useState(false);

  // Datos provisionales hasta conectar con backend
  const productosData = [
    {
      id: "1",
      nombre: "Corte de Cabello",
      descripcion:
        "Corte profesional con estilo moderno. Incluye lavado y secado. Ideal para renovar tu look con un toque fresco y elegante.",
      precio: "20.000",
      imagenes: [
        "https://picsum.photos/600/400?random=1",
        "https://picsum.photos/150/150?random=2",
        "https://picsum.photos/150/150?random=3",
        "https://picsum.photos/150/150?random=4",
        "https://picsum.photos/150/150?random=5",
      ],
    },
  ];

  // Buscar el producto por ID
  const producto = productosData.find((item) => item.id === id);

  if (!producto) {
    return (
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: "40px" }}>
        Producto no encontrado
      </Typography>
    );
  }

  return (
    <ContenedorDetalle>
      <EncabezadoDetalle>
        <Typography variant="h3" fontWeight="bold">
          {producto.nombre}
        </Typography>
        <BotonRetroceso onClick={() => navigate(-1)}> {/* Botón de retroceder restaurado */}
          <ArrowBackIcon />
        </BotonRetroceso>
      </EncabezadoDetalle>

      <BloqueImagenes>
        <ImagenPrincipal style={{ backgroundImage: `url(${producto.imagenes[0]})` }} />

        <MiniaturasImagenes>
          {producto.imagenes.slice(1).map((img, index) => (
            <img key={index} src={img} alt={`Miniatura ${index}`} />
          ))}
          <BotonVerMas onClick={() => setModalAbierto(true)}>Ver Más</BotonVerMas>
        </MiniaturasImagenes>
      </BloqueImagenes>

      <CarruselImagenes imagenes={producto.imagenes} abierto={modalAbierto} cerrar={() => setModalAbierto(false)} />

      <ContenedorInfo>
        <DescripcionProducto>
          <Typography variant="h5" fontWeight="bold">
            Descripción del Servicio
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "10px" }}>
            {producto.descripcion}
          </Typography>
        </DescripcionProducto>

        <ContenedorReserva>
          <Typography variant="h4" color="primary" fontWeight="bold">
            ${producto.precio} COP
          </Typography>
          <Typography variant="body2">Horario: 10:00 AM - 6:00 PM</Typography>
          <Typography variant="body2">Disponibilidad: Lunes - Viernes</Typography>
          <BotonReservar>Reservar</BotonReservar>
        </ContenedorReserva>
      </ContenedorInfo>
    </ContenedorDetalle>
  );
};

export default ProductoDetalle;
