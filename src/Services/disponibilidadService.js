import api from "./apiConfig";

/**
 * Obtiene la disponibilidad de un servicio para un mes específico
 * @param {string} servicioId - ID del servicio
 * @param {number} anio - Año 
 * @param {number} mes - Mes (1-12)
 * @returns {Promise} - Promesa con los días disponibles y su horario
 */
export const obtenerDisponibilidadMensual = async (servicioId, anio, mes) => {
  try {
    // Formatear fechas para consulta
    const primerDia = `${anio}-${mes.toString().padStart(2, '0')}-01`;
    const ultimoDia = new Date(anio, mes, 0).getDate();
    const ultimaFecha = `${anio}-${mes.toString().padStart(2, '0')}-${ultimoDia}`;
    
    const respuesta = await api.get(`/reservas/available`, {
      params: {
        idServicio: servicioId,
        fechaInicio: primerDia,
        fechaFin: ultimaFecha
      }
    });
    
    // Transformar la respuesta en un mapa de fechas disponibles
    // donde la clave es la fecha y el valor es un array de horarios
    const disponibilidadPorDia = {};
    respuesta.data.forEach(disponibilidad => {
      const fecha = disponibilidad.fecha;
      if (!disponibilidadPorDia[fecha]) {
        disponibilidadPorDia[fecha] = [];
      }
      disponibilidadPorDia[fecha].push(disponibilidad.hora);
    });
    
    return disponibilidadPorDia;
  } catch (error) {
    console.error("Error al obtener disponibilidad mensual:", error);
    throw error;
  }
};

/**
 * Obtiene los turnos disponibles para una fecha específica
 * @param {string} servicioId - ID del servicio
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @returns {Promise} - Lista de turnos disponibles con su hora
 */
export const obtenerTurnosDisponibles = async (servicioId, fecha) => {
  try {
    const respuesta = await api.get(`/reservas/available`, {
      params: {
        idServicio: servicioId,
        fechaInicio: fecha,
        fechaFin: fecha
      }
    });
    
    // Transformar la respuesta para que sea compatible con el componente
    const turnos = respuesta.data.map(disponibilidad => ({
      id: `${disponibilidad.fecha}-${disponibilidad.hora.replace(':', '')}`,
      hora: disponibilidad.hora,
      fecha: disponibilidad.fecha
    }));
    
    return turnos;
  } catch (error) {
    console.error("Error al obtener turnos disponibles:", error);
    throw error;
  }
};
