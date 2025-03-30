import React, { useState, useEffect } from "react";
import {
  obtenerReservas,
  actualizarReserva,
  eliminarReserva,
} from "../../Services/reservasService";
import {
  ContenedorTablaReservas,
  SeccionLista,
  TablaReservasEstilizada,
  EncabezadoTabla,
  CuerpoTabla,
  FilaTabla,
  CeldaEncabezado,
  Celda,
  SelectRol,
  BotonEliminar,
} from "./TablaReserva.styled";
import MensajeModal from "../../Components/MensajeModal/MensajeModal";

const TablaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [mensaje, setMensaje] = useState({
    abierto: false,
    tipo: "",
    texto: "",
    callback: null,
  });

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const reservasData = await obtenerReservas();
      if (Array.isArray(reservasData.content)) {
        setReservas(reservasData.content);
      } else {
        console.error("La respuesta no contiene un array de reservas.");
        setReservas([]);
      }
    } catch (error) {
      console.error("Error al cargar las reservas", error);
      setReservas([]);
    }
  };

  const manejarCambioEstado = async (id, nuevoEstado) => {
    console.log("Resevas", reservas);
    const reserva = reservas.find((reserva) => reserva.id === id);
    console.log("Reseva", reserva);
    const reservaData = {
      idCliente: reserva.usuario.id,
      idServicio: reserva.servicio.id,
      idEmpleado: reserva.empleado.id,
      fecha: reserva.fecha,
      hora: reserva.hora,
      estado: nuevoEstado,
    };
    console.log("reservaData", reservaData);
    try {
      console.log("id, reservaData ", id, reservaData);
      await actualizarReserva(id, reservaData);
      setReservas(
        reservas.map((reserva) =>
          reserva.id === id ? { ...reserva, estado: nuevoEstado } : reserva
        )
      );
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
    }
  };

  const eliminarReservaHandler = async (idReserva) => {
    setMensaje({
      abierto: true,
      tipo: "eliminar",
      texto: "¿Desea eliminar este servicio?",
      callback: async () => {
        try {
          await eliminarReserva(idReserva);
          cargarReservas();
        } catch (error) {
          console.error("Error al eliminar la reserva", error);
        }
        setMensaje({ ...mensaje, abierto: false });
      },
    });
  };

  return (
    <ContenedorTablaReservas>
      <SeccionLista>
        <h2>Lista de Reservas</h2>
        <TablaReservasEstilizada>
          <EncabezadoTabla>
            <tr>
              <CeldaEncabezado>Servicio</CeldaEncabezado>
              <CeldaEncabezado>Usuario</CeldaEncabezado>
              <CeldaEncabezado>Empleado</CeldaEncabezado>
              <CeldaEncabezado>Fecha</CeldaEncabezado>
              <CeldaEncabezado>Hora</CeldaEncabezado>
              <CeldaEncabezado>Estado</CeldaEncabezado>
              <CeldaEncabezado>Acciones</CeldaEncabezado>
            </tr>
          </EncabezadoTabla>
          <CuerpoTabla>
            {reservas.length > 0 ? (
              reservas.map((reserva) => (
                <FilaTabla key={reserva.id}>
                  <Celda>{reserva.servicio.nombre}</Celda>
                  <Celda>
                    {reserva.usuario.nombre} {reserva.usuario.apellido}
                  </Celda>
                  <Celda>
                    {reserva.empleado.nombre} {reserva.empleado.apellido}
                  </Celda>
                  <Celda>{reserva.fecha}</Celda>
                  <Celda>{reserva.hora}</Celda>
                  <Celda>
                    <SelectRol
                      value={reserva.estado}
                      onChange={(e) =>
                        manejarCambioEstado(reserva.id, e.target.value)
                      }
                    >
                      <option value="CONCLUIDA">Concluida</option>
                      <option value="CONFIRMADA">Confirmada</option>
                      <option value="CANCELADA">Cancelada</option>
                    </SelectRol>
                  </Celda>
                  <Celda>
                    <BotonEliminar
                      onClick={() => eliminarReservaHandler(reserva.id)}
                    >
                      Eliminar
                    </BotonEliminar>
                  </Celda>
                </FilaTabla>
              ))
            ) : (
              <FilaTabla>
                <Celda colSpan="7" style={{ textAlign: "center" }}>
                  No hay reservas disponibles
                </Celda>
              </FilaTabla>
            )}
          </CuerpoTabla>
        </TablaReservasEstilizada>
      </SeccionLista>
      <MensajeModal
        abierto={mensaje.abierto}
        tipo={mensaje.tipo}
        mensaje={mensaje.texto}
        onConfirmar={mensaje.callback}
        onCancelar={() => setMensaje({ ...mensaje, abierto: false })}
      />
    </ContenedorTablaReservas>
  );
};

export default TablaReservas;
