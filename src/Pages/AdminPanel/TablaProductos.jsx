import React, { useState } from "react";
import {
  ContenedorTabla,
  Tabla,
  Encabezado,
  FilaEncabezado,
  CeldaEncabezado,
  CuerpoTabla,
  Fila,
  Celda,
  IconosAccion,
} from "./TablaProductos.styled";
import { Edit, Delete, Star } from "@mui/icons-material";

const productosEjemplo = [
  { id: 1, nombre: "Corte de Cabello", categoria: "Cabello", precio: "$10.000", duracion: "30 min", profesional: "Andrea", turnos: "4" },
  { id: 2, nombre: "Peinado", categoria: "Cabello", precio: "$15.000", duracion: "45 min", profesional: "Laura", turnos: "3" },
  { id: 3, nombre: "Uñas", categoria: "Manicura", precio: "$20.000", duracion: "60 min", profesional: "María", turnos: "5" },
];

const TablaProductos = () => {
  const [productos, setProductos] = useState(productosEjemplo);

  const handleEliminar = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  return (
    <ContenedorTabla>
      <Tabla>
        <Encabezado>
          <FilaEncabezado>
            <CeldaEncabezado>ID</CeldaEncabezado>
            <CeldaEncabezado>Producto</CeldaEncabezado>
            <CeldaEncabezado>Categoría</CeldaEncabezado>
            <CeldaEncabezado>Precio</CeldaEncabezado>
            <CeldaEncabezado>Duración</CeldaEncabezado>
            <CeldaEncabezado>Profesional</CeldaEncabezado>
            <CeldaEncabezado>Turnos</CeldaEncabezado>
            <CeldaEncabezado>Acción</CeldaEncabezado>
          </FilaEncabezado>
        </Encabezado>
        <CuerpoTabla>
          {productos.map((producto) => (
            <Fila key={producto.id}>
              <Celda>{producto.id}</Celda>
              <Celda>{producto.nombre}</Celda>
              <Celda>{producto.categoria}</Celda>
              <Celda>{producto.precio}</Celda>
              <Celda>{producto.duracion}</Celda>
              <Celda>{producto.profesional}</Celda>
              <Celda>{producto.turnos}</Celda>
              <Celda>
                <IconosAccion>
                  <button>
                    <Edit />
                  </button>
                  <button onClick={() => handleEliminar(producto.id)}>
                    <Delete />
                  </button>
                  <button>
                    <Star />
                  </button>
                </IconosAccion>
              </Celda>
            </Fila>
          ))}
        </CuerpoTabla>
      </Tabla>
    </ContenedorTabla>
  );
};

export default TablaProductos;
