import api from "./apiConfig";

/**
 * Busca disponibilidad de servicios para la fecha especificada
 * @param {string} idServicio - ID del servicio seleccionado
 * @param {string} fechaIni - Fecha en formato ISO (YYYY-MM-DD)
 * @param {string} fechaFin - Fecha en formato ISO (YYYY-MM-DD)
 * @returns {Promise} - Promesa con los resultados de disponibilidad
 */
export const buscarDisponibilidad = async (idServicio, fechaIni, fechaFin) => {
  try {
    const respuesta = await api.get(`/reservas/available`, {
      params: { 
        idServicio: idServicio,
        fechaInicio: fechaIni,
        fechaFin: fechaFin
      }
    });
    return respuesta.data;
  } catch (error) {
    console.error("Error al buscar disponibilidad:", error);
    throw error;
  }
};
