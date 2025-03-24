import api from "./apiConfig";

/**
 * Registra una nueva reserva.
 * @param {number} idCliente - El ID del cliente.
 * @param {number} idServicio - El ID del servicio.
 * @param {number} idEmpleado - El ID del empleado.
 * @param {string} fecha - La fecha de la reserva (en formato YYYY-MM-DD).
 * @param {string} hora - La hora de la reserva (en formato HH:mm).
 * @returns {Promise} - Promesa con la respuesta de la reserva
 */
export const realizarReserva = async (
  idCliente,
  idServicio,
  idEmpleado,
  fecha,
  hora
) => {
  try {
    const reservaData = {
      idCliente,
      idServicio,
      idEmpleado,
      fecha,
      hora,
      estado: "pendiente",
    };

    const response = await api.post("/reservas", reservaData);
    return response.data;
  } catch (error) {
    console.error("Error al realizar la reserva:", error);
    throw error;
  }
};
