import React, { useEffect, useState } from "react";
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
  TituloSeccion,
} from "./TablaProductos.styled";
import { Edit, Delete, Star } from "@mui/icons-material";
import {
  obtenerServicios,
  eliminarServicio,
} from "../../Services/serviciosService";
import MensajeModal from "../../Components/MensajeModal/MensajeModal";

const TablaProductos = ({ seleccionarServicio }) => {
  const [servicios, setServicios] = useState([]);
  const [mensaje, setMensaje] = useState({
    abierto: false,
    tipo: "",
    texto: "",
    callback: null,
  });

  useEffect(() => {
    const cargarServicios = async () => {
      const data = await obtenerServicios();
      setServicios(data);
    };
    cargarServicios();
  }, []);

  const handleEliminarServicio = (id) => {
    setMensaje({
      abierto: true,
      tipo: "eliminar",
      texto: "¿Desea eliminar este servicio?",
      callback: async () => {
        const resultado = await eliminarServicio(id);
        if (resultado) {
          setServicios(servicios.filter((servicio) => servicio.id !== id));
        }
        setMensaje({ ...mensaje, abierto: false });
      },
    });
  };

  return (
    <ContenedorTabla>
      <TituloSeccion>Servicios Registrados</TituloSeccion>
      <Tabla>
        <Encabezado>
          <FilaEncabezado>
            <CeldaEncabezado>ID</CeldaEncabezado>
            <CeldaEncabezado>Servicio</CeldaEncabezado>
            <CeldaEncabezado>Categoría</CeldaEncabezado>
            <CeldaEncabezado>Precio</CeldaEncabezado>
            <CeldaEncabezado>Duración</CeldaEncabezado>
            <CeldaEncabezado>Secciones</CeldaEncabezado>
            <CeldaEncabezado>Descripción</CeldaEncabezado>
            <CeldaEncabezado>Acción</CeldaEncabezado>
          </FilaEncabezado>
        </Encabezado>
        <CuerpoTabla>
          {servicios.length > 0 ? (
            servicios.map((servicio) => (
              <Fila key={servicio.id}>
                <Celda>{servicio.id}</Celda>
                <Celda>{servicio.nombre}</Celda>
                <Celda>{servicio.categoria}</Celda>
                <Celda>${servicio.costo}</Celda>
                <Celda>{servicio.duracionMinutos} min</Celda>
                <Celda>{servicio.cantidadSesiones}</Celda>
                <Celda>{servicio.descripcion.substring(0, 50)}...</Celda>
                <Celda>
                  <IconosAccion>
                    <button onClick={() => seleccionarServicio(servicio)}>
                      <Edit />
                    </button>
                    <button onClick={() => handleEliminarServicio(servicio.id)}>
                      <Delete />
                    </button>
                    <button>
                      <Star />
                    </button>
                  </IconosAccion>
                </Celda>
              </Fila>
            ))
          ) : (
            <Fila>
              <Celda
                colSpan="8"
                style={{ textAlign: "center", padding: "20px" }}
              >
                No hay servicios registrados.
              </Celda>
            </Fila>
          )}
        </CuerpoTabla>
      </Tabla>

      <MensajeModal
        abierto={mensaje.abierto}
        tipo={mensaje.tipo}
        mensaje={mensaje.texto}
        onConfirmar={mensaje.callback}
        onCancelar={() => setMensaje({ ...mensaje, abierto: false })}
      />
    </ContenedorTabla>
  );
};

export default TablaProductos;
