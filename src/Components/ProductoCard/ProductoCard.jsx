import React from "react";
import { Typography } from "@mui/material";
import { 
  TarjetaProducto, 
  FondoOscuro, 
  ContenidoExpandido, 
  NombreProducto, 
  PrecioProducto, 
  BotonVerMas 
} from "./ProductoCard.styled";

const ProductoCard = ({ producto }) => {
  return (
    <TarjetaProducto>
      <img src={producto.imagen} alt={producto.nombre} />

      {/* Fondo oscuro con título (desaparece en hover) */}
      <FondoOscuro className="fondo-titulo">
        <NombreProducto>{producto.nombre}</NombreProducto>
      </FondoOscuro>

      {/* Contenido hover */}
      <ContenidoExpandido className="contenido">
        <NombreProducto>{producto.nombre}</NombreProducto>
        <Typography variant="body2">{producto.descripcion}</Typography>
        <PrecioProducto>${producto.precio}</PrecioProducto>
        <BotonVerMas>Ver más</BotonVerMas>
      </ContenidoExpandido>
    </TarjetaProducto>
  );
};

export default ProductoCard;

