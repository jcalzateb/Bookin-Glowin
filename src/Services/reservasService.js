import api from "./apiConfig";

/**
 * Registra una nueva reserva.
 * @param {number} idCliente - El ID del cliente.
 * @param {number} idServicio - El ID del servicio.
 * @param {number} idEmpleado - El ID del empleado.
 * @param {string} fecha - La fecha de la reserva (en formato YYYY-MM-DD).
 * @param {string} hora - La hora de la reserva (en formato HH:mm).
 * @param {string} estado - La hora de la reserva (en formato HH:mm).
 * @returns {Promise} - Promesa con la respuesta de la reserva
 */
export const realizarReserva = async (reservaData) => {
  try {
    const response = await api.post("/reservas", reservaData);
    return response.data;
  } catch (error) {
    console.error(
      "Error en el backend al crear la reserva:",
      error.response || error.message
    );
    throw error;
  }
};

export const obtenerReservas = async () => {
  try {
    const response = await api.get("/reservas/all");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    throw error;
  }
};

export const actualizarReserva = async (idReserva, nuevaInformacion) => {
  try {
    const response = await api.put(`/reservas/${idReserva}`, nuevaInformacion);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    throw error;
  }
};

export const eliminarReserva = async (idReserva) => {
  try {
    await api.delete(`/reservas/${idReserva}`);
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    throw error;
  }
};
