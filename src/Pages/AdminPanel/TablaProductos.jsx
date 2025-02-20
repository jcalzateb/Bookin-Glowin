import React from "react";
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

const TablaProductos = ({ servicios, eliminarServicio }) => {
  return (
    <ContenedorTabla>
      <Tabla>
        <Encabezado>
          <FilaEncabezado>
            <CeldaEncabezado>ID</CeldaEncabezado>
            <CeldaEncabezado>Servicio</CeldaEncabezado>
            <CeldaEncabezado>Categoría</CeldaEncabezado>
            <CeldaEncabezado>Precio</CeldaEncabezado>
            <CeldaEncabezado>Duración</CeldaEncabezado>
            <CeldaEncabezado>Descripción</CeldaEncabezado>
            <CeldaEncabezado>Acción</CeldaEncabezado>
          </FilaEncabezado>
        </Encabezado>
        <CuerpoTabla>
          {servicios.map((servicio) => (
            <Fila key={servicio.id}>
              <Celda>{servicio.id}</Celda>
              <Celda>{servicio.nombre}</Celda>
              <Celda>{servicio.categoria}</Celda>
              <Celda>${servicio.precio}</Celda>
              <Celda>{servicio.duracion}</Celda>
              <Celda>{servicio.descripcion.substring(0, 50)}...</Celda>
              <Celda>
                <IconosAccion>
                  <button>
                    <Edit />
                  </button>
                  <button onClick={() => eliminarServicio(servicio.id)}>
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
